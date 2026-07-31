import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav'
import {
  Clock, ArrowRight, TrendingUp, Search,
  Tag, Rss, CheckCircle2, BookOpen, Star, Sparkles, UserRound
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'

export const metadata: Metadata = {
  title: 'Blog — EntreSkill Hub',
  description: 'Insights, playbooks, and founder stories from the EntreSkill Hub community. Read about AI tools, startup validation, skill-building, and growing your business.',
  openGraph: {
    title: 'Blog — EntreSkill Hub',
    description: 'Startup insights, AI tools, and founder playbooks from the EntreSkill community.',
  },
}

const CATEGORIES = [
  { name: 'All', count: 94 },
  { name: 'Startup Playbooks', count: 28 },
  { name: 'AI & Tools', count: 22 },
  { name: 'Learning & Skills', count: 19 },
  { name: 'Founder Stories', count: 14 },
  { name: 'Product & Design', count: 11 },
]

const FEATURED_POST = {
  title: 'How to Validate a SaaS Idea in 7 Days Without Writing a Single Line of Code',
  excerpt: 'Most first-time founders spend months building before talking to a single customer. This playbook reverses that. We walk through the exact 7-day process we use to validate ideas — from problem discovery to your first paid commitment.',
  author: 'Vikram Mehta',
  authorRole: 'Founder, EntreSkill Hub',
  date: 'July 18, 2026',
  readTime: '9 min read',
  category: 'Startup Playbooks',
  tags: ['Validation', 'MVP', 'Founder Playbook'],
}

const POSTS = [
  {
    title: '10 AI Tools Every Solo Founder Should Have in 2026',
    excerpt: 'From AI-powered market research to automated content pipelines — the tools that cut your time-to-launch in half.',
    author: 'Ananya Krishnan',
    date: 'July 22, 2026',
    readTime: '6 min read',
    category: 'AI & Tools',
    featured: false,
  },
  {
    title: 'The Skills Gap No One Talks About in Startup Failure',
    excerpt: "Technical execution isn't why most startups fail. We analyzed 300 failed startups and found three skill gaps that almost always predict failure.",
    author: 'Ravi Patel',
    date: 'July 20, 2026',
    readTime: '8 min read',
    category: 'Startup Playbooks',
    featured: false,
  },
  {
    title: 'I Built My SaaS in Public — Here\'s What Actually Happened',
    excerpt: 'Six months, ₹0 in ads, and 1,200 paying customers later. A brutally honest breakdown of what building in public taught me about product, marketing, and myself.',
    author: 'Shreya Doshi',
    date: 'July 15, 2026',
    readTime: '12 min read',
    category: 'Founder Stories',
    featured: false,
  },
  {
    title: 'How to Learn Faster: The Science Behind Skill Stacking',
    excerpt: 'Combining adjacent skills isn\'t just about being versatile — it creates compounding returns. Here\'s the research behind skill stacking and how to apply it.',
    author: 'Arjun Sharma',
    date: 'July 12, 2026',
    readTime: '5 min read',
    category: 'Learning & Skills',
    featured: false,
  },
  {
    title: 'Your First Product Doesn\'t Need to Be Perfect — It Needs to Ship',
    excerpt: 'Perfection paralysis kills more startups than bad ideas. A framework for getting comfortable with "good enough" and shipping with confidence.',
    author: 'Priya Nair',
    date: 'July 9, 2026',
    readTime: '7 min read',
    category: 'Product & Design',
    featured: false,
  },
  {
    title: 'The Mentor Multiplier: Why 1 Session Can Compress 6 Months of Learning',
    excerpt: "We tracked outcomes from 5,000 mentor sessions on our platform. Users who booked one session in their first month progressed 4× faster. Here's why.",
    author: 'Vikram Mehta',
    date: 'July 6, 2026',
    readTime: '6 min read',
    category: 'Founder Stories',
    featured: false,
  },
]

const POPULAR_TAGS = [
  'Validation', 'MVP', 'AI Tools', 'Productivity', 'Fundraising',
  'No-Code', 'Marketing', 'Remote Work', 'Skill Building', 'Design Thinking',
]

const TRENDING_TOPICS = [
  { title: 'Micro-SaaS for beginners', views: '12.4k' },
  { title: 'Prompt engineering for founders', views: '9.1k' },
  { title: 'How to find your first 100 customers', views: '8.7k' },
  { title: 'Should you raise or bootstrap?', views: '7.3k' },
]

const FAQS = [
  {
    q: 'Can I contribute to the blog?',
    a: 'Yes — we accept guest posts from founders, practitioners, and educators. Submit your pitch at blog@entreskillhub.com and we\'ll review it within 5 business days.',
  },
  {
    q: 'How often do you publish?',
    a: 'We publish 3–4 new articles every week, including one deep-dive playbook, one founder story, and curated AI & tools coverage.',
  },
  {
    q: 'Is the blog content free?',
    a: 'All blog content is completely free and always will be. No paywalls, no teaser articles — we believe knowledge should be accessible to every founder.',
  },
]

const ANIMATED_SECTION_CLS =
  'animate-fade-in-up opacity-0'

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-secondary/4 pointer-events-none" />
        <div className="container-content relative z-10">
          <BreadcrumbNav items={[{ label: 'Blog' }]} />

          <div
            className={`max-w-3xl ${ANIMATED_SECTION_CLS}`}
            style={{ animationDelay: '0s', animationFillMode: 'forwards' }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6 animate-scale-in"
                  style={{ animationDelay: '0.05s', animationFillMode: 'forwards' }}>
              <Rss className="h-4 w-4" aria-hidden="true" />
              Founder Insights
            </span>

            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-5 leading-tight">
              Ideas, playbooks &amp; stories for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 animate-shimmer"
                    style={{ backgroundSize: '200% 100%' }}>
                ambitious builders
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty max-w-2xl">
              Practical insights from founders who have done it — covering startup validation, AI-powered workflows, skill-building, and the honest realities of building a business from scratch.
            </p>

            <div className="relative max-w-lg group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search articles, topics, authors…"
                aria-label="Search blog articles"
                className="w-full h-12 pl-11 pr-4 rounded-xl border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring hover:border-primary/30 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container-content py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Featured post */}
            <div
              className={ANIMATED_SECTION_CLS}
              style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
            >
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" aria-hidden="true" />
                Featured Article
              </h2>

              <Card hoverable glow size="default" className="overflow-hidden">
                <div className="bg-gradient-to-br from-primary/15 via-primary/5 to-blue-600/8 p-8 md:p-10">
                  <Badge variant="secondary" className="mb-4">
                    {FEATURED_POST.category}
                  </Badge>

                  <h3 className="text-2xl md:text-[1.75rem] font-bold font-heading mt-3 mb-4 leading-snug tracking-tight">
                    {FEATURED_POST.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
                    {FEATURED_POST.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-6 mb-6">
                    {FEATURED_POST.tags.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-indigo-light flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary/20 shrink-0">
                        {FEATURED_POST.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground leading-tight">
                          {FEATURED_POST.author}
                        </p>
                        <p className="text-xs text-muted-foreground leading-tight">
                          {FEATURED_POST.authorRole}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-medium">{FEATURED_POST.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {FEATURED_POST.readTime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-8 md:px-10 pb-8 pt-2">
                  <Button variant="default" size="default" asChild>
                    <Link href="/blog" className="gap-2">
                      Read full article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Category filter */}
            <div
              className={ANIMATED_SECTION_CLS}
              style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
            >
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(({ name, count }) => (
                  <button
                    key={name}
                    className={`
                      h-9 px-4 rounded-full text-sm font-semibold border
                      transition-all duration-200 ease-out
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                      hover:translate-y-[-1px] hover:shadow-md
                      ${
                        name === 'All'
                          ? 'bg-gradient-to-r from-indigo to-indigo-light text-white border-transparent shadow-md shadow-indigo/20'
                          : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary hover:shadow-md'
                      }
                    `}
                  >
                    {name}
                    <span className="text-xs opacity-70 ml-1.5 font-medium">({count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Latest posts */}
            <div
              className={ANIMATED_SECTION_CLS}
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
                Latest Posts
              </h2>

              <div className="space-y-5">
                {POSTS.map((post, index) => (
                  <Card
                    key={post.title}
                    hoverable
                    glow
                    size="default"
                    className="group/card relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 border-border/50 hover:border-primary/20 bg-gradient-to-br from-card via-card to-muted/5"
                    style={{ animationDelay: `${0.22 + index * 0.06}s`, animationFillMode: 'forwards' }}
                  >
                    {/* Hover Accent Bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-indigo-light to-blue-500 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <Badge variant="secondary" className="self-start text-[0.7rem] font-bold uppercase tracking-wider bg-primary/10 text-primary border-primary/20 group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors">
                        {post.category}
                      </Badge>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium shrink-0 bg-muted/30 px-2 py-1 rounded-md">
                        <Clock className="h-3.5 w-3.5 text-primary/70" aria-hidden="true" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-bold text-xl font-heading leading-snug mb-3 group-hover/card:text-primary transition-colors duration-200">
                      <Link
                        href="/blog"
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm before:absolute before:inset-0"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-muted-foreground/90 leading-relaxed mb-6 text-pretty line-clamp-2 group-hover/card:text-muted-foreground transition-colors">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs border-t border-border/40 pt-4 mt-auto">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-indigo-light flex items-center justify-center text-white font-bold text-[10px] shadow-sm shadow-primary/20 shrink-0">
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-muted-foreground font-medium flex flex-col sm:flex-row sm:items-center sm:gap-1.5">
                          <span className="text-foreground font-semibold">{post.author}</span>
                          <span className="hidden sm:inline opacity-40">•</span>
                          <span>{post.date}</span>
                        </span>
                      </div>
                      <Button variant="ghost" size="xs" className="gap-1 -mr-2 text-primary font-semibold relative z-10 group-hover/card:bg-primary/10 transition-colors">
                        Read more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/card:translate-x-1" aria-hidden="true" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button variant="outline" size="default" className="gap-2">
                  Load More Articles
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">

            {/* Newsletter */}
            <div
              className={ANIMATED_SECTION_CLS}
              style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
            >
              <Card hoverable glow className="!bg-gradient-to-br from-primary/8 via-primary/3 to-blue-600/5 border-primary/15">
                <CardContent>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo to-indigo-light flex items-center justify-center text-white shadow-lg shadow-indigo/25 mb-4">
                    <BookOpen className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className="font-bold font-heading text-lg mb-1.5 tracking-tight">
                    The Founder Weekly
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 text-pretty">
                    One email every Saturday. Curated founder stories, AI tools, and the week&apos;s best reads — never spam.
                  </p>

                  <form aria-label="Blog newsletter signup" className="space-y-3">
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      aria-label="Email address"
                      className="w-full h-11 rounded-xl border bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring hover:border-primary/30 transition-all duration-200"
                    />
                    <Button variant="default" size="default" type="submit" className="w-full gap-2">
                      <UserRound className="h-4 w-4" aria-hidden="true" />
                      Join 8,000+ Readers
                    </Button>
                  </form>

                  <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-success shrink-0" aria-hidden="true" />
                    No spam. Unsubscribe any time.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Trending */}
            <div
              className={ANIMATED_SECTION_CLS}
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              <Card hoverable size="sm">
                <CardHeader>
                  <h3 className="font-bold font-heading text-base flex items-center gap-2 tracking-tight">
                    <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
                    Trending Topics
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {TRENDING_TOPICS.map(({ title, views }, i) => (
                      <Link
                        key={title}
                        href="/blog"
                        className="flex items-center gap-3.5 group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl px-2 -mx-2 hover:bg-muted/50 transition-all duration-200"
                      >
                        <span className="text-xl font-bold text-muted-foreground/25 font-heading w-7 shrink-0 tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold group-hover/link:text-primary transition-colors duration-200 leading-snug text-pretty">
                            {title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                            {views} views
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Popular Tags */}
            <div
              className={ANIMATED_SECTION_CLS}
              style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
            >
              <Card hoverable size="sm">
                <CardHeader>
                  <h3 className="font-bold font-heading text-base flex items-center gap-2 tracking-tight">
                    <Tag className="h-4 w-4 text-primary" aria-hidden="true" />
                    Popular Tags
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_TAGS.map((tag) => (
                      <Link
                        key={tag}
                        href="/blog"
                        className="
                          px-3 py-1.5 rounded-full border text-xs font-semibold
                          hover:border-primary hover:text-primary hover:bg-primary/5
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                          transition-all duration-200 hover:translate-y-[-1px]
                        "
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Editor's Pick */}
            <div
              className={ANIMATED_SECTION_CLS}
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            >
              <Card hoverable glow size="sm" className="!bg-amber-50/60 dark:!bg-amber-950/15 !border-amber-200/60 dark:!border-amber-800/40">
                <CardContent>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-marigold to-marigold-light flex items-center justify-center text-ink shadow-md shadow-marigold/20 mb-4">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <Badge variant="secondary" className="mb-3 text-[0.7rem] font-bold uppercase tracking-wider">
                    AI Editor&apos;s Pick
                  </Badge>

                  <p className="text-sm font-semibold mb-1.5 leading-snug text-foreground">
                    10 AI Tools Every Solo Founder Should Have in 2026
                  </p>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 text-pretty">
                    Curated by our recommendation engine based on what founders are bookmarking most.
                  </p>

                  <Button variant="ghost" size="xs" asChild className="gap-1 -ml-2 text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300">
                    <Link href="/blog" className="font-semibold">
                      Read now
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>

      {/* FAQ */}
      <section className="py-16 md:py-20 border-t bg-muted/25">
        <div className="container-content max-w-3xl">
          <div
            className={ANIMATED_SECTION_CLS}
            style={{ animationDelay: '0.05s', animationFillMode: 'forwards' }}
          >
            <h2 className="text-3xl font-bold font-heading text-center mb-12 tracking-tight">
              Frequently asked questions
            </h2>

            <div className="space-y-0 divide-y divide-border/80">
              {FAQS.map(({ q, a }, i) => (
                <div
                  key={q}
                  className={ANIMATED_SECTION_CLS}
                  style={{ animationDelay: `${0.1 + i * 0.08}s`, animationFillMode: 'forwards' }}
                >
                  <div className="py-7 group/faq">
                    <h3 className="font-semibold mb-2 flex items-start gap-3 text-base leading-snug">
                      <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/faq:bg-primary/20 transition-colors duration-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                      </span>
                      {q}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed pl-9 text-pretty">
                      {a}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 text-center">
              <EmptyState
                icon="book"
                title="Still have questions?"
                description="Our team is happy to help. Reach out and we'll get back to you within 24 hours."
                actionLabel="Contact Support"
                actionHref="/contact"
                className="animate-fade-in-up border-border/60 bg-card/60"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
