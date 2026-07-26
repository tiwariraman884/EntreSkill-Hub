"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "next-auth";
import { useGlobalState } from "@/context/GlobalStateContext";
import { ALL_IDEAS } from "@/data/mock-ideas";
import { MOCK_ROADMAPS } from "@/data/mock-roadmaps";
import { MOCK_LEARNING_RESOURCES } from "@/data/mock-learning";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  BellIcon, BookmarkIcon, MapIcon, PlayIcon, CheckCircle2Icon, BookOpenIcon, 
  VideoIcon, ActivityIcon, ClockIcon, AwardIcon,
  FlameIcon, MessageSquareIcon, ArrowRightIcon, BrainCircuitIcon, PlayCircleIcon,
  TrendingUp, GraduationCap
} from "lucide-react";

export default function DashboardClient({ user }: { user: User }) {
  const { stats, bookmarks, completedResources, assessmentScores } = useGlobalState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Derive Business Readiness Score
  const hasTakenAssessment = assessmentScores !== null;
  const totalScore = hasTakenAssessment ? Object.values(assessmentScores).reduce((acc, curr) => (acc || 0) + (curr || 0), 0) : 0;
  const averageScore = hasTakenAssessment ? Math.round((totalScore || 0) / Object.keys(assessmentScores).length) : 0;

  // Resolve bookmarks
  const savedIdeas = ALL_IDEAS.filter(idea => bookmarks.some(b => b.id === idea.id && b.type === "idea")).length;
  const savedLearning = MOCK_LEARNING_RESOURCES.filter(r => bookmarks.some(b => b.id === r.id && b.type === "learning")).length;

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* ─── Dashboard Header ─── */}
      <header className="bg-background border-b sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold font-heading">Welcome back, {user?.name || "Entrepreneur"}</h1>
              <p className="text-sm text-muted-foreground">Here&apos;s your progress for today.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-full relative">
              <BellIcon className="size-4" />
              <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border border-background"></span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        
        {/* GAMIFICATION & STATS ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-primary text-primary-foreground border-none">
            <CardContent className="p-4 sm:p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-primary-foreground/80">Current Level</span>
                <AwardIcon className="size-5 text-amber-300" />
              </div>
              <div>
                <div className="text-3xl font-bold font-heading mb-1">{stats.level}</div>
                <div className="flex items-center gap-2">
                  <Progress value={(stats.xp % 500) / 5} className="h-1.5 bg-primary-foreground/20" />
                  <span className="text-xs">{stats.xp % 500}/500 XP</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-muted-foreground">Learning Streak</span>
                <FlameIcon className="size-5 text-orange-500" />
              </div>
              <div>
                <div className="text-3xl font-bold font-heading mb-1">{stats.streakDays} Days</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="size-3 text-emerald-500" /> +1 day from yesterday
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-muted-foreground">Resources Completed</span>
                <CheckCircle2Icon className="size-5 text-emerald-500" />
              </div>
              <div>
                <div className="text-3xl font-bold font-heading mb-1">{stats.coursesCompleted}</div>
                <p className="text-xs text-muted-foreground">Keep up the good work!</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-muted-foreground">AI Assessment</span>
                <BrainCircuitIcon className="size-5 text-indigo-500" />
              </div>
              <div>
                {hasTakenAssessment ? (
                  <>
                    <div className="text-3xl font-bold font-heading mb-1">{averageScore}/100</div>
                    <Link href="/assessment/results" className="text-xs text-primary hover:underline">View detailed report &rarr;</Link>
                  </>
                ) : (
                  <>
                    <div className="text-lg font-bold font-heading mb-1 text-muted-foreground">Not Taken</div>
                    <Link href="/assessment" className="text-xs text-primary hover:underline">Take assessment now &rarr;</Link>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* MAIN COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/ideas" className="bg-card hover:bg-muted/50 border rounded-xl p-4 flex flex-col items-center justify-center text-center transition-colors group">
                <div className="size-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <ActivityIcon className="size-5" />
                </div>
                <span className="text-sm font-medium">Find Ideas</span>
              </Link>
              <Link href="/roadmaps" className="bg-card hover:bg-muted/50 border rounded-xl p-4 flex flex-col items-center justify-center text-center transition-colors group">
                <div className="size-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <MapIcon className="size-5" />
                </div>
                <span className="text-sm font-medium">Roadmaps</span>
              </Link>
              <Link href="/learn" className="bg-card hover:bg-muted/50 border rounded-xl p-4 flex flex-col items-center justify-center text-center transition-colors group">
                <div className="size-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <GraduationCap className="size-5" />
                </div>
                <span className="text-sm font-medium">Library</span>
              </Link>
              <Link href="/mentors" className="bg-card hover:bg-muted/50 border rounded-xl p-4 flex flex-col items-center justify-center text-center transition-colors group">
                <div className="size-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <MessageSquareIcon className="size-5" />
                </div>
                <span className="text-sm font-medium">Mentors</span>
              </Link>
            </div>

            {/* Bookmarks & Saves */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Your Library</CardTitle>
                <Link href="/learn" className="text-sm text-primary hover:underline">Explore all</Link>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-xl bg-muted/20 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><BookmarkIcon className="size-4" /></div>
                      <div>
                        <p className="font-semibold">{savedIdeas}</p>
                        <p className="text-xs text-muted-foreground">Saved Business Ideas</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-xl bg-muted/20 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><BookOpenIcon className="size-4" /></div>
                      <div>
                        <p className="font-semibold">{savedLearning}</p>
                        <p className="text-xs text-muted-foreground">Saved Courses & Videos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Courses/Learning - Just a mock list showing the UI */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Continue Learning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {MOCK_LEARNING_RESOURCES.slice(0, 3).map((resource, idx) => {
                  const progress = [68, 42, 81][idx];
                  return (
                    <div key={resource.id} className="flex flex-col sm:flex-row gap-4 items-center p-3 hover:bg-muted/50 rounded-xl transition-colors border border-transparent hover:border-border">
                      <div className="w-full sm:w-40 h-24 sm:h-20 shrink-0 bg-muted rounded-lg overflow-hidden relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <PlayCircleIcon className="size-8 text-white opacity-80" />
                        </div>
                      </div>
                      <div className="flex-1 w-full space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold line-clamp-1">{resource.title}</p>
                            <p className="text-xs text-muted-foreground">{resource.category}</p>
                          </div>
                          <Badge variant="secondary" className="text-[10px]">{progress}%</Badge>
                        </div>
                        <Progress value={progress} className="h-1.5" />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

          </div>

          {/* SIDEBAR */}
          <div className="space-y-8">
            
            {/* Daily Goal */}
            <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-indigo-900">
                  <ActivityIcon className="size-5" /> Today&apos;s Goal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-indigo-200 flex items-center justify-center shrink-0 text-indigo-700">
                    <VideoIcon className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-indigo-900">Watch 1 Video Lesson</p>
                    <p className="text-xs text-indigo-700/70">1/1 Completed</p>
                  </div>
                  <CheckCircle2Icon className="size-5 text-emerald-500 ml-auto" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 text-indigo-700">
                    <MapIcon className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-indigo-900">Complete Roadmap Step</p>
                    <p className="text-xs text-indigo-700/70">0/1 Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations - based on score */}
            {hasTakenAssessment && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BrainCircuitIcon className="size-5 text-primary" /> Recommended Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/resource/lr-3" className="block p-3 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
                    <div className="flex gap-3">
                      <div className="mt-1">
                        <AwardIcon className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Company Registration Checklist</p>
                        <p className="text-xs text-muted-foreground mt-1">Based on your weak score in Legal compliance.</p>
                      </div>
                    </div>
                  </Link>
                  <Link href="/roadmaps/r-1" className="block p-3 rounded-xl border hover:border-border transition-colors">
                    <div className="flex gap-3">
                      <div className="mt-1">
                        <MapIcon className="size-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Tech Startup Roadmap</p>
                        <p className="text-xs text-muted-foreground mt-1">Matches your high technology proficiency.</p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Upcoming Mentorship */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6 px-4 bg-muted/20 border border-dashed rounded-xl">
                  <ClockIcon className="size-8 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="text-sm font-medium mb-1">No upcoming sessions</p>
                  <p className="text-xs text-muted-foreground mb-4">Book a mentor to accelerate your growth.</p>
                  <Link href="/mentors" className={buttonVariants({ variant: "outline", size: "sm" })}>
                    Find a Mentor
                  </Link>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
}
