import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getResources, createResource, updateResourceStatus } from "@/domains/resources/service";
import { resourceCreateSchema } from "@/domains/resources/schema";
import { z } from "zod";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const tag = searchParams.get("tag");
    const q = searchParams.get("q");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const sort = searchParams.get("sort");
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");

    const result = await getResources({
      type: type || undefined,
      tag: tag || undefined,
      q: q || undefined,
      category: category || undefined,
      difficulty: difficulty || undefined,
      sort: sort || undefined,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20
    });

    const session = await getServerSession(authOptions);
    const progressMap: Record<string, any> = {};
    let bookmarks: string[] = [];

    if (session?.user?.id) {
      const { User, LearningProgress } = await import("@/models");
      const userRec = await User.findById(session.user.id).select("bookmarks").lean();
      if (userRec?.bookmarks) {
        bookmarks = userRec.bookmarks
          .filter((b: any) => b.targetType === "resource")
          .map((b: any) => b.targetId.toString());
      }
      
      const progresses = await LearningProgress.find({ userId: session.user.id }).lean();
      progresses.forEach((p: any) => {
        progressMap[p.resourceId.toString()] = {
          progressPercent: p.progressPercent,
          isCompleted: p.isCompleted
        };
      });
    }

    const dataWithProgress = result.data.map((r: any) => ({
      ...r.toJSON(),
      isBookmarked: bookmarks.includes(r._id.toString()),
      progress: progressMap[r._id.toString()] || { progressPercent: 0, isCompleted: false }
    }));

    return NextResponse.json({
      data: dataWithProgress,
      page: result.page,
      limit: result.limit,
      total: result.total,
      hasMore: result.page * result.limit < result.total,
    });
  } catch (error: unknown) {
    console.error("Resources fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validated = resourceCreateSchema.parse(body);

    const resource = await createResource({
      ...validated,
      uploadedBy: session.user.id,
    });

    return NextResponse.json({ resource }, { status: 201 });
  } catch (error: z.ZodError | Error | unknown) {
    console.error("Resource creation error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await request.json();
    const resource = await updateResourceStatus(id, status);
    return NextResponse.json({ resource });
  } catch (error: unknown) {
    console.error("Resource approval error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
