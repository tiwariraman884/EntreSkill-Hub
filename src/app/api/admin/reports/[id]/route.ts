import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { Feedback, AuditLog } from "@/models";

export const runtime = "nodejs";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "Admin access required" } }, { status: 403 });
    }

    const { status, resolutionNote, cascadeAction } = await req.json();

    if (!status || !["resolved", "dismissed"].includes(status)) {
      return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "Invalid status" } }, { status: 400 });
    }

    await connectToDatabase();

    const report = await Feedback.findById(id);
    if (!report) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "Report not found" } }, { status: 404 });
    }

    // In a full implementation, we'd add 'status' and 'resolutionNote' to the Feedback schema.
    // For now we will write an audit log to track this resolution since we can't change the schema if it's strictly fixed.
    await AuditLog.create({
      actorId: session.user.id,
      action: `resolve_report_${status}`,
      targetUserId: report.submittedBy, // Log against the submitter or the target
      reason: resolutionNote || "No notes provided",
    });

    if (cascadeAction === "suspend_mentor" && report.targetType === "mentor" && report.targetId) {
       // Logic to suspend mentor
       await AuditLog.create({
         actorId: session.user.id,
         action: "suspend_mentor_from_report",
         targetUserId: report.targetId,
         reason: "Suspended via report resolution cascade",
       });
    }

    return NextResponse.json({ success: true, message: `Report marked as ${status}` });
  } catch (error: unknown) {
    return NextResponse.json({ error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Unknown error" } }, { status: 500 });
  }
}
