import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { BusinessIdea } from "@/models";
import { writeAuditLog } from "@/lib/audit-log";

export const runtime = "nodejs";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "Admin access required" } }, { status: 403 });
    }

    const updates = await req.json();

    await connectToDatabase();

    const idea = await BusinessIdea.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!idea) {
      return NextResponse.json({ error: { code: "NOT_FOUND", message: "Business idea not found" } }, { status: 404 });
    }

    await writeAuditLog({
      actorId: session.user.id,
      action: "update_business_idea",
      targetUserId: session.user.id,
      reason: `Updated idea ${id}`,
    });

    return NextResponse.json({ success: true, idea });
  } catch (error: unknown) {
    return NextResponse.json({ error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Unknown error" } }, { status: 500 });
  }
}
