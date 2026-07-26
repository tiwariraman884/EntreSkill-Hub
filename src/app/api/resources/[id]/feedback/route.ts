import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createResourceFeedback } from "@/domains/resources/service";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rateLimitKey = `feedback:${session.user.id}:${ip}`;
    const { allowed } = await rateLimit(rateLimitKey);
    if (!allowed) {
      return NextResponse.json(
        { error: { code: "RATE_LIMIT_EXCEEDED", message: "Too many feedback submissions" } },
        { status: 429 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { rating, comment } = body as { rating?: number; comment?: string };

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "Rating must be between 1 and 5" } }, { status: 400 });
    }

    const feedback = await createResourceFeedback({
      resourceId: id,
      submittedBy: session.user.id,
      rating,
      comment: comment || "",
    });

    return NextResponse.json({ feedback }, { status: 201 });
  } catch (error: unknown) {
    console.error("Feedback creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
