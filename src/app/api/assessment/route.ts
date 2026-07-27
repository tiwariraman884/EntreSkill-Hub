import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { User, Skill } from "@/models";
import { assessmentSubmitSchema } from "@/domains/assessment/schema";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "No valid session" } },
        { status: 401 }
      );
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rateLimitKey = `assessment:${ip}`;
    const { allowed } = await rateLimit(rateLimitKey);
    if (!allowed) {
      return NextResponse.json(
        { error: { code: "RATE_LIMIT_EXCEEDED", message: "Too many requests. Please try again later." } },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = assessmentSubmitSchema.parse(body);

    await connectToDatabase();

    // Look up existing skills by label
    const skillLabels = validated.skills.map(s => s.label);
    const existingSkills = await Skill.find({ name: { $in: skillLabels } });
    const existingSkillNames = existingSkills.map(s => s.name);
    
    // Create any missing skills
    const missingSkills = skillLabels.filter(label => !existingSkillNames.includes(label));
    let newSkills: { _id: string }[] = [];
    if (missingSkills.length > 0) {
      newSkills = await Skill.insertMany(missingSkills.map(name => ({
        name,
        category: validated.skills.find(s => s.label === name)?.category || "Other"
      })));
    }
    
    const allSkillIds = [...existingSkills.map(s => s._id), ...newSkills.map(s => s._id)];

    const updatedUser = await User.findByIdAndUpdate(session.user.id, {
      skills: allSkillIds,
      interests: validated.interests.map(i => i.label),
      location: validated.location,
      updatedAt: new Date(),
    }, { new: true }).select("-passwordHash").lean();

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: unknown) {
    console.error("Assessment error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Validation failed", fields: error.issues } },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: error instanceof Error ? error.message : "Internal server error" } },
      { status: 500 }
    );
  }
}
