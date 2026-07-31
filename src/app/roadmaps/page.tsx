import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { EmptyState } from '@/components/ui/empty-state'
import { MOCK_ROADMAPS, Roadmap } from '@/data/mock-roadmaps'
import {
  Route,
  Target,
  Flag,
  Compass,
  ArrowRight,
  CheckCircle2,
  Trophy,
  Map,
  Sparkles,
  Clock,
  Users,
  Star,
  Zap,
  Layers,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Learning Roadmaps — MentorHub',
  description: 'Structured learning paths from beginner to founder. Track milestones, earn XP, and unlock achievements.',
}

const ROADMAP_ICONS: Record<string, typeof Route> = {
  'rm-cloud-kitchen': Route,
  'rm-freelance': Target,
}

const DIFFICULTY_CONFIG: Record<
  string,
  { variant: 'default' | 'secondary' | 'outline' }
> = {
  Beginner: { variant: 'secondary' },
  Intermediate: { variant: 'default' },
  Advanced: { variant: 'outline' },
}

const STATS = [
  { label: 'Roadmaps', value: '12' },
  { label: 'Milestones', value: '45+' },
  { label: 'Resources', value: '500+' },
  { label: 'XP earned', value: '2,400+' },
]

const WEEKLY_GOALS = [
  { id: 'wg-1', text: 'Complete 2 roadmap tasks', done: true },
  { id: 'wg-2', text: 'Review 1 resource article', done: false },
  { id: 'wg-3', text: 'Update milestone notes', done: false },
  { id: 'wg-4', text: 'Earn 100 XP this week', done: false },
]

const ACHIEVEMENTS = [
  { label: 'First Step', variant: 'default' as const },
  { label: 'Streak 3d', variant: 'secondary' as const },
  { label: 'Explorer', variant: 'outline' as const },
]

const RECOMMENDED_ROADMAPS = [
  {
    id: "rec-1",
    title: "SaaS Indie Hacker",
    overview: "From first line of code to profitable subscription product. Master MVP building, micro-SaaS strategies, and Stripe billing integrations.",
    difficulty: "Intermediate",
    estimatedDuration: "6 months",
    stepsCount: 12,
  },
  {
    id: "rec-2",
    title: "AI Product Creator",
    overview: "Design and ship intelligence-powered applications. Learn prompt engineering, LangChain workflows, and vector databases.",
    difficulty: "Advanced",
    estimatedDuration: "4 months",
    stepsCount: 8,
  },
  {
    id: "rec-3",
    title: "Full-Stack Growth Marketer",
    overview: "Combine engineering skills with user acquisition. Master analytics setups, automated funnel building, and programmatic SEO.",
    difficulty: "Beginner",
    estimatedDuration: "3 months",
    stepsCount: 6,
  },
]

export default function RoadmapsPage() {
  const activeRoadmaps = MOCK_ROADMAPS.filter(r => r.progressPercent < 100)
  const completedRoadmaps = MOCK_ROADMAPS.filter(r => r.progressPercent === 100)
  const totalXP = 2400
  const currentLevel = 8

  if (MOCK_ROADMAPS.length === 0) {
    return (
      <main className="min-h-screen bg-canvas">
        <EmptyState
          icon="map"
          title="No roadmaps yet"
          description="Start your first roadmap to begin your entrepreneurial journey"
          actionLabel="Browse Roadmaps"
          actionHref="/roadmaps"
        />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-canvas">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <HeroSection stats={STATS} />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 pt-6 pb-20">
          <div className="flex-1 min-w-0 space-y-12 lg:space-y-14">
            {activeRoadmaps.length > 0 && (
              <section className="animate-reveal">
                <SectionHeading label="Active" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeRoadmaps.map((roadmap, i) => (
                    <div
                      key={roadmap.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${0.05 + i * 0.08}s` }}
                    >
                      <RoadmapCard roadmap={roadmap} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {completedRoadmaps.length > 0 && (
              <section className="animate-reveal">
                <SectionHeading label="Completed" icon={Trophy} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedRoadmaps.map((roadmap, i) => (
                    <div
                      key={roadmap.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${0.05 + i * 0.08}s` }}
                    >
                      <RoadmapCard roadmap={roadmap} isCompleted />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Recommended Roadmaps — fills lower-left gap */}
            <section className="animate-reveal">
              <SectionHeading label="Recommended for You" icon={Sparkles} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {RECOMMENDED_ROADMAPS.map((r, i) => (
                  <div
                    key={r.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${0.05 + i * 0.1}s` }}
                  >
                    <RecommendedRoadmapCard roadmap={r} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="w-full lg:w-[340px] shrink-0 space-y-6">
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              <XPSummaryCard xp={totalXP} level={currentLevel} />
            </div>
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: '0.18s' }}
            >
              <WeeklyGoalsCard goals={WEEKLY_GOALS} />
            </div>
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: '0.26s' }}
            >
              <AchievementsCard achievements={ACHIEVEMENTS} />
            </div>
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: '0.34s' }}
            >
              <CalendarHintCard />
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

function HeroSection({ stats }: { stats: { label: string; value: string }[] }) {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden rounded-b-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo via-indigo-dark to-surface-sunken" />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 25%, rgba(129,140,248,0.4), transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 75%, rgba(99,102,241,0.3), transparent 55%)
          `,
        }}
      />
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo/20 blur-3xl animate-float"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-marigold/10 blur-3xl animate-float-delayed"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/10 backdrop-blur-md mb-7 animate-scale-in">
          <span className="w-1.5 h-1.5 rounded-full bg-marigold animate-pulse" aria-hidden="true" />
          <span className="text-[0.65rem] font-bold text-white/80 tracking-[0.15em] uppercase">
            Your Learning Journey
          </span>
        </div>

        <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] text-white leading-[1.08] tracking-tight mb-5 text-balance">
          Skills built through
          <span className="block bg-gradient-to-r from-marigold via-marigold-light to-white bg-clip-text text-transparent mt-1">
            structured roadmaps
          </span>
        </h1>
        <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed text-pretty">
          Step-by-step paths guided by industry mentors. Track milestones, earn XP, and unlock achievements on your path to mastery.
        </p>

        <div className="flex justify-center mt-8">
          <Link
            href="/roadmaps"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold bg-gradient-to-r from-marigold to-marigold-light text-ink shadow-lg shadow-marigold/25 hover:shadow-xl hover:shadow-marigold/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Explore all roadmaps
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="animate-scale-in flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/8 border border-white/10 backdrop-blur-md"
              style={{ animationDelay: '0.25s' }}
            >
              <span className="font-heading font-bold text-white text-sm tracking-tight">
                {stat.value}
              </span>
              <span
                className="w-px h-3.5 bg-white/20 rounded-full"
                aria-hidden="true"
              />
              <span className="text-white/55 text-[0.65rem] font-sans tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionHeading({
  label,
  icon: Icon,
}: {
  label: string
  icon?: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex items-center gap-4 mb-7">
      <h2 className="font-heading text-2xl font-semibold text-ink tracking-tight">
        {label}
      </h2>
      <div
        className="flex-1 h-px bg-gradient-to-r from-border via-border/60 to-transparent"
        aria-hidden="true"
      />
      {Icon && <Icon className="w-5 h-5 text-marigold shrink-0" aria-hidden="true" />}
    </div>
  )
}

function RoadmapCard({
  roadmap,
  isCompleted = false,
}: {
  roadmap: Roadmap
  isCompleted?: boolean
}) {
  const completedSteps = roadmap.steps.filter(s => s.status === 'Completed').length
  const totalSteps = roadmap.steps.length
  const IconComp = ROADMAP_ICONS[roadmap.id] || Compass
  const diffConfig = DIFFICULTY_CONFIG[roadmap.difficulty] || {
    variant: 'default' as const,
  }

  return (
    <Card
      hoverable
      glow={!isCompleted}
      className={cn(
        'flex flex-col h-full bg-surface-elevated rounded-2xl',
        isCompleted && 'opacity-80',
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex items-center justify-center rounded-xl size-10 shrink-0',
                isCompleted
                  ? 'bg-marigold/10 text-marigold'
                  : 'bg-indigo/10 text-indigo',
              )}
            >
              <IconComp className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-heading font-semibold text-ink text-lg leading-snug line-clamp-1">
              {roadmap.title}
            </h3>
          </div>
          <ProgressBadge percent={roadmap.progressPercent} completed={isCompleted} />
        </div>
        <CardDescription className="line-clamp-2">
          {roadmap.overview}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-5">
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span
              className={cn(
                'text-[0.65rem] font-bold uppercase tracking-[0.12em]',
                isCompleted ? 'text-marigold' : 'text-indigo',
              )}
            >
              {isCompleted ? 'Completed' : 'Progress'}
            </span>
            <span className="text-ink tabular-nums font-semibold">{roadmap.progressPercent}%</span>
          </div>
          <Progress value={roadmap.progressPercent} className="h-2" />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <MetaPill icon={Flag} text={`${totalSteps} Steps`} />
          <MetaPill icon={Target} text={roadmap.estimatedDuration} />
          <Badge variant={diffConfig.variant} className="text-[0.7rem] font-semibold rounded-lg">
            {roadmap.difficulty}
          </Badge>
        </div>

        <MilestoneDots total={totalSteps} completed={completedSteps} />
      </CardContent>

      <CardFooter className="pt-3">
        <Link
          href={`/roadmaps/${roadmap.id}`}
          className={cn(
            'inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            isCompleted
              ? 'border-2 border-indigo/20 bg-surface-sunken text-indigo hover:bg-indigo/5 hover:border-indigo/30'
              : 'bg-gradient-to-r from-indigo to-indigo-light text-white shadow-lg shadow-indigo/25 hover:shadow-xl hover:shadow-indigo/30 hover:-translate-y-0.5 active:translate-y-0',
          )}
        >
          {isCompleted ? (
            <>
              Restart
              <CheckCircle2 className="w-4 h-4 ml-2" aria-hidden="true" />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </>
          )}
        </Link>
      </CardFooter>
    </Card>
  )
}

function ProgressBadge({ percent, completed }: { percent: number; completed: boolean }) {
  if (completed) {
    return (
      <span className="inline-flex items-center gap-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full bg-marigold/10 text-marigold border border-marigold/20">
        <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
        Done
      </span>
    )
  }
  if (percent > 0) {
    return (
      <span className="text-[0.6rem] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full bg-indigo/10 text-indigo border border-indigo/15 tabular-nums">
        {percent}%
      </span>
    )
  }
  return (
    <span className="text-[0.6rem] font-semibold px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border tabular-nums">
      New
    </span>
  )
}

function MetaPill({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>
  text: string
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      {text}
    </span>
  )
}

function MilestoneDots({
  total,
  completed,
}: {
  total: number
  completed: number
}) {
  const displayCount = Math.min(5, total)
  const filled = Math.min(completed, displayCount)

  return (
    <div className="flex items-center gap-1.5 pt-1">
      {Array.from({ length: displayCount }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'rounded-full transition-all duration-500',
            i < filled
              ? 'bg-indigo w-2.5 h-2.5 shadow-sm shadow-indigo/30'
              : 'bg-surface-sunken border border-border/60 w-2.5 h-2.5',
          )}
          aria-hidden="true"
        />
      ))}
      {total > 5 && (
        <span className="text-[0.65rem] text-muted-foreground ml-1.5 font-medium">
          +{total - 5}
        </span>
      )}
      <span className="text-[0.65rem] text-muted-foreground ml-auto font-medium tabular-nums">
        {completed}/{total}
      </span>
    </div>
  )
}

function XPSummaryCard({ xp, level }: { xp: number; level: number }) {
  return (
    <Card glow className="rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-br from-indigo via-indigo-dark to-surface-sunken p-5 relative overflow-hidden">
        <div
          className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-indigo-light/20 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative z-10">
          <p className="text-[0.65rem] text-white/50 uppercase tracking-[0.15em] font-sans mb-1 font-semibold">
            Total XP
          </p>
          <p className="font-heading font-bold text-4xl text-white mb-3 tracking-tight">
            {xp.toLocaleString()}
          </p>
          <div className="flex items-center gap-2.5">
            <Badge variant="secondary" className="text-[0.65rem] font-bold rounded-lg">
              Level {level}
            </Badge>
            <span className="text-xs text-white/50 font-medium">Next: Level {level + 1}</span>
          </div>
        </div>
      </div>
      <CardContent className="pt-4 pb-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{xp % 1000} XP this week</span>
          <span>{1000 - (xp % 1000)} XP to next level</span>
        </div>
      </CardContent>
    </Card>
  )
}

function WeeklyGoalsCard({
  goals,
}: {
  goals: { id: string; text: string; done: boolean }[]
}) {
  const doneCount = goals.filter(g => g.done).length
  const percent = Math.round((doneCount / goals.length) * 100)

  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="font-heading text-base font-semibold text-ink flex items-center gap-2">
          <Trophy className="w-4 h-4 text-marigold shrink-0" aria-hidden="true" />
          Weekly Goals
        </CardTitle>
        <CardDescription className="text-xs">
          {doneCount} of {goals.length} completed · {percent}%
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {goals.map(goal => (
          <label
            key={goal.id}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={goal.done}
              readOnly
              className="w-4 h-4 rounded border-2 border-border accent-indigo cursor-pointer shrink-0"
            />
            <span
              className={cn(
                'text-sm transition-all duration-200 group-hover:text-ink',
                goal.done ? 'text-muted-foreground line-through' : 'text-ink',
              )}
            >
              {goal.text}
            </span>
          </label>
        ))}
        <div className="pt-3">
          <Progress value={percent} className="h-1.5" />
        </div>
      </CardContent>
    </Card>
  )
}

function AchievementsCard({
  achievements,
}: {
  achievements: { label: string; variant: 'default' | 'secondary' | 'outline' }[]
}) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="font-heading text-base font-semibold text-ink flex items-center gap-2">
          <Trophy className="w-4 h-4 text-marigold shrink-0" aria-hidden="true" />
          Achievement Unlocks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {achievements.map(achievement => (
            <Badge
              key={achievement.label}
              variant={achievement.variant}
              className="rounded-lg text-xs font-medium"
            >
              {achievement.label}
            </Badge>
          ))}
          <Badge
            variant="outline"
            className="text-xs text-muted-foreground rounded-lg"
          >
            +3 more
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function CalendarHintCard() {
  return (
    <Card className="rounded-2xl border-dashed border-border bg-surface-sunken/50">
      <CardContent className="p-5 flex flex-col items-center text-center gap-2.5">
        <div className="rounded-xl bg-indigo/8 p-2.5 text-indigo">
          <Map className="w-5 h-5" aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold text-ink">Sync with your calendar</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Schedule your roadmaps and get reminders on Google Calendar.
        </p>
        <Link
          href="/settings"
          className="text-xs font-semibold text-indigo hover:text-indigo-light transition-colors mt-1"
        >
          Set up in Settings
        </Link>
      </CardContent>
    </Card>
  )
}

const DIFFICULTY_COLORS: Record<string, { badge: string; icon: string; glow: string }> = {
  Beginner: {
    badge: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    icon: 'bg-emerald-500/10 text-emerald-600',
    glow: 'hover:shadow-emerald-500/10',
  },
  Intermediate: {
    badge: 'bg-indigo/10 text-indigo border-indigo/20',
    icon: 'bg-indigo/10 text-indigo',
    glow: 'hover:shadow-indigo/10',
  },
  Advanced: {
    badge: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    icon: 'bg-rose-500/10 text-rose-600',
    glow: 'hover:shadow-rose-500/10',
  },
}

const DIFFICULTY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Beginner: Star,
  Intermediate: Zap,
  Advanced: Layers,
}

function RecommendedRoadmapCard({
  roadmap,
}: {
  roadmap: {
    id: string
    title: string
    overview: string
    difficulty: string
    estimatedDuration: string
    stepsCount: number
  }
}) {
  const colors = DIFFICULTY_COLORS[roadmap.difficulty] ?? DIFFICULTY_COLORS['Intermediate']
  const DiffIcon = DIFFICULTY_ICONS[roadmap.difficulty] ?? Zap

  return (
    <Card
      hoverable
      className={cn(
        'flex flex-col h-full rounded-2xl bg-surface-elevated border border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
        colors.glow,
      )}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full rounded-t-2xl bg-gradient-to-r from-indigo via-indigo-light to-marigold" />

      <CardHeader className="pb-3 pt-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div
            className={cn(
              'flex items-center justify-center rounded-xl size-10 shrink-0',
              colors.icon,
            )}
          >
            <DiffIcon className="w-5 h-5" aria-hidden="true" />
          </div>
          <span
            className={cn(
              'inline-flex items-center text-[0.6rem] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full border',
              colors.badge,
            )}
          >
            {roadmap.difficulty}
          </span>
        </div>
        <CardTitle className="font-heading font-semibold text-ink text-lg leading-snug">
          {roadmap.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-sm leading-relaxed mt-1">
          {roadmap.overview}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pt-0 space-y-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Flag className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {roadmap.stepsCount} Steps
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {roadmap.estimatedDuration}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Users className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            2.4k enrolled
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-5">
        <Link
          href={`/roadmaps/${roadmap.id}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-2 border-indigo/20 bg-transparent text-indigo hover:bg-indigo/5 hover:border-indigo/40 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          Start Roadmap
        </Link>
      </CardFooter>
    </Card>
  )
}
