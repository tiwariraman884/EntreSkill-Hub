"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, PlayCircle, CheckSquare, Star, Clock, User, Bookmark, TrendingUp } from "lucide-react";
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
  progress?: {
    progressPercent: number;
    isCompleted: boolean;
    completedTasks?: string[];
  };
}

export default function ResourceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await fetch(`/api/resources/${params.id}`);
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
    if (params.id) fetchResource();
  }, [params.id]);

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
      await fetch(`/api/resources/${params.id}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          progressPercent: percent,
          completedTasks: completedList,
          isCompleted: percent === 100
        }),
      });
      setResource((prev) => prev ? { 
        ...prev, 
        progress: { ...prev.progress!, progressPercent: percent, isCompleted: percent === 100, completedTasks: completedList } 
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 bg-muted w-32 rounded mb-8" />
        <div className="h-64 bg-muted w-full rounded-xl mb-8" />
        <div className="h-10 bg-muted w-3/4 rounded mb-4" />
        <div className="h-6 bg-muted w-1/2 rounded" />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Resource Not Found</h1>
        <Button onClick={() => router.push("/learn")}>Back to Learn</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Top Navigation */}
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" className="gap-2 -ml-4" onClick={() => router.push("/learn")}>
            <ChevronLeft className="h-4 w-4" /> Back to Library
          </Button>
          <Button variant="outline" size="sm" onClick={toggleBookmark} className={cn(resource.isBookmarked && "text-primary border-primary")}>
            <Bookmark className={cn("h-4 w-4 mr-2", resource.isBookmarked && "fill-primary")} />
            {resource.isBookmarked ? "Saved" : "Save"}
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Header section */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            <Badge className="uppercase tracking-widest text-[10px]">{resource.category}</Badge>
            <Badge variant="outline" className="uppercase tracking-widest text-[10px]">{resource.difficulty}</Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{resource.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            {resource.instructor && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Instructor: <strong>{resource.instructor}</strong></span>
              </div>
            )}
            {resource.duration && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{resource.duration}</span>
              </div>
            )}
            {resource.rating && (
              <div className="flex items-center gap-2 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span>{resource.rating.toFixed(1)} Rating</span>
              </div>
            )}
            {resource.views !== undefined && (
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>{resource.views.toLocaleString()} views</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Viewer */}
        <Card className="overflow-hidden mb-8 border-0 shadow-lg">
          {resource.type === "video" && resource.url && (
            <div className="aspect-video bg-black flex items-center justify-center">
              {/* Dummy video player placeholder */}
              <div className="text-center text-white p-8">
                <PlayCircle className="h-20 w-20 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium opacity-80">Video Player Simulation</p>
                <p className="text-sm opacity-60 mt-2">URL: {resource.url}</p>
              </div>
            </div>
          )}

          <CardContent className="p-8 lg:p-12">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {resource.type === "article" ? (
                <div dangerouslySetInnerHTML={{ __html: resource.content || resource.description || "" }} />
              ) : resource.type === "checklist" && resource.tasks ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold mb-6">Interactive Checklist</h3>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{completedTasks.length} of {resource.tasks.length} completed</span>
                    <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all" style={{ width: `${(completedTasks.length / resource.tasks.length) * 100}%` }} />
                    </div>
                  </div>
                  {resource.tasks.map((task, i) => (
                    <label key={i} className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <input 
                        type="checkbox" 
                        className="mt-1 w-5 h-5 accent-primary" 
                        checked={completedTasks.includes(task)}
                        onChange={() => toggleTask(task)}
                      />
                      <span className={cn("text-lg", completedTasks.includes(task) && "line-through text-muted-foreground")}>
                        {task}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {resource.description}
                </p>
              )}
            </div>

            <div className="mt-12 flex items-center justify-center pt-8 border-t">
              <Button 
                size="lg" 
                onClick={markComplete}
                disabled={resource.progress?.isCompleted}
                className={cn("px-8", resource.progress?.isCompleted && "bg-green-500 hover:bg-green-600 text-white")}
              >
                {resource.progress?.isCompleted ? (
                  <>
                    <CheckSquare className="mr-2 h-5 w-5" /> Completed
                  </>
                ) : (
                  "Mark as Completed"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
