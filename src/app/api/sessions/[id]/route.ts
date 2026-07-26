import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateSessionDetails } from "@/domains/mentors/service";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { action, scheduledAt, meetingLink } = body as {
      action?: "confirm" | "decline" | "reschedule";
      scheduledAt?: string;
      meetingLink?: string;
    };

    if (!action || !["confirm", "decline", "reschedule"].includes(action)) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Invalid action" } },
        { status: 400 }
      );
    }

    const statusMap: Record<string, string> = {
      confirm: "confirmed",
      decline: "cancelled",
      reschedule: "requested",
    };

    const updated = await updateSessionDetails(id, {
      status: statusMap[action],
      scheduledAt: action === "reschedule" ? scheduledAt : scheduledAt,
      meetingLink,
    });

    return NextResponse.json({ session: updated });
  } catch (error: unknown) {
    console.error("Session update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
