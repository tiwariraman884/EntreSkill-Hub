import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";
import { User, BusinessIdea, Skill } from "@/models";

describe("recommendations service", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterEach(async () => {
    await User.deleteMany({});
    await BusinessIdea.deleteMany({});
    await Skill.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("returns fallback when no user skills match", async () => {
    const { getRecommendations } = await import("@/domains/recommendations/service");

    const user = await User.create({
      name: "Rec User",
      email: "rec-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    await BusinessIdea.create({
      title: "Beginner Idea",
      description: "Easy to start",
      relatedSkills: [],
      difficultyLevel: "beginner",
      estimatedStartupCostINR: { min: 1000, max: 5000 },
      roadmapId: new mongoose.Types.ObjectId(),
      isActive: true,
    });

    const recommendations = await getRecommendations(user._id.toString());
    expect(recommendations.length).toBeGreaterThanOrEqual(1);
    expect(recommendations[0].matchReason).toContain("beginner difficulty");
  });

  it("returns empty for non-existent user", async () => {
    const { getRecommendations } = await import("@/domains/recommendations/service");
    const fakeId = new mongoose.Types.ObjectId().toString();
    const recommendations = await getRecommendations(fakeId);
    expect(recommendations).toEqual([]);
  });

  it("scores ideas by skill overlap and sorts", async () => {
    const { getRecommendations } = await import("@/domains/recommendations/service");

    const skill = await Skill.create({ name: "Tech", category: "Tech" });

    const user = await User.create({
      name: "Scored User",
      email: "scored-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "user",
      skills: [skill._id],
      interests: ["technology"],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    await BusinessIdea.create({
      title: "Tech Business",
      description: "Technology related business",
      relatedSkills: [skill._id],
      difficultyLevel: "intermediate",
      estimatedStartupCostINR: { min: 1000, max: 5000 },
      roadmapId: new mongoose.Types.ObjectId(),
      isActive: true,
    });

    await BusinessIdea.create({
      title: "Finance Business",
      description: "Finance related business",
      relatedSkills: [],
      difficultyLevel: "beginner",
      estimatedStartupCostINR: { min: 1000, max: 5000 },
      roadmapId: new mongoose.Types.ObjectId(),
      isActive: true,
    });

    const recommendations = await getRecommendations(user._id.toString());
    expect(recommendations.length).toBeGreaterThanOrEqual(1);
    expect(recommendations[0].score).toBeGreaterThan(0);
    expect(recommendations[0].title).toBe("Tech Business");
  });
});
