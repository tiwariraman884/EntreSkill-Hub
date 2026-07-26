import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models";
import { writeAuditLog } from "@/lib/audit-log";

export const runtime = "nodejs";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "Admin access required" } }, { status: 403 });
    }

    const { reason } = await req.json();
    if (!reason) {
      return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "Reason is required" } }, { status: 400 });
    }

    await connectToDatabase();

    const targetUser = await User.findById(id);
    if (!targetUser) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "User not found" } }, { status: 404 });
    }

    await writeAuditLog({
      actorId: session.user.id,
      action: "suspend_user",
      targetUserId: targetUser._id,
      reason,
    });

    targetUser.role = "suspended";
    await targetUser.save();

    return NextResponse.json({ success: true, message: "User suspended and audit log created" });
  } catch (error: unknown) {
    return NextResponse.json({ error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Unknown error" } }, { status: 500 });
  }
}
