import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models";
import { sendAlert } from "@/lib/alert-webhook";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/login?error=missing-token", request.url));
    }

    await connectToDatabase();

    let userId: string | null = null;
    try {
      const decoded = Buffer.from(token, "base64url").toString("utf-8");
      const [uid] = decoded.split(":");
      userId = uid;
    } catch {
      return NextResponse.redirect(new URL("/login?error=invalid-token", request.url));
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.redirect(new URL("/login?error=user-not-found", request.url));
    }

    if (user.emailVerified) {
      return NextResponse.redirect(new URL("/login?verified=already", request.url));
    }

    user.emailVerified = new Date();
    await user.save();

    await sendAlert({
      level: "info",
      source: "auth-verify-email",
      message: `Email verified for user ${user.email}`,
      details: { userId: user._id.toString() },
    });

    return NextResponse.redirect(new URL("/login?verified=true", request.url));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    await sendAlert({
      level: "error",
      source: "auth-verify-email",
      message: "Email verification failed",
      details: { error: message },
    });
    return NextResponse.redirect(new URL("/login?error=server-error", request.url));
  }
}
