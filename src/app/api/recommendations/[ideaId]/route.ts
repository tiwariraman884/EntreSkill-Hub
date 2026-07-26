import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { BusinessIdea } from "@/models";

export const runtime = "nodejs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ ideaId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "No valid session" } },
        { status: 401 }
      );
    }

    const { ideaId } = await params;

    await connectToDatabase();
    
    const idea = await BusinessIdea.findById(ideaId).lean();
    
    if (!idea) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Business idea not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json(idea, { status: 200 });
  } catch (error: unknown) {
    console.error("Fetch idea error:", error);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Internal server error" } },
      { status: 500 }
    );
  }
}
