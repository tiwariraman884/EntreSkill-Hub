import { connectToDatabase } from "@/lib/mongoose";
import mongoose from "mongoose";
import { UserProgress } from "@/models";

export async function getProgress(userId: string) {
  await connectToDatabase();
  return UserProgress.find({ userId }).populate("roadmapId");
}

export async function getProgressByRoadmap(userId: string, roadmapId: string) {
  await connectToDatabase();
  return UserProgress.findOne({ userId, roadmapId });
}

export async function markStepComplete(userId: string, roadmapId: string, stepId: string) {
  await connectToDatabase();
  
  let progress = await UserProgress.findOne({ userId, roadmapId });
  
  if (!progress) {
    progress = await UserProgress.create({
      userId,
      roadmapId,
      completedStepIds: [stepId],
      startedAt: new Date(),
      lastActivityAt: new Date(),
      completionPercent: 10,
    });
  } else {
    if (!progress.completedStepIds.includes(stepId)) {
      progress.completedStepIds.push(stepId);
      progress.completionPercent = Math.min(progress.completedStepIds.length * 10, 100);
    }
    progress.lastActivityAt = new Date();
    await progress.save();
  }
  
  return progress;
}

export async function unmarkStepComplete(userId: string, roadmapId: string, stepId: string) {
  await connectToDatabase();
  
  const progress = await UserProgress.findOne({ userId, roadmapId });
  if (!progress) {
    return null;
  }
  
  progress.completedStepIds = progress.completedStepIds.filter((id: mongoose.Types.ObjectId) => id.toString() !== stepId);
  progress.completionPercent = Math.min(progress.completedStepIds.length * 10, 100);
  progress.lastActivityAt = new Date();
  await progress.save();
  
  return progress;
}
