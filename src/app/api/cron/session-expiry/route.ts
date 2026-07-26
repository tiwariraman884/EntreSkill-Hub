import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { MentorSession } from "@/models";
import { sendAlert } from "@/lib/alert-webhook";

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.INTERNAL_CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const now = new Date();
    const expiredRequests = await MentorSession.find({
      status: "requested",
      createdAt: { $lt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000) },
    });

    for (const session of expiredRequests) {
      session.status = "cancelled";
      session.notes = (session.notes || "") + " [Auto-expired after 72 hours]";
      await session.save();
    }

    if (expiredRequests.length > 0) {
      await sendAlert({
        level: "info",
        source: "cron-session-expiry",
        message: `Session expiry cron completed. Expired ${expiredRequests.length} stale session requests.`,
        details: { expiredCount: expiredRequests.length },
      });
    }

    return NextResponse.json({ expired: expiredRequests.length });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    await sendAlert({
      level: "error",
      source: "cron-session-expiry",
      message: "Session expiry cron failed",
      details: { error: message },
    });
    console.error("Cron session expiry error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
