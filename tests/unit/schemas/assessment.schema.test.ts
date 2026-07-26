import { assessmentSubmitSchema } from "@/domains/assessment/schema";

describe("assessmentSubmitSchema", () => {
  it("accepts valid input", () => {
    const result = assessmentSubmitSchema.safeParse({
      skills: [{ id: "tailoring", label: "Tailoring", category: "Handicraft" }],
      interests: [{ id: "online", label: "Selling online" }],
      experience: [{ skillId: "tailoring", level: "beginner" }],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
      timeCommitment: "part-time",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty skills array", () => {
    const result = assessmentSubmitSchema.safeParse({
      skills: [],
      interests: [{ id: "online", label: "Selling online" }],
      experience: [],
      location: { state: "Karnataka", isRural: false },
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("skills");
    }
  });

  it("rejects invalid timeCommitment enum", () => {
    const result = assessmentSubmitSchema.safeParse({
      skills: [{ id: "tailoring", label: "Tailoring", category: "Handicraft" }],
      interests: [{ id: "online", label: "Selling online" }],
      experience: [],
      location: { state: "Karnataka", isRural: false },
      timeCommitment: "invalid",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("timeCommitment");
    }
  });

  it("defaults timeCommitment to part-time", () => {
    const result = assessmentSubmitSchema.safeParse({
      skills: [{ id: "tailoring", label: "Tailoring", category: "Handicraft" }],
      interests: [{ id: "online", label: "Selling online" }],
      experience: [],
      location: { state: "Karnataka", isRural: false },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.timeCommitment).toBe("part-time");
    }
  });
});
