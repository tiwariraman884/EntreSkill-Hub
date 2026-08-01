'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Globe,
  Code2,
  Share2,
  Play,
  ArrowRight,
  CheckCircle2,
  Zap,
  ExternalLink,
  Sparkles,
} from 'lucide-react'

const NAV_SECTIONS = [
  {
    heading: 'Platform',
    links: [
      { label: 'Roadmaps', href: '/roadmaps' },
      { label: 'Learning Hub', href: '/learning-hub' },
      { label: 'Mentors', href: '/mentors' },
      { label: 'Business Ideas', href: '/ideas' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/api' },
      { label: 'Platform Status', href: '/status' },
      { label: 'GitHub', href: 'https://github.com/tiwariraman884/EntreSkill-Hub', external: true },
    ],
  },
]

const SOCIAL_LINKS = [
  { label: 'Twitter / X', icon: Share2, href: 'https://twitter.com/entreSkillHub' },
  { label: 'LinkedIn', icon: Globe, href: 'https://linkedin.com/company/entreSkillHub' },
  { label: 'GitHub', icon: Code2, href: 'https://github.com/tiwariraman884/EntreSkill-Hub' },
  { label: 'YouTube', icon: Play, href: 'https://youtube.com/@entreSkillHub' },
]

export default function Footer() {
  const pathname = usePathname()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer
      className="relative bg-linear-to-b from-muted/20 via-background to-background border-t border-border/40"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo/30 to-transparent" />
      
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link
              href="/"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo rounded-xl"
              aria-label="EntreSkill Hub home"
            >
              <div
                className="relative h-10 w-10 md:h-12 md:w-12 rounded-xl bg-linear-to-br from-indigo to-indigo-light flex items-center justify-center shadow-lg shadow-indigo/25 group-hover:shadow-xl group-hover:shadow-indigo/30 transition-all duration-200 group-hover:scale-105 active:scale-95"
              >
                <Image
                  src="/logo.png"
                  alt="EntreSkill Hub Logo"
                  width={44}
                  height={44}
                  loading="lazy"
                  className="h-9 w-9 md:h-11 md:w-11 object-contain select-none shrink-0"
                  sizes="44px"
                />
              </div>
              <span className="font-bold text-xl font-heading bg-linear-to-r from-indigo to-indigo-light bg-clip-text text-transparent">
                EntreSkill Hub
              </span>
            </Link>

            <p className="text-sm text-thread leading-relaxed max-w-xs">
              The AI-powered Skill-to-Startup ecosystem. Learn skills, validate ideas, find mentors, and launch your business — all in one place.
            </p>

            <div className="flex items-center gap-3" aria-label="Social media links">
              {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-indigo/10 text-thread hover:text-indigo hover:border-indigo/40 hover:bg-indigo/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo active:scale-95"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-thread">
              <div className="w-6 h-6 rounded-lg bg-linear-to-br from-marigold to-marigold-light flex items-center justify-center shadow-sm">
                <Zap className="h-3 w-3 text-white" aria-hidden="true" />
              </div>
              <span>Trusted by <strong className="text-foreground font-semibold">10,000+</strong> learners &amp; founders</span>
            </div>
          </div>

          {NAV_SECTIONS.map((section) => (
            <div key={section.heading} className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-indigo">
                {section.heading}
              </h3>
              <ul className="flex flex-col gap-3" role="list">
                {section.links.map(({ label, href, external }) => {
                  const isActive = !external && (pathname === href || pathname.startsWith(href + '/'))
                  return (
                    <li key={label}>
                      {external ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-thread hover:text-indigo transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo rounded-lg group"
                        >
                          {label}
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className={`text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo rounded-lg ${
                            isActive
                              ? 'text-indigo font-semibold'
                              : 'text-thread hover:text-indigo'
                          }`}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-10 border-t border-border/40">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-marigold/10 border border-marigold/20 text-marigold-dark text-xs font-semibold mb-3">
                <Sparkles className="size-3" />
                Newsletter
              </div>
              <h3 className="font-bold font-heading text-lg mb-1">
                Weekly founder insights, delivered free
              </h3>
              <p className="text-sm text-thread">
                Startup tips, AI tools, learning resources, and mentor spotlights — every Saturday.
              </p>
            </div>

            {subscribed ? (
              <div
                className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-5 py-3 rounded-xl border border-emerald-200 animate-fade-in"
              >
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                You&apos;re on the list! Check your inbox soon.
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto min-w-0 lg:min-w-105"
                aria-label="Newsletter signup"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 h-11 rounded-xl border-2 border-indigo/20 bg-white px-4 text-sm placeholder:text-thread/60 focus:outline-none focus:border-indigo focus:bg-white transition-all hover:border-indigo/30"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-xl bg-linear-to-r from-indigo to-indigo-light text-white text-sm font-semibold shadow-lg shadow-indigo/25 hover:shadow-xl hover:shadow-indigo/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all whitespace-nowrap"
                >
                  Subscribe <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-border/40 bg-linear-to-r from-indigo/5 via-marigold/5 to-indigo/5">
        <div className="container mx-auto px-4 h-14 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-thread">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-medium">All systems operational</span>
            <span className="hidden sm:inline ml-1 text-thread/50">·</span>
            <span className="hidden sm:inline text-thread/70">v2.0.1</span>
          </div>
          <p>
            © {new Date().getFullYear()} EntreSkill Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-indigo transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo rounded-lg">Privacy</Link>
            <Link href="/terms" className="hover:text-indigo transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo rounded-lg">Terms</Link>
            <Link href="/cookies" className="hover:text-indigo transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo rounded-lg">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
