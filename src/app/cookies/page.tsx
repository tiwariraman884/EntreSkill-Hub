import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav'
import { Cookie, CheckCircle2, ArrowRight, Shield, BarChart3, Settings, Megaphone, XCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Policy — EntreSkill Hub',
  description: 'Learn about the cookies EntreSkill Hub uses, why we use them, and how to manage your cookie preferences.',
}

const COOKIE_TYPES = [
  {
    icon: Shield,
    title: 'Strictly Necessary',
    required: true,
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    desc: 'These cookies are essential for the platform to function. They enable core features like authentication, session management, and security protection. They cannot be disabled.',
    examples: [
      { name: 'next-auth.session-token', purpose: 'Maintains your authenticated session', duration: '30 days' },
      { name: 'next-auth.csrf-token', purpose: 'Prevents cross-site request forgery attacks', duration: 'Session' },
      { name: '__stripe_mid', purpose: 'Payment fraud prevention (Razorpay)', duration: '1 year' },
      { name: 'dark-mode', purpose: 'Stores your light/dark theme preference', duration: '1 year' },
    ],
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    required: false,
    color: 'text-violet-600',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    desc: 'Analytics cookies help us understand how people use EntreSkill Hub — which features are popular, where users get stuck, and how to improve the experience. All analytics data is anonymized.',
    examples: [
      { name: 'ph_*', purpose: 'PostHog session replay and event tracking (EU-hosted)', duration: '1 year' },
      { name: 'esh_session_id', purpose: 'Anonymous session identifier for funnel analysis', duration: 'Session' },
    ],
  },
  {
    icon: Settings,
    title: 'Preference',
    required: false,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    desc: 'Preference cookies remember your personal settings so you don\'t have to reconfigure them on every visit. They make your experience more personalized and efficient.',
    examples: [
      { name: 'esh_lang', purpose: 'Your preferred language (English/Hindi)', duration: '1 year' },
      { name: 'esh_notifications', purpose: 'Notification preferences (email/in-app toggles)', duration: '6 months' },
      { name: 'esh_sidebar', purpose: 'Dashboard sidebar collapsed/expanded state', duration: '3 months' },
    ],
  },
  {
    icon: Megaphone,
    title: 'Marketing',
    required: false,
    color: 'text-orange-600',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    desc: 'We do not currently use marketing or advertising cookies. We do not run retargeting campaigns, use Google Ads, Facebook Pixel, or any third-party advertising networks. This section is here for transparency.',
    examples: [],
  },
]

const BROWSER_GUIDES = [
  { name: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
  { name: 'Mozilla Firefox', url: 'https://support.mozilla.org/en-US/kb/enable-and-disable-cookies' },
  { name: 'Apple Safari', url: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac' },
  { name: 'Microsoft Edge', url: 'https://support.microsoft.com/en-us/windows/delete-and-manage-cookies' },
]

const FAQS = [
  {
    q: 'Will blocking cookies break the platform?',
    a: 'Blocking strictly necessary cookies will prevent you from logging in and using authenticated features. Blocking analytics and preference cookies has no impact on core platform functionality — you\'ll simply need to reset preferences on each visit.',
  },
  {
    q: 'Do you share cookie data with advertisers?',
    a: 'No. We do not share any cookie data with advertising networks, social media platforms, or data brokers. Analytics data is processed by PostHog (EU-hosted, GDPR-compliant) and used solely for product improvement.',
  },
  {
    q: 'How do I change my cookie consent?',
    a: 'You can update your consent at any time by going to Account Settings → Privacy → Cookie Preferences. You can also clear your browser cookies and re-consent when you next visit.',
  },
  {
    q: 'What is a session cookie vs. a persistent cookie?',
    a: 'Session cookies are temporary — they expire when you close your browser tab. Persistent cookies remain on your device for a set duration (e.g., 30 days for your login session). Both types are listed in the examples above with their durations.',
  },
]

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-24 pb-16 border-b overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-background to-background pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <BreadcrumbNav items={[{ label: 'Cookie Policy' }]} />
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center shrink-0 mt-1">
              <Cookie className="h-7 w-7 text-amber-600" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-4xl font-bold font-heading mb-3">Cookie Policy</h1>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                We believe in total transparency about what cookies we use and why. This page explains every cookie on EntreSkill Hub — no hidden trackers, no advertising networks.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                <strong className="text-foreground">Last Updated:</strong> July 1, 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl py-16 space-y-16">
        {/* What are cookies */}
        <section>
          <h2 className="text-2xl font-bold font-heading mb-4">What are cookies?</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Cookies are small text files that a website stores on your device when you visit. They are widely used to make websites work efficiently, remember your preferences, and provide usage information to the site operators.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Cookies are not programs — they cannot execute code or install software. They simply store key-value pairs of text. Modern browsers give you full control over which cookies you accept.
          </p>
        </section>

        {/* Cookie types */}
        <section>
          <h2 className="text-2xl font-bold font-heading mb-8">Cookies we use</h2>
          <div className="space-y-8">
            {COOKIE_TYPES.map(({ icon: Icon, title, required, color, bg, desc, examples }) => (
              <div key={title} className={`rounded-xl border p-6 ${bg}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-white/60 dark:bg-black/20 flex items-center justify-center ${color}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold">{title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    {required ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-blue-600" aria-hidden="true" />
                        <span className="text-blue-600">Always Active</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <span className="text-muted-foreground">Optional</span>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>

                {examples.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs" aria-label={`${title} cookies list`}>
                      <thead>
                        <tr className="border-b border-border/40">
                          <th className="text-left py-2 pr-4 font-semibold text-foreground w-48">Cookie Name</th>
                          <th className="text-left py-2 pr-4 font-semibold text-foreground">Purpose</th>
                          <th className="text-left py-2 font-semibold text-foreground w-24">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30">
                        {examples.map(({ name, purpose, duration }) => (
                          <tr key={name}>
                            <td className="py-2 pr-4 font-mono text-foreground">{name}</td>
                            <td className="py-2 pr-4 text-muted-foreground">{purpose}</td>
                            <td className="py-2 text-muted-foreground">{duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No marketing cookies currently in use.</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Consent */}
        <section>
          <h2 className="text-2xl font-bold font-heading mb-4">Your consent</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            When you first visit EntreSkill Hub, we display a cookie consent banner. You can:
          </p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {[
              'Accept all cookies (including optional analytics and preference cookies)',
              'Reject optional cookies (only strictly necessary cookies will be set)',
              'Customize your preferences by category',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            Your consent is recorded and tied to your browser. If you clear your cookies, you will be prompted again on your next visit. You can update your preferences at any time from{' '}
            <strong className="text-foreground">Account Settings → Privacy → Cookie Preferences</strong>.
          </p>
        </section>

        {/* Browser settings */}
        <section>
          <h2 className="text-2xl font-bold font-heading mb-4">Managing cookies in your browser</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            All modern browsers give you control over cookies. You can block all cookies, block third-party cookies only, or delete existing cookies. Instructions vary by browser — click the links below for specific guidance:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {BROWSER_GUIDES.map(({ name, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border bg-card hover:border-primary/40 hover:shadow-sm transition-all text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
              >
                <span>{name}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Note: disabling all cookies may significantly impact your ability to use EntreSkill Hub. Authentication requires session cookies to function.
          </p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold font-heading mb-8">Frequently asked questions</h2>
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
        </section>

        {/* Contact CTA */}
        <div className="rounded-xl bg-primary/5 border border-primary/15 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Cookie className="h-8 w-8 text-primary shrink-0" aria-hidden="true" />
          <div className="flex-1">
            <p className="font-semibold mb-1">Cookie questions?</p>
            <p className="text-sm text-muted-foreground">Contact our Privacy team at privacy@entreskillhub.com — we respond within 48 hours.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap"
          >
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
