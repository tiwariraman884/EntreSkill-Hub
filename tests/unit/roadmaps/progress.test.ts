import { markStepComplete, unmarkStepComplete } from "@/domains/roadmaps/service";
import mongoose from "mongoose";

describe("markStepComplete", () => {
  it("creates progress with 10% for first step", async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const roadmapId = new mongoose.Types.ObjectId().toString();
    const stepId = new mongoose.Types.ObjectId().toString();

    const progress = await markStepComplete(userId, roadmapId, stepId);
    expect(progress.completedStepIds.map(String)).toContain(stepId);
    expect(progress.completionPercent).toBe(10);
  });

  it("is idempotent on duplicate completion", async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const roadmapId = new mongoose.Types.ObjectId().toString();
    const stepId = new mongoose.Types.ObjectId().toString();

    await markStepComplete(userId, roadmapId, stepId);
    const again = await markStepComplete(userId, roadmapId, stepId);
    expect(again.completedStepIds.map(String).length).toBe(1);
  });

  it("increments completion percent with new steps", async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const roadmapId = new mongoose.Types.ObjectId().toString();
    const stepId1 = new mongoose.Types.ObjectId().toString();
    const stepId2 = new mongoose.Types.ObjectId().toString();

    await markStepComplete(userId, roadmapId, stepId1);
    const next = await markStepComplete(userId, roadmapId, stepId2);
    expect(next.completedStepIds.map(String).length).toBe(2);
    expect(next.completionPercent).toBe(20);
  });
});

describe("unmarkStepComplete", () => {
  it("removes a completed step", async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const roadmapId = new mongoose.Types.ObjectId().toString();
    const stepId1 = new mongoose.Types.ObjectId().toString();
    const stepId2 = new mongoose.Types.ObjectId().toString();

    await markStepComplete(userId, roadmapId, stepId1);
    await markStepComplete(userId, roadmapId, stepId2);
    const updated = await unmarkStepComplete(userId, roadmapId, stepId1);
    expect(updated?.completedStepIds.map(String)).not.toContain(stepId1);
    expect(updated?.completionPercent).toBe(10);
  });

  it("returns null when no progress exists", async () => {
    const userId = new mongoose.Types.ObjectId().toString();
    const roadmapId = new mongoose.Types.ObjectId().toString();
    const stepId = new mongoose.Types.ObjectId().toString();

    const result = await unmarkStepComplete(userId, roadmapId, stepId);
    expect(result).toBeNull();
  });
});
