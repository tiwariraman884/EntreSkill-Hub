import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getNotifications } from "@/domains/notifications/service";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "No valid session" } }, { status: 401 });
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rateLimitKey = `notifications:${ip}`;
    const { allowed } = await rateLimit(rateLimitKey);
    if (!allowed) {
      return NextResponse.json(
        { error: { code: "RATE_LIMIT_EXCEEDED", message: "Too many requests. Please try again later." } },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get("unreadOnly") === "true";

    const notifications = await getNotifications(session.user.id, unreadOnly);
    return NextResponse.json({ notifications });
  } catch (error: unknown) {
    console.error("Notifications fetch error:", error);
    return NextResponse.json({ error: { code: "SERVER_ERROR", message: "Internal server error" } }, { status: 500 });
  }
}
