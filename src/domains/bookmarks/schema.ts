import { z } from "zod";

export const bookmarkSchema = z.object({
  targetType: z.enum(["idea", "resource"]),
  targetId: z.string(),
});

export type BookmarkInput = z.infer<typeof bookmarkSchema>;
