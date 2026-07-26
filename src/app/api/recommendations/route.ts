import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getRecommendations } from "@/domains/recommendations";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "No valid session" } },
        { status: 401 }
      );
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rateLimitKey = `recommendations:${ip}`;
    const { allowed } = await rateLimit(rateLimitKey);
    if (!allowed) {
      return NextResponse.json(
        { error: { code: "RATE_LIMIT_EXCEEDED", message: "Too many requests. Please try again later." } },
        { status: 429 }
      );
    }

    const ideas = await getRecommendations(session.user.id);
    const fallback = ideas.length > 0 && ideas[0].score === 0;

    return NextResponse.json({ data: ideas, fallback }, { status: 200 });
  } catch (error: unknown) {
    console.error("Recommendations error:", error);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Internal server error" } },
      { status: 500 }
    );
  }
}
