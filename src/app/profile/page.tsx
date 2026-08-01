"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProfileContext } from "@/context/ProfileContext";
import { DUMMY_USER } from "@/data/mock-notifications";
import { ALL_IDEAS, type BusinessIdea } from "@/data/mock-ideas";
import {
  ShieldCheck,
  MapPin,
  Calendar,
  Share2,
  Download,
  BookOpen,
  Award,
  MessageSquare,
  FolderOpen,
  Flame,
  Trophy,
  Target,
  TrendingUp,
  ArrowUpRight,
  Edit3,
  Settings,
  User2,
  Mail,
  Phone,
  Globe,
  Link2,
  ExternalLink,
  BarChart3,
  Star,
  Zap,
  Bookmark,
  Lightbulb,
  Circle,
} from "lucide-react";

const joinDate = "March 2022";



const STATS = [
  { label: "XP", value: DUMMY_USER.xp, icon: TrendingUp, color: "text-primary" },
  {
    label: "Level",
    value: DUMMY_USER.level,
    icon: Trophy,
    color: "text-marigold",
  },
  {
    label: "Streak",
    value: `${DUMMY_USER.streakDays}d`,
    icon: Flame,
    color: "text-orange-500",
  },
  {
    label: "Courses Completed",
    value: DUMMY_USER.courses,
    icon: BookOpen,
    color: "text-emerald-600",
  },
  {
    label: "Ideas Saved",
    value: DUMMY_USER.bookmarks,
    icon: Bookmark,
    color: "text-rose-600",
  },
  {
    label: "Mentor Sessions",
    value: DUMMY_USER.mentorSessions,
    icon: MessageSquare,
    color: "text-violet-600",
  },
];

const SKILLS = DUMMY_USER.skills.map((name) => ({
  name,
  proficiency: Math.floor(Math.random() * (95 - 55 + 1)) + 55,
})) as { name: string; proficiency: number }[];

const ACHIEVEMENTS = [
  "Fast Learner",
  "Early Adopter",
  "Team Player",
  "Problem Solver",
  "Consistent",
  "Mentor Favorite",
  "Top Performer",
  "Community Star",
  "Roadmap Hero",
  "Idea Validator",
  "Cert Collector",
  "Streak Master",
];

const MOCK_PROJECTS = [
  {
    id: "p1",
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive analytics dashboard for online retailers with real-time sales tracking and inventory management.",
    status: "In Progress" as const,
    techStack: ["React", "Node.js", "MongoDB", "TailwindCSS"],
  },
  {
    id: "p2",
    title: "AI Study Assistant",
    description:
      "Machine learning powered study companion that generates personalized quizzes and flashcards from lecture notes.",
    status: "Completed" as const,
    techStack: ["Python", "TensorFlow", "FastAPI", "React"],
  },
  {
    id: "p3",
    title: "Campus Ride Sharing",
    description:
      "Peer-to-peer ride sharing mobile app for college students with real-time tracking and secure payments.",
    status: "In Progress" as const,
    techStack: ["React Native", "Firebase", "TypeScript"],
  },
  {
    id: "p4",
    title: "Portfolio Generator",
    description:
      "CLI tool that scaffolds production-ready developer portfolios with GitHub integration and CI/CD pipelines.",
    status: "Planning" as const,
    techStack: ["Node.js", "TypeScript", "GitHub API", "Docker"],
  },
  {
    id: "p5",
    title: "Smart Attendance System",
    description:
      "Face recognition powered attendance tracker for classrooms using cloud-based ML models.",
    status: "Completed" as const,
    techStack: ["Python", "OpenCV", "Flask", "PostgreSQL"],
  },
  {
    id: "p6",
    title: "DevOps Pipeline Builder",
    description:
      "Visual tool to design and deploy CI/CD pipelines across multiple cloud providers with template library.",
    status: "In Progress" as const,
    techStack: ["Go", "Kubernetes", "Terraform", "Next.js"],
  },
  {
    id: "p7",
    title: "Community Forum",
    description:
      "Open-source discussion platform for developers with markdown support, code highlighting, and reputation system.",
    status: "Planning" as const,
    techStack: ["Next.js", "PostgreSQL", "Prisma", "tRPC"],
  },
];

const MOCK_CERTIFICATES = [
  { id: "c1", title: "React Developer Certification", issuer: "Meta", date: "Dec 2024" },
  { id: "c2", title: "Node.js Backend Specialist", issuer: "OpenJS Foundation", date: "Nov 2024" },
  { id: "c3", title: "TypeScript Fundamentals", issuer: "Microsoft", date: "Oct 2024" },
  { id: "c4", title: "AWS Cloud Practitioner", issuer: "Amazon", date: "Sep 2024" },
  { id: "c5", title: "MongoDB Associate Developer", issuer: "MongoDB Inc.", date: "Aug 2024" },
  { id: "c6", title: "UI/UX Design Fundamentals", issuer: "Google", date: "Jul 2024" },
  {
    id: "c7",
    title: "Docker & Kubernetes Essentials",
    issuer: "Linux Foundation",
    date: "Jun 2024",
  },
  { id: "c8", title: "PostgreSQL Deep Dive", issuer: "Datacamp", date: "May 2024" },
];

const WEEKLY_GOAL = { current: 5, target: 7 };

const STREAK_DAYS = Array.from({ length: 28 }).map((_, i) => ({
  day: i + 1,
  active: Math.random() > 0.25,
}));

function ProgressRing({ value, size = 120 }: { value: number; size?: number }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const stroke = 8;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 150);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 120 120" className="transform -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="white"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-2xl font-bold text-white"
        >
          {value}%
        </span>
        <span className="text-[11px] text-white/70 font-medium">Complete</span>
      </div>
    </div>
  );
}

function StreakCalendar() {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const startDayOfWeek = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  const days: { date: number; active: boolean; isToday: boolean }[] = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push({ date: 0, active: false, isToday: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate();
    const active = STREAK_DAYS.find((s) => s.day === d)?.active ?? false;
    days.push({ date: d, active, isToday });
  }

  const monthName = today.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p
          className="text-sm font-semibold font-heading text-ink"
        >
          {monthName}
        </p>
        <div
        >
          <Flame
            className={cn(
              "size-4",
              DUMMY_USER.streakDays > 0 ? "text-orange-500 animate-flame" : "text-muted-foreground"
            )}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {weekDays.map((w) => (
          <div
            key={w}
            className="text-center text-[10px] font-semibold text-thread uppercase tracking-wide"
          >
            {w}
          </div>
        ))}
        {days.map((d, idx) => (
          <div
            key={idx}
            className={cn(
              "aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-colors duration-300",
              d.date === 0 ? "invisible" : "",
              d.isToday ? "ring-2 ring-marigold ring-offset-1" : "",
              d.active ? "bg-primary/10 text-primary" : "text-muted-foreground/50"
            )}
          >
            {d.date > 0 && d.active && <Circle className="size-2.5 text-marigold" />}
            {d.date > 0 && !d.active && d.date}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "Completed"
      ? "default"
      : status === "In Progress"
        ? "secondary"
        : "outline";
  return (
    <Badge variant={variant} className="text-[11px]">
      {status}
    </Badge>
  );
}

function ProfileHero() {
  const { profile } = useProfileContext();
  const avatarUrl = profile?.profile?.avatar || DUMMY_USER.avatarUrl;
  const fullName = profile?.name || `${DUMMY_USER.firstName} ${DUMMY_USER.lastName}`;
  const bio = profile?.profile?.bio || DUMMY_USER.bio;
  const headline = profile?.profile?.headline || "Aspiring Entrepreneur | AI Enthusiast";
  const location = profile?.profile?.location || DUMMY_USER.location;
  const publicUrl = profile?.profile?.publicProfileUrl || DUMMY_USER.username;

  return (
    <section
      className="relative overflow-hidden bg-linear-to-br from-indigo via-indigo-light to-indigo-dark py-12 lg:py-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(232,163,61,0.08),transparent)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
        <div
          className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
        >
          <div className="relative shrink-0">
            <div className="relative rounded-full p-0.75 bg-linear-to-br from-indigo to-marigold">
              <Avatar size="xl" className="size-28 lg:size-32 rounded-full ring-4 ring-white shadow-2xl shadow-black/20">
                <AvatarImage
                  src={avatarUrl}
                  alt={fullName}
                />
                <AvatarFallback className="text-2xl font-bold text-white bg-linear-to-br from-indigo to-indigo-light">
                  {fullName?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="absolute -bottom-1 -right-1">
              <Badge className="bg-linear-to-r from-marigold to-marigold-light text-ink border-0 shadow-lg">
                L{DUMMY_USER.level}
              </Badge>
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-3">
              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-white tracking-tight">
                {fullName}
              </h1>
              <ShieldCheck className="size-5 text-marigold shrink-0" />
            </div>
            <p className="text-white/80 font-mono text-sm mb-1">@{publicUrl}</p>
            <p className="text-white/70 text-sm mb-5 font-medium">
              {headline}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6 text-sm text-white/90">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 text-white/70" />
                {location}
              </span>
              <span className="text-white/30">|</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4 text-white/70" />
                Joined {joinDate}
              </span>
            </div>

            <p className="text-white/70 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 text-sm lg:text-base">
              {bio}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link href="/settings">
                <Button variant="default" size="sm">
                  <Edit3 className="size-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                <Share2 className="size-4 mr-2" />
                Share Profile
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Download className="size-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>

          <div className="hidden xl:flex flex-col items-center gap-3 shrink-0">
            <ProgressRing value={DUMMY_USER.completionPercentage} size={130} />
            <p className="text-xs text-white/60 font-medium">Profile Strength</p>
          </div>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-10"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
            >
              <stat.icon className={cn("size-5 mb-2", stat.color)} />
              <span className="text-xl font-heading font-bold text-white">{stat.value}</span>
              <span className="text-[11px] text-white/60 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Skills Card */}
      <div>
        <Card className="overflow-hidden border border-border/60 shadow-premium hoverable">
          <div className="h-1 w-full bg-linear-to-r from-primary via-indigo-light to-accent" />
          <CardHeader className="pb-3 pt-5">
            <CardTitle className="flex items-center gap-2.5 text-base">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <BarChart3 className="size-4 text-primary" />
              </div>
              <span className="font-heading font-bold text-ink">Skills</span>
              <span className="ml-auto text-[11px] text-thread font-medium">{SKILLS.length} skills tracked</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SKILLS.map((skill) => (
                <div
                  key={skill.name}
                  className="space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-ink">{skill.name}</span>
                    <span className={cn(
                      "text-xs font-bold tabular-nums px-2 py-0.5 rounded-full",
                      skill.proficiency >= 90 ? "bg-emerald-100 text-emerald-700" :
                      skill.proficiency >= 70 ? "bg-indigo/10 text-indigo" :
                      "bg-amber-100 text-amber-700"
                    )}>{skill.proficiency}%</span>
                  </div>
                  <Progress value={skill.proficiency} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preferred Industries */}
        <div>
          <Card className="overflow-hidden border border-border/60 shadow-premium hoverable h-full">
            <div className="h-1 w-full bg-linear-to-r from-marigold to-marigold-light" />
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="flex items-center gap-2.5 text-base">
                <div className="w-8 h-8 rounded-xl bg-marigold/10 flex items-center justify-center">
                  <Globe className="size-4 text-marigold-dark" />
                </div>
                <span className="font-heading font-bold text-ink">Preferred Industries</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {DUMMY_USER.preferredIndustries?.map((industry) => (
                  <Badge key={industry} className="bg-marigold/10 text-marigold-dark border-marigold/20 border hover:bg-marigold/20 transition-colors">
                    {industry}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Streak */}
        <div>
          <Card className="overflow-hidden border border-border/60 shadow-premium hoverable h-full">
            <div className="h-1 w-full bg-linear-to-r from-orange-400 to-red-500" />
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="flex items-center gap-2.5 text-base">
                <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Flame className="size-4 text-orange-500" />
                </div>
                <span className="font-heading font-bold text-ink">Learning Streak</span>
                <Badge className="ml-auto bg-orange-100 text-orange-700 border-orange-200 border text-[11px]">
                  {DUMMY_USER.streakDays}d 🔥
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StreakCalendar />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <div>
          <Card className="overflow-hidden border border-border/60 shadow-premium hoverable h-full">
            <div className="h-1 w-full bg-linear-to-r from-amber-400 to-yellow-500" />
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="flex items-center gap-2.5 text-base">
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                  <Award className="size-4 text-amber-600" />
                </div>
                <span className="font-heading font-bold text-ink">Recent Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {ACHIEVEMENTS.slice(0, 8).map((achievement) => (
                  <Badge
                    key={achievement}
                    className="border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors text-xs"
                  >
                    🏆 {achievement}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Summary */}
        <div>
          <Card className="overflow-hidden border border-border/60 shadow-premium hoverable h-full">
            <div className="h-1 w-full bg-linear-to-r from-emerald-400 to-teal-500" />
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="flex items-center gap-2.5 text-base">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <TrendingUp className="size-4 text-emerald-600" />
                </div>
                <span className="font-heading font-bold text-ink">Activity Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: "Courses in Progress", value: "3", color: "text-indigo", bg: "bg-indigo/10" },
                  { label: "Roadmaps Active", value: "2", color: "text-emerald-600", bg: "bg-emerald-50" },
                  { label: "Pending Mentor Requests", value: "1", color: "text-amber-700", bg: "bg-amber-50" },
                  { label: "XP This Week", value: "+85 XP", color: "text-primary", bg: "bg-primary/10" },
                  { label: "Community Rank", value: "Top 5%", color: "text-emerald-600", bg: "bg-emerald-50" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0"
                  >
                    <span className="text-sm text-thread">{item.label}</span>
                    <span className={cn("text-sm font-bold tabular-nums px-2.5 py-0.5 rounded-lg", item.color, item.bg)}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ProjectsTab() {
  if (MOCK_PROJECTS.length === 0) {
    return (
      <Card className="bg-white border-border/40 shadow-premium">
        <CardContent className="py-12">
          <div
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
              <FolderOpen className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-heading font-semibold text-ink mb-2">No Projects Yet</h3>
            <p className="text-sm text-thread mb-6 max-w-sm">
              Start building your portfolio by creating your first project and showcasing your skills
              to the community.
            </p>
            <Button className="gap-2">
              <FolderOpen className="size-4" />
              Add Your First Project
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {MOCK_PROJECTS.map((project) => (
        <div
          key={project.id}
        >
          <Card className="overflow-hidden border border-border/60 shadow-premium hoverable h-full transition-all duration-300 hover:-translate-y-1">
            <div className="h-1 w-full bg-linear-to-r from-primary via-indigo-light to-accent" />
            <CardHeader className="pt-4 pb-3">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-base font-heading font-semibold leading-snug">
                  {project.title}
                </CardTitle>
                <StatusBadge status={project.status} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-thread leading-relaxed mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <Badge key={tech} className="border border-primary/20 bg-primary/5 text-primary text-[11px] hover:bg-primary/10 transition-colors">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/40 bg-muted/20 mt-2">
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-muted-foreground">Updated 2 days ago</span>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary-light hover:bg-primary/10 px-2">
                  View Project
                  <ArrowUpRight className="size-3.5 ml-1" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}

function CertificatesTab() {
  if (MOCK_CERTIFICATES.length === 0) {
    return (
      <Card className="bg-white border-border/40 shadow-premium">
        <CardContent className="py-12">
          <div
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
              <Award className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-heading font-semibold text-ink mb-2">No Certificates Yet</h3>
            <p className="text-sm text-thread mb-6 max-w-sm">
              Complete courses and earn certificates to showcase your learning achievements.
            </p>
            <Button variant="default" className="gap-2">
              <BookOpen className="size-4" />
              Browse Courses
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {MOCK_CERTIFICATES.map((cert) => (
        <div
          key={cert.id}
        >
          <Card className="overflow-hidden border border-border/60 shadow-premium hoverable h-full group transition-all duration-300 hover:-translate-y-1">
            <div className="h-1 w-full bg-linear-to-r from-marigold to-amber-500" />
            <CardHeader className="pt-4 pb-3">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-linear-to-br from-marigold/20 to-amber-400/20 border border-marigold/30 flex items-center justify-center shadow-sm">
                  <Award className="size-5 text-marigold-dark" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm font-heading font-semibold leading-snug">
                    {cert.title}
                  </CardTitle>
                  <p className="text-xs text-thread mt-1 font-medium">{cert.issuer}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  {cert.date}
                </span>
                <Link
                  href={`/certificates/${cert.id}`}
                  className="text-xs font-semibold text-primary hover:text-primary-light transition-colors inline-flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-primary/10"
                >
                  Verify <ExternalLink className="size-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

function StartupIdeasTab() {
  const [savedIdeas, setSavedIdeas] = useState<BusinessIdea[]>([]);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const initial = ALL_IDEAS.slice(0, 4);
    setSavedIdeas(initial);
    setSavedIds(new Set(initial.map((i) => i.id)));
  }, []);

  const toggleBookmark = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setSavedIdeas((prev) => prev.filter((i) => i.id !== id));
      } else {
        const idea = ALL_IDEAS.find((i) => i.id === id);
        if (idea) {
          next.add(id);
          setSavedIdeas((prev) => [...prev, idea]);
        }
      }
      return next;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Intermediate":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Advanced":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-muted text-thread border-border";
    }
  };

  return (
    <div className="space-y-4">
      {savedIdeas.length === 0 ? (
        <div>
          <Card className="bg-white border-border/40 shadow-premium">
            <CardContent className="py-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                  <Lightbulb className="size-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-ink mb-2">No Saved Ideas</h3>
                <p className="text-sm text-thread mb-6 max-w-sm">
                  Explore business ideas tailored to your skills and save the ones that match your
                  interests.
                </p>
                <Button variant="default" className="gap-2">
                  <Lightbulb className="size-4" />
                  Discover Ideas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        savedIdeas.map((idea) => (
          <div
            key={idea.id}
          >
            <Card className="bg-white border-border/40 shadow-premium hoverable h-full">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-2">
                      <h3 className="text-base font-heading font-semibold text-ink">{idea.title}</h3>
                      <Badge
                        variant="outline"
                        className={cn("text-[11px] border-0", getDifficultyColor(idea.difficulty))}
                      >
                        {idea.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-thread leading-relaxed mb-3 line-clamp-2">
                      {idea.shortDescription}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="outline" className="border-primary/20 text-primary text-[11px]">
                        {idea.category}
                      </Badge>
                      <div className="flex items-center gap-1.5">
                        <Zap className="size-3.5 text-marigold" />
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            idea.aiMatchScore >= 90 ? "text-emerald-600" : "text-amber-700"
                          )}
                        >
                          {idea.aiMatchScore}% match
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-3 shrink-0">
                    <button
                      onClick={() => toggleBookmark(idea.id)}
                      className={cn(
                        "p-2 rounded-xl transition-all duration-300",
                        savedIds.has(idea.id)
                          ? "bg-marigold/10 text-marigold shadow-sm"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-primary"
                      )}
                    >
                      <Bookmark className={cn("size-4", savedIds.has(idea.id) ? "fill-current" : "")} />
                    </button>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary-light px-2">
                      View Details <ArrowUpRight className="size-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))
      )}
    </div>
  );
}

function SettingsTab() {
  const accountInfo = [
    { label: "Email", value: DUMMY_USER.email, icon: Mail },
    { label: "Phone", value: DUMMY_USER.phone, icon: Phone },
    { label: "Location", value: DUMMY_USER.location, icon: MapPin },
    { label: "Website", value: DUMMY_USER.website, icon: Globe },
  ];

  const settingsLinks = [
    { label: "Account Settings", href: "/settings", description: "Update profile, password, and preferences", icon: User2 },
    { label: "Notifications", href: "/settings", description: "Manage notification preferences", icon: Settings },
    { label: "Integrations", href: "/settings", description: "GitHub, LinkedIn, and more", icon: Link2 },
    { label: "Privacy", href: "/settings", description: "Control profile visibility and data", icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Card className="bg-white border-border/40 shadow-premium hoverable glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User2 className="size-5 text-primary" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accountInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl bg-muted/30 px-4 py-3"
                >
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="size-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-ink truncate">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="bg-white border-border/40 shadow-premium hoverable">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="size-5 text-thread" />
              Quick Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {settingsLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/20 p-4 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:-translate-y-0.5"
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-white border border-border/40 flex items-center justify-center shadow-sm">
                    <link.icon className="size-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">{link.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {link.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Sidebar() {
  const xpProgress = ((DUMMY_USER.xp / DUMMY_USER.xpToNextLevel) * 100).toFixed(0);
  const weeklyProgress = Math.round((WEEKLY_GOAL.current / WEEKLY_GOAL.target) * 100);

  return (
    <div className="space-y-6">
      {/* XP / Level Card */}
      <div>
        <Card className="overflow-hidden border-0 bg-linear-to-br from-indigo via-indigo-dark to-[#1e1b4b] shadow-2xl shadow-indigo/30">
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 blur-2xl" aria-hidden="true" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-marigold/10 blur-2xl" aria-hidden="true" />
          </div>
          <CardContent className="p-6 relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <ProgressRing value={parseInt(xpProgress)} size={110} />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-1">Level {DUMMY_USER.level}</h3>
              <p className="text-sm text-white/70 mb-1">
                {DUMMY_USER.xp} / {DUMMY_USER.xpToNextLevel} XP
              </p>
              <p className="text-xs text-white/50">
                {(DUMMY_USER.xpToNextLevel - DUMMY_USER.xp)} XP to Level {DUMMY_USER.level + 1}
              </p>
              <div className="mt-4 w-full">
                <Progress
                  value={parseInt(xpProgress)}
                  className="h-1.5"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="bg-white border-border/40 shadow-premium hoverable">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="size-5 text-marigold" />
              Weekly Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-thread">Completed</span>
              <span className="text-sm font-bold text-ink">
                {WEEKLY_GOAL.current} / {WEEKLY_GOAL.target} days
              </span>
            </div>
            <Progress value={weeklyProgress} />
            <p className="text-xs text-muted-foreground mt-2">
              {WEEKLY_GOAL.target - WEEKLY_GOAL.current} more days to reach your goal
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="bg-white border-border/40 shadow-premium hoverable">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Award className="size-5 text-amber-600" />
              Recent Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3">
              {ACHIEVEMENTS.slice(0, 8).map((badge, idx) => (
                <div key={badge} className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-all duration-300",
                      idx === 0 && "animate-badgePop",
                      "bg-linear-to-br from-marigold/20 to-marigold/10 border border-marigold/20"
                    )}
                  >
                    <Award className="size-5 text-marigold-dark" />
                  </div>
                  <span className="text-[10px] text-muted-foreground text-center leading-tight">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="bg-white border-border/40 shadow-premium hoverable">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div
                className="w-16 h-16 rounded-2xl bg-linear-to-br from-amber-100 to-orange-50 border border-amber-200/60 flex items-center justify-center mb-4 shadow-sm"
              >
                <Trophy className="size-8 text-amber-600" />
              </div>
              <h3
                className="text-base font-heading font-semibold text-ink mb-1"
              >
                Achievement Unlocked
              </h3>
              <p className="text-sm text-thread mb-4">
                Complete your weekly goal to unlock the Consistency Champion badge.
              </p>
              <Button variant="secondary" size="sm" className="gap-2">
                <Star className="size-4" />
                View All Badges
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="bg-white border-border/40 shadow-premium">
          <CardContent className="p-5">
            <Link
              href={`/${DUMMY_USER.username}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "w-full gap-2 justify-center"
              )}
            >
              <Globe className="size-4" />
              View Public Profile
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background">
      <ProfileHero />

      <section
        className="py-12 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-8">
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-8 bg-muted/50 p-1.5 rounded-xl">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="certificates">Certificates</TabsTrigger>
                  <TabsTrigger value="ideas">Startup Ideas</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <OverviewTab />
                </TabsContent>

                <TabsContent value="projects">
                  <ProjectsTab />
                </TabsContent>

                <TabsContent value="certificates">
                  <CertificatesTab />
                </TabsContent>

                <TabsContent value="ideas">
                  <StartupIdeasTab />
                </TabsContent>

                <TabsContent value="settings">
                  <SettingsTab />
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-4">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
