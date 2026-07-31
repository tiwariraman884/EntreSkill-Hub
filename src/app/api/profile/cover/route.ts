import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

async function getAuthenticatedUser(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: "Unauthorized", status: 401 };
  }

  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const rateLimitKey = `cover:upload:${ip}`;
  const { allowed } = await rateLimit(rateLimitKey);
  if (!allowed) {
    return { error: "Too many requests", status: 429 };
  }

  await connectToDatabase();
  const user = await User.findById(session.user.id);
  if (!user) {
    return { error: "User not found", status: 404 };
  }

  return { user };
}

export async function POST(request: Request) {
  try {
    const { user, error, status } = await getAuthenticatedUser(request);
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    const formData = await request.formData();
    const file = formData.get("cover") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only JPG, PNG, and WEBP are allowed." }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    user.profile = {
      ...user.profile,
      coverPhoto: dataUrl,
    };
    await user.save();

    return NextResponse.json({
      success: true,
      coverPhoto: dataUrl,
      message: "Cover photo updated successfully",
    });
  } catch (error: unknown) {
    console.error("Cover upload error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to upload cover photo" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { user, error, status } = await getAuthenticatedUser(request);
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    user.profile = {
      ...user.profile,
      coverPhoto: "",
    };
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Cover photo removed successfully",
    });
  } catch (error: unknown) {
    console.error("Cover removal error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to remove cover photo" }, { status: 500 });
  }
}
