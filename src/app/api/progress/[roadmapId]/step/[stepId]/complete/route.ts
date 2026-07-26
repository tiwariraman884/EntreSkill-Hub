import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { markStepComplete, unmarkStepComplete } from "@/domains/roadmaps/service";

export async function POST(request: Request, { params }: { params: Promise<{ roadmapId: string; stepId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { roadmapId, stepId } = await params;
    const progress = await markStepComplete(session.user.id, roadmapId, stepId);

    return NextResponse.json({ progress });
  } catch (error: unknown) {
    console.error("Progress update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ roadmapId: string; stepId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { roadmapId, stepId } = await params;
    const progress = await unmarkStepComplete(session.user.id, roadmapId, stepId);

    if (!progress) {
      return NextResponse.json({ error: "Progress not found" }, { status: 404 });
    }

    return NextResponse.json({ progress });
  } catch (error: unknown) {
    console.error("Progress removal error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
