import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { MentorSession } from "@/models";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

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
    const rateLimitKey = `session:request:${session.user.id}:${ip}`;
    const { allowed } = await rateLimit(rateLimitKey);
    if (!allowed) {
      return NextResponse.json(
        { error: { code: "RATE_LIMIT_EXCEEDED", message: "Too many session requests" } },
        { status: 429 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { message } = body as { message?: string };

    await connectToDatabase();

    const mentorSession = await MentorSession.create({
      mentorId: id,
      menteeId: session.user.id,
      status: "requested",
      notes: message || "",
    });

    return NextResponse.json({ session: mentorSession }, { status: 201 });
  } catch (error) {
    console.error("Session request error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
