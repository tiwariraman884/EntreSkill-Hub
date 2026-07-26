import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getVerifiedMentors, createSession } from "@/domains/mentors/service";
import { sessionRequestSchema } from "@/domains/mentors/schema";
import { z } from "zod";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const expertise = searchParams.get("expertise");
    const availabilityDay = searchParams.get("availabilityDay");

    const mentors = await getVerifiedMentors(expertise || undefined, availabilityDay || undefined);
    return NextResponse.json({ mentors });
  } catch (error: unknown) {
    console.error("Mentors fetch error:", error);
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
    const validated = sessionRequestSchema.parse(body);

    const mentorSession = await createSession(validated.mentorId, session.user.id, validated.notes);
    return NextResponse.json({ session: mentorSession }, { status: 201 });
  } catch (error: z.ZodError | Error | unknown) {
    console.error("Session request error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
