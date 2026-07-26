import { z } from "zod";

const baseSkillSchema = z.object({
  id: z.string(),
  label: z.string(),
  category: z.string(),
});

const baseInterestSchema = z.object({
  id: z.string(),
  label: z.string(),
});

const baseExperienceSchema = z.object({
  skillId: z.string(),
  level: z.enum(["beginner", "intermediate", "advanced"]),
});

const locationSchema = z.object({
  state: z.string().min(1, "State is required"),
  district: z.string().optional(),
  isRural: z.boolean().default(false),
});

export const assessmentSubmitSchema = z.object({
  skills: z.array(baseSkillSchema).min(1, "Please select at least one skill"),
  interests: z.array(baseInterestSchema).min(1, "Please select at least one interest"),
  experience: z.array(baseExperienceSchema),
  location: locationSchema,
  timeCommitment: z.enum(["part-time", "full-time"]).default("part-time"),
});

export type AssessmentInput = z.infer<typeof assessmentSubmitSchema>;
export type SkillInput = z.infer<typeof baseSkillSchema>;
export type InterestInput = z.infer<typeof baseInterestSchema>;
export type ExperienceInput = z.infer<typeof baseExperienceSchema>;

export const AVAILABLE_SKILLS = [
  { id: "tailoring", label: "Tailoring & Sewing", category: "Handicraft" },
  { id: "embroidery", label: "Embroidery", category: "Handicraft" },
  { id: "jewelry", label: "Jewelry Making", category: "Handicraft" },
  { id: "pottery", label: "Pottery & Clay Work", category: "Handicraft" },
  { id: "woodwork", label: "Woodwork & Carpentry", category: "Handicraft" },
  { id: "baking", label: "Baking & Cooking", category: "Food" },
  { id: "pickles", label: "Pickles & Preserves", category: "Food" },
  { id: "catering", label: "Catering", category: "Food" },
  { id: "graphic-design", label: "Graphic Design", category: "Digital" },
  { id: "content-writing", label: "Content Writing", category: "Digital" },
  { id: "social-media", label: "Social Media Management", category: "Digital" },
  { id: "web-design", label: "Web Design", category: "Digital" },
  { id: "mobile-repair", label: "Mobile Repair", category: "Repair" },
  { id: "electronics", label: "Electronics Repair", category: "Repair" },
  { id: "tailoring-alterations", label: "Alterations & Stitching", category: "Handicraft" },
] as const;

export const AVAILABLE_INTERESTS = [
  "Starting a small shop",
  "Selling online",
  "Providing home services",
  "Freelancing remotely",
  "Teaching others",
  "Exporting products",
] as const;
