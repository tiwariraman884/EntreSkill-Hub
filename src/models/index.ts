import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: false },
  role: { type: String, enum: ["user", "mentor", "admin", "suspended"], default: "user", required: true },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  interests: [{ type: String, required: true }],
  location: {
    state: { type: String, default: "" },
    district: { type: String, default: "" },
    isRural: { type: Boolean, default: false },
  },
  emailVerified: { type: Date, required: false },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: Date, required: false },
  bookmarks: [{
    targetType: { type: String, enum: ["idea", "resource"], required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true }
  }],
  profile: {
    avatar: { type: String, default: "" },
    coverPhoto: { type: String, default: "" },
    bio: { type: String, default: "", maxlength: 500 },
    headline: { type: String, default: "", maxlength: 120 },
    location: { type: String, default: "" },
    college: { type: String, default: "" },
    degree: { type: String, default: "" },
    department: { type: String, default: "" },
    occupation: { type: String, default: "" },
    website: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    phone: { type: String, default: "" },
    publicProfileUrl: { type: String, default: "", unique: true, sparse: true },
  },
  preferences: {
    language: { type: String, default: "en" },
    timezone: { type: String, default: "Asia/Kolkata" },
    country: { type: String, default: "" },
    dateFormat: { type: String, default: "MM/DD/YYYY" },
    currency: { type: String, default: "INR" },
  },
  notifications: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true },
    mentorReminders: { type: Boolean, default: true },
    learningReminders: { type: Boolean, default: true },
    roadmapReminders: { type: Boolean, default: true },
    achievementAlerts: { type: Boolean, default: true },
    weeklySummary: { type: Boolean, default: true },
    marketingEmails: { type: Boolean, default: false },
    productUpdates: { type: Boolean, default: true },
    securityAlerts: { type: Boolean, default: true },
  },
  privacy: {
    publicProfile: { type: Boolean, default: true },
    showEmail: { type: Boolean, default: false },
    showPhone: { type: Boolean, default: false },
    showSkills: { type: Boolean, default: true },
    showCertificates: { type: Boolean, default: true },
    showRoadmaps: { type: Boolean, default: true },
    showActivity: { type: Boolean, default: true },
    allowIndexing: { type: Boolean, default: true },
    allowMentorContact: { type: Boolean, default: true },
    showIdeas: { type: Boolean, default: true },
  },
  appearance: {
    theme: { type: String, enum: ["light", "dark", "system"], default: "system" },
    accentColor: { type: String, default: "indigo" },
    fontSize: { type: String, enum: ["small", "medium", "large", "xl"], default: "medium" },
    compactMode: { type: Boolean, default: false },
    highContrast: { type: Boolean, default: false },
    reducedMotion: { type: Boolean, default: false },
    borderRadius: { type: String, enum: ["rounded", "modern", "sharp"], default: "modern" },
    cardDensity: { type: String, enum: ["comfortable", "compact"], default: "comfortable" },
  },
  security: {
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String, default: "" },
    recoveryCodes: [{ type: String }],
    lastPasswordChange: { type: Date, default: Date.now },
  },
  accountStatus: {
    isActive: { type: Boolean, default: true },
    deactivatedAt: { type: Date, default: null },
    deletionScheduledAt: { type: Date, default: null },
  },
}, { timestamps: true });

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  category: { type: String, required: true, trim: true },
}, { timestamps: true });

const businessIdeaSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  relatedSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  difficultyLevel: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },
  estimatedStartupCostINR: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  roadmapId: { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap", required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const roadmapStepSchema = new mongoose.Schema({
  roadmapId: { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap", required: true },
  order: { type: Number, required: true },
  type: {
    type: String,
    enum: ["validation", "skills_tools", "legal_registration", "cost_estimation", "marketing_basics"],
    required: true,
  },
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  resourceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "LearningResource" }],
}, { timestamps: false });

const roadmapSchema = new mongoose.Schema({
  businessIdeaId: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessIdea", required: true, unique: true },
  title: { type: String, required: true, trim: true },
  steps: [{ type: mongoose.Schema.Types.ObjectId, ref: "RoadmapStep" }],
}, { timestamps: true });

const learningResourceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  thumbnail: { type: String, trim: true },
  type: { type: String, enum: ["video", "article", "checklist"], required: true },
  category: { type: String, trim: true },
  difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
  duration: { type: String, trim: true }, // e.g., "15 mins", "1.5 hours"
  instructor: { type: String, trim: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  views: { type: Number, default: 0, min: 0 },
  url: { type: String }, // For video links or external resources
  content: { type: String }, // Markdown content for articles
  tasks: [{ type: String }], // Array of strings for checklist items
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  approvalStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
    required: true,
  },
  tags: [{ type: String, trim: true }],
}, { timestamps: true });

const learningProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: "LearningResource", required: true },
  completedTasks: [{ type: String }], // Which checklist items the user completed
  progressPercent: { type: Number, default: 0, min: 0, max: 100 },
  isCompleted: { type: Boolean, default: false },
  lastViewedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Ensure a user can only have one progress record per resource
learningProgressSchema.index({ userId: 1, resourceId: 1 }, { unique: true });

const mentorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  expertiseAreas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  yearsExperience: { type: Number, required: true, min: 0 },
  bio: { type: String, required: true },
  verificationStatus: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
    required: true,
  },
  availability: [{
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  }],
}, { timestamps: true });

const userProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roadmapId: { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap", required: true },
  completedStepIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "RoadmapStep" }],
  startedAt: { type: Date, required: true, default: Date.now },
  lastActivityAt: { type: Date, required: true, default: Date.now },
  completionPercent: { type: Number, default: 0, min: 0, max: 100 },
}, { timestamps: true });

const mentorSessionSchema = new mongoose.Schema({
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  menteeId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["requested", "confirmed", "completed", "cancelled"],
    default: "requested",
    required: true,
  },
  scheduledAt: { type: Date, required: false },
  meetingLink: { type: String, required: false },
  notes: { type: String, required: true, default: "" },
  messages: [{
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true }
  }],
}, { timestamps: true });

const feedbackSchema = new mongoose.Schema({
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  targetType: {
    type: String,
    enum: ["resource", "mentor", "roadmap", "platform"],
    required: true,
  },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: false },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, { timestamps: true });

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false, required: true },
}, { timestamps: true });

const auditLogSchema = new mongoose.Schema({
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reason: { type: String, required: true, default: "" },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Skill = mongoose.models.Skill || mongoose.model("Skill", skillSchema);
export const BusinessIdea = mongoose.models.BusinessIdea || mongoose.model("BusinessIdea", businessIdeaSchema);
export const Roadmap = mongoose.models.Roadmap || mongoose.model("Roadmap", roadmapSchema);
export const RoadmapStep = mongoose.models.RoadmapStep || mongoose.model("RoadmapStep", roadmapStepSchema);
export const LearningResource = mongoose.models.LearningResource || mongoose.model("LearningResource", learningResourceSchema);
export const LearningProgress = mongoose.models.LearningProgress || mongoose.model("LearningProgress", learningProgressSchema);
export const MentorProfile = mongoose.models.MentorProfile || mongoose.model("MentorProfile", mentorProfileSchema);
export const UserProgress = mongoose.models.UserProgress || mongoose.model("UserProgress", userProgressSchema);
export const MentorSession = mongoose.models.MentorSession || mongoose.model("MentorSession", mentorSessionSchema);
export const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
export const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
export const AuditLog = mongoose.models.AuditLog || mongoose.model("AuditLog", auditLogSchema);
