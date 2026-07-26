import { z } from "zod";

export const resourceCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["video", "article", "checklist"]),
  url: z.string().url("Invalid URL"),
  tags: z.array(z.string()).optional().default([]),
});

export const resourceUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  type: z.enum(["video", "article", "checklist"]).optional(),
  url: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
});

export type ResourceCreateInput = z.infer<typeof resourceCreateSchema>;
export type ResourceUpdateInput = z.infer<typeof resourceUpdateSchema>;
