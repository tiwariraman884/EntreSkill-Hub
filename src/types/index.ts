export type UserRole = "user" | "mentor" | "admin";

export type VerificationStatus = "pending" | "verified" | "rejected";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export type RoadmapStepType =
  | "validation"
  | "skills_tools"
  | "legal_registration"
  | "cost_estimation"
  | "marketing_basics";

export type MentorSessionStatus = "requested" | "confirmed" | "completed" | "cancelled";

export type FeedbackTargetType = "resource" | "mentor" | "roadmap" | "platform";

export interface Location {
  state: string;
  district: string;
  isRural: boolean;
}

export interface AvailabilityWindow {
  day: string;
  startTime: string;
  endTime: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  passwordHash: string | null;
  role: UserRole;
  skills: string[];
  interests: string[];
  location: Location;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
}

export interface BusinessIdea {
  _id: string;
  title: string;
  description: string;
  relatedSkills: string[];
  difficultyLevel: "beginner" | "intermediate" | "advanced";
  estimatedStartupCostINR: { min: number; max: number };
  roadmapId: string;
  isActive: boolean;
}

export interface Roadmap {
  _id: string;
  businessIdeaId: string;
  title: string;
  steps: string[];
}

export interface RoadmapStep {
  _id: string;
  roadmapId: string;
  order: number;
  type: RoadmapStepType;
  title: string;
  content: string;
  resourceIds: string[];
}

export interface LearningResource {
  _id: string;
  title: string;
  type: "video" | "article" | "checklist";
  url: string;
  uploadedBy: string;
  approvalStatus: ApprovalStatus;
  tags: string[];
}

export interface MentorProfile {
  _id: string;
  userId: string;
  expertiseAreas: string[];
  yearsExperience: number;
  bio: string;
  verificationStatus: VerificationStatus;
  availability: AvailabilityWindow[];
}

export interface UserProgress {
  _id: string;
  userId: string;
  roadmapId: string;
  completedStepIds: string[];
  startedAt: Date;
  lastActivityAt: Date;
  completionPercent: number;
}

export interface MentorSession {
  _id: string;
  mentorId: string;
  menteeId: string;
  status: MentorSessionStatus;
  scheduledAt: Date;
  notes: string;
}

export interface Feedback {
  _id: string;
  submittedBy: string;
  targetType: FeedbackTargetType;
  targetId: string | null;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Notification {
  _id: string;
  userId: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface AuditLog {
  _id: string;
  actorId: string;
  action: string;
  targetUserId: string;
  reason: string;
  timestamp: Date;
}
