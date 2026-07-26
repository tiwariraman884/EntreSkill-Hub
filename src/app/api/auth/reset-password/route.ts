import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rateLimitKey = `auth:reset:${ip}`;
    const { allowed } = await rateLimit(rateLimitKey);
    if (!allowed) {
      return NextResponse.json(
        { error: { code: "RATE_LIMIT_EXCEEDED", message: "Too many requests. Please try again later." } },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { token, newPassword } = body;

    if (!token || !newPassword || newPassword.length < 8) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Invalid token or password too short (min 8 chars)" } },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }
    });

    if (!user) {
      return NextResponse.json(
        { error: { code: "INVALID_TOKEN", message: "Invalid or expired token" } },
        { status: 400 }
      );
    }

    const bcrypt = await import("bcryptjs");
    const passwordHash = await bcrypt.hash(newPassword, 12);

    user.passwordHash = passwordHash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Internal server error" } },
      { status: 500 }
    );
  }
}
