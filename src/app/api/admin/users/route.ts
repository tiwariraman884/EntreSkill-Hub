import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { User, MentorProfile } from "@/models";

export const runtime = "nodejs";

interface LeanUser {
  _id: { toString: () => string };
  [key: string]: unknown;
}

interface LeanProfile {
  userId: { toString: () => string };
  verificationStatus: string;
  [key: string]: unknown;
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "Admin access required" } }, { status: 403 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const verificationStatus = searchParams.get("verificationStatus");
    const q = searchParams.get("q");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {};
    if (role) query.role = role;
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ];
    }

    let users = await User.find(query).skip(skip).limit(limit).select("-passwordHash -resetPasswordToken -resetPasswordExpires").lean();
    const total = await User.countDocuments(query);

    // If filtering by mentor verification status, we need to join with MentorProfile
    if (verificationStatus || role === "mentor") {
      const userIds = users.map((u: unknown) => (u as LeanUser)._id);
      const mentorProfiles = await MentorProfile.find({ userId: { $in: userIds } }).lean();
      
      users = users.map((u: unknown) => {
        const userDoc = u as LeanUser;
        const profile = mentorProfiles.find((p: unknown) => (p as LeanProfile).userId.toString() === userDoc._id.toString());
        return {
          ...userDoc,
          mentorProfile: profile || null,
        };
      });

      if (verificationStatus) {
        users = users.filter((u: unknown) => {
          const profile = (u as LeanUser).mentorProfile as LeanProfile | null;
          return profile?.verificationStatus === verificationStatus;
        });
      }
    }

    return NextResponse.json({
      data: users,
      page,
      limit,
      total,
      hasMore: total > skip + users.length,
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Unknown error" } }, { status: 500 });
  }
}
