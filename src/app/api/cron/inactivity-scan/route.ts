import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { UserProgress } from "@/models";
import { createNotification } from "@/domains/notifications/service";
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

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const inactiveRoadmaps = await UserProgress.find({
      lastActivityAt: { $lt: sevenDaysAgo },
      completionPercent: { $lt: 100 },
    });

    let notificationsCreated = 0;

    for (const progress of inactiveRoadmaps) {
      const daysSinceActivity = Math.floor((Date.now() - progress.lastActivityAt.getTime()) / (1000 * 60 * 60 * 24));
      
      let message = "";
      if (daysSinceActivity >= 30) {
        message = "Your roadmap has been inactive for 30 days. Pick up where you left off!";
      } else if (daysSinceActivity >= 14) {
        message = "It's been 2 weeks since you last worked on your roadmap. Ready to continue?";
      } else {
        message = "You haven't worked on your roadmap in a week. Keep the momentum going!";
      }

      await createNotification(
        progress.userId.toString(),
        "roadmap_inactivity",
        message
      );
      notificationsCreated++;
    }

    if (inactiveRoadmaps.length > 0) {
      await sendAlert({
        level: "info",
        source: "cron-inactivity-scan",
        message: `Inactivity scan completed. Found ${inactiveRoadmaps.length} inactive roadmaps, sent ${notificationsCreated} notifications.`,
        details: { inactiveCount: inactiveRoadmaps.length, notificationsCreated },
      });
    }

    return NextResponse.json({ inactiveRoadmaps: inactiveRoadmaps.length, notificationsCreated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    await sendAlert({
      level: "error",
      source: "cron-inactivity-scan",
      message: "Inactivity scan failed",
      details: { error: message },
    });
    console.error("Cron inactivity scan error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
