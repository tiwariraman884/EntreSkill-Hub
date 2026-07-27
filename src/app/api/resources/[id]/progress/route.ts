import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { LearningProgress } from "@/models";
import { z } from "zod";

const progressSchema = z.object({
  progressPercent: z.number().min(0).max(100),
  isCompleted: z.boolean().optional(),
  completedTasks: z.array(z.string()).optional(),
});

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: resourceId } = await context.params;
    const body = await request.json();
    const validated = progressSchema.parse(body);

    await connectToDatabase();

    const progress = await LearningProgress.findOneAndUpdate(
      { userId: session.user.id, resourceId },
      {
        $set: {
          progressPercent: validated.progressPercent,
          isCompleted: validated.isCompleted || (validated.progressPercent === 100),
          lastViewedAt: new Date(),
        },
        ...(validated.completedTasks ? { $addToSet: { completedTasks: { $each: validated.completedTasks } } } : {})
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ data: progress }, { status: 200 });
  } catch (error: unknown) {
    console.error("Progress update error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
