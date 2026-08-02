import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ActivityIcon,
  MapIcon,
  BookOpenIcon,
  MessageSquareIcon,
  CheckCircle2Icon,
  AwardIcon,
  Calendar,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Bot,
  FileText,
  Brain,
  Users,
} from "lucide-react";

export function QuickActions() {
  return (
    <section className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
      <h2 className="text-lg font-semibold font-heading mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { href: "/ideas", icon: ActivityIcon, label: "Find Ideas" },
          { href: "/roadmaps", icon: MapIcon, label: "Roadmaps" },
          { href: "/learn", icon: BookOpenIcon, label: "Library" },
          { href: "/mentors", icon: MessageSquareIcon, label: "Mentors" },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-card border border-border/40 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo to-indigo-light flex items-center justify-center text-white group-hover:from-indigo group-hover:to-indigo-light transition-colors">
              <action.icon className="size-5" />
            </div>
            <span className="text-sm font-semibold font-heading text-foreground group-hover:text-indigo transition-colors">{action.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function AICoachBanner() {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
      <Card className="rounded-2xl bg-linear-to-r from-indigo to-indigo-light border-none shadow-premium overflow-hidden hoverable">
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
    </div>
  );
}

export function AIFeaturesGrid() {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
      <h2 className="text-lg font-semibold font-heading mb-4">AI Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Roadmap Generator */}
        <Card className="rounded-2xl bg-card border-border/40 shadow-premium hoverable">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo to-indigo-light flex items-center justify-center mb-4 shadow-md">
              <Bot className="size-6 text-white" />
            </div>
            <h3 className="font-bold font-heading text-base mb-1.5">AI Roadmap Generator</h3>
            <p className="text-sm text-thread mb-4 font-sans">Generate a custom roadmap based on your skills and goals</p>
            <Link href="/roadmaps"><Button size="sm">Generate Roadmap</Button></Link>
          </CardContent>
        </Card>

        {/* AI Mentor Matching */}
        <Card className="rounded-2xl bg-card border-border/40 shadow-premium hoverable">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo to-indigo-light flex items-center justify-center mb-4 shadow-md">
              <Users className="size-6 text-white" />
            </div>
            <h3 className="font-bold font-heading text-base mb-1.5">AI Mentor Matching</h3>
            <p className="text-sm text-thread mb-4 font-sans">Get matched with mentors based on your learning style</p>
            <Link href="/mentors"><Button size="sm">Find My Mentor</Button></Link>
          </CardContent>
        </Card>

        {/* AI Resume Review */}
        <Card className="rounded-2xl bg-card border-border/40 shadow-premium hoverable">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo to-indigo-light flex items-center justify-center mb-4 shadow-md">
              <FileText className="size-6 text-white" />
            </div>
            <h3 className="font-bold font-heading text-base mb-1.5">AI Resume Review</h3>
            <p className="text-sm text-thread mb-4 font-sans">Get AI-powered feedback on your startup resume</p>
            <Link href="/profile/edit"><Button size="sm">Review Resume</Button></Link>
          </CardContent>
        </Card>

        {/* AI Skill Assessment */}
        <Card className="rounded-2xl bg-card border-border/40 shadow-premium hoverable">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo to-indigo-light flex items-center justify-center mb-4 shadow-md">
              <Brain className="size-6 text-white" />
            </div>
            <h3 className="font-bold font-heading text-base mb-1.5">AI Skill Assessment</h3>
            <p className="text-sm text-thread mb-4 font-sans">Test your entrepreneurial skills with AI-generated questions</p>
            <Link href="/assessment"><Button size="sm">Take Assessment</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function RecentActivity() {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
      <Card className="rounded-2xl bg-card border-border/40 shadow-premium hoverable">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ActivityIcon className="size-5 text-indigo" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-0">
            <div className="absolute left-4.5 top-0 bottom-0 w-px bg-border/50" />
            {[
              { action: "Completed lesson", item: "Business Model Canvas", time: "2 hours ago", icon: CheckCircle2Icon, color: "emerald", bg: "bg-emerald-100", text: "text-emerald-600" },
              { action: "Started roadmap", item: "Digital Freelancing", time: "1 day ago", icon: MapIcon, color: "indigo", bg: "bg-indigo/10", text: "text-indigo" },
              { action: "Booked session", item: "With Aarav Mehta", time: "2 days ago", icon: Calendar, color: "marigold", bg: "bg-marigold/10", text: "text-marigold-dark" },
              { action: "Earned badge", item: "Quick Learner", time: "3 days ago", icon: AwardIcon, color: "purple", bg: "bg-purple-100", text: "text-purple-600" },
            ].map((activity, i) => (
              <div
                key={i}
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
