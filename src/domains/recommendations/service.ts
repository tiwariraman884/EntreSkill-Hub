import { connectToDatabase } from "@/lib/mongoose";
import { User, BusinessIdea } from "@/models";

export interface ScoredIdea {
  _id: string;
  title: string;
  description: string;
  difficultyLevel: string;
  estimatedStartupCostINR: { min: number; max: number };
  roadmapId: string;
  score: number;
  matchReason: string;
}

function generateMatchReason(skills: number, interests: number, difficulty: string): string {
  const parts: string[] = [];
  if (skills > 0) parts.push(`matches ${skills} of your skills`);
  if (interests > 0) parts.push(`aligns with your interests`);
  parts.push(`${difficulty} difficulty`);
  return parts.join(", ");
}

export async function getRecommendations(userId: string): Promise<ScoredIdea[]> {
  await connectToDatabase();

  const user = await User.findById(userId);
  if (!user) {
    return [];
  }

    const userSkills = (user.skills as Array<{ toString(): string }>).map((id) => id.toString());
    const userInterests = (user.interests as string[]) || [];

    const ideas = await BusinessIdea.find({ isActive: true })
      .populate("relatedSkills")
      .limit(100);

    const scoredIdeas: ScoredIdea[] = ideas
      .map((idea) => {
        const relatedSkillIds = (idea.relatedSkills as Array<{ _id: { toString(): string } }>).map((s) => s._id.toString());
      const skillOverlap = relatedSkillIds.filter((id: string) => userSkills.includes(id)).length;
      const interestOverlap = userInterests.filter((interest: string) =>
        idea.title.toLowerCase().includes(interest.toLowerCase()) ||
        idea.description.toLowerCase().includes(interest.toLowerCase())
      ).length;

      const totalRelated = relatedSkillIds.length || 1;
      const score = (skillOverlap / totalRelated) * 60 + interestOverlap * 10 + (idea.difficultyLevel === "beginner" ? 20 : 10);

      return {
        _id: idea._id.toString(),
        title: idea.title,
        description: idea.description,
        difficultyLevel: idea.difficultyLevel,
        estimatedStartupCostINR: idea.estimatedStartupCostINR,
        roadmapId: idea.roadmapId.toString(),
        score,
        matchReason: generateMatchReason(skillOverlap, interestOverlap, idea.difficultyLevel),
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  if (scoredIdeas.length === 0) {
    const fallback = await BusinessIdea.find({ isActive: true, difficultyLevel: "beginner" }).limit(5);
    return fallback.map((idea) => ({
      _id: idea._id.toString(),
      title: idea.title,
      description: idea.description,
      difficultyLevel: idea.difficultyLevel,
      estimatedStartupCostINR: idea.estimatedStartupCostINR,
      roadmapId: idea.roadmapId.toString(),
      score: 0,
      matchReason: "Popular starting point",
    }));
  }

  return scoredIdeas;
}
