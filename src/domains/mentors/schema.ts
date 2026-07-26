import { z } from "zod";

export const mentorRegistrationSchema = z.object({
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  expertiseAreas: z.array(z.string()).min(1, "At least one expertise area is required"),
  yearsExperience: z.number().int().nonnegative("Years of experience must be non-negative"),
  availability: z.array(
    z.object({
      day: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    })
  ).optional().default([]),
  supportingLinks: z.array(z.string().url()).optional().default([]),
});

export const mentorProfileUpdateSchema = z.object({
  bio: z.string().min(50).optional(),
  expertiseAreas: z.array(z.string()).min(1).optional(),
  yearsExperience: z.number().int().nonnegative().optional(),
  availability: z.array(
    z.object({
      day: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    })
  ).optional(),
});

export const sessionRequestSchema = z.object({
  mentorId: z.string(),
  notes: z.string().optional().default(""),
});

export const sessionUpdateSchema = z.object({
  status: z.enum(["requested", "confirmed", "completed", "cancelled"]),
  scheduledAt: z.string().datetime().optional(),
  notes: z.string().optional(),
});

export const mentorApplicationSchema = z.object({
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  expertiseAreas: z.array(z.string()).min(1, "At least one expertise area is required"),
  yearsExperience: z.number().int().nonnegative("Years of experience must be non-negative"),
  supportingLinks: z.array(z.string().url()).optional().default([]),
});

export type MentorRegistrationInput = z.infer<typeof mentorRegistrationSchema>;
export type MentorProfileUpdateInput = z.infer<typeof mentorProfileUpdateSchema>;
export type SessionRequestInput = z.infer<typeof sessionRequestSchema>;
export type SessionUpdateInput = z.infer<typeof sessionUpdateSchema>;
export type MentorApplicationInput = z.infer<typeof mentorApplicationSchema>;
