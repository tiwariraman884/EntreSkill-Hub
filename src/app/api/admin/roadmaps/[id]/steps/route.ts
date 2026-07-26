import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { Roadmap, RoadmapStep } from "@/models";
import { writeAuditLog } from "@/lib/audit-log";

export const runtime = "nodejs";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "Admin access required" } }, { status: 403 });
    }

    const { type, title, content, resourceIds } = await req.json();

    if (!type || !title || !content) {
      return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "Missing required fields" } }, { status: 400 });
    }

    await connectToDatabase();

    const roadmap = await Roadmap.findById(id);
    if (!roadmap) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "Roadmap not found" } }, { status: 404 });
    }

    const currentSteps = await RoadmapStep.countDocuments({ roadmapId: roadmap._id });
    const newOrder = currentSteps + 1;

    const step = await RoadmapStep.create({
      roadmapId: roadmap._id,
      order: newOrder,
      type,
      title,
      content,
      resourceIds: resourceIds || [],
    });

    roadmap.steps.push(step._id);
    await roadmap.save();

    await writeAuditLog({
      actorId: session.user.id,
      action: "add_roadmap_step",
      targetUserId: session.user.id,
      reason: `Added step to roadmap ${id}`,
    });

    return NextResponse.json({ success: true, step }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Unknown error" } }, { status: 500 });
  }
}
