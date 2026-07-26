import { notFound } from "next/navigation";
import Link from "next/link";
import { getRoadmap } from "@/data/mock-roadmaps";
import RoadmapClient from "./roadmap-client";
import { ArrowLeft, Clock, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function RoadmapPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const roadmap = getRoadmap(id);

  if (!roadmap) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/roadmaps" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="size-4 mr-1" /> Back to My Roadmaps
      </Link>

      <div className="bg-muted/30 border rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant={roadmap.difficulty === "Beginner" ? "default" : roadmap.difficulty === "Intermediate" ? "secondary" : "outline"}>
            {roadmap.difficulty}
          </Badge>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
            <Clock className="size-4" /> {roadmap.estimatedDuration}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
            <BarChart className="size-4" /> {roadmap.steps.length} Milestones
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">{roadmap.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          {roadmap.overview}
        </p>
      </div>

      <RoadmapClient roadmapId={roadmap.id} steps={roadmap.steps} />
    </div>
  );
}
