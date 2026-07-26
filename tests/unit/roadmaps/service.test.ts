import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";
import { UserProgress, Roadmap } from "@/models";

describe("roadmaps service", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterEach(async () => {
    await UserProgress.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("returns existing progress", async () => {
    const { getProgress } = await import("@/domains/roadmaps/service");
    const userId = new mongoose.Types.ObjectId().toString();

    const roadmap = await Roadmap.create({ title: "Test Roadmap", businessIdeaId: new mongoose.Types.ObjectId(), steps: [] });
    await UserProgress.create({
      userId,
      roadmapId: roadmap._id,
      completedStepIds: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
      startedAt: new Date(),
      lastActivityAt: new Date(),
      completionPercent: 20,
    });

    const progress = await getProgress(userId);
    expect(progress).toHaveLength(1);
    expect(progress[0].roadmapId).toBeTruthy();
    expect(progress[0].completionPercent).toBe(20);
  });

  it("returns empty array when no progress", async () => {
    const { getProgress } = await import("@/domains/roadmaps/service");
    const userId = new mongoose.Types.ObjectId().toString();
    const progress = await getProgress(userId);
    expect(progress).toEqual([]);
  });

  it("returns progress by roadmap", async () => {
    const { getProgressByRoadmap } = await import("@/domains/roadmaps/service");
    const userId = new mongoose.Types.ObjectId().toString();

    const roadmap = await Roadmap.create({ title: "Test Roadmap", businessIdeaId: new mongoose.Types.ObjectId(), steps: [] });
    await UserProgress.create({
      userId,
      roadmapId: roadmap._id,
      completedStepIds: [new mongoose.Types.ObjectId()],
      startedAt: new Date(),
      lastActivityAt: new Date(),
      completionPercent: 10,
    });

    const progress = await getProgressByRoadmap(userId, roadmap._id.toString());
    expect(progress).toBeTruthy();
    expect(progress?.completionPercent).toBe(10);
  });
});
