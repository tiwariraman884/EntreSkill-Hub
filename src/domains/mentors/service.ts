import { connectToDatabase } from "@/lib/mongoose";
import mongoose from "mongoose";
import { MentorProfile, MentorSession, User } from "@/models";

export async function getVerifiedMentors(expertise?: string, availabilityDay?: string) {
  await connectToDatabase();
  const query: Record<string, unknown> = { verificationStatus: "verified" };
  if (expertise) {
    query.expertiseAreas = expertise;
  }
  if (availabilityDay) {
    query.availability = { $elemMatch: { day: availabilityDay } };
  }
  return MentorProfile.find(query)
    .populate("userId", "name email image")
    .populate("expertiseAreas", "name category");
}

export async function getMentorById(id: string) {
  await connectToDatabase();
  return MentorProfile.findById(id).populate("userId", "name email image");
}

export async function createSession(mentorId: string, menteeId: string, notes?: string) {
  await connectToDatabase();
  return MentorSession.create({
    mentorId,
    menteeId,
    status: "requested",
    notes: notes || "",
  });
}

export async function getMentorSessions(mentorId: string) {
  await connectToDatabase();
  return MentorSession.find({ mentorId }).populate("menteeId", "name email");
}

export async function getMenteeSessions(menteeId: string) {
  await connectToDatabase();
  return MentorSession.find({ menteeId }).populate("mentorId", "name email");
}

export async function updateSessionStatus(id: string, status: string, scheduledAt?: string) {
  await connectToDatabase();
  const session = await MentorSession.findById(id);
  if (!session) throw new Error("Session not found");
  session.status = status as "requested" | "confirmed" | "completed" | "cancelled";
  if (scheduledAt) session.scheduledAt = new Date(scheduledAt);
  await session.save();
  return session;
}

export async function updateSessionDetails(id: string, updates: { status?: string; scheduledAt?: string; meetingLink?: string }) {
  await connectToDatabase();
  const session = await MentorSession.findById(id);
  if (!session) throw new Error("Session not found");
  if (updates.status) session.status = updates.status as "requested" | "confirmed" | "completed" | "cancelled";
  if (updates.scheduledAt) session.scheduledAt = new Date(updates.scheduledAt);
  if (updates.meetingLink !== undefined) session.meetingLink = updates.meetingLink;
  await session.save();
  return session;
}

export async function applyToBeMentor(userId: string, input: { bio: string; expertiseAreas: string[]; yearsExperience: number; supportingLinks?: string[] }) {
  await connectToDatabase();
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const existingProfile = await MentorProfile.findOne({ userId });
  if (existingProfile) {
    existingProfile.bio = input.bio;
    existingProfile.expertiseAreas = input.expertiseAreas as unknown as mongoose.Types.ObjectId[];
    existingProfile.yearsExperience = input.yearsExperience;
    if (input.supportingLinks) {
      existingProfile.availability = existingProfile.availability || [];
    }
    await existingProfile.save();
    return existingProfile;
  }

  return MentorProfile.create({
    userId,
    bio: input.bio,
    expertiseAreas: input.expertiseAreas as unknown as mongoose.Types.ObjectId[],
    yearsExperience: input.yearsExperience,
    verificationStatus: "pending",
    availability: [],
  });
}

export async function getSessionMessages(sessionId: string) {
  await connectToDatabase();
  const session = await MentorSession.findById(sessionId);
  if (!session) throw new Error("Session not found");
  return session.messages || [];
}

export async function addSessionMessage(sessionId: string, senderId: string, body: string) {
  await connectToDatabase();
  const session = await MentorSession.findById(sessionId);
  if (!session) throw new Error("Session not found");
  session.messages = session.messages || [];
  session.messages.push({ senderId, body, createdAt: new Date() });
  await session.save();
  return session.messages[session.messages.length - 1];
}
