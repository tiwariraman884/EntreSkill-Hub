import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models";
import { profileSchema, accountSchema, notificationSchema, privacySchema, changePasswordSchema, emailChangeSchema, deleteAccountSchema } from "@/lib/validations/settings";
import bcrypt from "bcryptjs";
import { rateLimit } from "@/lib/rate-limit";
import { sanitize } from "@/lib/sanitize";
import { ZodError } from "zod";

export const runtime = "nodejs";

async function getAuthenticatedUser(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: "Unauthorized", status: 401 };
  }

  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const rateLimitKey = `profile:update:${ip}`;
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

export async function PATCH(request: Request) {
  try {
    const { user, error, status } = await getAuthenticatedUser(request);
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    const body = await request.json();
    const { section } = body;

    if (section === "profile") {
      const validated = profileSchema.parse(body);
      const sanitized = {
        name: sanitize(validated.name),
        bio: sanitize(validated.bio || ""),
        headline: sanitize(validated.headline || ""),
        location: sanitize(validated.location || ""),
        college: sanitize(validated.college || ""),
        degree: sanitize(validated.degree || ""),
        department: sanitize(validated.department || ""),
        occupation: sanitize(validated.occupation || ""),
        website: validated.website || "",
        github: validated.github || "",
        linkedin: validated.linkedin || "",
        twitter: validated.twitter || "",
        portfolio: validated.portfolio || "",
        phone: validated.phone || "",
        publicProfileUrl: validated.publicProfileUrl || "",
      };

      user.name = sanitized.name;
      user.profile = {
        ...user.profile,
        ...sanitized,
      };
      await user.save();

      return NextResponse.json({
        success: true,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          profile: user.profile,
        },
      });
    }

    if (section === "account") {
      const validated = accountSchema.parse(body);
      user.preferences = {
        ...user.preferences,
        ...validated,
      };
      await user.save();

      return NextResponse.json({
        success: true,
        preferences: user.preferences,
      });
    }

    if (section === "notifications") {
      const validated = notificationSchema.parse(body);
      user.notifications = {
        ...user.notifications,
        ...validated,
      };
      await user.save();

      return NextResponse.json({
        success: true,
        notifications: user.notifications,
      });
    }

    if (section === "privacy") {
      const validated = privacySchema.parse(body);
      user.privacy = {
        ...user.privacy,
        ...validated,
      };
      await user.save();

      return NextResponse.json({
        success: true,
        privacy: user.privacy,
      });
    }

    if (section === "password") {
      const validated = changePasswordSchema.parse(body);
      const isPasswordValid = await bcrypt.compare(validated.currentPassword, user.passwordHash || "");
      if (!isPasswordValid) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
      }

      const newPasswordHash = await bcrypt.hash(validated.newPassword, 12);
      user.passwordHash = newPasswordHash;
      user.security = {
        ...user.security,
        lastPasswordChange: new Date(),
      };
      await user.save();

      return NextResponse.json({ success: true, message: "Password updated successfully" });
    }

    if (section === "email") {
      const validated = emailChangeSchema.parse(body);
      const isPasswordValid = await bcrypt.compare(validated.currentPassword, user.passwordHash || "");
      if (!isPasswordValid) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
      }

      const existingUser = await User.findOne({ email: validated.email.toLowerCase() });
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return NextResponse.json({ error: "Email is already in use" }, { status: 400 });
      }

      user.email = validated.email.toLowerCase();
      user.emailVerified = null;
      await user.save();

      return NextResponse.json({
        success: true,
        message: "Email updated. Please verify your new email address.",
        email: user.email,
      });
    }

    if (section === "delete") {
      const validated = deleteAccountSchema.parse(body);
      const isPasswordValid = await bcrypt.compare(validated.password, user.passwordHash || "");
      if (!isPasswordValid) {
        return NextResponse.json({ error: "Password is incorrect" }, { status: 400 });
      }

      user.accountStatus = {
        isActive: false,
        deactivatedAt: new Date(),
        deletionScheduledAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      };
      await user.save();

      return NextResponse.json({
        success: true,
        message: "Account deletion scheduled. You have 30 days to restore your account.",
      });
    }

    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  } catch (error: unknown) {
    console.error("Profile update error:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: (error as ZodError).issues[0]?.message || "Validation failed" }, { status: 400 });
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
  }
}

export async function GET(_request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    
    const user = await User.findById(session.user.id)
      .select("-passwordHash -resetPasswordToken -resetPasswordExpires")
      .lean();
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
  }
}
