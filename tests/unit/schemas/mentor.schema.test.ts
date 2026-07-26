import { mentorRegistrationSchema, sessionRequestSchema, sessionUpdateSchema, mentorApplicationSchema } from "@/domains/mentors/schema";

describe("mentorRegistrationSchema", () => {
  it("accepts valid input", () => {
    const result = mentorRegistrationSchema.safeParse({
      bio: "I am an experienced mentor with a long bio that is definitely more than fifty characters.",
      expertiseAreas: ["tech", "business"],
      yearsExperience: 10,
      availability: [],
      supportingLinks: [],
    });
    expect(result.success).toBe(true);
  });

  it("rejects short bio", () => {
    const result = mentorRegistrationSchema.safeParse({
      bio: "Short",
      expertiseAreas: ["tech"],
      yearsExperience: 5,
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty expertiseAreas", () => {
    const result = mentorRegistrationSchema.safeParse({
      bio: "I am an experienced mentor with a long bio that is definitely more than fifty characters.",
      expertiseAreas: [],
      yearsExperience: 5,
    });
    expect(result.success).toBe(false);
  });
});

describe("sessionRequestSchema", () => {
  it("accepts valid input", () => {
    const result = sessionRequestSchema.safeParse({ mentorId: "mentor1", notes: "Hello" });
    expect(result.success).toBe(true);
  });

  it("defaults notes to empty string", () => {
    const result = sessionRequestSchema.safeParse({ mentorId: "mentor1" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.notes).toBe("");
    }
  });
});

describe("sessionUpdateSchema", () => {
  it("accepts valid status", () => {
    const result = sessionUpdateSchema.safeParse({ status: "confirmed" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid status", () => {
    const result = sessionUpdateSchema.safeParse({ status: "invalid" });
    expect(result.success).toBe(false);
  });
});

describe("mentorApplicationSchema", () => {
  it("accepts valid input", () => {
    const result = mentorApplicationSchema.safeParse({
      bio: "I am an experienced mentor with a long bio that is definitely more than fifty characters.",
      expertiseAreas: ["tech"],
      yearsExperience: 8,
      supportingLinks: ["https://example.com"],
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid supporting link", () => {
    const result = mentorApplicationSchema.safeParse({
      bio: "I am an experienced mentor with a long bio that is definitely more than fifty characters.",
      expertiseAreas: ["tech"],
      yearsExperience: 8,
      supportingLinks: ["not-a-url"],
    });
    expect(result.success).toBe(false);
  });
});
