import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MOCK_ROADMAPS, Roadmap, RoadmapStep } from "@/data/mock-roadmaps";
import { Map, Clock, Target, ArrowRight, PlayCircle, CheckCircle2, Trophy } from "lucide-react";

export default function RoadmapsDashboard() {
  const activeRoadmaps = MOCK_ROADMAPS.filter(r => r.progressPercent < 100);
  const completedRoadmaps = MOCK_ROADMAPS.filter(r => r.progressPercent === 100);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3 flex items-center gap-3">
            <Map className="size-8 text-primary" /> My Roadmaps
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your progress and continue building your businesses.
          </p>
        </div>
        <Link href="/ideas">
          <Button variant="outline">Explore New Ideas</Button>
        </Link>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
            <PlayCircle className="size-5 text-primary" /> Active Roadmaps
          </h2>
          {activeRoadmaps.length === 0 ? (
            <div className="text-center py-16 border rounded-xl bg-muted/20">
              <Map className="size-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground font-medium text-lg mb-2">No active roadmaps</p>
              <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">You haven&apos;t started any business roadmaps yet. Find an idea you love and get your personalized plan.</p>
              <Link href="/ideas">
                <Button>Browse Business Ideas</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeRoadmaps.map(roadmap => (
                <RoadmapCard key={roadmap.id} roadmap={roadmap} />
              ))}
            </div>
          )}
        </section>

        {completedRoadmaps.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
              <Trophy className="size-5 text-amber-500" /> Completed
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedRoadmaps.map(roadmap => (
                <RoadmapCard key={roadmap.id} roadmap={roadmap} isCompleted />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function RoadmapCard({ roadmap, isCompleted = false }: { roadmap: Roadmap, isCompleted?: boolean }) {
  const currentStep = roadmap.steps.find((s: RoadmapStep) => s.status === "Current") || roadmap.steps[0];
  const completedSteps = roadmap.steps.filter((s: RoadmapStep) => s.status === "Completed").length;
  const totalSteps = roadmap.steps.length;

  return (
    <Card className={`flex flex-col h-full hover:shadow-md transition-shadow ${isCompleted ? 'bg-muted/30 border-dashed' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant={roadmap.difficulty === "Beginner" ? "default" : roadmap.difficulty === "Intermediate" ? "secondary" : "outline"}>
            {roadmap.difficulty}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
            <Clock className="size-3" /> {roadmap.estimatedDuration}
          </span>
        </div>
        <CardTitle className="text-xl">{roadmap.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 space-y-6">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {roadmap.overview}
        </p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className={isCompleted ? "text-amber-600" : "text-primary"}>
              {isCompleted ? "Completed" : "Progress"}
            </span>
            <span>{roadmap.progressPercent}%</span>
          </div>
          <Progress value={roadmap.progressPercent} className={`h-2 ${isCompleted ? '[&>div]:bg-amber-500' : ''}`} />
          <p className="text-xs text-muted-foreground text-right">
            {completedSteps} of {totalSteps} milestones completed
          </p>
        </div>

        {!isCompleted && currentStep && (
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 flex items-start gap-3">
            <Target className="size-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Current Milestone</p>
              <p className="text-sm font-medium text-foreground">{currentStep.title}</p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Link href={`/roadmaps/${roadmap.id}`} className="w-full">
          <Button className={`w-full group ${isCompleted ? 'bg-background text-foreground border shadow-none hover:bg-muted' : ''}`}>
            {isCompleted ? (
              <>Review Roadmap <CheckCircle2 className="ml-2 size-4 text-amber-500" /></>
            ) : (
              <>Resume Roadmap <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" /></>
            )}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
