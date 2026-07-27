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
  Circle,
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
      className="border-t bg-card/50 backdrop-blur-sm"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main footer grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand column — spans 2 cols on lg */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              aria-label="EntreSkill Hub home"
            >
              <Image src="/logo.png" alt="EntreSkill Hub Logo" width={36} height={36} className="h-9 w-9 object-contain select-none shrink-0" />
              <span className="font-bold text-xl font-heading">EntreSkill Hub</span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The AI-powered Skill-to-Startup ecosystem. Learn skills, validate ideas, find mentors, and launch your business — all in one place.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3" aria-label="Social media links">
              {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-secondary fill-secondary" aria-hidden="true" />
              <span>Trusted by <strong className="text-foreground">10,000+</strong> learners &amp; founders</span>
            </div>
          </div>

          {/* Navigation columns */}
          {NAV_SECTIONS.map((section) => (
            <div key={section.heading} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
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
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm group"
                        >
                          {label}
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className={`text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm ${
                            isActive
                              ? 'text-primary font-semibold'
                              : 'text-muted-foreground hover:text-primary'
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

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="max-w-md">
              <h3 className="font-semibold font-heading mb-1">
                Weekly founder insights, delivered free
              </h3>
              <p className="text-sm text-muted-foreground">
                Startup tips, AI tools, learning resources, and mentor spotlights — every Saturday.
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                You&apos;re on the list! Check your inbox soon.
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-2 w-full md:w-auto min-w-0 md:min-w-[380px]"
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
                  className="flex-1 h-10 rounded-lg border border-border bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
                >
                  Subscribe <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t bg-muted/30">
        <div className="container mx-auto px-4 h-12 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Circle className="h-2 w-2 fill-green-500 text-green-500 animate-pulse" aria-hidden="true" />
            <span>All systems operational</span>
            <span className="hidden sm:inline ml-1 text-muted-foreground/50">·</span>
            <span className="hidden sm:inline">v2.0.1</span>
          </div>
          <p>
            © {new Date().getFullYear()} EntreSkill Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Terms</Link>
            <Link href="/cookies" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
