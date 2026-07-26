import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models";

describe("recommendations service fallback", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterEach(async () => {
    await User.deleteMany({});
    await mongoose.models.BusinessIdea?.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("returns fallback when no active ideas exist", async () => {
    const { getRecommendations } = await import("@/domains/recommendations/service");

    const user = await User.create({
      name: "Fallback User",
      email: "fallback-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const recommendations = await getRecommendations(user._id.toString());
    expect(recommendations).toEqual([]);
  });
});
