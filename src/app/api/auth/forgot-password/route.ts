import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models";
import crypto from "crypto";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
// import { sendResetEmail } from "@/lib/email"; // Assume we have a generic email utility

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rateLimitKey = `auth:forgot:${ip}`;
    const { allowed } = await rateLimit(rateLimitKey);
    if (!allowed) {
      return NextResponse.json(
        { error: { code: "RATE_LIMIT_EXCEEDED", message: "Too many requests. Please try again later." } },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Missing email" } },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ email: email.toLowerCase() });
    
    // Always return 200 regardless of whether the email exists (security best practice)
    if (!user) {
      return NextResponse.json({ message: "If an account exists, a reset link has been sent." }, { status: 200 });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // 1 hour expiration

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    await user.save();

    // TODO: Send real email using sendResetEmail(user.email, token)
    console.log(`[STUB] Password reset token for ${email}: ${token}`);

    return NextResponse.json({ message: "If an account exists, a reset link has been sent." }, { status: 200 });
  } catch (error: unknown) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Internal server error" } },
      { status: 500 }
    );
  }
}
