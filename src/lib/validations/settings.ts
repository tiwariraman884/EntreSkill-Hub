import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional().or(z.literal("")),
  headline: z.string().max(120, "Headline must be less than 120 characters").optional().or(z.literal("")),
  location: z.string().max(100, "Location must be less than 100 characters").optional().or(z.literal("")),
  college: z.string().max(100, "College name must be less than 100 characters").optional().or(z.literal("")),
  degree: z.string().max(100, "Degree must be less than 100 characters").optional().or(z.literal("")),
  department: z.string().max(100, "Department must be less than 100 characters").optional().or(z.literal("")),
  occupation: z.string().max(100, "Occupation must be less than 100 characters").optional().or(z.literal("")),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  github: z.string().url("Please enter a valid GitHub URL").optional().or(z.literal("")),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  twitter: z.string().url("Please enter a valid Twitter/X URL").optional().or(z.literal("")),
  portfolio: z.string().url("Please enter a valid portfolio URL").optional().or(z.literal("")),
  phone: z.string().max(20, "Phone number must be less than 20 characters").optional().or(z.literal("")),
  publicProfileUrl: z.string().max(50, "Username must be less than 50 characters").optional().or(z.literal("")),
  avatar: z.string().optional().or(z.literal("")),
});

export const accountSchema = z.object({
  language: z.string().min(1, "Language is required"),
  timezone: z.string().min(1, "Timezone is required"),
  country: z.string().max(100, "Country must be less than 100 characters").optional().or(z.literal("")),
  dateFormat: z.string().min(1, "Date format is required"),
  currency: z.string().min(1, "Currency is required"),
});

export const notificationSchema = z.object({
  email: z.boolean(),
  push: z.boolean(),
  mentorReminders: z.boolean(),
  learningReminders: z.boolean(),
  roadmapReminders: z.boolean(),
  achievementAlerts: z.boolean(),
  weeklySummary: z.boolean(),
  marketingEmails: z.boolean(),
  productUpdates: z.boolean(),
  securityAlerts: z.boolean(),
});

export const privacySchema = z.object({
  publicProfile: z.boolean(),
  showEmail: z.boolean(),
  showPhone: z.boolean(),
  showSkills: z.boolean(),
  showCertificates: z.boolean(),
  showRoadmaps: z.boolean(),
  showActivity: z.boolean(),
  allowIndexing: z.boolean(),
  allowMentorContact: z.boolean(),
  showIdeas: z.boolean(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters").max(100, "Password must be less than 100 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const emailChangeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  currentPassword: z.string().min(1, "Current password is required"),
});

export const deleteAccountSchema = z.object({
  confirmation: z.string(),
  password: z.string().min(1, "Password is required"),
});

export type ProfileInput = z.infer<typeof profileSchema>;
export type AccountInput = z.infer<typeof accountSchema>;
export type NotificationInput = z.infer<typeof notificationSchema>;
export type PrivacyInput = z.infer<typeof privacySchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type EmailChangeInput = z.infer<typeof emailChangeSchema>;
export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>;
