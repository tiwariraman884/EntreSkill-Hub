import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav'
import {
  Clock, ArrowRight, TrendingUp, Search,
  Tag, Rss, CheckCircle2, BookOpen, Star, Sparkles
} from 'lucide-react'

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
    excerpt: 'Technical execution isn\'t why most startups fail. We analyzed 300 failed startups and found three skill gaps that almost always predict failure.',
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
    excerpt: 'We tracked outcomes from 5,000 mentor sessions on our platform. Users who booked one session in their first month progressed 4× faster. Here\'s why.',
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

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-secondary/4 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <BreadcrumbNav items={[{ label: 'Blog' }]} />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-sm font-medium mb-6">
              <Rss className="h-4 w-4" aria-hidden="true" />
              Founder Insights
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-5 leading-tight">
              Ideas, playbooks &amp; stories for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                ambitious builders
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Practical insights from founders who have done it — covering startup validation, AI-powered workflows, skill-building, and the honest realities of building a business from scratch.
            </p>

            {/* Search UI */}
            <div className="relative max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search articles, topics, authors…"
                aria-label="Search blog articles"
                className="w-full h-12 pl-11 pr-4 rounded-xl border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Featured post */}
            <div className="mb-12">
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" aria-hidden="true" />
                Featured Article
              </h2>
              <article className="bg-card rounded-2xl border hover:shadow-xl transition-all hover:-translate-y-0.5 overflow-hidden">
                <div className="bg-gradient-to-br from-primary/15 to-blue-600/10 p-8">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">{FEATURED_POST.category}</span>
                  <h3 className="text-2xl font-bold font-heading mt-3 mb-4 leading-snug">
                    {FEATURED_POST.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{FEATURED_POST.excerpt}</p>

                  <div className="flex flex-wrap items-center gap-3 mt-6 mb-6">
                    {FEATURED_POST.tags.map((t) => (
                      <span key={t} className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{t}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                        {FEATURED_POST.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{FEATURED_POST.author}</p>
                        <p className="text-xs">{FEATURED_POST.authorRole}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{FEATURED_POST.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{FEATURED_POST.readTime}</span>
                    </div>
                  </div>
                </div>
                <div className="px-8 pb-6">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline mt-4"
                  >
                    Read full article <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map(({ name, count }) => (
                <button
                  key={name}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    name === 'All'
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-muted-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  {name} <span className="text-xs opacity-70 ml-1">({count})</span>
                </button>
              ))}
            </div>

            {/* Latest posts */}
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Latest Posts</h2>
            <div className="space-y-6">
              {POSTS.map((post) => (
                <article
                  key={post.title}
                  className="group bg-card rounded-xl border p-6 hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">{post.category}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg leading-snug mb-2 group-hover:text-primary transition-colors">
                    <Link href="/blog" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.author} · {post.date}</span>
                    <Link href="/blog" className="flex items-center gap-1 font-medium text-primary hover:underline">
                      Read more <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Newsletter */}
            <div className="bg-gradient-to-br from-primary/10 to-blue-600/5 rounded-xl border border-primary/20 p-6">
              <BookOpen className="h-7 w-7 text-primary mb-3" aria-hidden="true" />
              <h3 className="font-bold font-heading mb-2">The Founder Weekly</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                One email every Saturday. Curated founder stories, AI tools, and the week's best reads — never spam.
              </p>
              <form aria-label="Blog newsletter signup" className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  aria-label="Email address"
                  className="w-full h-10 rounded-lg border bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  Join 8,000+ Readers
                </button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">No spam. Unsubscribe any time.</p>
            </div>

            {/* Trending */}
            <div className="bg-card rounded-xl border p-6">
              <h3 className="font-bold font-heading mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                {TRENDING_TOPICS.map(({ title, views }, i) => (
                  <Link
                    key={title}
                    href="/blog"
                    className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    <span className="text-2xl font-bold text-muted-foreground/20 font-heading w-6 shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium group-hover:text-primary transition-colors leading-snug">{title}</p>
                      <p className="text-xs text-muted-foreground">{views} views</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-card rounded-xl border p-6">
              <h3 className="font-bold font-heading mb-4 flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" aria-hidden="true" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {POPULAR_TAGS.map((tag) => (
                  <Link
                    key={tag}
                    href="/blog"
                    className="px-3 py-1 rounded-full border text-xs font-medium hover:border-primary hover:text-primary hover:bg-primary/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sparkles — AI pick */}
            <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800 p-6">
              <Sparkles className="h-6 w-6 text-amber-600 mb-3" aria-hidden="true" />
              <h3 className="font-bold font-heading mb-2 text-amber-900 dark:text-amber-100">AI Editor&apos;s Pick</h3>
              <p className="text-sm font-medium mb-1">10 AI Tools Every Solo Founder Should Have in 2026</p>
              <p className="text-xs text-muted-foreground mb-3">Curated by our recommendation engine based on what founders are bookmarking most.</p>
              <Link href="/blog" className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline">
                Read now →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* FAQ */}
      <section className="py-20 border-t bg-muted/30">
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
