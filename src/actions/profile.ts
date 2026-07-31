"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models";
import { profileSchema, accountSchema, notificationSchema, privacySchema, changePasswordSchema, emailChangeSchema, deleteAccountSchema } from "@/lib/validations/settings";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";
import { sanitize } from "@/lib/sanitize";
import { cookies } from "next/headers";

export async function updateProfile(data: unknown) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const validated = profileSchema.parse(data);
    await connectToDatabase();

    const user = await User.findById(session.user.id);
    if (!user) {
      return { success: false, error: "User not found" };
    }

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

    return {
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        profile: user.profile,
      },
    };
  } catch (error: unknown) {
    console.error("Profile update error:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return { success: false, error: (error as ZodError).issues[0]?.message || "Validation failed" };
    }
    return { success: false, error: error instanceof Error ? error.message : "Failed to update profile" };
  }
}

export async function updateAccount(data: unknown) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const validated = accountSchema.parse(data);
    await connectToDatabase();

    const user = await User.findById(session.user.id);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    user.preferences = {
      ...user.preferences,
      ...validated,
    };
    await user.save();

    return { success: true, preferences: user.preferences };
  } catch (error: unknown) {
    console.error("Account update error:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return { success: false, error: (error as ZodError).issues[0]?.message || "Validation failed" };
    }
    return { success: false, error: error instanceof Error ? error.message : "Failed to update account settings" };
  }
}

export async function updateNotifications(data: unknown) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const validated = notificationSchema.parse(data);
    await connectToDatabase();

    const user = await User.findById(session.user.id);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    user.notifications = {
      ...user.notifications,
      ...validated,
    };
    await user.save();

    return { success: true, notifications: user.notifications };
  } catch (error: unknown) {
    console.error("Notification update error:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return { success: false, error: (error as ZodError).issues[0]?.message || "Validation failed" };
    }
    return { success: false, error: error instanceof Error ? error.message : "Failed to update notification settings" };
  }
}

export async function updatePrivacy(data: unknown) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const validated = privacySchema.parse(data);
    await connectToDatabase();

    const user = await User.findById(session.user.id);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    user.privacy = {
      ...user.privacy,
      ...validated,
    };
    await user.save();

    return { success: true, privacy: user.privacy };
  } catch (error: unknown) {
    console.error("Privacy update error:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return { success: false, error: (error as ZodError).issues[0]?.message || "Validation failed" };
    }
    return { success: false, error: error instanceof Error ? error.message : "Failed to update privacy settings" };
  }
}

export async function changePassword(data: unknown) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const validated = changePasswordSchema.parse(data);
    await connectToDatabase();

    const user = await User.findById(session.user.id);
    if (!user || !user.passwordHash) {
      return { success: false, error: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(validated.currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      return { success: false, error: "Current password is incorrect" };
    }

    const newPasswordHash = await bcrypt.hash(validated.newPassword, 12);
    user.passwordHash = newPasswordHash;
    user.security = {
      ...user.security,
      lastPasswordChange: new Date(),
    };
    await user.save();

    return { success: true, message: "Password updated successfully" };
  } catch (error: unknown) {
    console.error("Password change error:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return { success: false, error: (error as ZodError).issues[0]?.message || "Validation failed" };
    }
    return { success: false, error: error instanceof Error ? error.message : "Failed to change password" };
  }
}

export async function changeEmail(data: unknown) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const validated = emailChangeSchema.parse(data);
    await connectToDatabase();

    const user = await User.findById(session.user.id);
    if (!user || !user.passwordHash) {
      return { success: false, error: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(validated.currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      return { success: false, error: "Current password is incorrect" };
    }

    const existingUser = await User.findOne({ email: validated.email.toLowerCase() });
    if (existingUser && existingUser._id.toString() !== user._id.toString()) {
      return { success: false, error: "Email is already in use" };
    }

    user.email = validated.email.toLowerCase();
    user.emailVerified = null;
    await user.save();

    return {
      success: true,
      message: "Email updated. Please verify your new email address.",
      email: user.email,
    };
  } catch (error: unknown) {
    console.error("Email change error:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return { success: false, error: (error as ZodError).issues[0]?.message || "Validation failed" };
    }
    return { success: false, error: error instanceof Error ? error.message : "Failed to change email" };
  }
}

export async function deleteAccount(data: unknown) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const validated = deleteAccountSchema.parse(data);
    await connectToDatabase();

    const user = await User.findById(session.user.id);
    if (!user || !user.passwordHash) {
      return { success: false, error: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(validated.password, user.passwordHash);
    if (!isPasswordValid) {
      return { success: false, error: "Password is incorrect" };
    }

    user.accountStatus = {
      isActive: false,
      deactivatedAt: new Date(),
      deletionScheduledAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
    await user.save();

    const cookieStore = await cookies();
    cookieStore.delete("next-auth.session-token");

    return {
      success: true,
      message: "Account deletion scheduled. You have 30 days to restore your account.",
    };
  } catch (error: unknown) {
    console.error("Account deletion error:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return { success: false, error: (error as ZodError).issues[0]?.message || "Validation failed" };
    }
    return { success: false, error: error instanceof Error ? error.message : "Failed to delete account" };
  }
}
