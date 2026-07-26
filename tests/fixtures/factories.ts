import mongoose from "mongoose";
import { User, Skill, BusinessIdea, Roadmap, LearningResource, MentorProfile, UserProgress, MentorSession, Feedback, Notification, AuditLog } from "@/models";

export async function connectTestDb() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
}

export async function clearDatabase() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}

export async function disconnectTestDb() {
  await mongoose.disconnect();
}

export async function makeUser(overrides?: Partial< mongoose.Types.ObjectId & {
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  skills: mongoose.Types.ObjectId[];
  interests: string[];
  location: { state: string; district: string; isRural: boolean };
  emailVerified?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  bookmarks?: { targetType: string; targetId: mongoose.Types.ObjectId }[];
}>): Promise<Partial< mongoose.Types.ObjectId & {
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  skills: mongoose.Types.ObjectId[];
  interests: string[];
  location: { state: string; district: string; isRural: boolean };
  emailVerified?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  bookmarks?: { targetType: string; targetId: mongoose.Types.ObjectId }[];
}>> {
  const bcrypt = await import("bcryptjs");
  const passwordHash = bcrypt.hashSync("password123", 12);
  return {
    name: "Test User",
    email: `test-${Date.now()}@example.com`,
    passwordHash,
    role: "user",
    skills: [],
    interests: ["tech"],
    location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    ...overrides,
  };
}

export function makeSkill(overrides?: Partial<{ name: string; category: string }>) {
  return {
    name: `Skill ${Date.now()}`,
    category: "Technology",
    ...overrides,
  };
}

export function makeBusinessIdea(overrides?: Partial<{ title: string; description: string; relatedSkills: mongoose.Types.ObjectId[]; difficultyLevel: string; estimatedStartupCostINR: { min: number; max: number }; roadmapId: mongoose.Types.ObjectId; isActive: boolean }>) {
  return {
    title: `Idea ${Date.now()}`,
    description: "A great business idea",
    relatedSkills: [],
    difficultyLevel: "beginner",
    estimatedStartupCostINR: { min: 1000, max: 5000 },
    isActive: true,
    ...overrides,
  };
}

export function makeLearningResource(overrides?: Partial<{ title: string; type: string; url: string; uploadedBy: mongoose.Types.ObjectId; approvalStatus: string; tags: string[] }>) {
  return {
    title: `Resource ${Date.now()}`,
    type: "article",
    url: "https://example.com",
    uploadedBy: new mongoose.Types.ObjectId(),
    approvalStatus: "pending",
    tags: [],
    ...overrides,
  };
}

export function makeMentorProfile(overrides?: Partial<{ userId: mongoose.Types.ObjectId; expertiseAreas: mongoose.Types.ObjectId[]; yearsExperience: number; bio: string; verificationStatus: string; availability: { day: string; startTime: string; endTime: string }[] }>) {
  return {
    userId: new mongoose.Types.ObjectId(),
    expertiseAreas: [],
    yearsExperience: 5,
    bio: "Experienced mentor with a passion for helping entrepreneurs succeed.",
    verificationStatus: "pending",
    availability: [],
    ...overrides,
  };
}

export function makeMentorSession(overrides?: Partial<{ mentorId: mongoose.Types.ObjectId; menteeId: mongoose.Types.ObjectId; status: string; scheduledAt?: Date; meetingLink?: string; notes: string; messages: { senderId: mongoose.Types.ObjectId; body: string; createdAt: Date }[] }>) {
  return {
    mentorId: new mongoose.Types.ObjectId(),
    menteeId: new mongoose.Types.ObjectId(),
    status: "requested",
    notes: "",
    messages: [],
    ...overrides,
  };
}

export function makeNotification(overrides?: Partial<{ userId: mongoose.Types.ObjectId; type: string; message: string; read: boolean }>) {
  return {
    userId: new mongoose.Types.ObjectId(),
    type: "general",
    message: "Test notification",
    read: false,
    ...overrides,
  };
}

export function makeAuditLog(overrides?: Partial<{ actorId: mongoose.Types.ObjectId; action: string; targetUserId: mongoose.Types.ObjectId; reason: string }>) {
  return {
    actorId: new mongoose.Types.ObjectId(),
    action: "test_action",
    targetUserId: new mongoose.Types.ObjectId(),
    reason: "test",
    ...overrides,
  };
}
