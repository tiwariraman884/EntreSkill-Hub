import { connectToDatabase } from "@/lib/mongoose";
import { Skill, BusinessIdea, Roadmap, User } from "@/models";

const seed = async () => {
  await connectToDatabase();

  const existingSkills = await Skill.countDocuments();
  if (existingSkills > 0) {
    console.log("Production seed already populated.");
    process.exit(0);
  }

  const skills = await Skill.insertMany([
    { name: "AgriTech", category: "Agriculture" },
    { name: "Handicrafts E-commerce", category: "Retail" },
    { name: "Rural Education Tech", category: "EdTech" },
    { name: "Renewable Energy Services", category: "Energy" },
    { name: "Healthcare Access", category: "Health" },
  ]);

  const admin = await User.findOneAndUpdate(
    { email: "admin@entreskillhub.com" },
    {
      name: "Platform Admin",
      email: "admin@entreskillhub.com",
      passwordHash: "stub",
      role: "admin",
      skills: [],
      interests: [],
      location: { state: "", district: "", isRural: false },
    },
    { upsert: true, new: true }
  );

  const ideas = await BusinessIdea.insertMany([
    {
      title: "Village Produce Marketplace",
      description: "Online marketplace connecting farmers directly to urban consumers.",
      relatedSkills: [skills[0]._id, skills[1]._id],
      difficultyLevel: "intermediate",
      estimatedStartupCostINR: { min: 100000, max: 500000 },
      isActive: true,
    },
    {
      title: "Solar Maintenance Service",
      description: "Affordable maintenance and installation services for rural solar systems.",
      relatedSkills: [skills[3]._id],
      difficultyLevel: "beginner",
      estimatedStartupCostINR: { min: 50000, max: 200000 },
      isActive: true,
    },
    {
      title: "Remote Tutoring for Rural Students",
      description: "Low-bandwidth live tutoring platform for government schools.",
      relatedSkills: [skills[2]._id, skills[4]._id],
      difficultyLevel: "advanced",
      estimatedStartupCostINR: { min: 200000, max: 800000 },
      isActive: true,
    },
  ]);

  for (const idea of ideas) {
    await Roadmap.create({
      title: `${idea.title} Roadmap`,
      businessIdeaId: idea._id,
      steps: [],
    });
  }

  console.log("Production seed complete:", {
    skills: skills.length,
    adminUserId: admin._id,
    ideas: ideas.length,
  });
};

seed()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
