import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { Roadmap, RoadmapStep } from "@/models";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const roadmap = await Roadmap.findById(id).populate("steps").populate("businessIdeaId");
    
    if (!roadmap) {
      return NextResponse.json({ error: "Roadmap not found" }, { status: 404 });
    }

    const steps = await RoadmapStep.find({ roadmapId: id }).sort({ order: 1 });

    const roadmapData = {
      _id: roadmap._id,
      businessIdeaId: roadmap.businessIdeaId,
      title: roadmap.title,
      steps,
    };

    return NextResponse.json({ roadmap: roadmapData });
  } catch (error) {
    console.error("Roadmap fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
