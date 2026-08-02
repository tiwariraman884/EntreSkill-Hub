"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MOCK_LEARNING_RESOURCES } from "@/data/mock-learning";
import { cn } from "@/lib/utils";
import {
  PlayCircleIcon,
  ArrowUpRight,
  ClockIcon,
  Star,
  Users,
  BookmarkIcon,
} from "lucide-react";

// ─── Helpers ────────────────────────────────────────────────────────────────
function seededProgress(id: string, min = 10, max = 95): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash |= 0;
  }
  return min + (Math.abs(hash) % (max - min + 1));
}

export function ContinueLearning() {
  const { isBookmarked, removeBookmark, addBookmark } = useGlobalState();

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
      <Card className="rounded-2xl bg-card border-border/40 shadow-premium hoverable">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <PlayCircleIcon className="size-5 text-indigo" />
            Continue Learning
          </CardTitle>
          <Link href="/learn" className="text-sm text-indigo hover:text-indigo-light font-semibold flex items-center gap-1 group">
            View all <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </CardHeader>
        <CardContent className="space-y-4">
          {MOCK_LEARNING_RESOURCES.slice(0, 3).map((resource) => {
            const progress = seededProgress(resource.id);
            const bookmarked = isBookmarked(resource.id);
            return (
              <div
                key={resource.id}
                className="group flex gap-4 items-start p-4 rounded-2xl border border-border/40 hover:border-indigo/25 hover:shadow-md transition-all duration-300 relative hover:-translate-y-0.5"
              >
                {/* Thumbnail */}
                <div className="relative w-28 h-20 shrink-0 rounded-xl overflow-hidden bg-muted">
                  <Image
                    src={resource.thumbnail}
                    alt={resource.title}
                    fill
                    sizes="112px"
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-card/90 flex items-center justify-center">
                      <PlayCircleIcon className="size-5 text-indigo" />
                    </div>
                  </div>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-sm leading-tight group-hover:text-indigo transition-colors line-clamp-2">{resource.title}</p>
                      <p className="text-xs text-thread mt-1">{resource.category}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "shrink-0 text-[10px] font-semibold",
                        resource.difficulty === "Beginner" && "border-emerald-200 bg-emerald-50 text-emerald-700",
                        resource.difficulty === "Intermediate" && "border-blue-200 bg-blue-50 text-blue-700",
                        resource.difficulty === "Advanced" && "border-purple-200 bg-purple-50 text-purple-700"
                      )}
                    >
                      {resource.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-thread">
                    <span className="flex items-center gap-1"><ClockIcon className="size-3" />{resource.duration}</span>
                    <span className="flex items-center gap-1"><Star className="size-3 fill-amber-400 text-amber-400" />{resource.rating.toFixed(1)}</span>
                    <span className="flex items-center gap-1"><Users className="size-3" />{resource.views.toLocaleString()}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-thread">Progress</span>
                      <span className="text-indigo font-semibold">{progress}%</span>
                    </div>
                    <Progress value={progress} aria-label={`${resource.title} progress: ${progress}%`} />
                  </div>
                </div>
                {/* Bookmark button */}
                <button
                  onClick={() => bookmarked ? removeBookmark(resource.id) : addBookmark(resource.id, "learning")}
                  className={cn(
                    "self-center shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 active:scale-95",
                    bookmarked ? "bg-indigo/10 text-indigo" : "bg-muted text-muted-foreground hover:bg-indigo/10 hover:text-indigo"
                  )}
                  aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                >
                  {bookmarked ? <BookmarkIcon className="size-4 fill-current" /> : <BookmarkIcon className="size-4" />}
                </button>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

export function DashboardBookmarks() {
  const { isBookmarked, removeBookmark } = useGlobalState();
  const bookmarkedResources = MOCK_LEARNING_RESOURCES.slice(0, 2).filter(r => isBookmarked(r.id));

  if (bookmarkedResources.length === 0) return null;

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
      <Card className="rounded-2xl bg-card border-border/40 shadow-premium hoverable">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookmarkIcon className="size-5 text-indigo" />
            Bookmarks
          </CardTitle>
          <Link href="/bookmarks" className="text-sm text-indigo hover:text-indigo-light font-semibold flex items-center gap-1 group">
            View all <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {bookmarkedResources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-center gap-4 p-3 rounded-xl border border-border/40 hover:border-indigo/25 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-indigo/10 to-indigo-light/10 flex items-center justify-center shrink-0">
                <BookmarkIcon className="size-5 text-indigo fill-current" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{resource.title}</p>
                <p className="text-xs text-thread">{resource.category} · {resource.duration}</p>
              </div>
              <Badge variant="secondary" className="text-[10px] font-semibold shrink-0">{resource.difficulty}</Badge>
              <button
                onClick={() => removeBookmark(resource.id)}
                className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all active:scale-95"
                aria-label="Remove bookmark"
              >
                <BookmarkIcon className="size-3.5 fill-current" />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
