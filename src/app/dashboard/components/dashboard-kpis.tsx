"use client";

import React from "react";
import Link from "next/link";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Card, CardContent } from "@/components/ui/card";
import {
  AwardIcon,
  FlameIcon,
  ArrowUpRight,
  CheckCircle2Icon,
  TrendingUp,
  BrainCircuitIcon,
} from "lucide-react";

export default function DashboardKPIs() {
  const { stats, assessmentScores } = useGlobalState();

  const hasTakenAssessment = assessmentScores !== null && Object.keys(assessmentScores).length > 0;
  const totalScore = hasTakenAssessment
    ? Object.values(assessmentScores).reduce((acc, curr) => (acc || 0) + (curr || 0), 0)
    : 0;
  const averageScore = hasTakenAssessment
    ? Math.round((totalScore || 0) / Object.keys(assessmentScores).length)
    : 0;

  const xpProgress = (stats.xp % 500) / 5;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Current Level */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
        <Card className="rounded-2xl bg-linear-to-br from-indigo to-indigo-light text-white border-none shadow-premium hoverable">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-white/70 mb-1 uppercase tracking-wider">Current Level</p>
                <p className="text-5xl font-bold font-heading" style={{ animation: "countUp 0.8s ease-out forwards" }}>{stats.level}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center" aria-hidden="true">
                <AwardIcon className="size-6 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-white/80">
                <span>{stats.xp % 500} XP</span>
                <span>500 XP</span>
              </div>
              <div 
                className="h-2 bg-white/20 rounded-full overflow-hidden" 
                role="progressbar" 
                aria-valuenow={stats.xp % 500} 
                aria-valuemin={0} 
                aria-valuemax={500} 
                aria-label="XP progress to next level"
              >
                <div
                  className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
              <p className="text-[10px] text-white/60 font-medium">{Math.round(500 - (stats.xp % 500))} XP to Level {stats.level + 1}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Streak */}
      <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-thread mb-1 uppercase tracking-wider">Learning Streak</p>
                <div className="flex items-end gap-1">
                  <p className="text-5xl font-bold font-heading text-foreground">{stats.streakDays}</p>
                  <p className="text-sm text-thread mb-1.5 font-medium">days</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-400 to-amber-500 flex items-center justify-center" aria-hidden="true">
                <FlameIcon className="size-6 text-white animate-flame" />
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-orange-50 border border-orange-100">
              <ArrowUpRight className="size-3.5 text-emerald-500 shrink-0" />
              <span className="text-xs text-emerald-700 font-semibold">+1 from yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Completed Resources */}
      <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-thread mb-1 uppercase tracking-wider">Completed Resources</p>
                <p className="text-5xl font-bold font-heading text-foreground">{stats.coursesCompleted}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center" aria-hidden="true">
                <CheckCircle2Icon className="size-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-100">
              <TrendingUp className="size-3.5 text-indigo shrink-0" />
              <span className="text-xs text-indigo font-semibold">+3 this week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assessment Score */}
      <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-thread mb-1 uppercase tracking-wider">AI Assessment Score</p>
                <p className="text-5xl font-bold font-heading text-foreground">
                  {hasTakenAssessment ? averageScore : "—"}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo to-indigo-light flex items-center justify-center" aria-hidden="true">
                <BrainCircuitIcon className="size-6 text-white" />
              </div>
            </div>
            {hasTakenAssessment ? (
              <Link href="/assessment/results" className="flex items-center gap-1.5 p-2 rounded-lg bg-indigo/5 border border-indigo/15 text-xs text-indigo font-semibold hover:bg-indigo/10 transition-colors">
                <span>View full report</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            ) : (
              <Link href="/assessment" className="flex items-center gap-1.5 p-2 rounded-lg bg-indigo/5 border border-indigo/15 text-xs text-indigo font-semibold hover:bg-indigo/10 transition-colors">
                <span>Take assessment</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
