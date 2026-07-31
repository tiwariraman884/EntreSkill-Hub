import type { Metadata } from 'next'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav'
import {
  Users, Globe, Heart, Zap, Coffee, Laptop, Shield,
  ArrowRight, CheckCircle2, Briefcase, Clock, MapPin,
  Star, GraduationCap, Sparkles, Building2, Plus, Minus
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
      <section className="relative pt-24 pb-20 overflow-hidden border-b animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-secondary/5 pointer-events-none" />
        <div className="container-content relative z-10">
          <BreadcrumbNav items={[{ label: 'Careers' }]} />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-6 animate-fade-in-up stagger-1 text-sm">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                We are hiring — 7 open roles
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-6 leading-tight text-balance animate-fade-in-up stagger-2">
                Help us build the world&apos;s best{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                  founder education platform
                </span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg animate-fade-in-up stagger-3">
                We are a small team obsessed with one idea: anyone with a skill and the drive to build should have access to the tools, knowledge, and mentors to launch a real business. Come help us make that true.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10 animate-fade-in-up stagger-4">
                <Link href="#open-roles" className={cn(buttonVariants({ size: "lg" }))}>
                  View Open Roles <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#culture" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                  <Heart className="h-4 w-4" /> Life at EntreSkill
                </Link>
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
            <div className="hidden lg:grid grid-cols-2 gap-4 animate-fade-in" aria-hidden="true">
              {VALUES.map(({ title, desc }, i) => (
                <Card key={title} className={`animate-fade-in-up stagger-${i + 1} elevation-1`} hoverable>
                  <CardContent className="p-5">
                    <Star className="h-5 w-5 text-secondary fill-secondary mb-3" />
                    <p className="font-semibold text-sm mb-1">{title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="culture" className="py-20 animate-fade-in-up">
        <div className="container-content">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">What we offer</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We believe great work happens when people are treated like adults — given autonomy, support, and real ownership.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map(({ icon: Icon, title, desc }, i) => (
              <Card key={title} className={`animate-fade-in-up ${i < 6 ? `stagger-${i + 1}` : ''} elevation-1`} hoverable>
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4 transition-colors">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="open-roles" className="py-20 bg-muted/30 border-y animate-fade-in-up">
        <div className="container-content">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-2">Open positions</h2>
              <p className="text-muted-foreground">All roles are remote unless otherwise noted.</p>
            </div>
            <Briefcase className="h-8 w-8 text-primary hidden md:block" aria-hidden="true" />
          </div>

          <div className="space-y-3">
            {OPEN_ROLES.map(({ title, dept, type, location, level, posted }) => (
              <Card key={title} className="animate-fade-in-up elevation-1" hoverable>
                <CardContent className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
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
                    <Badge variant="outline">{level}</Badge>
                  </div>
                  <Link href="/contact" className={cn(buttonVariants({ size: "sm" }))}>
                    Apply <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Internships */}
      <section className="py-20 animate-fade-in-up">
        <div className="container-content">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-sm">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              For Students & Fresh Grads
            </Badge>
            <h2 className="text-3xl font-bold font-heading mb-3">Internship Program</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Our internship cohorts run quarterly. You work on real products, get structured mentorship, and have the opportunity to convert to a full-time role.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {INTERNSHIPS.map(({ title, dept, duration, stipend }, i) => (
              <Card key={title} className={`animate-fade-in-up stagger-${i + 1} elevation-1`} hoverable>
                <CardContent className="p-6 flex flex-col gap-4">
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
                </CardContent>
                <CardFooter className="border-t-0 px-6 pb-6 pt-0">
                  <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full")}>
                    Express Interest
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-20 bg-muted/30 border-y animate-fade-in-up">
        <div className="container-content max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">How we hire</h2>
            <p className="text-muted-foreground">Transparent, fast, and respectful of your time. No hidden stages.</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" aria-hidden="true" />
            <div className="space-y-8">
              {HIRING_STEPS.map(({ step, title, desc }, i) => (
                <div key={step} className={`flex gap-6 animate-fade-in-up stagger-${i + 1}`}>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold font-heading shrink-0 z-10 relative">
                      {step}
                    </div>
                  </div>
                  <div className="pt-3 pb-6 flex-1">
                    <Card className="shadow-sm border-border/60" hoverable>
                      <CardContent className="p-5">
                        <h3 className="font-bold text-lg mb-1">{title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 animate-fade-in-up">
        <div className="container-content max-w-4xl">
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary to-blue-700 animate-fade-in-up" hoverable>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1),_transparent)] pointer-events-none" aria-hidden="true" />
            <CardContent className="p-10 md:p-16 text-center text-white relative z-10">
              <Sparkles className="h-10 w-10 mx-auto mb-5 opacity-80" aria-hidden="true" />
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Don&apos;t see the right role?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                We&apos;re growing fast and sometimes build roles around exceptional people. Send your details and tell us how you&apos;d contribute.
              </p>
              <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "bg-white text-primary hover:bg-white/90 border-transparent shadow-lg")}>
                Get in Touch <ArrowRight className="h-4 w-4" />
              </Link>
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
