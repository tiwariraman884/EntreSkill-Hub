"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Target,
  VideoIcon,
  MapIcon,
  BrainCircuitIcon,
  AwardIcon,
  Calendar,
} from "lucide-react";

// ─── Progress Ring ──────────────────────────────────────────────────────────
function ProgressRing({ value, size = 120, strokeWidth = 8, color = "indigo" }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const target = circumference - (value / 100) * circumference;
    const timer = setTimeout(() => setOffset(target), 80);
    return () => clearTimeout(timer);
  }, [value, circumference]);

  const stroke = color === "indigo" ? "#2B3A67" : color === "marigold" ? "#E8A33D" : "#10B981";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="none" className="text-muted/30" />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={stroke} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold font-heading">{value}%</span>
        <span className="text-[10px] text-muted-foreground font-medium">Done</span>
      </div>
    </div>
  );
}

export default function DashboardSidebar() {
  const { stats, assessmentScores } = useGlobalState();
  const hasTakenAssessment = assessmentScores !== null && Object.keys(assessmentScores).length > 0;

  return (
    <div className="space-y-6">
      {/* Daily Goal with Progress Ring */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
        <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable overflow-hidden">
          <div className="h-1 bg-linear-to-r from-indigo via-indigo-light to-marigold" />
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-indigo">
              <Target className="size-5" />
              Today&apos;s Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-4">
              <ProgressRing value={75} size={96} color="indigo" />
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-surface border border-border/30">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo to-indigo-light flex items-center justify-center shrink-0">
                    <VideoIcon className="size-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-xs">Watch 1 Video</p>
                    <p className="text-[10px] text-emerald-600 font-medium">Completed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-surface border border-border/30">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-marigold to-marigold-light flex items-center justify-center shrink-0">
                    <MapIcon className="size-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-xs">Complete 1 Step</p>
                    <p className="text-[10px] text-thread">In progress</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Mentors / AI Recommendations */}
      {hasTakenAssessment && (
        <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable overflow-hidden">
            <div className="h-1 bg-linear-to-r from-purple-500 via-indigo to-indigo-light" />
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BrainCircuitIcon className="size-5 text-indigo" />
                Recommended
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/resource/lr-3" className="group block p-4 rounded-2xl border-2 border-indigo/20 hover:border-indigo/40 hover:bg-indigo/5 transition-all duration-300">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo to-indigo-light flex items-center justify-center shadow-md shrink-0">
                    <AwardIcon className="size-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1 group-hover:text-indigo transition-colors leading-tight">Company Registration Checklist</p>
                    <p className="text-[11px] text-thread leading-relaxed">Based on your score in Legal compliance.</p>
                    <Badge variant="outline" className="mt-1.5 text-[10px] font-semibold">Legal · 5 min</Badge>
                  </div>
                </div>
              </Link>
              <Link href="/roadmaps/r-1" className="group block p-4 rounded-2xl border-2 border-border/40 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-300">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md shrink-0">
                    <MapIcon className="size-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1 group-hover:text-emerald-700 transition-colors leading-tight">Tech Startup Roadmap</p>
                    <p className="text-[11px] text-thread leading-relaxed">Matches your technology proficiency.</p>
                    <Badge variant="outline" className="mt-1.5 text-[10px] font-semibold">Strategy · 12 steps</Badge>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upcoming Sessions */}
      <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="size-5 text-indigo" />
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon="calendar"
              title="No upcoming sessions"
              description="Book a mentor to get personalized guidance and accelerate your entrepreneurial journey."
              actionLabel="Find a Mentor"
              actionHref="/mentors"
            />
          </CardContent>
        </Card>
      </div>

      {/* Total XP Badge */}
      <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        <Card className="rounded-2xl bg-linear-to-br from-marigold/10 to-amber-500/5 border-marigold/20 shadow-premium hoverable overflow-hidden">
          <div className="h-1 bg-linear-to-r from-marigold to-amber-400" />
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-marigold to-amber-500 flex items-center justify-center">
                <AwardIcon className="size-7 text-white" />
              </div>
              <div>
                <p className="text-xs text-thread font-semibold uppercase tracking-wider mb-0.5">Total XP Earned</p>
                <p className="text-3xl font-bold font-heading text-foreground">{stats.xp}</p>
                <p className="text-xs text-marigold-dark font-medium">Keep going</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
