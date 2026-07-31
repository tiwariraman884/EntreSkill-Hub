import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav'
import {
  Mail, MessageSquare, Clock, Globe, Share2, Code2,
  ArrowRight, CheckCircle2, HelpCircle, Phone, Building2, Sparkles,
  Plus, Minus, Info
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
  },
  {
    icon: Sparkles,
    title: 'Business & Partnerships',
    value: 'partners@entreskillhub.com',
    desc: 'Mentors, corporate training, white-labeling, and co-marketing.',
    href: 'mailto:partners@entreskillhub.com',
    color: 'text-violet-600',
  },
  {
    icon: MessageSquare,
    title: 'Press & Media',
    value: 'press@entreskillhub.com',
    desc: 'Interview requests, press kits, and media assets.',
    href: 'mailto:press@entreskillhub.com',
    color: 'text-emerald-600',
  },
  {
    icon: Phone,
    title: 'Phone (Business)',
    value: '+91 80 6820 4500',
    desc: 'Mon–Fri, 10am–6pm IST. Business inquiries only.',
    href: 'tel:+918068204500',
    color: 'text-orange-600',
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
      <section className="relative pt-24 pb-16 overflow-hidden border-b animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-secondary/4 pointer-events-none" />
        <div className="container-content relative z-10">
          <BreadcrumbNav items={[{ label: 'Contact' }]} />
          <div className="max-w-2xl animate-fade-in-up stagger-1">
            <Badge variant="outline" className="border-success/30 bg-success/5 text-success mb-6">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden="true" />
              Avg. response time: under 2 hours
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-5 leading-tight text-balance">
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

      <div className="container-content py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card className="elevation-1 animate-fade-in-up stagger-1">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert variant="default" className="rounded-xl mb-6">
                  <Info className="size-4 shrink-0" aria-hidden="true" />
                  <AlertDescription>
                    For urgent platform issues, tweet at us @entreSkillHub — we monitor it constantly. For everything else, the form below works great.
                  </AlertDescription>
                </Alert>
                <form className="space-y-5" aria-label="Contact form">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Full Name <span className="text-destructive">*</span></Label>
                      <Input id="contact-name" type="text" required placeholder="Ravi Patel" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email Address <span className="text-destructive">*</span></Label>
                      <Input id="contact-email" type="email" required placeholder="ravi@startup.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-topic">Topic <span className="text-destructive">*</span></Label>
                    <Select required>
                      <SelectTrigger id="contact-topic">
                        <SelectValue placeholder="Select a topic…" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="support">Account & Platform Support</SelectItem>
                          <SelectItem value="billing">Billing & Subscriptions</SelectItem>
                          <SelectItem value="partnership">Business Partnership</SelectItem>
                          <SelectItem value="mentor">Become a Mentor</SelectItem>
                          <SelectItem value="bug">Report a Bug</SelectItem>
                          <SelectItem value="feedback">Product Feedback</SelectItem>
                          <SelectItem value="media">Press & Media</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">Subject <span className="text-destructive">*</span></Label>
                    <Input id="contact-subject" type="text" required placeholder="One-line summary of your message" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message <span className="text-destructive">*</span></Label>
                    <Textarea id="contact-message" required rows={5} placeholder="Tell us everything. The more context you give, the faster we can help." />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="contact-consent"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 rounded-[4px] border-2 border-input bg-white/50 transition-all checked:border-primary checked:bg-primary checked:text-primary-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                    />
                    <Label htmlFor="contact-consent" className="text-sm text-muted-foreground leading-relaxed">
                      I agree to EntreSkill Hub storing this message and using my email to respond. See our{' '}
                      <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                    </Label>
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Send Message <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar info */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold font-heading animate-fade-in-up stagger-2">Other ways to reach us</h2>

            {/* Contact channels */}
            <div className="space-y-4">
              {CONTACT_CHANNELS.map(({ icon: Icon, title, value, desc, href, color }, i) => (
                <Card key={title} className={`elevation-1 animate-fade-in-up stagger-${i + 2} hoverable`}>
                  <CardContent className="p-5">
                    <a
                      href={href}
                      className={`flex items-start gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 ${color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{title}</p>
                        <p className={`font-medium text-sm ${color}`}>{value}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Office info */}
            <Card className="elevation-1 animate-fade-in-up stagger-5">
              <CardContent className="p-5">
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
              </CardContent>
            </Card>

            {/* Social */}
            <Card className="elevation-1 animate-fade-in-up stagger-6">
              <CardContent className="p-5">
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
              </CardContent>
            </Card>

            {/* Map placeholder */}
            <Card className="elevation-1 animate-fade-in-up overflow-hidden">
              <CardContent className="p-0">
                <div
                  className="rounded-b-2xl h-44 bg-gradient-to-br from-muted to-muted/50 flex flex-col items-center justify-center gap-2 text-muted-foreground"
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="py-20 bg-muted/30 border-t animate-fade-in-up">
        <div className="container-content max-w-3xl">
          <div className="flex items-center gap-2 justify-center mb-12">
            <HelpCircle className="h-6 w-6 text-primary" aria-hidden="true" />
            <h2 className="text-3xl font-bold font-heading">Common questions</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map(({ q, a }, i) => (
              <Card key={q} className={`elevation-1 animate-fade-in-up stagger-${i + 1} hoverable`}>
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
