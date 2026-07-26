import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { User, MentorProfile } from "@/models";
import { writeAuditLog } from "@/lib/audit-log";

export const runtime = "nodejs";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "Admin access required" } }, { status: 403 });
    }

    const { decision, reason } = await req.json();
    if (!decision || !["verified", "rejected"].includes(decision)) {
      return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "Valid decision (verified/rejected) is required" } }, { status: 400 });
    }

    await connectToDatabase();

    const targetUser = await User.findById(id);
    if (!targetUser) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "User not found" } }, { status: 404 });
    }

    const mentorProfile = await MentorProfile.findOne({ userId: id });
    if (!mentorProfile) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "Mentor profile not found" } }, { status: 404 });
    }

    mentorProfile.verificationStatus = decision;
    await mentorProfile.save();

    if (decision === "verified") {
      targetUser.role = "mentor";
      await targetUser.save();
    }

    await writeAuditLog({
      actorId: session.user.id,
      action: `verify_mentor_${decision}`,
      targetUserId: targetUser._id,
      reason: reason || "",
    });

    return NextResponse.json({ success: true, verificationStatus: decision });
  } catch (error: unknown) {
    return NextResponse.json({ error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Unknown error" } }, { status: 500 });
  }
}
