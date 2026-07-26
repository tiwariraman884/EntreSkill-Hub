"use client";

import { useState } from "react";
import { Check, ChevronRight, PlayCircle, FileText, CheckSquare, Lock, ArrowRight, CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { RoadmapStep } from "@/data/mock-roadmaps";
import Link from "next/link";

interface RoadmapClientProps {
  roadmapId: string;
  steps: RoadmapStep[];
}

export default function RoadmapClient({ steps: initialSteps }: RoadmapClientProps) {
  // Using local state to simulate progress for demo purposes
  const [steps, setSteps] = useState<RoadmapStep[]>(initialSteps);
  const [expandedStepId, setExpandedStepId] = useState<string | null>(
    initialSteps.find(s => s.status === "Current")?.id || initialSteps[0]?.id || null
  );

  const completedSteps = steps.filter(s => s.status === "Completed").length;
  const totalSteps = steps.length;
  const completionPercent = Math.round((completedSteps / totalSteps) * 100) || 0;

  const handleToggleComplete = (stepId: string) => {
    setSteps(prev => {
      const newSteps = [...prev];
      const stepIndex = newSteps.findIndex(s => s.id === stepId);
      if (stepIndex === -1) return prev;

      const step = newSteps[stepIndex];
      const isCompleting = step.status !== "Completed";

      // Toggle status
      step.status = isCompleting ? "Completed" : "Current";

      // If completing, unlock the next step if it exists
      if (isCompleting && stepIndex + 1 < newSteps.length) {
        if (newSteps[stepIndex + 1].status === "Locked") {
          newSteps[stepIndex + 1].status = "Current";
          setExpandedStepId(newSteps[stepIndex + 1].id);
        }
      }

      toast.success(isCompleting ? "Milestone completed! 🎉" : "Milestone unmarked");
      return newSteps;
    });
  };

  const handleTaskToggle = (stepId: string, taskId: string) => {
    setSteps(prev => {
      const newSteps = [...prev];
      const step = newSteps.find(s => s.id === stepId);
      if (step) {
        const task = step.tasks.find(t => t.id === taskId);
        if (task) {
          task.completed = !task.completed;
        }
      }
      return newSteps;
    });
  };

  if (steps.length === 0) {
    return (
      <div className="border rounded-xl p-8 text-center">
        <p className="text-muted-foreground">This roadmap has no steps yet.</p>
      </div>
    );
  }

  const isFullyComplete = completedSteps === totalSteps && totalSteps > 0;

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">Roadmap Progress</span>
          <span className="text-sm font-semibold text-primary">{completionPercent}%</span>
        </div>
        <Progress value={completionPercent} className="h-3" />
      </div>

      <div className="space-y-4">
        {steps.map((step) => {
          const isExpanded = expandedStepId === step.id;
          const isCompleted = step.status === "Completed";
          const isCurrent = step.status === "Current";
          const isLocked = step.status === "Locked";

          return (
            <div 
              key={step.id} 
              className={cn(
                "border rounded-xl transition-all bg-background overflow-hidden",
                isExpanded ? "border-primary shadow-md" : "border-border hover:border-primary/50",
                isLocked ? "opacity-75 bg-muted/20" : ""
              )}
            >
              <div 
                className={cn(
                  "px-6 py-5 flex items-center justify-between cursor-pointer select-none",
                  isLocked && "cursor-not-allowed"
                )}
                onClick={() => {
                  if (isLocked) {
                    toast.info("Complete the previous steps to unlock this milestone.");
                    return;
                  }
                  setExpandedStepId(isExpanded ? null : step.id);
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="shrink-0 flex items-center justify-center">
                    {isCompleted && <Check className="size-6 text-emerald-500" />}
                    {isCurrent && <CircleDashed className="size-6 text-primary animate-[spin_4s_linear_infinite]" />}
                    {isLocked && <Lock className="size-5 text-muted-foreground" />}
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-bold text-lg",
                      isLocked ? "text-muted-foreground" : "text-foreground"
                    )}>
                      {step.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={cn(
                        "text-xs font-semibold px-2 py-0.5 rounded-md",
                        isCompleted ? "bg-emerald-100 text-emerald-700" :
                        isCurrent ? "bg-primary/10 text-primary" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {step.status}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        ⏱ {step.estimatedTime}
                      </span>
                    </div>
                  </div>
                </div>
                
                {!isLocked && (
                  <ChevronRight className={cn("w-5 h-5 text-muted-foreground transition-transform", isExpanded && "rotate-90")} />
                )}
              </div>

              {isExpanded && !isLocked && (
                <div className="px-6 pb-6 pt-2 border-t border-border/50 bg-muted/5">
                  <p className="text-foreground/90 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Tasks list */}
                  {step.tasks && step.tasks.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-sm mb-3">Action Items</h4>
                      <div className="space-y-2">
                        {step.tasks.map(task => (
                          <label key={task.id} className="flex items-start gap-3 p-3 rounded-lg border bg-background hover:bg-muted/30 cursor-pointer transition-colors">
                            <input 
                              type="checkbox" 
                              checked={task.completed} 
                              onChange={() => handleTaskToggle(step.id, task.id)}
                              className="mt-1 size-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className={cn("text-sm", task.completed && "line-through text-muted-foreground")}>
                              {task.text}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resources */}
                  {step.resources.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-sm mb-3">Learning Materials</h4>
                      <div className="flex flex-col gap-2">
                        {step.resources.map((res) => (
                          <a 
                            key={res.id} 
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-lg border bg-background hover:border-primary/50 transition-colors group"
                          >
                            <div className="p-2 rounded-md bg-primary/10 text-primary">
                              {res.type === "video" && <PlayCircle className="size-4" />}
                              {res.type === "article" && <FileText className="size-4" />}
                              {res.type === "checklist" && <CheckSquare className="size-4" />}
                            </div>
                            <div>
                              <p className="text-sm font-medium group-hover:text-primary transition-colors">{res.title}</p>
                              <p className="text-xs text-muted-foreground capitalize">{res.type} • {res.duration}</p>
                            </div>
                            <ChevronRight className="size-4 ml-auto text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.notes && (
                    <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-lg">
                      <p className="text-sm text-amber-900">
                        <strong>💡 Pro Tip:</strong> {step.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end pt-4 border-t">
                    <Button 
                      className={cn(isCompleted ? "bg-muted text-muted-foreground hover:bg-muted/80" : "bg-primary")}
                      onClick={() => handleToggleComplete(step.id)}
                    >
                      {isCompleted ? "Mark as Incomplete" : "Complete Milestone"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isFullyComplete && (
        <div className="mt-12 border border-emerald-200 rounded-2xl p-8 text-center bg-emerald-50">
          <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <Check className="size-8" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-emerald-900 mb-2">Roadmap Completed!</h2>
          <p className="text-emerald-700 mb-6">You&apos;ve successfully finished all the milestones for this business roadmap.</p>
          <Link href="/mentors" className="w-full sm:w-auto">
            <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
              Connect with a Mentor <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}