import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen, Sparkles, Target, Clock, Play,
  Star, ArrowRight, CheckCircle2, Code2, Shield,
  Smartphone, Cloud, BarChart3, Bitcoin, Palette, Terminal,
  Rocket, Megaphone, PenTool, TrendingUp, Zap, FlaskConical,
  FileQuestion, Briefcase, Award, Bookmark, Eye, Brain
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Learning Hub — EntreSkill Hub',
  description: 'Access AI-curated courses, hands-on labs, career paths, and certifications to grow your skills and launch your startup. 500+ learning resources across 15 domains.',
  openGraph: {
    title: 'Learning Hub — EntreSkill Hub',
    description: 'AI-curated courses, labs, and career paths to grow your skills and launch your startup.',
  },
}

const CATEGORIES = [
  { name: 'AI & Machine Learning', icon: Brain, count: 48, gradient: 'from-indigo to-indigo-light' },
  { name: 'Web Development', icon: Code2, count: 72, gradient: 'from-blue-500 to-indigo-600' },
  { name: 'Cybersecurity', icon: Shield, count: 34, gradient: 'from-red-500 to-rose-600' },
  { name: 'App Development', icon: Smartphone, count: 41, gradient: 'from-emerald-500 to-teal-600' },
  { name: 'Cloud Computing', icon: Cloud, count: 29, gradient: 'from-cyan-500 to-blue-600' },
  { name: 'Data Science', icon: BarChart3, count: 55, gradient: 'from-orange-500 to-amber-600' },
  { name: 'Blockchain', icon: Bitcoin, count: 22, gradient: 'from-marigold to-marigold-light' },
  { name: 'UI/UX Design', icon: Palette, count: 38, gradient: 'from-pink-500 to-rose-600' },
  { name: 'DevOps', icon: Terminal, count: 31, gradient: 'from-slate-500 to-gray-600' },
  { name: 'Startup Founder', icon: Rocket, count: 26, gradient: 'from-indigo to-indigo-light' },
  { name: 'Digital Marketing', icon: Megaphone, count: 44, gradient: 'from-teal-500 to-cyan-600' },
  { name: 'Content Writing', icon: PenTool, count: 19, gradient: 'from-emerald-500 to-green-600' },
  { name: 'Finance', icon: TrendingUp, count: 23, gradient: 'from-marigold to-marigold-light' },
]

const FEATURED_COURSES = [
  {
    title: 'Build Your First AI SaaS in 30 Days',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    duration: '18 hrs',
    students: '4.2k',
    rating: 4.9,
    instructor: 'Ravi Patel',
    tag: 'Bestseller',
    tagVariant: 'secondary' as const,
  },
  {
    title: 'Full-Stack Web Development Bootcamp',
    category: 'Web Development',
    level: 'Beginner',
    duration: '40 hrs',
    students: '9.1k',
    rating: 4.8,
    instructor: 'Ananya Krishnan',
    tag: 'Top Rated',
    tagVariant: 'default' as const,
  },
  {
    title: 'Startup Validation & Product Market Fit',
    category: 'Startup Founder',
    level: 'All Levels',
    duration: '12 hrs',
    students: '3.7k',
    rating: 4.9,
    instructor: 'Vikram Mehta',
    tag: 'New',
    tagVariant: 'outline' as const,
  },
  {
    title: 'Data Science for Business Founders',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '24 hrs',
    students: '5.5k',
    rating: 4.7,
    instructor: 'Priya Nair',
    tag: 'Trending',
    tagVariant: 'default' as const,
  },
]

const CAREER_PATHS = [
  { title: 'Frontend Engineer', steps: 7, duration: '6 months', salary: '₹8–24 LPA', gradient: 'from-blue-500 to-indigo-500' },
  { title: 'Full-Stack Founder', steps: 9, duration: '8 months', salary: 'Startup Equity', gradient: 'from-indigo to-indigo-light' },
  { title: 'ML Engineer', steps: 8, duration: '7 months', salary: '₹15–40 LPA', gradient: 'from-indigo to-indigo-light' },
  { title: 'Product Manager', steps: 6, duration: '5 months', salary: '₹12–30 LPA', gradient: 'from-emerald-500 to-teal-500' },
]

const PLATFORM_FEATURES = [
  { icon: FlaskConical, title: 'Practice Labs', desc: 'Sandboxed coding environments — write and run code directly in your browser without any setup.', gradient: 'from-indigo to-indigo-light' },
  { icon: FileQuestion, title: 'Quizzes & Assessments', desc: 'Test your understanding after each module with adaptive quizzes that adjust to your pace.', gradient: 'from-marigold to-marigold-light' },
  { icon: Briefcase, title: 'Real Projects', desc: 'Build portfolio-worthy projects with guided briefs and mentor feedback at key checkpoints.', gradient: 'from-emerald-500 to-teal-500' },
  { icon: Award, title: 'Verifiable Certificates', desc: 'Earn certificates you can share on LinkedIn, backed by course completion data and project reviews.', gradient: 'from-blue-500 to-indigo-500' },
  { icon: Brain, title: 'AI Recommendations', desc: 'Our AI analyzes your skill gaps, goals, and learning style to recommend the ideal next course.', gradient: 'from-indigo to-indigo-light' },
  { icon: Eye, title: 'Recently Viewed', desc: 'Pick up exactly where you left off — your progress is saved automatically across all devices.', gradient: 'from-cyan-500 to-blue-500' },
  { icon: Bookmark, title: 'Bookmarks', desc: 'Save lessons, courses, and projects to a personal library you can revisit anytime.', gradient: 'from-terracotta-deep to-danger' },
  { icon: Zap, title: 'Weekly Learning Plans', desc: '7-day structured plans that fit around your schedule — spend 30–90 minutes daily to stay consistent.', gradient: 'from-marigold to-marigold-light' },
]

const FAQS = [
  {
    q: 'Are the courses free?',
    a: 'Yes — foundational courses, quizzes, and learning paths are completely free. Advanced labs, mentor reviews, and certificates are part of the Pro plan at ₹499/month.',
  },
  {
    q: 'How does AI course recommendation work?',
    a: 'After a 5-minute skill assessment, our AI maps your current knowledge against your stated goal and generates a sequenced learning path. It re-adapts every 2 weeks based on your progress.',
  },
  {
    q: 'Can I learn at my own pace?',
    a: 'Absolutely. All courses are self-paced with no deadlines. Weekly plans are optional — use them as a guide or chart your own schedule.',
  },
  {
    q: 'What languages are courses taught in?',
    a: 'Currently English and Hindi. Subtitles are available for all video content in both languages, with more coming soon.',
  },
  {
    q: 'Do certificates expire?',
    a: 'No. Certificates are permanent and blockchain-backed for authenticity. You can share a public verification link with employers or investors.',
  },
]

const POPULAR_SKILLS = [
  'Prompt Engineering', 'React', 'Python', 'No-Code Automation', 'Landing Page Design',
  'Business Validation', 'SQL', 'TypeScript', 'Go-to-Market Strategy', 'API Design',
  'Copywriting', 'Customer Discovery', 'SEO', 'Financial Modeling', 'TailwindCSS',
]

function CardShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={[
        'group relative flex flex-col overflow-hidden rounded-2xl',
        'bg-card text-card-foreground ring-1 ring-foreground/5',
        'transition-all duration-300 ease-out hover:translate-y-[-4px] hover:shadow-premium-hover hover:ring-foreground/10 card-glow-indigo',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </div>
  )
}

function PlatformCard({ icon: Icon, title, desc, gradient }: { icon: React.ElementType; title: string; desc: string; gradient: string }) {
  return (
    <div className="group p-6 rounded-2xl border border-border/40 bg-card hover:border-indigo/30 hover:shadow-xl hover:shadow-indigo/10 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg text-white ${gradient} group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="font-heading font-bold text-base mb-2 group-hover:text-indigo transition-colors">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}

export default function LearningHubPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo/10 via-background to-marigold/5 pointer-events-none" />
        <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-gradient-to-bl from-indigo/10 via-indigo-light/5 to-transparent rounded-full blur-[100px] opacity-40 pointer-events-none animate-pulse-slow" />

        <div className="container-content relative z-10">
          <BreadcrumbNav items={[{ label: 'Learning Hub' }]} />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <Badge variant="default" className="mb-6">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                AI-Curated Learning
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight mb-6 text-balance leading-tight">
                Everything you need to grow from{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 gradient-text-hero">learner to founder</span>
                  <span className="absolute inset-x-0 bottom-2 h-3 bg-marigold/20 -z-0 blur-sm animate-pulse-slow" />
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                500+ courses, hands-on labs, real projects, and AI-generated career paths — all personalized to your goals, skills, and schedule.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-gradient-to-r from-indigo to-indigo-light text-white font-semibold shadow-lg shadow-indigo/25 hover:shadow-xl hover:shadow-indigo/30 hover:-translate-y-0.5 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Start Learning Free <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/learn"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border-2 border-indigo/30 bg-white text-indigo font-semibold hover:bg-indigo/5 hover:border-indigo/50 hover:shadow-lg hover:shadow-indigo/10 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Play className="h-4 w-4" aria-hidden="true" /> Browse Courses
                </Link>
              </div>

              <div className="flex items-center gap-8">
                {[
                  ['500+', 'Courses'],
                  ['50k+', 'Learners'],
                  ['98%', 'Completion Rate'],
                ].map(([num, label]) => (
                  <div key={label} className="text-center animate-fade-in-up">
                    <span className="block text-2xl font-bold text-foreground font-heading">{num}</span>
                    <span className="text-xs text-muted-foreground font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-4 animate-fade-in" aria-hidden="true">
              {FEATURED_COURSES.slice(0, 4).map((c, i) => (
                <CardShell key={c.title} className={`p-5 shadow-lg stagger-${i + 1} animate-fade-in-up`}>
                  <Badge variant={c.tagVariant} className="mb-3">{c.tag}</Badge>
                  <p className="text-sm font-bold leading-snug mb-2 group-hover:text-indigo transition-colors">{c.title}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-marigold text-marigold" aria-hidden="true" />
                    <span className="font-medium text-foreground">{c.rating}</span>
                    <span>· {c.duration}</span>
                  </div>
                </CardShell>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-py border-t border-border/40">
        <div className="container-content">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Categories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3 tracking-tight">Explore by category</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From technical fundamentals to founder playbooks — every skill you need, organized for fast discovery.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {CATEGORIES.map(({ name, icon: Icon, count, gradient }) => (
              <Link
                key={name}
                href="/learn"
                className="group flex flex-col items-center text-center gap-3 p-5 rounded-2xl border border-border/40 bg-card hover:border-indigo/30 hover:shadow-lg hover:shadow-indigo/10 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300 ${gradient}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight group-hover:text-indigo transition-colors">{name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-medium">{count} courses</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section-py bg-gradient-to-b from-muted/20 via-muted/10 to-transparent">
        <div className="container-content">
          <div className="flex items-end justify-between mb-10">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Award className="h-3.5 w-3.5" aria-hidden="true" />
                Featured
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2 tracking-tight">Featured courses</h2>
              <p className="text-muted-foreground">Handpicked by our AI based on community trends and founder outcomes.</p>
            </div>
            <Link href="/learn" className="hidden md:flex items-center gap-1 text-sm font-medium text-indigo hover:text-indigo-light font-semibold group">
              View all <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_COURSES.map((course) => (
              <CardShell key={course.title} className="transition-all duration-500 hover:shadow-2xl hover:shadow-indigo/10 hover:-translate-y-2 animate-fade-in-up">
                <div className="p-6 flex-1 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={course.tagVariant}>{course.tag}</Badge>
                    <span className="text-xs text-muted-foreground font-medium">{course.level}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base leading-snug group-hover:text-indigo transition-colors">{course.title}</h3>
                  <p className="text-xs text-muted-foreground">{course.category}</p>
                  <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/40">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-marigold text-marigold" aria-hidden="true" />
                      <span className="font-bold text-foreground">{course.rating}</span>
                      <span>({course.students})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {course.duration}
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-5">
                  <Link
                    href="/learn"
                    className="flex items-center justify-center gap-1 w-full h-10 rounded-xl bg-gradient-to-r from-indigo to-indigo-light text-white text-sm font-semibold shadow-md shadow-indigo/20 hover:shadow-lg hover:shadow-indigo/30 hover:-translate-y-0.5 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Enroll Free <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </CardShell>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="section-py">
        <div className="container-content">
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-4">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              Platform Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3 tracking-tight">Built for how founders actually learn</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We designed every feature around real feedback from 10,000+ learners who needed practical skills — fast.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLATFORM_FEATURES.map(({ icon: Icon, title, desc, gradient }) => (
              <PlatformCard key={title} icon={Icon} title={title} desc={desc} gradient={gradient} />
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths */}
      <section className="section-py bg-gradient-to-b from-muted/20 via-muted/10 to-transparent border-t border-border/40">
        <div className="container-content">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Target className="h-3.5 w-3.5" aria-hidden="true" />
              Career Paths
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3 tracking-tight">Structured learning journeys</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Structured multi-step journeys that take you from zero to job-ready or launch-ready in months, not years.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAREER_PATHS.map(({ title, steps, duration, salary, gradient }) => (
              <CardShell key={title} className="p-6 hover:shadow-2xl hover:shadow-indigo/10 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg text-white ${gradient}`}>
                  <Target className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="mt-4">
                  <h3 className="font-heading font-bold text-base">{title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{steps} milestones · {duration}</p>
                </div>
                <p className="text-sm font-bold text-indigo mt-auto">{salary}</p>
                <Link
                  href="/learn"
                  className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-indigo transition-colors mt-2 px-0"
                >
                  View path
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </CardShell>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py">
        <div className="container-narrow">
          <div className="relative rounded-3xl bg-gradient-to-br from-indigo via-indigo-light to-indigo-dark p-10 md:p-16 text-center text-white overflow-hidden animate-scale-in">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15),_transparent)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(232,163,61,0.1),_transparent)] pointer-events-none" />

            <div className="relative z-10">
              <BookOpen className="h-12 w-12 mx-auto mb-6 opacity-90" aria-hidden="true" />
              <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 tracking-tight">
                Your learning journey starts today
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Join 50,000+ learners who are turning skills into businesses. Free forever for core content.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-gradient-to-r from-marigold to-marigold-light text-ink font-semibold shadow-lg shadow-marigold/25 hover:shadow-xl hover:shadow-marigold/30 hover:-translate-y-0.5 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white text-lg"
                >
                  Create Free Account
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/learn"
                  className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl border-2 border-white/40 bg-white/5 text-white font-semibold hover:bg-white/10 hover:border-white/60 hover:-translate-y-0.5 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white text-lg"
                >
                  <Play className="h-4 w-4" aria-hidden="true" />
                  Explore Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-py border-t border-border/40">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-4">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <div
                key={q}
                className={`group bg-card rounded-2xl border border-border/40 hover:border-indigo/30 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-indigo/5 animate-fade-in-up stagger-${i + 1}`}
              >
                <h3 className="font-bold mb-2 flex items-start gap-3 p-5">
                  <CheckCircle2 className="h-5 w-5 text-indigo shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{q}</span>
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed pl-8 pr-5 pb-5">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Skills */}
      <section className="section-py-sm bg-gradient-to-b from-muted/20 via-muted/10 to-transparent border-t border-border/40">
        <div className="container-content">
          <h2 className="text-xl font-bold font-heading text-center mb-8">Popular skills right now</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {POPULAR_SKILLS.map((skill) => (
              <Link
                key={skill}
                href="/learn"
                className="px-5 py-2.5 rounded-full border-2 border-indigo/20 bg-card text-sm font-semibold hover:border-indigo hover:text-indigo hover:bg-indigo/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md animate-fade-in"
              >
                {skill}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
