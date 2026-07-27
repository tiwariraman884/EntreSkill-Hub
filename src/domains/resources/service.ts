import { connectToDatabase } from "@/lib/mongoose";
import { LearningResource, Feedback } from "@/models";
import type { SortOrder } from "mongoose";

export async function getResources(options: {
  type?: string;
  tag?: string;
  q?: string;
  category?: string;
  difficulty?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  await connectToDatabase();
  const query: Record<string, unknown> = { approvalStatus: "approved" };
  const { type, tag, q, category, difficulty, sort, page = 1, limit = 20 } = options;

  if (type && type !== "all") query.type = type;
  if (category && category !== "all") query.category = category;
  if (difficulty && difficulty !== "all") query.difficulty = difficulty;
  if (tag) query.tags = { $in: [tag] };
  if (q) {
    query.$or = [
      { title: { $regex: q, $options: "i" } },
      { instructor: { $regex: q, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;
  let sortOption: Record<string, SortOrder> = { createdAt: -1 };
  
  if (sort === "popular") sortOption = { views: -1 };
  else if (sort === "rating") sortOption = { rating: -1 };
  else if (sort === "newest") sortOption = { createdAt: -1 };
  else if (sort === "alphabetical") sortOption = { title: 1 };

  const [data, total] = await Promise.all([
    LearningResource.find(query)
      .populate("uploadedBy", "name")
      .sort(sortOption)
      .skip(skip)
      .limit(limit),
    LearningResource.countDocuments(query),
  ]);

  return { data, total, page, limit };
}

export async function createResource(data: { title: string; type: string; url: string; tags: string[]; uploadedBy: string }) {
  await connectToDatabase();
  return LearningResource.create({
    ...data,
    approvalStatus: "pending",
  });
}

export async function updateResourceStatus(id: string, status: "approved" | "rejected") {
  await connectToDatabase();
  const resource = await LearningResource.findById(id);
  if (!resource) throw new Error("Resource not found");
  resource.approvalStatus = status;
  await resource.save();
  return resource;
}

export async function createResourceFeedback(data: {
  resourceId: string;
  submittedBy: string;
  rating: number;
  comment: string;
}) {
  await connectToDatabase();
  return Feedback.create({
    targetType: "resource",
    targetId: data.resourceId,
    submittedBy: data.submittedBy,
    rating: data.rating,
    comment: data.comment,
  });
}