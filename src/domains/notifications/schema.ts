import { z } from "zod";

export const notificationPreferencesSchema = z.object({
  roadmapNudges: z.boolean().default(true),
  contentAlerts: z.boolean().default(true),
  mentorReplies: z.boolean().default(true),
  sessionUpdates: z.boolean().default(true),
});

export type NotificationPreferencesInput = z.infer<typeof notificationPreferencesSchema>;
