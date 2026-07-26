import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { Feedback } from "@/models";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: { code: "UNAUTHORIZED", message: "Admin access required" } }, { status: 403 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    // Feedback schema currently does not have a status field based on models index, 
    // but the API spec says it does. For now we will return all feedback if status field is missing,
    // or we assume it's just raw feedback that admin reviews.

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {};
    if (type) query.targetType = type;

    const reports = await Feedback.find(query)
      .populate("submittedBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Feedback.countDocuments(query);

    return NextResponse.json({
      data: reports,
      page,
      limit,
      total,
      hasMore: total > skip + reports.length,
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Unknown error" } }, { status: 500 });
  }
}
