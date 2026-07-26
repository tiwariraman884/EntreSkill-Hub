import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { LearningResource, Notification } from "@/models";
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
    if (!decision || !["approved", "rejected", "changes_requested"].includes(decision)) {
      return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "Invalid decision" } }, { status: 400 });
    }

    await connectToDatabase();

    const resource = await LearningResource.findById(id);
    if (!resource) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "Resource not found" } }, { status: 404 });
    }

    resource.approvalStatus = decision;
    await resource.save();

    await writeAuditLog({
      actorId: session.user.id,
      action: `approve_content_${decision}`,
      targetUserId: resource.uploadedBy.toString(),
      reason: reason || "",
    });

    await Notification.create({
      userId: resource.uploadedBy,
      type: "resource_review",
      message: `Your resource "${resource.title}" was reviewed. Status: ${decision}. ${reason ? 'Note: ' + reason : ''}`
    });

    return NextResponse.json({ success: true, approvalStatus: decision });
  } catch (error: unknown) {
    return NextResponse.json({ error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Unknown error" } }, { status: 500 });
  }
}
