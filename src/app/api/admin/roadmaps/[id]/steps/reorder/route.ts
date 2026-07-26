import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { Roadmap, RoadmapStep } from "@/models";
import { writeAuditLog } from "@/lib/audit-log";

export const runtime = "nodejs";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "Admin access required" } }, { status: 403 });
    }

    const { orderedStepIds } = await req.json();
    if (!orderedStepIds || !Array.isArray(orderedStepIds)) {
      return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "orderedStepIds must be an array" } }, { status: 400 });
    }

    await connectToDatabase();

    const roadmap = await Roadmap.findById(id);
    if (!roadmap) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "Roadmap not found" } }, { status: 404 });
    }

    const updates = orderedStepIds.map((stepId, index) =>
      RoadmapStep.findByIdAndUpdate(stepId, { order: index + 1 })
    );
    await Promise.all(updates);

    roadmap.steps = orderedStepIds;
    await roadmap.save();

    await writeAuditLog({
      actorId: session.user.id,
      action: "reorder_roadmap_steps",
      targetUserId: session.user.id,
      reason: `Reordered steps in roadmap ${id}`,
    });

    return NextResponse.json({ success: true, message: "Steps reordered successfully" });
  } catch (error: unknown) {
    return NextResponse.json({ error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Unknown error" } }, { status: 500 });
  }
}
