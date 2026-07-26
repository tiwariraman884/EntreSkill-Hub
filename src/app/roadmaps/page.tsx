import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { MOCK_ROADMAPS, Roadmap, RoadmapStep } from '@/data/mock-roadmaps'
import {
  Map, Clock, Target, ArrowRight, PlayCircle, CheckCircle2, Trophy,
  Brain, Code2, Shield, Smartphone, Cloud, BarChart3, Bitcoin,
  Palette, Terminal, Rocket, Megaphone, PenTool, TrendingUp,
  Sparkles, Star, Award, Flag
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Learning Roadmaps — EntreSkill Hub',
  description: 'Personalized AI-generated learning roadmaps from beginner to startup founder. Track progress, earn certificates, and follow structured paths across 13 tech and business domains.',
}

const ROADMAP_CATEGORIES = [
  { name: 'AI & ML', icon: Brain, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/30', duration: '6–9 months' },
  { name: 'Web Development', icon: Code2, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30', duration: '5–7 months' },
  { name: 'Cybersecurity', icon: Shield, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950/30', duration: '6–8 months' },
  { name: 'App Development', icon: Smartphone, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-950/30', duration: '5–7 months' },
  { name: 'Cloud Computing', icon: Cloud, color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-950/30', duration: '4–6 months' },
  { name: 'Data Science', icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-950/30', duration: '6–9 months' },
  { name: 'Blockchain', icon: Bitcoin, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30', duration: '4–6 months' },
  { name: 'UI/UX Design', icon: Palette, color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-950/30', duration: '4–6 months' },
  { name: 'DevOps', icon: Terminal, color: 'text-slate-600', bg: 'bg-slate-50 dark:bg-slate-950/30', duration: '5–7 months' },
  { name: 'Startup Founder', icon: Rocket, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-950/30', duration: '8–12 months' },
  { name: 'Digital Marketing', icon: Megaphone, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-950/30', duration: '3–5 months' },
  { name: 'Content Writing', icon: PenTool, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30', duration: '2–4 months' },
  { name: 'Finance', icon: TrendingUp, color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-950/30', duration: '4–6 months' },
]

const ROADMAP_FEATURES = [
  { icon: Sparkles, title: 'AI-Generated & Personalized', desc: 'Your roadmap is built around your skill level, timeline, and specific goal — not a one-size-fits-all template.' },
  { icon: Flag, title: 'Clear Milestones', desc: 'Every roadmap breaks down into achievable milestones with clear success criteria and estimated completion times.' },
  { icon: Star, title: 'Skill Assessment', desc: 'Start with a quick diagnostic so the AI knows exactly where to begin — skipping what you already know.' },
  { icon: Award, title: 'Earn Certificates', desc: 'Complete a roadmap and earn a shareable, blockchain-backed certificate for your portfolio and LinkedIn.' },
  { icon: Target, title: 'Progress Tracking', desc: 'Visual progress indicators, weekly check-ins, and milestone celebrations keep you moving forward consistently.' },
  { icon: Clock, title: 'Time Estimates', desc: 'Every resource and milestone shows estimated completion time so you can plan your learning schedule realistically.' },
]

export default function RoadmapsDashboard() {
  const activeRoadmaps = MOCK_ROADMAPS.filter(r => r.progressPercent < 100)
  const completedRoadmaps = MOCK_ROADMAPS.filter(r => r.progressPercent === 100)

  return (
    <>
      {/* Public marketing section — shown to all visitors */}
      <section className="relative border-b bg-gradient-to-br from-primary/6 via-background to-secondary/4 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              AI-Powered Roadmaps
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-5 text-balance">
              Your personalized path from{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                learner to founder
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AI-generated learning roadmaps that adapt to your skill level, goals, and timeline. Choose a domain, set your target, and follow a structured path with milestones, resources, and certificates.
            </p>
          </div>

          {/* Popular categories */}
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground text-center mb-6">
              Popular Roadmap Categories
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {ROADMAP_CATEGORIES.map(({ name, icon: Icon, color, bg, duration }) => (
                <Link
                  key={name}
                  href="/register"
                  className={`group flex flex-col items-center text-center gap-2 p-4 rounded-xl border hover:border-primary/40 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${bg}`}
                >
                  <div className={`p-2.5 rounded-xl bg-white/60 dark:bg-black/20 ${color} group-hover:scale-110 transition-transform`}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-semibold leading-tight">{name}</p>
                  <p className="text-[10px] text-muted-foreground">{duration}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Features row */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {ROADMAP_FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 p-4 rounded-xl border bg-card/60 hover:bg-card hover:shadow-sm transition-all">
                <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Generate My Roadmap <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-xs text-muted-foreground mt-3">Free forever · No credit card needed</p>
          </div>
        </div>
      </section>

      {/* Authenticated dashboard section */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3 flex items-center gap-3">
              <Map className="size-8 text-primary" aria-hidden="true" /> My Roadmaps
            </h2>
            <p className="text-muted-foreground text-lg">
              Track your progress and continue building your businesses.
            </p>
          </div>
          <Link href="/ideas">
            <Button variant="outline">Explore New Ideas</Button>
          </Link>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
              <PlayCircle className="size-5 text-primary" aria-hidden="true" /> Active Roadmaps
            </h2>
            {activeRoadmaps.length === 0 ? (
              <div className="text-center py-16 border rounded-xl bg-muted/20">
                <Map className="size-12 text-muted-foreground mx-auto mb-4 opacity-50" aria-hidden="true" />
                <p className="text-muted-foreground font-medium text-lg mb-2">No active roadmaps</p>
                <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
                  You haven&apos;t started any business roadmaps yet. Find an idea you love and get your personalized plan.
                </p>
                <Link href="/ideas">
                  <Button>Browse Business Ideas</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeRoadmaps.map(roadmap => (
                  <RoadmapCard key={roadmap.id} roadmap={roadmap} />
                ))}
              </div>
            )}
          </section>

          {completedRoadmaps.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
                <Trophy className="size-5 text-amber-500" aria-hidden="true" /> Completed
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedRoadmaps.map(roadmap => (
                  <RoadmapCard key={roadmap.id} roadmap={roadmap} isCompleted />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}

function RoadmapCard({ roadmap, isCompleted = false }: { roadmap: Roadmap, isCompleted?: boolean }) {
  const currentStep = roadmap.steps.find((s: RoadmapStep) => s.status === 'Current') || roadmap.steps[0]
  const completedSteps = roadmap.steps.filter((s: RoadmapStep) => s.status === 'Completed').length
  const totalSteps = roadmap.steps.length

  return (
    <Card className={`flex flex-col h-full hover:shadow-md transition-shadow ${isCompleted ? 'bg-muted/30 border-dashed' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant={roadmap.difficulty === 'Beginner' ? 'default' : roadmap.difficulty === 'Intermediate' ? 'secondary' : 'outline'}>
            {roadmap.difficulty}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
            <Clock className="size-3" aria-hidden="true" /> {roadmap.estimatedDuration}
          </span>
        </div>
        <CardTitle className="text-xl">{roadmap.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {roadmap.overview}
        </p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className={isCompleted ? 'text-amber-600' : 'text-primary'}>
              {isCompleted ? 'Completed' : 'Progress'}
            </span>
            <span>{roadmap.progressPercent}%</span>
          </div>
          <Progress value={roadmap.progressPercent} className={`h-2 ${isCompleted ? '[&>div]:bg-amber-500' : ''}`} />
          <p className="text-xs text-muted-foreground text-right">
            {completedSteps} of {totalSteps} milestones completed
          </p>
        </div>

        {!isCompleted && currentStep && (
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 flex items-start gap-3">
            <Target className="size-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Current Milestone</p>
              <p className="text-sm font-medium text-foreground">{currentStep.title}</p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Link href={`/roadmaps/${roadmap.id}`} className="w-full">
          <Button className={`w-full group ${isCompleted ? 'bg-background text-foreground border shadow-none hover:bg-muted' : ''}`}>
            {isCompleted ? (
              <>Review Roadmap <CheckCircle2 className="ml-2 size-4 text-amber-500" aria-hidden="true" /></>
            ) : (
              <>Resume Roadmap <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" /></>
            )}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
