import { z } from "zod";

export const businessIdeaSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  relatedSkills: z.array(z.string()).min(1, "At least one related skill is required"),
  difficultyLevel: z.enum(["beginner", "intermediate", "advanced"]),
  estimatedStartupCostINR: z.object({
    min: z.number().nonnegative(),
    max: z.number().nonnegative(),
  }),
  isActive: z.boolean().default(true),
});

export const roadmapStepSchema = z.object({
  order: z.number().int().nonnegative(),
  type: z.enum(["validation", "skills_tools", "legal_registration", "cost_estimation", "marketing_basics"]),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  resourceIds: z.array(z.string()).optional().default([]),
});

export const createRoadmapSchema = z.object({
  businessIdeaId: z.string(),
  title: z.string().min(1, "Title is required"),
  steps: z.array(roadmapStepSchema).min(1, "At least one step is required"),
});

export type BusinessIdeaInput = z.infer<typeof businessIdeaSchema>;
export type RoadmapStepInput = z.infer<typeof roadmapStepSchema>;
export type CreateRoadmapInput = z.infer<typeof createRoadmapSchema>;
