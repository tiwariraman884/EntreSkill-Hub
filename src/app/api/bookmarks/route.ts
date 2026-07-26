import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { toggleBookmark, getUserBookmarks } from "@/domains/bookmarks/service";
import { bookmarkSchema } from "@/domains/bookmarks/schema";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "No valid session" } }, { status: 401 });
    }

    const bookmarks = await getUserBookmarks(session.user.id);
    return NextResponse.json({ bookmarks });
  } catch (error: unknown) {
    console.error("Bookmarks fetch error:", error);
    return NextResponse.json({ error: { code: "SERVER_ERROR", message: "Internal server error" } }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "No valid session" } }, { status: 401 });
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rateLimitKey = `bookmarks:${ip}`;
    const { allowed } = await rateLimit(rateLimitKey);
    if (!allowed) {
      return NextResponse.json(
        { error: { code: "RATE_LIMIT_EXCEEDED", message: "Too many requests. Please try again later." } },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = bookmarkSchema.parse(body);

    const user = await toggleBookmark(session.user.id, validated.targetType, validated.targetId);
    const bookmarks = (user.bookmarks as Array<{ targetType: string; targetId: string }>);
    return NextResponse.json({ bookmarks });
  } catch (error: z.ZodError | Error | unknown) {
    console.error("Bookmark toggle error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Validation failed", fields: error.issues } },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: { code: "SERVER_ERROR", message: "Internal server error" } }, { status: 500 });
  }
}
