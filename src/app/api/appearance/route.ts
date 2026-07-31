import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models";
import { rateLimit } from "@/lib/rate-limit";
import type { AppearanceSettings } from "@/types/appearance";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "No valid session" } },
        { status: 401 }
      );
    }

    await connectToDatabase();
    
    const user = await User.findById(session.user.id).select("appearance").lean();
    if (!user) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "User not found" } },
        { status: 401 }
      );
    }

    return NextResponse.json({ appearance: user.appearance }, { status: 200 });
  } catch (error: unknown) {
    console.error("Appearance fetch error:", error);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Internal server error" } },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "No valid session" } },
        { status: 401 }
      );
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rateLimitKey = `appearance:${ip}`;
    const { allowed } = await rateLimit(rateLimitKey);
    if (!allowed) {
      return NextResponse.json(
        { error: { code: "RATE_LIMIT_EXCEEDED", message: "Too many requests. Please try again later." } },
        { status: 429 }
      );
    }

    const body = await request.json() as { appearance?: Partial<AppearanceSettings> };
    
    await connectToDatabase();
    
    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $set: { appearance: body.appearance } },
      { new: true }
    ).select("appearance");
    
    if (!user) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "User not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ appearance: user.appearance }, { status: 200 });
  } catch (error: unknown) {
    console.error("Appearance update error:", error);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Internal server error" } },
      { status: 500 }
    );
  }
}
