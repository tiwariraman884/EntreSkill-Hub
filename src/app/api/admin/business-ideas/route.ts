import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { BusinessIdea, Roadmap } from "@/models";
import { writeAuditLog } from "@/lib/audit-log";

export const runtime = "nodejs";

export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "Admin access required" } }, { status: 403 });
    }
    await connectToDatabase();
    const ideas = await BusinessIdea.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ data: ideas });
  } catch (error: unknown) {
    return NextResponse.json({ error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Unknown error" } }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "Admin access required" } }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, relatedSkills, difficultyLevel, estimatedStartupCostINR } = body;

    if (!title || !description || !difficultyLevel || !estimatedStartupCostINR) {
      return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "Missing required fields" } }, { status: 400 });
    }

    await connectToDatabase();

    const roadmap = await Roadmap.create({
      title: `${title} Roadmap`,
      steps: [],
      businessIdeaId: null,
    });

    const idea = await BusinessIdea.create({
      title,
      description,
      relatedSkills: relatedSkills || [],
      difficultyLevel,
      estimatedStartupCostINR,
      roadmapId: roadmap._id,
      isActive: true,
    });

    roadmap.businessIdeaId = idea._id;
    await roadmap.save();

    await writeAuditLog({
      actorId: session.user.id,
      action: "create_business_idea",
      targetUserId: session.user.id,
      reason: `Created idea: ${title}`,
    });

    return NextResponse.json({ success: true, idea }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Unknown error" } }, { status: 500 });
  }
}
