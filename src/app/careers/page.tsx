import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav'
import {
  Users, Globe, Heart, Zap, Coffee, Laptop, Shield,
  ArrowRight, CheckCircle2, Briefcase, Clock, MapPin,
  Star, GraduationCap, Sparkles, Building2
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers — EntreSkill Hub',
  description: 'Join the EntreSkill Hub team and help build the future of startup education. We are hiring engineers, designers, educators, and growth marketers.',
  openGraph: {
    title: 'Careers at EntreSkill Hub — Build the Future of Startup Education',
    description: 'Help thousands of people turn skills into startups. Explore open roles at EntreSkill Hub.',
  },
}

const BENEFITS = [
  { icon: Laptop, title: 'Remote-First', desc: 'Work from anywhere in the world. We have team members across 8 countries and zero mandatory office days.' },
  { icon: Heart, title: 'Equity & Ownership', desc: 'Every full-time employee gets meaningful equity. When the company wins, you win — not just in salary.' },
  { icon: GraduationCap, title: 'Learning Budget', desc: '₹80,000 per year for courses, books, conferences, and certifications. We invest in your growth seriously.' },
  { icon: Coffee, title: 'Flexible Hours', desc: 'Core hours are 11am–3pm IST for collaboration. The rest is yours to structure around deep work.' },
  { icon: Shield, title: 'Health Coverage', desc: 'Comprehensive health insurance for you and your family, including mental health and wellness benefits.' },
  { icon: Globe, title: 'International Offsites', desc: 'Annual team offsite in a new city. Past trips: Goa, Bali, Lisbon. Come for the work, stay for the beach.' },
  { icon: Zap, title: 'AI-First Workflows', desc: 'We use and build with the latest AI tools. You\'ll never be told to use a legacy process just because "we\'ve always done it this way."' },
  { icon: Users, title: 'World-Class Team', desc: 'Work alongside engineers from Razorpay, Swiggy, and Groww — and founders who have built and exited companies.' },
]

const OPEN_ROLES = [
  { title: 'Senior Frontend Engineer', dept: 'Engineering', type: 'Full-time', location: 'Remote (India)', level: 'Senior', posted: '3 days ago' },
  { title: 'AI/ML Engineer', dept: 'Engineering', type: 'Full-time', location: 'Remote (Global)', level: 'Mid-Senior', posted: '1 week ago' },
  { title: 'Product Designer', dept: 'Design', type: 'Full-time', location: 'Remote (India)', level: 'Mid', posted: '5 days ago' },
  { title: 'Curriculum Developer (Tech)', dept: 'Education', type: 'Full-time', location: 'Remote (India)', level: 'Mid', posted: '2 weeks ago' },
  { title: 'Growth Marketing Manager', dept: 'Marketing', type: 'Full-time', location: 'Remote (India)', level: 'Senior', posted: '4 days ago' },
  { title: 'Startup Mentor Success Manager', dept: 'Community', type: 'Full-time', location: 'Remote (India)', level: 'Mid', posted: '1 week ago' },
  { title: 'Backend Engineer (Node.js)', dept: 'Engineering', type: 'Full-time', location: 'Remote (India)', level: 'Mid', posted: '1 week ago' },
]

const INTERNSHIPS = [
  { title: 'Product Design Intern', dept: 'Design', duration: '3 months', stipend: '₹25,000/month' },
  { title: 'Content & SEO Intern', dept: 'Marketing', duration: '3–6 months', stipend: '₹20,000/month' },
  { title: 'Frontend Dev Intern (React)', dept: 'Engineering', duration: '3 months', stipend: '₹30,000/month' },
]

const HIRING_STEPS = [
  { step: '01', title: 'Apply Online', desc: 'Submit your application with your resume and a brief note on why you want to join. No cover letter required — we hate them too.' },
  { step: '02', title: 'Intro Call (30 min)', desc: 'A casual conversation with our recruiting team to understand your background, goals, and answer your questions about the role.' },
  { step: '03', title: 'Skills Assessment', desc: 'A short, practical take-home task relevant to the role. Typical time investment: 2–4 hours. We respect your time — we\'ll never ask for more.' },
  { step: '04', title: 'Final Interview', desc: 'A technical and cultural interview with your future team lead and a co-founder. We want to meet the full you, not just your resume.' },
  { step: '05', title: 'Offer & Onboarding', desc: 'Fast decisions — you\'ll hear back within 48 hours. Onboarding is structured, async-friendly, and designed to make your first month genuinely good.' },
]

const VALUES = [
  { title: 'Ship fast, iterate faster', desc: 'We\'d rather launch at 80% and learn than spend months perfecting in private. Momentum beats perfection.' },
  { title: 'Founders first', desc: 'Every product decision is evaluated by one question: does this help a real founder make more progress today?' },
  { title: 'Radical transparency', desc: 'Financials, roadmap, and OKRs are shared with the whole team. No information silos, no politics.' },
  { title: 'Curiosity over credentials', desc: 'We don\'t care about where you went to college. We care about how you think, what you\'ve built, and what you\'re excited about learning.' },
]

const FAQS = [
  {
    q: 'Do you sponsor visas?',
    a: 'Currently we hire remote contractors and full-time employees in India without visa sponsorship. We are working toward a global entity structure — stay tuned.',
  },
  {
    q: 'What does the interview process look like in terms of time commitment?',
    a: 'From application to offer typically takes 2–3 weeks. We move quickly and won\'t ghost you — you\'ll get a decision after every stage within 48 hours.',
  },
  {
    q: 'Can I apply to multiple roles?',
    a: 'Yes. If you have overlapping skills and are genuinely interested in more than one role, apply to both. Just mention it in your note so we can route you efficiently.',
  },
  {
    q: 'Are these roles open to freshers?',
    a: 'Most full-time roles require 2+ years of experience. Our internships are specifically designed for students and recent graduates. Check the internship listings above.',
  },
  {
    q: 'What is the equity package like?',
    a: 'We offer competitive stock options with a 4-year vesting schedule and a 1-year cliff. Specifics are shared in the offer stage. We are transparent about our cap table with all team members.',
  },
]

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-secondary/5 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <BreadcrumbNav items={[{ label: 'Careers' }]} />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                We are hiring — 7 open roles
              </div>

              <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-5 leading-tight text-balance">
                Help us build the world&apos;s best{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                  founder education platform
                </span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                We are a small team obsessed with one idea: anyone with a skill and the drive to build should have access to the tools, knowledge, and mentors to launch a real business. Come help us make that true.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href="#open-roles"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  View Open Roles <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#culture"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border-2 border-border font-semibold hover:bg-muted/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Heart className="h-4 w-4" /> Life at EntreSkill
                </a>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                {[['7', 'Open Roles'], ['8+', 'Countries'], ['100%', 'Remote']].map(([num, label]) => (
                  <div key={label}>
                    <p className="text-xl font-bold text-foreground font-heading">{num}</p>
                    <p>{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Values visual */}
            <div className="hidden lg:block" aria-hidden="true">
              <div className="grid grid-cols-2 gap-4">
                {VALUES.map(({ title, desc }) => (
                  <div key={title} className="bg-card rounded-xl border p-5 hover:shadow-md transition-shadow">
                    <Star className="h-5 w-5 text-secondary fill-secondary mb-3" />
                    <p className="font-semibold text-sm mb-1">{title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="culture" className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">What we offer</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We believe great work happens when people are treated like adults — given autonomy, support, and real ownership.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
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

      {/* Open Roles */}
      <section id="open-roles" className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-2">Open positions</h2>
              <p className="text-muted-foreground">All roles are remote unless otherwise noted.</p>
            </div>
            <Briefcase className="h-8 w-8 text-primary hidden md:block" aria-hidden="true" />
          </div>

          <div className="space-y-3">
            {OPEN_ROLES.map(({ title, dept, type, location, level, posted }) => (
              <div
                key={title}
                className="group bg-card rounded-xl border p-5 md:p-6 hover:border-primary/40 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">{dept}</span>
                    <span className="text-xs text-muted-foreground">· {posted}</span>
                  </div>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{title}</h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{location}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{type}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/8 text-primary text-xs font-medium">{level}</span>
                </div>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-1.5 h-9 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap"
                >
                  Apply <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internships */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 text-secondary-foreground text-sm font-medium mb-4">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              For Students & Fresh Grads
            </div>
            <h2 className="text-3xl font-bold font-heading mb-3">Internship Program</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Our internship cohorts run quarterly. You work on real products, get structured mentorship, and have the opportunity to convert to a full-time role.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {INTERNSHIPS.map(({ title, dept, duration, stipend }) => (
              <div key={title} className="bg-card rounded-xl border p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-secondary-foreground" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{dept}</p>
                  <h3 className="font-bold">{title}</h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{duration}</span>
                  <span className="font-medium text-foreground">{stipend}</span>
                </div>
                <Link
                  href="/contact"
                  className="flex items-center justify-center h-9 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Express Interest
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">How we hire</h2>
            <p className="text-muted-foreground">Transparent, fast, and respectful of your time. No hidden stages.</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" aria-hidden="true" />
            <div className="space-y-8">
              {HIRING_STEPS.map(({ step, title, desc }) => (
                <div key={step} className="flex gap-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold font-heading shrink-0 z-10 relative">
                      {step}
                    </div>
                  </div>
                  <div className="pt-3 pb-6">
                    <h3 className="font-bold text-lg mb-1">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-primary to-blue-700 p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1),_transparent)] pointer-events-none" />
            <Sparkles className="h-10 w-10 mx-auto mb-5 opacity-80" aria-hidden="true" />
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Don&apos;t see the right role?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              We&apos;re growing fast and sometimes build roles around exceptional people. Send your details and tell us how you&apos;d contribute.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-white text-primary font-semibold hover:bg-white/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
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
    </main>
  )
}
