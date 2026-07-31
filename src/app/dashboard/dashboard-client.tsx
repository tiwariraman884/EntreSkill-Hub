"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "next-auth";
import { useGlobalState } from "@/context/GlobalStateContext";
import { MOCK_LEARNING_RESOURCES } from "@/data/mock-learning";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsClient } from "@/lib/use-is-client";
import {
  BookmarkIcon, MapIcon, CheckCircle2Icon, BookOpenIcon,
  VideoIcon, ActivityIcon, ClockIcon, AwardIcon,
  FlameIcon, MessageSquareIcon, BrainCircuitIcon, PlayCircleIcon,
  TrendingUp, Target, BarChart3,
  Calendar, ArrowUpRight, Star, Users,
  Sparkles, ArrowRight, Lightbulb, Bot, FileText, Brain
} from "lucide-react";
import { SkeletonStatCard, SkeletonCard } from "@/components/ui/skeleton-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" },
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

// ─── Helpers ────────────────────────────────────────────────────────────────
function seededProgress(id: string, min = 10, max = 95): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash |= 0;
  }
  return min + (Math.abs(hash) % (max - min + 1));
}

// ─── Progress Ring ──────────────────────────────────────────────────────────
function ProgressRing({ value, size = 120, strokeWidth = 8, color = "indigo" }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const [offset, setOffset] = React.useState(circumference);

  React.useEffect(() => {
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

// ─── Custom Recharts Tooltip ────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name?: string }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-xl border border-border/60 rounded-xl px-3 py-2 shadow-premium">
        <p className="text-xs font-semibold text-thread mb-1">{label}</p>
        <p className="text-sm font-bold text-indigo">{payload[0].value} min</p>
      </div>
    );
  }
  return null;
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────
export default function DashboardClient({ user }: { user: User }) {
  const { stats, assessmentScores, isBookmarked, removeBookmark, addBookmark } = useGlobalState();
  const isClient = useIsClient();

  const hasTakenAssessment = assessmentScores !== null && Object.keys(assessmentScores).length > 0;
  const totalScore = hasTakenAssessment
    ? Object.values(assessmentScores).reduce((acc, curr) => (acc || 0) + (curr || 0), 0)
    : 0;
  const averageScore = hasTakenAssessment
    ? Math.round((totalScore || 0) / Object.keys(assessmentScores).length)
    : 0;

  const weeklyData = [
    { day: "Mon", minutes: 65 }, { day: "Tue", minutes: 82 }, { day: "Wed", minutes: 45 },
    { day: "Thu", minutes: 94 }, { day: "Fri", minutes: 110 }, { day: "Sat", minutes: 58 },
    { day: "Sun", minutes: 78 },
  ];

  const skillData = [
    { subject: "Business", A: 85 }, { subject: "Marketing", A: 72 }, { subject: "Finance", A: 60 },
    { subject: "Legal", A: 45 }, { subject: "Product", A: 90 }, { subject: "Leadership", A: 68 },
  ];

  const xpProgress = (stats.xp % 500) / 5;

  if (!isClient) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        <div className="h-20 bg-white/80 border-b border-border/40" />
        <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonStatCard key={i} />)}
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <SkeletonCard className="h-48" />
              <SkeletonCard className="h-64" />
              <SkeletonCard className="h-64" />
            </div>
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Sticky Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sticky top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-border/40 shadow-premium"
      >
        <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading tracking-tight">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-indigo to-indigo-light bg-clip-text text-transparent">
                {user?.name?.split(" ")[0] || "Entrepreneur"}
              </span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1 font-sans">Here is your progress for today.</p>
          </div>
        </div>
      </motion.header>

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 lg:px-6 py-8 space-y-8 font-sans">
        {/* ── KPI Row ──────────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Current Level */}
          <motion.div variants={fadeInUp}>
            <Card className="rounded-2xl bg-gradient-to-br from-indigo to-indigo-light text-white border-none shadow-premium hoverable">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold text-white/70 mb-1 uppercase tracking-wider">Current Level</p>
                    <p className="text-5xl font-bold font-heading" style={{ animation: "countUp 0.8s ease-out forwards" }}>{stats.level}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <AwardIcon className="size-6 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs text-white/80">
                    <span>{stats.xp % 500} XP</span>
                    <span>500 XP</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${xpProgress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-white/60 font-medium">{Math.round(500 - (stats.xp % 500))} XP to Level {stats.level + 1}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Learning Streak */}
          <motion.div variants={fadeInUp}>
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
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
                    <FlameIcon className="size-6 text-white animate-flame" />
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-orange-50 border border-orange-100">
                  <ArrowUpRight className="size-3.5 text-emerald-500 shrink-0" />
                  <span className="text-xs text-emerald-700 font-semibold">+1 from yesterday</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Completed Resources */}
          <motion.div variants={fadeInUp}>
            <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold text-thread mb-1 uppercase tracking-wider">Completed Resources</p>
                    <p className="text-5xl font-bold font-heading text-foreground">{stats.coursesCompleted}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                    <CheckCircle2Icon className="size-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                  <TrendingUp className="size-3.5 text-indigo shrink-0" />
                  <span className="text-xs text-indigo font-semibold">+3 this week</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Assessment Score */}
          <motion.div variants={fadeInUp}>
            <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold text-thread mb-1 uppercase tracking-wider">AI Assessment Score</p>
                    <p className="text-5xl font-bold font-heading text-foreground">
                      {hasTakenAssessment ? averageScore : "—"}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo to-indigo-light flex items-center justify-center">
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
          </motion.div>
        </motion.div>

        {/* ── Main Grid ───────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Quick Actions */}
            <motion.section variants={fadeInUp}>
              <h2 className="text-lg font-semibold font-heading mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { href: "/ideas", icon: ActivityIcon, label: "Find Ideas" },
                  { href: "/roadmaps", icon: MapIcon, label: "Roadmaps" },
                  { href: "/learn", icon: BookOpenIcon, label: "Library" },
                  { href: "/mentors", icon: MessageSquareIcon, label: "Mentors" },
                ].map((action) => (
                  <motion.div
                    key={action.href}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Link
                      href={action.href}
                      className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white border border-border/40 shadow-premium hover:shadow-premium-hover transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo to-indigo-light flex items-center justify-center text-white group-hover:from-indigo group-hover:to-indigo-light transition-colors">
                        <action.icon className="size-5" />
                      </div>
                      <span className="text-sm font-semibold font-heading text-foreground group-hover:text-indigo transition-colors">{action.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Analytics Overview */}
            <motion.div variants={fadeInUp}>
              <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="size-5 text-indigo" />
                    Analytics Overview
                  </CardTitle>
                  <Badge variant="secondary">This Week</Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Area Chart — Learning Activity */}
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">Learning Activity</p>
                      <p className="text-xs text-muted-foreground mb-3">Minutes spent this week</p>
                      <ResponsiveContainer width="100%" height={180}>
                        <AreaChart data={weeklyData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                          <defs>
                            <linearGradient id="areaIndigoGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2B3A67" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#2B3A67" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                          <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#6B6156" }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 10, fill: "#6B6156" }} axisLine={false} tickLine={false} />
                          <Tooltip content={<CustomTooltip />} />
                          <Area type="monotone" dataKey="minutes" stroke="#2B3A67" strokeWidth={2.5} fill="url(#areaIndigoGrad)" dot={{ fill: "#2B3A67", strokeWidth: 2, r: 3 }} activeDot={{ r: 5, fill: "#2B3A67" }} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Radar Chart — Skill Proficiency */}
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">Skill Proficiency</p>
                      <p className="text-xs text-muted-foreground mb-3">Based on your assessment</p>
                      <ResponsiveContainer width="100%" height={180}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                          <PolarGrid stroke="rgba(0,0,0,0.06)" />
                          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: "#6B6156" }} />
                          <Radar name="Skills" dataKey="A" stroke="#E8A33D" fill="#E8A33D" fillOpacity={0.25} strokeWidth={2} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Continue Learning */}
            <motion.div variants={fadeInUp}>
              <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable">
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
                      <motion.div
                        key={resource.id}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="group flex gap-4 items-start p-4 rounded-2xl border border-border/40 hover:border-indigo/25 hover:shadow-md transition-all duration-300 relative"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-28 h-20 shrink-0 rounded-xl overflow-hidden bg-muted">
                          <Image
                            src={resource.thumbnail}
                            alt={resource.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-center justify-center">
                            <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
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
                            <Progress value={progress} />
                          </div>
                        </div>
                        {/* Bookmark button */}
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => bookmarked ? removeBookmark(resource.id) : addBookmark(resource.id, "learning")}
                          className={cn(
                            "self-center shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
                            bookmarked ? "bg-indigo/10 text-indigo" : "bg-muted text-muted-foreground hover:bg-indigo/10 hover:text-indigo"
                          )}
                          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                        >
                          {bookmarked ? <BookmarkIcon className="size-4 fill-current" /> : <BookmarkIcon className="size-4" />}
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Bookmarks */}
            <motion.div variants={fadeInUp}>
              <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable">
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
                  {MOCK_LEARNING_RESOURCES.slice(0, 2).map((resource) => {
                    const bookmarked = isBookmarked(resource.id);
                    if (!bookmarked) return null;
                    return (
                      <motion.div
                        key={resource.id}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="flex items-center gap-4 p-3 rounded-xl border border-border/40 hover:border-indigo/25 hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo/10 to-indigo-light/10 flex items-center justify-center shrink-0">
                          <BookmarkIcon className="size-5 text-indigo fill-current" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{resource.title}</p>
                          <p className="text-xs text-thread">{resource.category} · {resource.duration}</p>
                        </div>
                        <Badge variant="secondary" className="text-[10px] font-semibold shrink-0">{resource.difficulty}</Badge>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeBookmark(resource.id)}
                          className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all"
                          aria-label="Remove bookmark"
                        >
                          <BookmarkIcon className="size-3.5 fill-current" />
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Coach Banner */}
            <motion.div variants={fadeInUp}>
              <Card className="rounded-2xl bg-gradient-to-r from-indigo to-indigo-light border-none shadow-premium overflow-hidden hoverable">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <Sparkles className="size-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-heading text-white">Your AI Startup Coach</h3>
                      <p className="text-sm text-white/80 mt-1 font-sans">I&apos;ve analyzed your progress. Here&apos;s what I recommend for this week:</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/roadmaps" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-colors">
                      <ArrowRight className="size-4" />
                      Complete your Roadmap milestone
                    </Link>
                    <Link href="/mentors" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-colors">
                      <MessageSquareIcon className="size-4" />
                      Book a mentor session
                    </Link>
                    <Link href="/ideas" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-colors">
                      <Lightbulb className="size-4" />
                      Explore AI-powered ideas
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Features Grid */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-lg font-semibold font-heading mb-4">AI Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AI Roadmap Generator */}
                <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo to-indigo-light flex items-center justify-center mb-4 shadow-md">
                      <Bot className="size-6 text-white" />
                    </div>
                    <h3 className="font-bold font-heading text-base mb-1.5">AI Roadmap Generator</h3>
                    <p className="text-sm text-thread mb-4 font-sans">Generate a custom roadmap based on your skills and goals</p>
                    <Link href="/roadmaps"><Button size="sm">Generate Roadmap</Button></Link>
                  </CardContent>
                </Card>

                {/* AI Mentor Matching */}
                <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo to-indigo-light flex items-center justify-center mb-4 shadow-md">
                      <Users className="size-6 text-white" />
                    </div>
                    <h3 className="font-bold font-heading text-base mb-1.5">AI Mentor Matching</h3>
                    <p className="text-sm text-thread mb-4 font-sans">Get matched with mentors based on your learning style</p>
                    <Link href="/mentors"><Button size="sm">Find My Mentor</Button></Link>
                  </CardContent>
                </Card>

                {/* AI Resume Review */}
                <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo to-indigo-light flex items-center justify-center mb-4 shadow-md">
                      <FileText className="size-6 text-white" />
                    </div>
                    <h3 className="font-bold font-heading text-base mb-1.5">AI Resume Review</h3>
                    <p className="text-sm text-thread mb-4 font-sans">Get AI-powered feedback on your startup resume</p>
                    <Link href="/profile/edit"><Button size="sm">Review Resume</Button></Link>
                  </CardContent>
                </Card>

                {/* AI Skill Assessment */}
                <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo to-indigo-light flex items-center justify-center mb-4 shadow-md">
                      <Brain className="size-6 text-white" />
                    </div>
                    <h3 className="font-bold font-heading text-base mb-1.5">AI Skill Assessment</h3>
                    <p className="text-sm text-thread mb-4 font-sans">Test your entrepreneurial skills with AI-generated questions</p>
                    <Link href="/assessment"><Button size="sm">Take Assessment</Button></Link>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={fadeInUp}>
              <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ActivityIcon className="size-5 text-indigo" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative space-y-0">
                    <div className="absolute left-[18px] top-0 bottom-0 w-px bg-border/50" />
                    {[
                      { action: "Completed lesson", item: "Business Model Canvas", time: "2 hours ago", icon: CheckCircle2Icon, color: "emerald", bg: "bg-emerald-100", text: "text-emerald-600" },
                      { action: "Started roadmap", item: "Digital Freelancing", time: "1 day ago", icon: MapIcon, color: "indigo", bg: "bg-indigo/10", text: "text-indigo" },
                      { action: "Booked session", item: "With Aarav Mehta", time: "2 days ago", icon: Calendar, color: "marigold", bg: "bg-marigold/10", text: "text-marigold-dark" },
                      { action: "Earned badge", item: "Quick Learner", time: "3 days ago", icon: AwardIcon, color: "purple", bg: "bg-purple-100", text: "text-purple-600" },
                    ].map((activity, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                        className="flex items-start gap-4 py-4 pl-2 hover:bg-muted/20 rounded-xl transition-colors relative"
                      >
                        <div className={cn("relative z-10 w-9 h-9 rounded-xl flex items-center justify-center shrink-0", activity.bg)}>
                          <activity.icon className={cn("size-4", activity.text)} />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <p className="text-sm font-semibold">
                            <span className="text-thread">{activity.action}</span>
                            {" "}<span className="text-indigo">{activity.item}</span>
                          </p>
                          <p className="text-xs text-thread mt-0.5">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>

          {/* ── Sidebar ───────────────────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            {/* Daily Goal with Progress Ring */}
            <motion.div variants={fadeInUp}>
              <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-indigo via-indigo-light to-marigold" />
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
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo to-indigo-light flex items-center justify-center shrink-0">
                          <VideoIcon className="size-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-xs">Watch 1 Video</p>
                          <p className="text-[10px] text-emerald-600 font-medium">Completed</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 rounded-xl bg-surface border border-border/30">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-marigold to-marigold-light flex items-center justify-center shrink-0">
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
            </motion.div>

            {/* Recommended Mentors / AI Recommendations */}
            {hasTakenAssessment && (
              <motion.div variants={fadeInUp}>
                <Card className="rounded-2xl bg-white border-border/40 shadow-premium hoverable overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-purple-500 via-indigo to-indigo-light" />
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BrainCircuitIcon className="size-5 text-indigo" />
                      Recommended
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/resource/lr-3" className="group block p-4 rounded-2xl border-2 border-indigo/20 hover:border-indigo/40 hover:bg-indigo/5 transition-all duration-300">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo to-indigo-light flex items-center justify-center shadow-md shrink-0">
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
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md shrink-0">
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
              </motion.div>
            )}

            {/* Upcoming Sessions */}
            <motion.div variants={fadeInUp}>
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
            </motion.div>

            {/* Total XP Badge */}
            <motion.div variants={fadeInUp}>
              <Card className="rounded-2xl bg-gradient-to-br from-marigold/10 to-amber-500/5 border-marigold/20 shadow-premium hoverable overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-marigold to-amber-400" />
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-marigold to-amber-500 flex items-center justify-center">
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
            </motion.div>

          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
