"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Star,
  Target,
  ShieldCheck,
  CheckSquare,
  Plus,
  Minus,
  Route,
  Bot,
  Lightbulb,
  GraduationCap,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CompanyLogos } from "@/components/ui/company-logos";
import { MOCK_IDEAS } from "@/data/mock-ideas";
import { MOCK_LEARNING_RESOURCES } from "@/data/mock-learning";
import Image from "next/image";
const FEATURES = [
  {
    icon: Route,
    title: "Structured Roadmaps",
    description:
      "Step-by-step guides from your first idea to your first paying customer. No guesswork, just a proven path.",
  },
  {
    icon: Bot,
    title: "AI Mentor",
    description:
      "Get personalized guidance, idea validation, and actionable next steps powered by intelligent analysis.",
  },
  {
    icon: Lightbulb,
    title: "Curated Business Ideas",
    description:
      "Explore 200+ curated business ideas matched to your skills with real earning projections and startup costs.",
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description:
      "50+ hands-on courses, videos, and checklists covering strategy, marketing, finance, and legal essentials.",
  },
  {
    icon: MessageSquare,
    title: "Mentor Community",
    description:
      "Book 1-on-1 sessions and learn from 500+ verified entrepreneurs who have built what you are building.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Visual dashboards, XP streaks, and completion metrics that keep you accountable and moving forward.",
  },
];

const STATS = [
  { value: "50+", label: "Courses & Learning Paths" },
  { value: "200+", label: "Curated Business Ideas" },
  { value: "500+", label: "Verified Mentors" },
  { value: "94%", label: "Course Completion Rate" },
];

const TESTIMONIALS = [
  {
    quote:
      "The structured roadmap showed me exactly what steps to take next. I went from a graphic design hobby to a ₹60K/month business within 3 months.",
    name: "Priya Sharma",
    role: "Home Bakery Founder",
    initials: "PS",
  },
  {
    quote:
      "Connecting with a mentor who had built an agency gave me the confidence to quit my job and freelance full-time. The community here is genuinely supportive.",
    name: "Rohit Verma",
    role: "Web Developer & Agency Owner",
    initials: "RV",
  },
  {
    quote:
      "I had no idea how to price products or market them online. The business model canvas and pricing guide changed everything for my boutique.",
    name: "Ananya Iyer",
    role: "Boutique Store Owner",
    initials: "AI",
  },
];

const AVATARS = [47, 12, 5, 60, 68];

function HeroSection() {
  return (
    <section
      className="relative pt-16 pb-16 lg:pt-24 lg:pb-24 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-125 bg-primary/[0.07] rounded-full blur-[120px]" />
        <div className="absolute top-16 right-0 w-100 h-100 bg-accent/6 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <div>
              <Badge variant="default" className="mb-6">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Skill-To-Startup Platform
              </Badge>
            </div>

            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold font-heading tracking-tight mb-6 text-balance leading-hero"
            >
              Turn Your Skills Into a{" "}
              <span className="bg-linear-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Profitable Business
              </span>
            </h1>

            <p className="text-lg md:text-xl text-thread mb-10 max-w-xl text-balance leading-relaxed">
              Route from skill to startup with curated ideas, structured roadmaps, AI guidance, and
              access to 500+ industry mentors — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
              <div>
                <Link
                  href="/register"
                  className={cn(buttonVariants({ size: "xl" }), "w-full sm:w-auto")}
                  aria-label="Start your entrepreneurial journey"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 size-5" aria-hidden="true" />
                </Link>
              </div>
              <div>
                <Link
                  href="#features"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "xl" }),
                    "w-full sm:w-auto"
                  )}
                  aria-label="Explore roadmaps"
                >
                  Explore Roadmaps
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-thread font-medium">
              <div className="flex -space-x-2" aria-label="Trusted by 10,000+ entrepreneurs">
                {AVATARS.map((img) => (
                  <div
                    key={img}
                    className="w-9 h-9 rounded-full bg-muted border-2 border-white overflow-hidden relative"
                  >
                    <Image
                      src={`https://i.pravatar.cc/100?img=${img}`}
                      alt="User"
                      fill
                      sizes="36px"
                      priority
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <span>Trusted by 10,000+ entrepreneurs worldwide</span>
            </div>
            <div className="mt-8">
              <CompanyLogos />
            </div>
          </div>

          <div className="hidden lg:block relative h-140">
            <div
            >
              <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 shadow-premium">
                <div className="h-11 bg-linear-to-r from-indigo to-indigo-light rounded-t-2xl flex items-center px-5 gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/30" aria-hidden="true" />
                  <div className="w-3 h-3 rounded-full bg-white/30" aria-hidden="true" />
                  <div className="w-3 h-3 rounded-full bg-white/30" aria-hidden="true" />
                  <span className="ml-4 text-white/90 text-sm font-medium">
                    Entrepreneur Dashboard
                  </span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-24 bg-linear-to-br from-indigo/10 to-indigo-light/5 rounded-xl border border-indigo/10" />
                    <div className="h-24 bg-linear-to-br from-marigold/10 to-marigold-light/5 rounded-xl border border-marigold/10" />
                    <div className="h-24 bg-surface-success/60 rounded-xl border border-success/15" />
                  </div>
                  <div className="h-28 bg-muted/40 rounded-xl border border-border/40" />
                </div>
              </Card>
            </div>

            <div
            >
              <Card className="absolute top-8 right-0 p-4 shadow-premium">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-success to-emerald-600 flex items-center justify-center shrink-0">
                    <Target className="size-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Roadmap Active</p>
                    <p className="text-xs text-thread">Cloud Kitchen Plan</p>
                  </div>
                </div>
              </Card>
            </div>

            <div
            >
              <Card className="absolute bottom-16 left-0 p-4 shadow-premium">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo to-indigo-light flex items-center justify-center shrink-0">
                    <ShieldCheck className="size-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Mentor Scheduled</p>
                    <p className="text-xs text-thread">Tomorrow, 4:00 PM</p>
                  </div>
                </div>
              </Card>
            </div>

            <div
            >
              <Card className="absolute bottom-4 right-4 p-4 shadow-premium">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-marigold to-marigold-light flex items-center justify-center shrink-0">
                    <GraduationCap className="size-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Course Complete</p>
                    <p className="text-xs text-thread">+120 XP earned</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section
      className="py-12 border-y border-border/40"
      aria-label="Platform statistics"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-heading text-indigo mb-1">
                {s.value}
              </div>
              <div className="text-sm text-thread font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section
      className="py-20"
      aria-labelledby="dashboard-heading"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <div>
            <Badge variant="outline" className="mb-4">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Live Platform Preview
            </Badge>
          </div>
          <h2 id="dashboard-heading" className="text-3xl md:text-4xl font-bold font-heading mb-3 tracking-tight">
            Your entrepreneurship workspace, built for founders
          </h2>
          <p className="text-thread text-lg max-w-2xl mx-auto">
            Everything from idea exploration to progress tracking, organized cleanly in one
            dashboard.
          </p>
        </div>

        <div
          className="relative mx-auto max-w-5xl rounded-2xl border border-border/50 bg-white shadow-premium overflow-hidden"
        >
          <div className="flex items-center gap-2 px-5 h-12 border-b border-border/40">
            <div className="w-3 h-3 rounded-full bg-danger/80" aria-hidden="true" />
            <div className="w-3 h-3 rounded-full bg-marigold/80" aria-hidden="true" />
            <div className="w-3 h-3 rounded-full bg-success/80" aria-hidden="true" />
            <div className="ml-4 h-3 w-52 bg-muted rounded-md" />
          </div>
          <div className="flex min-h-90">
            <div className="hidden sm:flex w-48 flex-col border-r border-border/40 p-4 gap-2 bg-surface">
              <div className="h-8 w-28 rounded-lg bg-linear-to-r from-indigo to-indigo-light shadow-sm" />
              {["Dashboard", "Ideas", "Roadmaps", "Learning", "Mentors"].map((label) => (
                <div
                  key={label}
                  className="h-9 w-full rounded-lg hover:bg-muted transition-colors text-xs flex items-center px-3 text-thread"
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="flex-1 p-5 lg:p-8 space-y-6 bg-white">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="h-7 w-48 bg-indigo/10 rounded-lg mb-2" />
                  <div className="h-4 w-64 bg-muted rounded-md" />
                </div>
                <div className="h-10 w-10 rounded-full bg-indigo/10 border border-indigo/20 shrink-0" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Roadmaps", accent: "from-indigo/10 to-indigo-light/5" },
                  { label: "Courses", accent: "from-marigold/10 to-marigold-light/5" },
                  { label: "Mentors", accent: "from-success/10 to-emerald-100/50" },
                  { label: "Progress", accent: "from-indigo/5 to-muted/20" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`h-24 bg-linear-to-br ${item.accent} rounded-xl border border-border/40`}
                    aria-label={item.label}
                  />
                ))}
              </div>
              <div className="space-y-3">
                {MOCK_IDEAS.slice(0, 3).map((idea) => (
                  <div
                    key={idea.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-surface"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo/10 flex items-center justify-center shrink-0">
                      <Lightbulb className="size-5 text-indigo" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{idea.title}</p>
                      <p className="text-xs text-thread">{idea.category}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {idea.difficulty}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const iconColors = [
    "from-indigo to-indigo-light",
    "from-indigo to-indigo-light",
    "from-marigold to-marigold-light",
    "from-indigo to-indigo-light",
    "from-marigold to-marigold-light",
    "from-indigo to-indigo-light",
  ];

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <div>
            <Badge variant="secondary" className="mb-4">
              <Target className="size-3.5" aria-hidden="true" />
              Core Features
            </Badge>
          </div>
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold font-heading mb-3 tracking-tight">
            Everything you need to launch with confidence
          </h2>
          <p className="text-thread text-lg max-w-2xl mx-auto">
            From idea generation to revenue milestones, our platform provides structured support at
            every stage of your founder journey.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title}>
                <Card
                  hoverable
                  className="group p-6 bg-white border-border/40"
                  tabIndex={0}
                  role="article"
                  aria-label={feature.title}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${iconColors[i]} flex items-center justify-center mb-5 shadow-lg`}
                    aria-hidden="true"
                  >
                    <Icon className="size-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold font-heading mb-2 group-hover:text-indigo transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-thread leading-relaxed">{feature.description}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section
      className="py-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <div>
            <Badge variant="outline" className="mb-4">
              <Star className="size-3.5 fill-current" aria-hidden="true" />
              Social Proof
            </Badge>
          </div>
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold font-heading mb-3 tracking-tight">
            Trusted by founders who started with a skill
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <div key={t.name}>
              <Card
                hoverable
                className="p-6 bg-white border-border/40 flex flex-col"
                tabIndex={0}
                role="article"
                aria-label={`Testimonial from ${t.name}`}
              >
                <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="size-4 text-marigold fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-thread leading-relaxed flex-1 mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                  <div
                    className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center text-sm font-bold text-indigo shrink-0"
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-thread">{t.role}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LearningPreview() {
  return (
    <section
      className="py-20 bg-linear-to-b from-muted/20 via-muted/10 to-transparent"
      aria-labelledby="learning-heading"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div>
              <Badge variant="default" className="mb-4">
                <BookOpen className="size-3.5" aria-hidden="true" />
                Learning Resources
              </Badge>
            </div>
            <h2 id="learning-heading" className="text-3xl md:text-4xl font-bold font-heading mb-4 tracking-tight">
              Structured learning for every stage
            </h2>
            <p className="text-thread text-lg mb-8 leading-relaxed">
              Access 50+ courses, articles, and checklists spanning business strategy, marketing,
              finance, and law — all curated for founders.
            </p>

            <div className="space-y-3">
              {MOCK_LEARNING_RESOURCES.slice(0, 3).map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-white hover:shadow-premium transition-all duration-300"
                  tabIndex={0}
                  role="article"
                  aria-label={resource.title}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      resource.type === "video"
                        ? "bg-linear-to-br from-indigo to-indigo-light"
                        : resource.type === "checklist"
                        ? "bg-linear-to-br from-success to-emerald-600"
                        : "bg-linear-to-br from-marigold to-marigold-light"
                    }`}
                    aria-hidden="true"
                  >
                    {resource.type === "video" ? (
                      <BookOpen className="size-5 text-white" />
                    ) : resource.type === "checklist" ? (
                      <CheckSquare className="size-5 text-white" />
                    ) : (
                      <BookOpen className="size-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">
                      {resource.title}
                    </p>
                    <p className="text-xs text-thread">{resource.duration}</p>
                  </div>
                  <ArrowRight className="size-4 text-thread shrink-0" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div
            >
              <Card className="p-6 shadow-premium">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-marigold shrink-0" aria-hidden="true" />
                  <p className="text-xs font-semibold text-thread uppercase tracking-wider">
                    Learning Progress
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Business Strategy", done: 8, total: 12, color: "bg-indigo" },
                    { label: "Marketing", done: 5, total: 9, color: "bg-marigold" },
                    { label: "Finance", done: 6, total: 8, color: "bg-success" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-medium text-foreground">{item.label}</span>
                        <span className="text-thread">{item.done}/{item.total}</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden" role="progressbar" aria-valuenow={item.done} aria-valuemin={0} aria-valuemax={item.total} aria-label={`${item.label} progress: ${item.done} of ${item.total}`}>
                        <div
                          className={`h-full ${item.color} rounded-full`}
                          style={{ width: `${(item.done / item.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="mt-2 p-4 rounded-xl bg-surface border border-border/40">
                    <p className="text-2xl font-bold font-heading text-indigo">94%</p>
                    <p className="text-xs text-thread">Average completion rate</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IdeasPreview() {
  const ideas = MOCK_IDEAS.slice(0, 3);

  return (
    <section
      className="py-20"
      aria-labelledby="ideas-heading"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <div>
            <Badge variant="secondary" className="mb-4">
              <Lightbulb className="size-3.5" aria-hidden="true" />
              Business Ideas
            </Badge>
          </div>
          <h2 id="ideas-heading" className="text-3xl md:text-4xl font-bold font-heading mb-3 tracking-tight">
            Curated ideas matched to your skills
          </h2>
          <p className="text-thread text-lg max-w-2xl mx-auto">
            Each idea includes real earning projections, startup cost estimates, and a step-by-step
            roadmap to launch.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {ideas.map((idea) => (
            <div key={idea.id}>
              <Card
                hoverable
                className="overflow-hidden bg-white border-border/40"
                tabIndex={0}
                role="article"
                aria-label={`Business idea: ${idea.title}`}
              >
                <div className="h-2 w-full bg-linear-to-r from-indigo via-indigo-light to-marigold" aria-hidden="true" />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-bold font-heading leading-snug">
                      {idea.title}
                    </h3>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {idea.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-thread mb-5 leading-relaxed">
                    {idea.shortDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-sm mb-5 bg-muted/40 rounded-xl p-4">
                    <div>
                      <p className="text-xs text-thread uppercase font-semibold tracking-wider mb-0.5">
                        Investment
                      </p>
                      <p className="font-bold text-foreground">
                        ₹{idea.investment.min.toLocaleString()} –{" "}
                        {idea.investment.max.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-thread uppercase font-semibold tracking-wider mb-0.5">
                        Income/mo
                      </p>
                      <p className="font-bold text-foreground">
                        ₹{idea.expectedMonthlyIncome.min.toLocaleString()} –{" "}
                        {idea.expectedMonthlyIncome.max.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/ideas/${idea.id}`}
                    className={cn(
                      "flex items-center justify-center w-full py-2.5 rounded-xl border border-indigo/20 text-sm font-semibold text-indigo hover:bg-indigo hover:text-white transition-all duration-300 focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2"
                    )}
                    aria-label={`View roadmap for ${idea.title}`}
                  >
                    View Roadmap
                  </Link>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section
      className="py-20"
      aria-labelledby="cta-heading"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="relative bg-linear-to-br from-indigo via-indigo-light to-indigo-dark rounded-3xl overflow-hidden px-8 py-16 md:py-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(232,163,61,0.12),transparent)] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <div>
              <Badge variant="secondary" className="mb-6">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Get Started Today
              </Badge>
            </div>
            <h2 id="cta-heading" className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white tracking-tight">
              Start Your Entrepreneurial Journey
            </h2>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Join 10,000+ founders who turned their skills into thriving businesses. Create a free
              account and get personalized recommendations in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div>
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "xl" }),
                    "w-full sm:w-auto"
                  )}
                  aria-label="Create your free account"
                >
                  Create Free Account
                  <ArrowRight className="ml-2 size-5" aria-hidden="true" />
                </Link>
              </div>
              <div>
                <Link
                  href="#features"
                  className={cn(buttonVariants({ variant: "outline", size: "xl" }), "w-full sm:w-auto border-white/40 text-white hover:bg-white/10")}
                  aria-label="See how it works"
                >
                  See How It Works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-3" role="list">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-border/40 hover:border-indigo/30 transition-all duration-300 overflow-hidden"
          role="listitem"
        >
          <h3>
            <button
              className="w-full px-6 py-5 flex justify-between items-center text-left font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-inset rounded-2xl"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              aria-expanded={openIdx === i}
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
            >
              <span className="text-base pr-4">{item.q}</span>
              {openIdx === i ? (
                <Minus className="size-5 text-indigo shrink-0" aria-hidden="true" />
              ) : (
                <Plus className="size-5 text-thread shrink-0" aria-hidden="true" />
              )}
            </button>
          </h3>
          <div
            id={`faq-answer-${i}`}
            role="region"
            aria-labelledby={`faq-question-${i}`}
            hidden={openIdx !== i}
            className={cn(
              "px-6 overflow-hidden transition-all duration-300 ease-out",
              openIdx === i ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <p className="text-thread leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const FAQS = [
  {
    q: "Who is this platform designed for?",
    a: "Aspirational entrepreneurs, students, and working professionals who have a practical skill and want to turn it into a real business — but don't know where to start.",
  },
  {
    q: "Do I need prior business experience?",
    a: "No. Our roadmaps start from absolute basics. Whether you are a complete beginner or have some exposure, the platform adapts to your readiness.",
  },
  {
    q: "How are business ideas personalized?",
    a: "After onboarding, our AI engine analyzes your skills, interests, and local market context to surface ideas with the highest match score for you.",
  },
  {
    q: "Is mentor access included free?",
    a: "Many mentors offer free introductory sessions as part of our community program. Premium sessions are available separately with transparent upfront pricing.",
  },
];

function FAQSection() {
  return (
    <section
      className="py-20"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div>
              <Badge variant="outline" className="mb-4">
                <CheckSquare className="size-3.5" aria-hidden="true" />
                FAQ
              </Badge>
            </div>
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold font-heading tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div
          >
            <Accordion items={FAQS} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-indigo/10">
      <main>
        <HeroSection />
        <StatsSection />
        <DashboardPreview />
        <FeaturesSection />
        <TestimonialsSection />
        <LearningPreview />
        <IdeasPreview />
        <FAQSection />
        <FinalCTA />
      </main>
    </div>
  );
}
