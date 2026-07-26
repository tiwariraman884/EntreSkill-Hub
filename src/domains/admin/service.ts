import { connectToDatabase } from "@/lib/mongoose";
import { User, BusinessIdea, LearningResource, MentorProfile } from "@/models";

export async function getAllUsers(filters?: { role?: string; verified?: boolean }) {
  await connectToDatabase();
  const query: Record<string, unknown> = {};
  if (filters?.role) query.role = filters.role;
  return User.find(query).sort({ createdAt: -1 }).limit(100);
}

export async function suspendUser(userId: string) {
  await connectToDatabase();
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  user.role = "suspended";
  await user.save();
  return user;
}

export async function verifyMentor(userId: string, status: "verified" | "rejected") {
  await connectToDatabase();
  const profile = await MentorProfile.findOne({ userId });
  if (!profile) throw new Error("Mentor profile not found");
  profile.verificationStatus = status;
  await profile.save();
  return profile;
}

export async function getPendingResources() {
  await connectToDatabase();
  return LearningResource.find({ approvalStatus: "pending" })
    .populate("uploadedBy", "name email")
    .sort({ createdAt: 1 })
    .limit(50);
}

export async function approveResource(id: string, status: "approved" | "rejected") {
  await connectToDatabase();
  const resource = await LearningResource.findById(id);
  if (!resource) throw new Error("Resource not found");
  resource.approvalStatus = status;
  await resource.save();
  return resource;
}

export async function getAnalytics() {
  await connectToDatabase();
  const totalUsers = await User.countDocuments();
  const totalIdeas = await BusinessIdea.countDocuments({ isActive: true });
  const totalResources = await LearningResource.countDocuments({ approvalStatus: "approved" });
  const totalMentors = await MentorProfile.countDocuments({ verificationStatus: "verified" });
  
  return {
    totalUsers,
    totalIdeas,
    totalResources,
    totalMentors,
  };
}
