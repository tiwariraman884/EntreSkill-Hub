import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getProgress } from "@/domains/roadmaps/service";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const progress = await getProgress(session.user.id);
    return NextResponse.json({ progress });
  } catch (error: unknown) {
    console.error("Progress fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
