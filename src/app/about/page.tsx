import type { Metadata } from 'next'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav'
import {
  Sparkles, Target, Eye, Heart, Users, BookOpen, Rocket, Globe,
  ArrowRight, CheckCircle2, Zap, BarChart3, Star, TrendingUp,
  Lightbulb, Plus, Minus
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us — EntreSkill Hub',
  description: 'Learn about EntreSkill Hub — the AI-powered Skill-to-Startup platform helping people turn skills into businesses. Our mission, story, values, team, and vision.',
  openGraph: {
    title: 'About EntreSkill Hub — Our Mission, Story & Team',
    description: 'We believe anyone with a skill and the drive to build can launch a real business. Here\'s how we\'re making that happen.',
  },
}

const VALUES = [
  {
    icon: Lightbulb,
    title: 'Curiosity first',
    desc: 'We build for people who ask "why not me?" — the curious, the restless, the builders who see opportunity where others see obstacles.',
  },
  {
    icon: Heart,
    title: 'Human-centered AI',
    desc: 'AI is a tool, not a replacement. Every algorithm we build is designed to amplify human judgment, not substitute for it.',
  },
  {
    icon: Globe,
    title: 'Radical accessibility',
    desc: 'Great education shouldn\'t require a prestigious college, a wealthy family, or connections. We are building for the next billion builders.',
  },
  {
    icon: Users,
    title: 'Community over competition',
    desc: 'Founders who help each other build faster than those who compete in isolation. We design every feature to strengthen connections.',
  },
  {
    icon: Zap,
    title: 'Bias toward action',
    desc: 'We celebrate shipping, iterating, and learning publicly. Analysis paralysis is the enemy of the founder inside every learner.',
  },
  {
    icon: Target,
    title: 'Outcomes, not credentials',
    desc: 'We measure success by businesses launched, skills mastered, and incomes grown — not certificates issued or courses completed.',
  },
]

const TIMELINE = [
  {
    year: '2023',
    title: 'The problem crystallizes',
    desc: 'Co-founder Vikram, a former instructor at a Bengaluru bootcamp, watches brilliant students graduate with real skills but zero idea how to turn them into income. The idea for EntreSkill Hub is born on a whiteboard.',
  },
  {
    year: 'Q1 2024',
    title: 'First prototype ships',
    desc: 'A small team of 4 launches a private beta with 200 users. The AI roadmap generator validates 47 business ideas in the first week. Early users call it "the mentor I never had access to."',
  },
  {
    year: 'Q3 2024',
    title: 'Public launch & 10k users',
    desc: 'EntreSkill Hub opens to the public. Within 90 days, 10,000 learners have created accounts. The Mentor Marketplace launches with 50 vetted industry experts.',
  },
  {
    year: 'Q1 2025',
    title: 'First cohort of startups',
    desc: '23 businesses are formally launched by platform users, including a SaaS product that reaches ₹1 Cr ARR within 6 months of launch. We start tracking "Businesses Launched" as our north star metric.',
  },
  {
    year: 'Q4 2025',
    title: 'EntreSkill Hub 2.0',
    desc: 'A full platform redesign. AI Idea Scoring, SWOT analysis, competitive mapping, and the Weekly Learning Plans system launch together. Users spend 3× more time on the platform.',
  },
  {
    year: '2026',
    title: 'Building toward 10 million',
    desc: 'With 50,000+ active learners and 180+ mentor partnerships, we\'re executing on our 2030 mission: empower 10 million people to launch real businesses from their skills.',
  },
]

const STATS = [
  { value: '50k+', label: 'Active Learners' },
  { value: '180+', label: 'Vetted Mentors' },
  { value: '500+', label: 'Courses & Resources' },
  { value: '23', label: 'Countries Reached' },
  { value: '94%', label: 'Learner Satisfaction' },
  { value: '312', label: 'Businesses Launched' },
]

const TEAM = [
  { name: 'Vikram Mehta', role: 'Co-founder & CEO', bg: 'Formerly: Razorpay, IIT Bombay', color: 'bg-blue-100 dark:bg-blue-950/40 text-blue-700' },
  { name: 'Ananya Krishnan', role: 'Co-founder & CTO', bg: 'Formerly: Swiggy, NIT Trichy', color: 'bg-violet-100 dark:bg-violet-950/40 text-violet-700' },
  { name: 'Ravi Patel', role: 'Head of AI & Product', bg: 'Formerly: Microsoft India, BITS Pilani', color: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700' },
  { name: 'Priya Nair', role: 'Head of Education', bg: 'Formerly: BYJU\'S, Coursera India', color: 'bg-orange-100 dark:bg-orange-950/40 text-orange-700' },
  { name: 'Arjun Sharma', role: 'Head of Mentor Success', bg: 'Serial Founder, 2 exits', color: 'bg-pink-100 dark:bg-pink-950/40 text-pink-700' },
  { name: 'Shreya Doshi', role: 'Head of Growth', bg: 'Formerly: Groww, Zerodha', color: 'bg-amber-100 dark:bg-amber-950/40 text-amber-700' },
]

const HOW_IT_WORKS = [
  { icon: BarChart3, step: '01', title: 'Assess your skills', desc: 'A 5-minute diagnostic shows you exactly where you stand — across technical, marketing, product, and business fundamentals.' },
  { icon: Sparkles, step: '02', title: 'Generate your roadmap', desc: 'Our AI creates a sequenced learning path based on your goal, timeline, and current skills — not a generic checklist.' },
  { icon: BookOpen, step: '03', title: 'Learn with context', desc: 'Courses, labs, and projects connect directly to your roadmap. Every resource has a "why this matters" for your specific goal.' },
  { icon: Users, step: '04', title: 'Connect with mentors', desc: 'Book sessions with vetted founders and experts who have already solved the problems you\'re facing.' },
  { icon: Lightbulb, step: '05', title: 'Validate your idea', desc: 'Run your business idea through our AI-powered SWOT analysis, competitor mapping, and market sizing tools.' },
  { icon: Rocket, step: '06', title: 'Launch with support', desc: 'Use your generated Go-to-Market roadmap to launch, track milestones, and keep momentum through the hard months.' },
]

const FAQS = [
  {
    q: 'Is EntreSkill Hub suitable for complete beginners?',
    a: 'Absolutely. Over 40% of our users start with no prior business experience. Our onboarding assessment identifies your starting point and builds a path from there — not from a mythical "average learner".',
  },
  {
    q: 'What types of businesses can I launch using this platform?',
    a: 'Users have launched SaaS products, freelance agencies, content businesses, e-commerce stores, educational platforms, and local service businesses. The platform works for any skill-to-business journey.',
  },
  {
    q: 'How is this different from Coursera or Udemy?',
    a: 'Coursera and Udemy sell courses. We sell a journey. Our AI roadmaps connect your skills to business outcomes, and our Mentor Marketplace gives you access to real practitioners — not just video recordings. We also track "businesses launched", not just "certificates issued".',
  },
  {
    q: 'Is there a community aspect?',
    a: 'Yes. Our peer community allows learners to share progress, review each other\'s business ideas, collaborate on projects, and celebrate milestones. Community members who launch businesses are highlighted in our founder spotlights.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-secondary/5 pointer-events-none" />
        <div className="absolute top-32 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
        <div className="container-content relative z-10">
          <BreadcrumbNav items={[{ label: 'About Us' }]} />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-sm font-medium mb-6 animate-fade-in-up stagger-1">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Our Story
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-6 leading-tight text-balance animate-fade-in-up stagger-2">
                We believe anyone can build a business{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                  from their skills
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed animate-fade-in-up stagger-3">
                EntreSkill Hub started with a simple frustration: millions of people have real, valuable skills but no clear path from &quot;I can do this&quot; to &quot;I built a business doing this.&quot; We exist to close that gap — with AI, mentorship, and community.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up stagger-4">
                <Link
                  href="/register"
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  Start Your Journey <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                >
                  Talk to the Team
                </Link>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {STATS.map(({ value, label }) => (
                <Card key={label} className="text-center elevation-1 animate-fade-in-up" hoverable>
                  <CardContent className="p-5">
                    <p className="text-3xl font-bold font-heading text-primary">{value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 animate-fade-in-up">
        <div className="container-content">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="animate-fade-in-up stagger-1 elevation-1" hoverable>
              <CardContent className="p-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-bold font-heading mb-3">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To empower 10 million people to launch sustainable businesses from their existing skills by 2030 — with AI-powered guidance, world-class mentorship, and a global community of builders who support each other.
                </p>
              </CardContent>
            </Card>
            <Card className="animate-fade-in-up stagger-2 elevation-1" hoverable>
              <CardContent className="p-8">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Eye className="h-5 w-5 text-secondary-foreground" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-bold font-heading mb-3">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A world where geographic location, economic background, and educational pedigree are no longer barriers to entrepreneurship. Where the most important ingredient is your skill, drive, and access to the right guidance at the right moment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30 border-y animate-fade-in-up">
        <div className="container-content">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">What we stand for</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Six principles that guide every product decision, every hire, and every line of code we write.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <Card key={title} className={`animate-fade-in-up stagger-${i + 1} elevation-1`} hoverable>
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How Platform Works */}
      <section className="py-20 animate-fade-in-up">
        <div className="container-content">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">How it works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Six steps. One goal: turning your skill into a running business.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map(({ icon: Icon, step, title, desc }, i) => (
              <Card key={step} className={`animate-fade-in-up stagger-${i + 1} elevation-1`} hoverable>
                <CardContent className="p-6 relative">
                  <div className="text-4xl font-bold font-heading text-muted-foreground/10 absolute top-4 right-5 select-none" aria-hidden="true">
                    {step}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/30 border-y animate-fade-in-up">
        <div className="mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">Our story, in milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" aria-hidden="true" />
            <div className="space-y-10">
              {TIMELINE.map(({ year, title, desc }, i) => (
                <div
                  key={year}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ml-16 md:ml-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <Card className={`inline-block max-w-sm animate-fade-in-up stagger-${i + 1} elevation-1`} hoverable>
                      <CardContent className="p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{year}</p>
                        <h3 className="font-bold mb-1">{title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                      </CardContent>
                    </Card>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 top-5 w-4 h-4 rounded-full bg-primary border-2 border-background md:-translate-x-1/2 z-10" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 animate-fade-in-up">
        <div className="container-content">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">Meet the team</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built by founders, engineers, and educators who have lived the journey we are building for.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map(({ name, role, bg: background, color }, i) => (
              <Card key={name} className={`animate-fade-in-up stagger-${i + 1} elevation-1`} hoverable>
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-xl font-bold font-heading`} aria-hidden="true">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold">{name}</h3>
                    <p className="text-sm text-muted-foreground">{role}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">{background}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline animate-fade-in-up"
            >
              We&apos;re hiring — view open roles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20 bg-muted/30 border-y animate-fade-in-up">
        <div className="container-content max-w-4xl text-center">
          <TrendingUp className="h-10 w-10 text-primary mx-auto mb-5" aria-hidden="true" />
          <h2 className="text-3xl font-bold font-heading mb-5">Where we&apos;re going</h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            By 2030, we aim to be the largest founder education ecosystem in Asia — with 10 million learners, 10,000 mentors, and a community where the next Zoho, Freshworks, or Zerodha gets its first customer. We are building the infrastructure for the next generation of builders.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {[
              ['10M', 'Learners by 2030'],
              ['50+', 'Languages'],
              ['150+', 'Countries'],
              ['10k', 'Mentor Partners'],
            ].map(([num, label], i) => (
              <Card key={label} className={`animate-fade-in-up stagger-${i + 1} elevation-1`} hoverable>
                <CardContent className="px-6 py-4 text-center">
                  <p className="text-2xl font-bold font-heading text-primary">{num}</p>
                  <p className="mt-1">{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 animate-fade-in-up">
        <div className="container-content max-w-4xl">
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary to-blue-700 animate-fade-in-up">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1),_transparent)] pointer-events-none" aria-hidden="true" />
            <CardContent className="p-10 md:p-16 text-center text-white relative z-10">
              <Star className="h-10 w-10 mx-auto mb-5 fill-white/30 text-white" aria-hidden="true" />
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Ready to build something real?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Join 50,000+ learners who are turning their skills into businesses right now. Free to start, no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/register"
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white/40 text-white hover:bg-white/10")}
                >
                  Talk to Us
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t animate-fade-in-up">
        <div className="container-content max-w-3xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              FAQ
            </Badge>
            <h2 className="text-3xl font-bold font-heading">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map(({ q, a }, i) => (
              <Card key={q} className={`animate-fade-in-up stagger-${i + 1} elevation-1`} hoverable>
                <CardContent className="p-0">
                  <details className="group">
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl">
                      <span className="pr-4 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                        {q}
                      </span>
                      <span className="relative flex-shrink-0 ml-2">
                        <Plus className="h-5 w-5 text-muted-foreground group-open:hidden" aria-hidden="true" />
                        <Minus className="h-5 w-5 text-primary hidden group-open:block" aria-hidden="true" />
                      </span>
                    </summary>
                    <div className="px-5 pb-5 pt-0 text-muted-foreground text-sm leading-relaxed">
                      {a}
                    </div>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
