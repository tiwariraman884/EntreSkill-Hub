import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";
import { Skill, BusinessIdea, Roadmap, LearningResource, MentorProfile, User } from "@/models";

const seed = async () => {
  await connectToDatabase();

  const skills = await Skill.insertMany([
    { name: "Digital Marketing", category: "Marketing" },
    { name: "Web Development", category: "Technology" },
    { name: "Financial Planning", category: "Finance" },
    { name: "Supply Chain", category: "Operations" },
    { name: "Product Design", category: "Design" },
  ]);

  const user = await User.create({
    name: "Test User",
    email: "test-user@example.com",
    passwordHash: "stub",
    role: "user",
    skills: [skills[1]._id],
    interests: ["technology"],
    location: { state: "Karnataka", district: "Bengaluru", isRural: false },
  });

  const mentor = await User.create({
    name: "Test Mentor",
    email: "test-mentor@example.com",
    passwordHash: "stub",
    role: "mentor",
    skills: [skills[0]._id],
    interests: ["marketing"],
    location: { state: "Maharashtra", district: "Mumbai", isRural: false },
  });

  const mentorProfile = await MentorProfile.create({
    userId: mentor._id,
    expertiseAreas: [skills[0]._id],
    yearsExperience: 10,
    bio: "Mentor with extensive experience in digital marketing.",
    verificationStatus: "verified",
    availability: [
      { day: "Monday", startTime: "09:00", endTime: "17:00" },
    ],
  });

  const idea = await BusinessIdea.create({
    title: "Local Delivery Service",
    description: "Hyperlocal delivery platform for rural areas.",
    relatedSkills: [skills[3]._id],
    difficultyLevel: "intermediate",
    estimatedStartupCostINR: { min: 50000, max: 200000 },
    isActive: true,
  });

  const roadmap = await Roadmap.create({
    title: "Local Delivery Roadmap",
    businessIdeaId: idea._id,
    steps: [],
  });

  const resource1 = await LearningResource.create({
    title: "How to Start a Delivery Business",
    type: "article",
    url: "https://example.com/delivery-business",
    uploadedBy: mentor._id,
    approvalStatus: "approved",
    tags: ["logistics", "startup"],
  });

  const resource2 = await LearningResource.create({
    title: "Marketing for Local Businesses",
    type: "video",
    url: "https://example.com/marketing-local",
    uploadedBy: mentor._id,
    approvalStatus: "pending",
    tags: ["marketing"],
  });

  console.log("Seed data created:", {
    skills: skills.length,
    users: 2,
    mentorProfile: mentorProfile._id,
    ideas: 1,
    roadmaps: 1,
    resources: 2,
  });
};

seed()
  .then(() => {
    console.log("Seeding complete");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
