import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav'
import {
  Mail, MessageSquare, Clock, Globe, Share2, Code2,
  ArrowRight, CheckCircle2, HelpCircle, Phone, Building2, Sparkles
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us — EntreSkill Hub',
  description: 'Get in touch with the EntreSkill Hub team. We typically respond within 2 business hours. Reach us for support, partnerships, media, or general inquiries.',
  openGraph: {
    title: 'Contact EntreSkill Hub',
    description: 'Have a question, partnership idea, or just want to say hi? We\'d love to hear from you.',
  },
}

const CONTACT_CHANNELS = [
  {
    icon: Mail,
    title: 'General Support',
    value: 'support@entreskillhub.com',
    desc: 'For account issues, billing questions, and platform help.',
    href: 'mailto:support@entreskillhub.com',
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    icon: Sparkles,
    title: 'Business & Partnerships',
    value: 'partners@entreskillhub.com',
    desc: 'Mentors, corporate training, white-labeling, and co-marketing.',
    href: 'mailto:partners@entreskillhub.com',
    color: 'text-violet-600',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
  },
  {
    icon: MessageSquare,
    title: 'Press & Media',
    value: 'press@entreskillhub.com',
    desc: 'Interview requests, press kits, and media assets.',
    href: 'mailto:press@entreskillhub.com',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
  },
  {
    icon: Phone,
    title: 'Phone (Business)',
    value: '+91 80 6820 4500',
    desc: 'Mon–Fri, 10am–6pm IST. Business inquiries only.',
    href: 'tel:+918068204500',
    color: 'text-orange-600',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
  },
]

const SOCIAL_LINKS = [
  { icon: Share2, label: 'Twitter / X', href: 'https://twitter.com/entreSkillHub', handle: '@entreSkillHub' },
  { icon: Globe, label: 'LinkedIn', href: 'https://linkedin.com/company/entreSkillHub', handle: 'EntreSkill Hub' },
  { icon: Code2, label: 'GitHub', href: 'https://github.com/tiwariraman884/EntreSkill-Hub', handle: 'tiwariraman884' },
]

const FAQS = [
  {
    q: 'How quickly do you respond to support requests?',
    a: 'We aim to respond to all emails within 2 business hours during IST business hours (Mon–Fri, 10am–6pm). For urgent platform issues, tweet at us @entreSkillHub — we monitor it constantly.',
  },
  {
    q: 'I found a bug — how do I report it?',
    a: 'Email bugs@entreskillhub.com with a description, steps to reproduce, and a screenshot if possible. You\'ll receive a ticket number within 30 minutes during business hours.',
  },
  {
    q: 'Can I request a demo for my organization?',
    a: 'Absolutely. Email partners@entreskillhub.com with "Demo Request" in the subject line and details about your organization. We\'ll schedule a personalized 45-minute walkthrough.',
  },
  {
    q: 'How do I delete my account?',
    a: 'Go to Settings → Account → Delete Account. We process all deletion requests within 30 days per our Privacy Policy. All personal data is permanently removed from our systems.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Yes — we offer a full refund within 7 days of your Pro subscription payment, no questions asked. After 7 days, you\'ll keep access for the remainder of your billing period.',
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-secondary/4 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <BreadcrumbNav items={[{ label: 'Contact' }]} />
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
              Avg. response time: under 2 hours
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-5 leading-tight">
              We&apos;re real people.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                Say hello.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you have a question, spotted a bug, want to partner with us, or just want to share feedback — we genuinely want to hear from you. No bots, no forms that disappear into a void.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold font-heading mb-6">Send us a message</h2>
            <form
              className="space-y-5"
              aria-label="Contact form"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Ravi Patel"
                    className="w-full h-11 rounded-xl border bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5">
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="ravi@startup.com"
                    className="w-full h-11 rounded-xl border bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-topic" className="block text-sm font-medium mb-1.5">
                  Topic <span className="text-destructive">*</span>
                </label>
                <select
                  id="contact-topic"
                  required
                  defaultValue=""
                  className="w-full h-11 rounded-xl border bg-background px-4 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors appearance-none"
                >
                  <option value="" disabled>Select a topic…</option>
                  <option value="support">Account & Platform Support</option>
                  <option value="billing">Billing & Subscriptions</option>
                  <option value="partnership">Business Partnership</option>
                  <option value="mentor">Become a Mentor</option>
                  <option value="bug">Report a Bug</option>
                  <option value="feedback">Product Feedback</option>
                  <option value="media">Press & Media</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium mb-1.5">
                  Subject <span className="text-destructive">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="One-line summary of your message"
                  className="w-full h-11 rounded-xl border bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5">
                  Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Tell us everything. The more context you give, the faster we can help."
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="contact-consent"
                  required
                  className="mt-0.5 rounded border-border focus:ring-2 focus:ring-ring"
                />
                <label htmlFor="contact-consent" className="text-sm text-muted-foreground leading-relaxed">
                  I agree to EntreSkill Hub storing this message and using my email to respond. See our{' '}
                  <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                </label>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Send Message <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Sidebar info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact channels */}
            <h2 className="text-2xl font-bold font-heading">Other ways to reach us</h2>
            <div className="space-y-4">
              {CONTACT_CHANNELS.map(({ icon: Icon, title, value, desc, href, color, bg }) => (
                <a
                  key={title}
                  href={href}
                  className={`flex items-start gap-4 p-5 rounded-xl border hover:border-primary/40 hover:shadow-md transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${bg}`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-white/60 dark:bg-black/20 flex items-center justify-center shrink-0 ${color} group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{title}</p>
                    <p className={`font-medium text-sm ${color}`}>{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Office info */}
            <div className="bg-card rounded-xl border p-5">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="font-semibold">Office Address</h3>
              </div>
              <address className="not-italic text-sm text-muted-foreground leading-relaxed">
                EntreSkill Hub Technologies Pvt. Ltd.<br />
                91Springboard, Koramangala<br />
                Bengaluru — 560034, Karnataka, India
              </address>
              <div className="mt-3 pt-3 border-t flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Mon–Fri, 10:00 AM – 6:00 PM IST</span>
              </div>
            </div>

            {/* Social */}
            <div className="bg-card rounded-xl border p-5">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="font-semibold">Follow Us</h3>
              </div>
              <div className="space-y-3">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href, handle }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm hover:text-primary transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    aria-label={`${label}: ${handle}`}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                    <span className="font-medium">{label}</span>
                    <span className="text-muted-foreground text-xs ml-auto">{handle}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className="rounded-xl border overflow-hidden h-44 bg-gradient-to-br from-muted to-muted/50 flex flex-col items-center justify-center gap-2 text-muted-foreground"
              role="img"
              aria-label="Office location map placeholder — 91Springboard, Koramangala, Bengaluru"
            >
              <Globe className="h-8 w-8 opacity-30" aria-hidden="true" />
              <p className="text-sm font-medium opacity-60">Koramangala, Bengaluru</p>
              <a
                href="https://maps.google.com/?q=91Springboard+Koramangala+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-2 justify-center mb-12">
            <HelpCircle className="h-6 w-6 text-primary" aria-hidden="true" />
            <h2 className="text-3xl font-bold font-heading">Common questions</h2>
          </div>
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
