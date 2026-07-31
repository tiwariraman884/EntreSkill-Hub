"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs, TabsList, TabsTrigger, TabsContent,
} from "@/components/ui/tabs";
import {
  Progress, ProgressIndicator, ProgressTrack, ProgressValue,
} from "@/components/ui/progress";
import { EmptyState } from "@/components/ui/empty-state";
import {
  ChevronLeft, PlayCircle, CheckSquare, Star, Clock,
  Bookmark, TrendingUp, BookOpen, Target,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Resource {
  _id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  type: "video" | "article" | "checklist";
  category?: string;
  difficulty?: string;
  duration?: string;
  instructor?: string;
  rating?: number;
  views?: number;
  url?: string;
  content?: string;
  tasks?: string[];
  isBookmarked?: boolean;
  objectives?: string[];
  progress?: {
    progressPercent: number;
    isCompleted: boolean;
    completedTasks?: string[];
  };
}

const difficultyClasses: Record<string, { bg: string; text: string; border: string }> = {
  Beginner:     { bg: "bg-surface-accent", text: "text-indigo-light", border: "border-indigo/20" },
  Intermediate: { bg: "bg-surface-success", text: "text-verified", border: "border-emerald-500/20" },
  Advanced:     { bg: "bg-surface-danger",  text: "text-terracotta-deep", border: "border-danger/20" },
};

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function ResourceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await fetch(`/api/resources/${id}`);
        if (!res.ok) throw new Error("Failed to fetch resource");
        const data = await res.json();
        setResource(data.data);
        if (data.data.progress?.completedTasks) {
          setCompletedTasks(data.data.progress.completedTasks);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load resource");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchResource();
  }, [id]);

  const toggleBookmark = async () => {
    if (!resource) return;
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetType: "resource", targetId: resource._id }),
      });
      if (!res.ok) throw new Error();
      setResource({ ...resource, isBookmarked: !resource.isBookmarked });
      toast.success("Bookmark updated");
    } catch {
      toast.error("Failed to update bookmark. Are you logged in?");
    }
  };

  const updateProgress = async (percent: number, completedList?: string[]) => {
    try {
      await fetch(`/api/resources/${id}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          progressPercent: percent,
          completedTasks: completedList,
          isCompleted: percent === 100,
        }),
      });
      setResource((prev) => prev ? {
        ...prev,
        progress: { ...prev.progress!, progressPercent: percent, isCompleted: percent === 100, completedTasks: completedList },
      } : null);
    } catch (error) {
      console.error("Failed to update progress", error);
    }
  };

  const toggleTask = (task: string) => {
    const isDone = completedTasks.includes(task);
    const updated = isDone ? completedTasks.filter(t => t !== task) : [...completedTasks, task];
    setCompletedTasks(updated);

    if (resource?.tasks && resource.tasks.length > 0) {
      const percent = Math.round((updated.length / resource.tasks.length) * 100);
      updateProgress(percent, updated);
    }
  };

  const markComplete = () => {
    updateProgress(100, completedTasks);
    toast.success("Resource marked as completed!");
  };

  const progressPercent = resource?.tasks && resource.tasks.length > 0
    ? Math.round((completedTasks.length / resource.tasks.length) * 100)
    : (resource?.progress?.progressPercent ?? 0);

  const isCompleted = resource?.progress?.isCompleted ?? false;

  return (
    <div className="min-h-screen bg-canvas">
      <div className="sticky top-0 z-30 border-b border-border/60 bg-surface/80 backdrop-blur-2xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            className="gap-2 -ml-3 text-ink hover:text-indigo hover:bg-indigo/5 transition-colors duration-200"
            onClick={() => router.push("/learn")}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Library</span>
            <span className="sm:hidden">Back</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleBookmark}
            className={cn(
              "gap-1.5 transition-all duration-300",
              resource?.isBookmarked
                ? "border-indigo text-indigo bg-indigo/5 shadow-sm shadow-indigo/10"
                : "border-border hover:border-indigo/30"
            )}
          >
            <Bookmark className={cn("h-4 w-4", resource?.isBookmarked && "fill-current")} />
            {resource?.isBookmarked ? "Saved" : "Save"}
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="h-5 w-24 rounded-full bg-muted animate-shimmer" />
                  <div className="h-5 w-24 rounded-full bg-muted animate-shimmer" />
                </div>
                <div className="h-8 sm:h-10 w-3/4 rounded-xl bg-muted animate-shimmer" />
                <div className="flex flex-wrap gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-4 w-28 rounded-lg bg-muted animate-shimmer" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
              <div className="aspect-video rounded-2xl bg-muted animate-shimmer" />
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-4 w-full rounded-lg bg-muted animate-shimmer" style={{ animationDelay: `${i * 0.1 + 0.3}s` }} />
                ))}
              </div>
            </motion.div>
          ) : !resource ? (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <EmptyState
                icon="book"
                title="Resource Not Found"
                description="The resource you&apos;re looking for doesn&apos;t exist or has been removed."
                actionLabel="Back to Library"
                actionHref="/learn"
              />
            </motion.div>
          ) : (
            <motion.div
              key={resource._id}
              initial="hidden"
              animate="visible"
              variants={pageVariants}
              className="space-y-8"
            >
              <motion.div
                variants={sectionVariants}
                custom={0}
                className="space-y-5"
              >
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gradient-to-r from-indigo to-indigo-light text-white shadow-md shadow-indigo/20 border-0 text-[11px] font-bold uppercase tracking-wider">
                    {resource.category}
                  </Badge>
                  {resource.difficulty && (() => {
                    const dc = difficultyClasses[resource.difficulty] ?? { bg: "bg-muted", text: "text-muted-foreground", border: "border-border" };
                    return (
                      <Badge variant="outline" className={cn("text-[11px] font-bold uppercase tracking-wider border", dc.bg, dc.text, dc.border)}>
                        {resource.difficulty}
                      </Badge>
                    );
                  })()}
                  {isCompleted && (
                    <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-md shadow-emerald-500/20 border-0 text-[11px] font-bold uppercase tracking-wider">
                      <CheckCircle2 className="size-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold font-heading text-ink leading-[1.15] tracking-tight">
                  {resource.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm">
                  {resource.instructor && (
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo to-indigo-light flex items-center justify-center text-white text-[11px] font-bold shadow-sm shadow-indigo/20 shrink-0">
                        {resource.instructor.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-thread">
                        <span className="text-ink font-semibold">{resource.instructor}</span>
                      </span>
                    </div>
                  )}
                  {resource.duration && (
                    <div className="flex items-center gap-2 text-thread">
                      <Clock className="size-4 text-indigo/60" />
                      <span className="font-medium">{resource.duration}</span>
                    </div>
                  )}
                  {resource.rating && (
                    <div className="flex items-center gap-1.5 text-marigold">
                      <Star className="size-4 fill-marigold" />
                      <span className="font-bold">{resource.rating.toFixed(1)}</span>
                      <span className="text-thread font-medium">Rating</span>
                    </div>
                  )}
                  {resource.views !== undefined && (
                    <div className="flex items-center gap-2 text-thread">
                      <TrendingUp className="size-4 text-indigo/60" />
                      <span className="font-medium">{resource.views.toLocaleString()} views</span>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                variants={sectionVariants}
                custom={1}
              >
                <Card className="overflow-hidden border-0 shadow-premium bg-white">
                  {resource.type === "video" && (
                    <div className="aspect-video bg-gradient-to-br from-ink to-surface relative flex items-center justify-center">
                      {resource.url ? (
                        <iframe
                          src={resource.url}
                          title={resource.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      ) : (
                        <div className="text-center text-white p-8">
                          <motion.div
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <PlayCircle className="h-16 w-16 mx-auto mb-4 text-white/30" />
                          </motion.div>
                          <p className="text-lg font-semibold text-white/50">Video Player Simulation</p>
                          <p className="text-sm text-white/30 mt-1">URL: {resource.url || "Not available"}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <CardContent className="p-0">
                    <Tabs
                      value={activeTab}
                      onValueChange={setActiveTab}
                      className="px-6 sm:px-8 lg:px-10 pt-6"
                    >
                      <TabsList className="w-full sm:w-auto bg-muted/70 rounded-xl p-1">
                        <TabsTrigger
                          value="overview"
                          className="rounded-lg text-sm data-[active=true]:shadow-sm"
                        >
                          <BookOpen className="size-3.5 mr-1.5" />
                          Overview
                        </TabsTrigger>
                        <TabsTrigger
                          value="objectives"
                          className="rounded-lg text-sm data-[active=true]:shadow-sm"
                        >
                          <Target className="size-3.5 mr-1.5" />
                          Objectives
                        </TabsTrigger>
                        {resource.type === "checklist" && resource.tasks && (
                          <TabsTrigger
                            value="checklist"
                            className="rounded-lg text-sm data-[active=true]:shadow-sm"
                          >
                            <CheckSquare className="size-3.5 mr-1.5" />
                            Checklist
                          </TabsTrigger>
                        )}
                      </TabsList>

                      <TabsContent value="overview" className="mt-6">
                        <div className="prose prose-slate dark:prose-invert max-w-none text-thread leading-relaxed">
                          {resource.content || resource.description ? (
                            <p className="text-base leading-relaxed">{resource.content || resource.description}</p>
                          ) : (
                            <p className="text-base leading-relaxed text-thread/70 italic">
                              No detailed content available for this resource.
                            </p>
                          )}
                        </div>

                        {resource.objectives && resource.objectives.length > 0 && (
                          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-indigo/5 to-indigo-light/5 border border-indigo/10">
                            <h4 className="text-sm font-bold text-ink mb-3 uppercase tracking-wider flex items-center gap-2">
                              <Target className="size-4 text-indigo" />
                              What you&apos;ll learn
                            </h4>
                            <ul className="space-y-2">
                              {resource.objectives.map((obj, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-thread">
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo to-marigold shrink-0" />
                                  {obj}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="objectives" className="mt-6">
                        {resource.objectives && resource.objectives.length > 0 ? (
                          <div className="space-y-3">
                            {resource.objectives.map((obj, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08, duration: 0.4 }}
                                className="flex items-start gap-4 p-4 rounded-xl border border-border/60 hover:border-indigo/20 hover:bg-indigo/[0.02] transition-all duration-200 group"
                              >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo to-indigo-light flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-indigo/20 shrink-0 mt-0.5">
                                  {i + 1}
                                </div>
                                <p className="text-sm text-ink leading-relaxed pt-1.5">{obj}</p>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12 text-thread">
                            <Target className="size-8 mx-auto mb-3 opacity-30" />
                            <p className="text-sm">No objectives listed for this resource.</p>
                          </div>
                        )}
                      </TabsContent>

                      {resource.type === "checklist" && resource.tasks && (
                        <TabsContent value="checklist" className="mt-6">
                          <div className="space-y-5">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-surface-elevated to-surface border border-border/60">
                              <div>
                                <p className="text-sm font-bold text-ink">
                                  {completedTasks.length} of {resource.tasks.length} tasks completed
                                </p>
                                <p className="text-xs text-thread mt-0.5">
                                  {progressPercent === 100 ? "All tasks completed!" : `${progressPercent}% complete`}
                                </p>
                              </div>
                              <div className="w-16 h-16 relative">
                                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                                  <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
                                  <circle
                                    cx="32" cy="32" r="28" fill="none"
                                    stroke="url(#progressGrad)"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    strokeDasharray={`${2 * Math.PI * 28}`}
                                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - progressPercent / 100)}`}
                                    className="transition-all duration-700 ease-out"
                                  />
                                  <defs>
                                    <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="1">
                                      <stop offset="0%" stopColor="#6366F1" />
                                      <stop offset="100%" stopColor="#F59E0B" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-ink">
                                  {progressPercent}%
                                </span>
                              </div>
                            </div>

                            <Progress value={progressPercent}>
                              <ProgressTrack className="h-2 bg-muted/80 rounded-full">
                                <ProgressIndicator className="shadow-sm shadow-indigo/30" />
                              </ProgressTrack>
                              <ProgressValue />
                            </Progress>

                            <div className="space-y-2.5">
                              {resource.tasks.map((task, i) => {
                                const isDone = completedTasks.includes(task);
                                return (
                                  <motion.label
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.3 }}
                                    className={cn(
                                      "flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all duration-200",
                                      isDone
                                        ? "bg-verified/5 border-emerald-500/20 hover:border-emerald-500/30"
                                        : "bg-surface-elevated border-border/60 hover:border-indigo/20 hover:bg-indigo/[0.02]"
                                    )}
                                  >
                                    <div className="relative mt-0.5 shrink-0">
                                      <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        checked={isDone}
                                        onChange={() => toggleTask(task)}
                                      />
                                      <div className={cn(
                                        "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200",
                                        isDone
                                          ? "bg-verified border-verified"
                                          : "border-border peer-hover:border-indigo/50 peer-checked:border-verified peer-checked:bg-verified"
                                      )}>
                                        {isDone && <CheckCircle2 className="size-3.5 text-white" />}
                                      </div>
                                    </div>
                                    <span className={cn(
                                      "text-sm leading-relaxed transition-all duration-200 flex-1",
                                      isDone ? "text-verified/80 line-through" : "text-ink"
                                    )}>
                                      {task}
                                    </span>
                                  </motion.label>
                                );
                              })}
                            </div>
                          </div>
                        </TabsContent>
                      )}
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                variants={sectionVariants}
                custom={2}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-surface-elevated border border-border/60 shadow-premium">
                  <div className="px-4 py-2.5 text-center">
                    <p className="text-lg font-bold text-ink tabular-nums leading-none">{progressPercent}%</p>
                    <p className="text-[10px] text-thread font-semibold uppercase tracking-wider mt-1">Progress</p>
                  </div>
                  <div className="w-px h-10 bg-border/60" />
                  <div className="px-4 py-2.5 text-center">
                    <p className="text-lg font-bold text-ink tabular-nums leading-none">{completedTasks.length}/{resource.tasks?.length ?? 0}</p>
                    <p className="text-[10px] text-thread font-semibold uppercase tracking-wider mt-1">Tasks</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={markComplete}
                  disabled={isCompleted}
                  className={cn(
                    "px-8 rounded-xl font-bold shadow-lg transition-all duration-300",
                    isCompleted
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-emerald-500/25 cursor-default"
                      : "bg-gradient-to-r from-indigo to-indigo-light text-white shadow-indigo/25 hover:shadow-xl hover:shadow-indigo/30 hover:-translate-y-0.5 active:translate-y-0"
                  )}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Completed
                    </>
                  ) : (
                    "Mark as Completed"
                  )}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}