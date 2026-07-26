import { notificationPreferencesSchema } from "@/domains/notifications/schema";

describe("notificationPreferencesSchema", () => {
  it("accepts valid input", () => {
    const result = notificationPreferencesSchema.safeParse({
      roadmapNudges: true,
      contentAlerts: true,
      mentorReplies: true,
      sessionUpdates: true,
    });
    expect(result.success).toBe(true);
  });

  it("defaults all values to true", () => {
    const result = notificationPreferencesSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.roadmapNudges).toBe(true);
      expect(result.data.contentAlerts).toBe(true);
      expect(result.data.mentorReplies).toBe(true);
      expect(result.data.sessionUpdates).toBe(true);
    }
  });
});
