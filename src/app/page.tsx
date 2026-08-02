import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Star,
  Target,
  CheckSquare,
  Plus,
  Minus,
  Route,
  Bot,
  Lightbulb,
  GraduationCap,
  MessageSquare,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_IDEAS } from "@/data/mock-ideas";
import { MOCK_LEARNING_RESOURCES } from "@/data/mock-learning";

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

const AVATARS = [
  { src: "/employee-1.jpg", alt: "Demo entrepreneur portrait 1" },
  { src: "/employee-2.jpg", alt: "Demo entrepreneur portrait 2" },
  { src: "/employee-3.jpg", alt: "Demo entrepreneur portrait 3" },
  { src: "/employee-4.jpg", alt: "Demo entrepreneur portrait 4" },
  { src: "/employee-5.jpg", alt: "Demo entrepreneur portrait 5" },
];

const PARTNERS = [
  { name: "Google", href: "https://www.google.com" },
  { name: "Microsoft", href: "https://www.microsoft.com" },
  { name: "AWS", href: "https://aws.amazon.com" },
  { name: "GitHub", href: "https://github.com" },
  { name: "OpenAI", href: "https://openai.com" },
  { name: "Stripe", href: "https://stripe.com" },
  { name: "Vercel", href: "https://vercel.com" },
  { name: "Meta", href: "https://www.meta.com" },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24" aria-labelledby="hero-heading">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-125 w-225 -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[120px]" />
        <div className="absolute right-0 top-16 h-100 w-100 rounded-full bg-accent/6 blur-[100px]" />
      </div>

      <div className="container-content relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-2xl">
            <Badge variant="default" className="mb-6">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Skill-To-Startup Platform
            </Badge>

            <h1
              id="hero-heading"
              className="mb-6 text-4xl font-bold font-heading tracking-tight text-balance leading-hero sm:text-5xl lg:text-[3.5rem]"
            >
              Turn Your Skills Into a{" "}
              <span className="bg-linear-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Profitable Business
              </span>
            </h1>

            <p className="mb-10 max-w-xl text-balance text-lg leading-relaxed text-thread md:text-xl">
              Route from skill to startup with curated ideas, structured roadmaps, AI guidance, and
              access to 500+ industry mentors - all in one place.
            </p>

            <div className="mb-10 flex flex-col items-start gap-4 sm:flex-row">
              <Link
                href="/register"
                className={cn(buttonVariants({ size: "xl" }), "w-full sm:w-auto")}
                aria-label="Start your entrepreneurial journey"
              >
                Start Your Journey
                <ArrowRight className="ml-2 size-5" aria-hidden="true" />
              </Link>
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

            <div className="flex flex-col gap-4 text-sm font-medium text-thread sm:flex-row sm:items-center">
              <div className="flex -space-x-2" aria-label="Trusted by 10,000+ entrepreneurs">
                {AVATARS.map((avatar, index) => (
                  <div
                    key={avatar.src}
                    className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white bg-muted shadow-sm"
                    style={{ zIndex: AVATARS.length - index }}
                  >
                    <Image src={avatar.src} alt={avatar.alt} fill sizes="48px" className="object-cover" />
                  </div>
                ))}
              </div>
              <span>Trusted by 10,000+ entrepreneurs worldwide</span>
            </div>

            <div className="mt-8">
              <p className="mb-4 text-sm font-medium text-muted-foreground">
                Trusted by teams at leading companies
              </p>
              <div className="relative overflow-hidden py-3">
                <div
                  className="flex w-max items-center"
                  style={{
                    animationName: "marquee",
                    animationDuration: "28s",
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                    willChange: "transform",
                  }}
                >
                  <div className="flex items-center gap-4 pr-4">
                    {PARTNERS.map((partner) => (
                      <a
                        key={partner.name}
                        href={partner.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 min-w-32 items-center justify-center whitespace-nowrap rounded-full border border-border/60 bg-background px-6 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-primary/40 dark:bg-card dark:text-card-foreground dark:hover:border-primary/50"
                        aria-label={`${partner.name} official website`}
                      >
                        {partner.name}
                      </a>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 pr-4" aria-hidden="true">
                    {PARTNERS.map((partner) => (
                      <a
                        key={`${partner.name}-duplicate`}
                        href={partner.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 min-w-32 items-center justify-center whitespace-nowrap rounded-full border border-border/60 bg-background px-6 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-primary/40 dark:bg-card dark:text-card-foreground dark:hover:border-primary/50"
                        aria-label={`${partner.name} official website`}
                        tabIndex={-1}
                      >
                        {partner.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-background to-transparent" />
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative h-140">
            <Card className="absolute left-1/2 top-1/2 w-124 -translate-x-1/2 -translate-y-1/2 shadow-premium">
              <div className="flex h-11 items-center gap-1.5 rounded-t-2xl bg-linear-to-r from-indigo to-indigo-light px-5">
                <div className="h-3 w-3 rounded-full bg-white/30" aria-hidden="true" />
                <div className="h-3 w-3 rounded-full bg-white/30" aria-hidden="true" />
                <div className="h-3 w-3 rounded-full bg-white/30" aria-hidden="true" />
                <span className="ml-4 text-sm font-medium text-white/90">Entrepreneur Dashboard</span>
              </div>
              <div className="space-y-4 p-6">
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-24 rounded-xl border border-indigo/10 bg-linear-to-br from-indigo/10 to-indigo-light/5" />
                  <div className="h-24 rounded-xl border border-marigold/10 bg-linear-to-br from-marigold/10 to-marigold-light/5" />
                  <div className="h-24 rounded-xl border border-success/15 bg-surface-success/60" />
                </div>
                <div className="h-28 rounded-xl border border-border/40 bg-muted/40" />
              </div>
            </Card>

            <Card className="absolute right-0 top-8 p-5 shadow-premium">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-success to-emerald-600">
                  <Target className="size-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Roadmap Active</p>
                  <p className="text-sm text-thread">Cloud Kitchen Plan</p>
                </div>
              </div>
            </Card>

            <Card className="absolute bottom-16 left-0 p-5 shadow-premium">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-indigo to-indigo-light">
                  <ShieldCheck className="size-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Mentor Scheduled</p>
                  <p className="text-sm text-thread">Tomorrow, 4:00 PM</p>
                </div>
              </div>
            </Card>

            <Card className="absolute bottom-4 right-4 p-5 shadow-premium">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-marigold to-marigold-light">
                  <GraduationCap className="size-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Course Complete</p>
                  <p className="text-sm text-thread">+120 XP earned</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="border-y border-border/40 py-12" aria-label="Platform statistics">
      <div className="container-content">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-1 text-3xl font-bold font-heading text-indigo md:text-4xl">{stat.value}</div>
              <div className="text-sm font-medium text-thread">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section className="py-20" aria-labelledby="dashboard-heading">
      <div className="container-content">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Live Platform Preview
          </Badge>
          <h2 id="dashboard-heading" className="mb-3 text-3xl font-bold font-heading tracking-tight md:text-4xl">
            Your entrepreneurship workspace, built for founders
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-thread">
            Everything from idea exploration to progress tracking, organized cleanly in one dashboard.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/50 bg-card shadow-premium">
          <div className="flex h-12 items-center gap-2 border-b border-border/40 px-5">
            <div className="h-3 w-3 rounded-full bg-danger/80" aria-hidden="true" />
            <div className="h-3 w-3 rounded-full bg-marigold/80" aria-hidden="true" />
            <div className="h-3 w-3 rounded-full bg-success/80" aria-hidden="true" />
            <div className="ml-4 h-3 w-52 rounded-md bg-muted" />
          </div>
          <div className="flex min-h-90">
            <div className="hidden flex-col gap-2 border-r border-border/40 bg-surface p-4 sm:flex sm:w-48">
              <div className="h-8 w-28 rounded-lg bg-linear-to-r from-indigo to-indigo-light shadow-sm" />
              {["Dashboard", "Ideas", "Roadmaps", "Learning", "Mentors"].map((label) => (
                <div key={label} className="flex h-9 w-full items-center rounded-lg px-3 text-xs text-thread transition-colors hover:bg-muted">
                  {label}
                </div>
              ))}
            </div>
            <div className="flex-1 space-y-6 bg-card p-5 lg:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 h-7 w-48 rounded-lg bg-indigo/10" />
                  <div className="h-4 w-64 rounded-md bg-muted" />
                </div>
                <div className="h-10 w-10 shrink-0 rounded-full border border-indigo/20 bg-indigo/10" />
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Roadmaps", accent: "from-indigo/10 to-indigo-light/5" },
                  { label: "Courses", accent: "from-marigold/10 to-marigold-light/5" },
                  { label: "Mentors", accent: "from-success/10 to-emerald-100/50" },
                  { label: "Progress", accent: "from-indigo/5 to-muted/20" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`h-24 rounded-xl border border-border/40 bg-linear-to-br ${item.accent}`}
                    aria-label={item.label}
                  />
                ))}
              </div>
              <div className="space-y-3">
                {MOCK_IDEAS.slice(0, 3).map((idea) => (
                  <div key={idea.id} className="flex items-center gap-4 rounded-xl border border-border/40 bg-surface p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo/10">
                      <Lightbulb className="size-5 text-indigo" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-foreground">{idea.title}</p>
                      <p className="text-xs text-thread">{idea.category}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 text-xs">
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
    <section id="features" aria-labelledby="features-heading">
      <div className="container-content">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            <Target className="size-3.5" aria-hidden="true" />
            Core Features
          </Badge>
          <h2 id="features-heading" className="mb-3 text-3xl font-bold font-heading tracking-tight md:text-4xl">
            Everything you need to launch with confidence
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-thread">
            From idea generation to revenue milestones, our platform provides structured support at every stage of your founder journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} hoverable className="group p-6 bg-card border-border/40 dark:bg-card/95">
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${iconColors[i]} shadow-lg`} aria-hidden="true">
                  <Icon className="size-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold font-heading tracking-tight transition-colors group-hover:text-indigo">
                  {feature.title}
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-thread">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-20" aria-labelledby="testimonials-heading">
      <div className="container-content">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            <Star className="size-3.5 fill-current" aria-hidden="true" />
            Social Proof
          </Badge>
          <h2 id="testimonials-heading" className="mb-3 text-3xl font-bold font-heading tracking-tight md:text-4xl">
            Trusted by founders who started with a skill
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
              <Card
              key={testimonial.name}
              hoverable
              className="flex flex-col bg-card border-border/40 p-6 dark:bg-card/95"
              tabIndex={0}
              role="article"
              aria-label={`Testimonial from ${testimonial.name}`}
            >
              <div className="mb-4 flex gap-1" aria-label="5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="size-4 fill-current text-marigold" aria-hidden="true" />
                ))}
              </div>
              <p className="mb-6 flex-1 leading-relaxed text-thread">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center gap-3 border-t border-border/40 pt-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo/10 text-sm font-bold text-indigo" aria-hidden="true">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-thread">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function LearningPreview() {
  return (
    <section className="bg-linear-to-b from-muted/20 via-muted/10 to-transparent py-20" aria-labelledby="learning-heading">
      <div className="container-content">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="default" className="mb-4">
              <BookOpen className="size-3.5" aria-hidden="true" />
              Learning Resources
            </Badge>
            <h2 id="learning-heading" className="mb-4 text-3xl font-bold font-heading tracking-tight md:text-4xl">
              Structured learning for every stage
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-thread">
              Access 50+ courses, articles, and checklists spanning business strategy, marketing, finance, and law - all curated for founders.
            </p>

            <div className="space-y-3">
              {MOCK_LEARNING_RESOURCES.slice(0, 3).map((resource) => (
                <Card key={resource.id} hoverable className="flex items-center gap-4 border-border/40 bg-card p-4 dark:bg-card/95">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      resource.type === "video"
                        ? "bg-linear-to-br from-indigo to-indigo-light"
                        : resource.type === "checklist"
                          ? "bg-linear-to-br from-success to-emerald-600"
                          : "bg-linear-to-br from-marigold to-marigold-light"
                    }`}
                    aria-hidden="true"
                  >
                    {resource.type === "checklist" ? (
                      <CheckSquare className="size-5 text-white" />
                    ) : (
                      <BookOpen className="size-5 text-white" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-foreground">{resource.title}</p>
                    <p className="text-xs text-thread">{resource.duration}</p>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-thread" aria-hidden="true" />
                </Card>
              ))}
            </div>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <Card className="p-6 shadow-premium">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-marigold" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-wider text-thread">Learning Progress</p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Business Strategy", done: 8, total: 12, color: "bg-indigo" },
                  { label: "Marketing", done: 5, total: 9, color: "bg-marigold" },
                  { label: "Finance", done: 6, total: 8, color: "bg-success" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-1.5 flex justify-between text-xs">
                      <span className="font-medium text-foreground">{item.label}</span>
                      <span className="text-thread">{item.done}/{item.total}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden" role="progressbar" aria-valuenow={item.done} aria-valuemin={0} aria-valuemax={item.total} aria-label={`${item.label} progress: ${item.done} of ${item.total}`}>
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.done / item.total) * 100}%` }} />
                    </div>
                  </div>
                ))}
                <div className="mt-2 rounded-xl border border-border/40 bg-surface p-4">
                  <p className="text-2xl font-bold font-heading text-indigo">94%</p>
                  <p className="text-xs text-thread">Average completion rate</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function IdeasPreview() {
  const ideas = MOCK_IDEAS.slice(0, 3);

  return (
    <section className="py-20" aria-labelledby="ideas-heading">
      <div className="container-content">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            <Lightbulb className="size-3.5" aria-hidden="true" />
            Business Ideas
          </Badge>
          <h2 id="ideas-heading" className="mb-3 text-3xl font-bold font-heading tracking-tight md:text-4xl">
            Curated ideas matched to your skills
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-thread">
            Each idea includes real earning projections, startup cost estimates, and a step-by-step roadmap to launch.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => (
              <Card key={idea.id} hoverable className="overflow-hidden border-border/40 bg-card dark:bg-card/95">
              <div className="h-2 w-full bg-linear-to-r from-indigo via-indigo-light to-marigold" aria-hidden="true" />
              <div className="p-6">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold font-heading leading-snug">{idea.title}</h3>
                  <Badge variant="secondary" className="shrink-0 text-xs">{idea.difficulty}</Badge>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-thread">{idea.shortDescription}</p>
                <div className="mb-5 grid grid-cols-2 gap-x-3 gap-y-2 rounded-xl bg-muted/40 p-4 text-sm">
                  <div>
                    <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-thread">Investment</p>
                    <p className="font-bold text-foreground">₹{idea.investment.min.toLocaleString()} - {idea.investment.max.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-thread">Income/mo</p>
                    <p className="font-bold text-foreground">₹{idea.expectedMonthlyIncome.min.toLocaleString()} - {idea.expectedMonthlyIncome.max.toLocaleString()}</p>
                  </div>
                </div>
                <Link
                  href={`/ideas/${idea.id}`}
                  className={cn(
                    "flex w-full items-center justify-center rounded-xl border border-indigo/20 py-2.5 text-sm font-semibold text-indigo transition-all duration-300 hover:bg-indigo hover:text-white focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2"
                  )}
                  aria-label={`View roadmap for ${idea.title}`}
                >
                  View Roadmap
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "Who is this platform designed for?",
      a: "Aspirational entrepreneurs, students, and working professionals who have a practical skill and want to turn it into a real business - but don't know where to start.",
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

  return (
    <section className="py-20" aria-labelledby="faq-heading">
      <div className="container-content">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="mb-4">
              <CheckSquare className="size-3.5" aria-hidden="true" />
              FAQ
            </Badge>
            <h2 id="faq-heading" className="text-3xl font-bold font-heading tracking-tight md:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((item, index) => (
              <details key={item.q} className="group overflow-hidden rounded-2xl border border-border/40 bg-card dark:bg-card/95" open={index === 0}>
                <summary className="flex list-none cursor-pointer items-center justify-between rounded-2xl px-6 py-5 text-left font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-inset">
                  <span className="pr-4 text-base">{item.q}</span>
                  <Plus className="size-5 shrink-0 text-thread group-open:hidden" aria-hidden="true" />
                  <Minus className="hidden size-5 shrink-0 text-indigo group-open:block" aria-hidden="true" />
                </summary>
                <div className="px-6 pb-5 text-thread leading-relaxed">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-20" aria-labelledby="cta-heading">
      <div className="container-content">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo via-indigo-light to-indigo-dark px-8 py-16 text-center md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(232,163,61,0.12),transparent)]" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <Badge variant="secondary" className="mb-6">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Get Started Today
            </Badge>
            <h2 id="cta-heading" className="mb-4 text-3xl font-bold font-heading tracking-tight text-white md:text-5xl">
              Start Your Entrepreneurial Journey
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-white/80">
              Join 10,000+ founders who turned their skills into thriving businesses. Create a free account and get personalized recommendations in minutes.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className={cn(buttonVariants({ variant: "secondary", size: "xl" }), "w-full sm:w-auto")}
                aria-label="Create your free account"
              >
                Create Free Account
                <ArrowRight className="ml-2 size-5" aria-hidden="true" />
              </Link>
              <Link
                href="#features"
                className={cn(buttonVariants({ variant: "outline", size: "xl" }), "w-full border-white/40 text-white hover:bg-white/10 sm:w-auto")}
                aria-label="See how it works"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col selection:bg-indigo/10">
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
