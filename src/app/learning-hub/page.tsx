import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav'
import {
  BookOpen, Sparkles, Target, Clock, Trophy, Users, Play,
  Star, ArrowRight, CheckCircle2, Layers, Code2, Shield,
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
  { name: 'AI & Machine Learning', icon: Brain, count: 48, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/30' },
  { name: 'Web Development', icon: Code2, count: 72, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  { name: 'Cybersecurity', icon: Shield, count: 34, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950/30' },
  { name: 'App Development', icon: Smartphone, count: 41, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-950/30' },
  { name: 'Cloud Computing', icon: Cloud, count: 29, color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-950/30' },
  { name: 'Data Science', icon: BarChart3, count: 55, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-950/30' },
  { name: 'Blockchain', icon: Bitcoin, count: 22, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  { name: 'UI/UX Design', icon: Palette, count: 38, color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-950/30' },
  { name: 'DevOps', icon: Terminal, count: 31, color: 'text-slate-600', bg: 'bg-slate-50 dark:bg-slate-950/30' },
  { name: 'Startup Founder', icon: Rocket, count: 26, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
  { name: 'Digital Marketing', icon: Megaphone, count: 44, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-950/30' },
  { name: 'Content Writing', icon: PenTool, count: 19, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  { name: 'Finance', icon: TrendingUp, count: 23, color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-950/30' },
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
    tagColor: 'bg-amber-100 text-amber-700',
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
    tagColor: 'bg-blue-100 text-blue-700',
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
    tagColor: 'bg-green-100 text-green-700',
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
    tagColor: 'bg-purple-100 text-purple-700',
  },
]

const CAREER_PATHS = [
  { title: 'Frontend Engineer', steps: 7, duration: '6 months', salary: '₹8–24 LPA' },
  { title: 'Full-Stack Founder', steps: 9, duration: '8 months', salary: 'Startup Equity' },
  { title: 'ML Engineer', steps: 8, duration: '7 months', salary: '₹15–40 LPA' },
  { title: 'Product Manager', steps: 6, duration: '5 months', salary: '₹12–30 LPA' },
]

const PLATFORM_FEATURES = [
  { icon: FlaskConical, title: 'Practice Labs', desc: 'Sandboxed coding environments — write and run code directly in your browser without any setup.' },
  { icon: FileQuestion, title: 'Quizzes & Assessments', desc: 'Test your understanding after each module with adaptive quizzes that adjust to your pace.' },
  { icon: Briefcase, title: 'Real Projects', desc: 'Build portfolio-worthy projects with guided briefs and mentor feedback at key checkpoints.' },
  { icon: Award, title: 'Verifiable Certificates', desc: 'Earn certificates you can share on LinkedIn, backed by course completion data and project reviews.' },
  { icon: Brain, title: 'AI Recommendations', desc: 'Our AI analyzes your skill gaps, goals, and learning style to recommend the ideal next course.' },
  { icon: Eye, title: 'Recently Viewed', desc: 'Pick up exactly where you left off — your progress is saved automatically across all devices.' },
  { icon: Bookmark, title: 'Bookmarks', desc: 'Save lessons, courses, and projects to a personal library you can revisit anytime.' },
  { icon: Zap, title: 'Weekly Learning Plans', desc: '7-day structured plans that fit around your schedule — spend 30–90 minutes daily to stay consistent.' },
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

export default function LearningHubPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-secondary/5 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <BreadcrumbNav items={[{ label: 'Learning Hub' }]} />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                AI-Curated Learning
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-5 text-balance leading-tight">
                Everything you need to grow from{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                  learner to founder
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                500+ courses, hands-on labs, real projects, and AI-generated career paths — all personalized to your goals, skills, and schedule.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Start Learning Free <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/learn"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border-2 border-border font-semibold hover:bg-muted/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Play className="h-4 w-4" aria-hidden="true" /> Browse Courses
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                {[['500+', 'Courses'], ['50k+', 'Learners'], ['98%', 'Completion Rate']].map(([num, label]) => (
                  <div key={label} className="flex flex-col items-center gap-0.5">
                    <span className="text-xl font-bold text-foreground font-heading">{num}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual card stack */}
            <div className="hidden lg:grid grid-cols-2 gap-4" aria-hidden="true">
              {FEATURED_COURSES.slice(0, 4).map((c) => (
                <div key={c.title} className="bg-card rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3 ${c.tagColor}`}>{c.tag}</span>
                  <p className="text-sm font-semibold leading-snug mb-2">{c.title}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    <span className="font-medium text-foreground">{c.rating}</span>
                    <span>· {c.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">Explore by category</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From technical fundamentals to founder playbooks — every skill you need, organized for fast discovery.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {CATEGORIES.map(({ name, icon: Icon, count, color, bg }) => (
              <Link
                key={name}
                href="/learn"
                className={`group flex flex-col items-center text-center gap-3 p-5 rounded-xl border hover:border-primary/40 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${bg}`}
              >
                <div className={`p-3 rounded-xl bg-white/60 dark:bg-black/20 ${color} group-hover:scale-110 transition-transform`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">{name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{count} courses</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-2">Featured courses</h2>
              <p className="text-muted-foreground">Handpicked by our AI based on community trends and founder outcomes.</p>
            </div>
            <Link href="/learn" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_COURSES.map((course) => (
              <div key={course.title} className="bg-card rounded-xl border hover:shadow-lg transition-all hover:-translate-y-0.5 flex flex-col">
                <div className="p-5 flex-1 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${course.tagColor}`}>{course.tag}</span>
                    <span className="text-xs text-muted-foreground">{course.level}</span>
                  </div>
                  <h3 className="font-semibold text-sm leading-snug">{course.title}</h3>
                  <p className="text-xs text-muted-foreground">{course.category}</p>
                  <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span className="font-semibold text-foreground">{course.rating}</span>
                      <span>({course.students})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-4">
                  <Link
                    href="/learn"
                    className="flex items-center justify-center gap-1 w-full h-9 rounded-lg bg-primary/8 text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Enroll Free <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">Built for how founders actually learn</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We designed every feature around real feedback from 10,000+ learners who needed practical skills — fast.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLATFORM_FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-6 rounded-xl border bg-card hover:border-primary/30 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">Career paths</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Structured multi-step journeys that take you from zero to job-ready or launch-ready in months, not years.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAREER_PATHS.map(({ title, steps, duration, salary }) => (
              <div key={title} className="bg-card rounded-xl border p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all group flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{steps} milestones · {duration}</p>
                </div>
                <p className="text-sm font-medium text-primary mt-auto">{salary}</p>
                <Link
                  href="/learn"
                  className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors"
                >
                  View path <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-primary to-blue-700 p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1),_transparent)] pointer-events-none" />
            <BookOpen className="h-12 w-12 mx-auto mb-6 opacity-80" aria-hidden="true" />
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Your learning journey starts today
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Join 50,000+ learners who are turning skills into businesses. Free forever for core content.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-white text-primary font-semibold hover:bg-white/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Create Free Account <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Play className="h-4 w-4" /> Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold font-heading text-center mb-12">Frequently asked questions</h2>
          <div className="divide-y divide-border">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="py-6">
                <h3 className="font-semibold mb-2 flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  {q}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed pl-7">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Skills */}
      <section className="py-16 bg-muted/30 border-t">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-xl font-bold font-heading text-center mb-8">Popular skills right now</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Prompt Engineering', 'React', 'Python', 'No-Code Automation', 'Landing Page Design', 'Business Validation', 'SQL', 'TypeScript', 'Go-to-Market Strategy', 'API Design', 'Copywriting', 'Customer Discovery', 'SEO', 'Financial Modeling', 'TailwindCSS'].map((skill) => (
              <Link
                key={skill}
                href="/learn"
                className="px-4 py-2 rounded-full border bg-card text-sm font-medium hover:border-primary hover:text-primary hover:bg-primary/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
