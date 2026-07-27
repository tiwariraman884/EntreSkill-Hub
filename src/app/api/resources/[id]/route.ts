import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { LearningResource, User, LearningProgress } from "@/models";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await connectToDatabase();

    const resource = await LearningResource.findById(id).populate("uploadedBy", "name").lean();
    if (!resource) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    const session = await getServerSession(authOptions);
    let progress = { progressPercent: 0, isCompleted: false, completedTasks: [] };
    let isBookmarked = false;

    if (session?.user?.id) {
      const userProgress = await LearningProgress.findOne({ userId: session.user.id, resourceId: id }).lean();
      if (userProgress) {
        progress = {
          progressPercent: userProgress.progressPercent || 0,
          isCompleted: userProgress.isCompleted || false,
          completedTasks: userProgress.completedTasks || [],
        };
      }

      const userRec = await User.findById(session.user.id).select("bookmarks").lean();
      if (userRec?.bookmarks) {
        isBookmarked = userRec.bookmarks.some(
          (b: { targetType: string; targetId: string }) => b.targetType === "resource" && b.targetId.toString() === id
        );
      }
      
      // Update views
      await LearningResource.findByIdAndUpdate(id, { $inc: { views: 1 } });
    }

    return NextResponse.json({ data: { ...resource, progress, isBookmarked } }, { status: 200 });
  } catch (error: unknown) {
    console.error("Fetch resource error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
