import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { applyToBeMentor } from "@/domains/mentors/service";
import { mentorApplicationSchema } from "@/domains/mentors/schema";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validated = mentorApplicationSchema.parse(body);

    const profile = await applyToBeMentor(session.user.id, validated);
    return NextResponse.json({ profile }, { status: 201 });
  } catch (error: z.ZodError | Error | unknown) {
    console.error("Mentor application error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
