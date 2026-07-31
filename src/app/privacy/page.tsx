import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav'
import { cn } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Shield, ArrowRight, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy — EntreSkill Hub',
  description: 'Learn how EntreSkill Hub collects, uses, and protects your personal data. We are committed to GDPR compliance, data minimization, and your right to access and delete your information.',
}

const LAST_UPDATED = 'July 1, 2026'
const EFFECTIVE_DATE = 'July 1, 2026'

const SECTIONS = [
  {
    id: 'introduction',
    title: '1. Introduction',
    content: `EntreSkill Hub Technologies Pvt. Ltd. ("EntreSkill Hub", "we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform at entreskillhub.com and our associated mobile applications (collectively, the "Service").

By using our Service, you agree to the practices described in this Policy. If you do not agree, please discontinue use of the Service. This Policy is aligned with the General Data Protection Regulation (GDPR), the Information Technology Act 2000 (India), and other applicable privacy laws.`,
  },
  {
    id: 'data-collected',
    title: '2. Data We Collect',
    content: `We collect data in three ways:

**Information you provide directly:**
- Account registration details: name, email address, password (hashed), profile photo
- Professional background: skills, work experience, educational history (optional)
- Content you create: roadmap notes, business idea submissions, mentor reviews
- Payment information: handled entirely by Razorpay; we store only the last 4 digits of your card and a token reference — never your full card number

**Information collected automatically:**
- Device data: browser type, operating system, screen resolution, IP address
- Usage data: pages visited, features used, time spent, click patterns (for product improvement)
- Performance data: error logs, API response times, crash reports via Sentry
- Cookies and local storage (see Section 5 for full details)

**Information from third parties:**
- If you sign in via Google OAuth, we receive your Google account name, email, and profile photo
- If you connect LinkedIn, we receive your public profile data you explicitly authorize`,
  },
  {
    id: 'legal-basis',
    title: '3. Legal Basis for Processing (GDPR)',
    content: `For users in the European Economic Area (EEA) and UK, we process your data under the following legal bases:

- **Contract performance:** To deliver the Service you signed up for — managing your account, showing your roadmaps, processing payments
- **Legitimate interests:** To improve our platform, prevent fraud, and communicate product updates
- **Consent:** For marketing emails, non-essential cookies, and analytics (you can withdraw consent at any time)
- **Legal obligation:** When required by applicable law or court order`,
  },
  {
    id: 'how-we-use',
    title: '4. How We Use Your Data',
    content: `We use your data to:

- Create and manage your account
- Personalize your learning roadmaps and AI-generated recommendations
- Process payments and issue certificates
- Send transactional emails (account confirmation, password resets, booking confirmations)
- Send product updates and feature announcements — only if you opt in
- Improve our AI models for skill assessment and idea validation (using aggregated, anonymized data only)
- Monitor platform health, investigate abuse, and enforce our Terms of Service
- Comply with legal and regulatory requirements

We do not sell your personal data to third parties, ever.`,
  },
  {
    id: 'cookies',
    title: '5. Cookies and Tracking',
    content: `We use cookies and similar technologies. See our full Cookie Policy at /cookies for details.

**Essential cookies** are required for the Service to function (authentication tokens, session state, CSRF protection). These cannot be opted out of while using the Service.

**Analytics cookies** (PostHog) help us understand feature usage and user flows. These are opt-in only and anonymous.

**Preference cookies** remember your settings — dark mode, language, notification preferences.

**No advertising or third-party tracking cookies** are used. We do not use Google Ads, Facebook Pixel, or any retargeting technology.

You can manage cookies via the Cookie Preferences panel in your account settings.`,
  },
  {
    id: 'authentication',
    title: '6. Authentication & Login',
    content: `**Email & password login:** Passwords are hashed using bcrypt with a cost factor of 12. We never store or transmit plaintext passwords.

**Google OAuth:** We use Google's OAuth 2.0 flow. When you sign in with Google, we receive only the scopes you authorize (email, profile name, photo). We do not access your Google Drive, contacts, or other Google services. You can revoke our access at any time from your Google Account Settings.

**Session management:** Sessions are handled via NextAuth.js with encrypted JWT tokens stored in HttpOnly cookies. Sessions expire after 30 days of inactivity. All auth endpoints use CSRF protection.`,
  },
  {
    id: 'third-party',
    title: '7. Third-Party Services',
    content: `We use the following sub-processors. Each processes data only as necessary to deliver the Service:

- **Vercel** — Hosting and serverless functions (servers in USA/EU)
- **MongoDB Atlas** — Primary database (servers in Singapore/EU)
- **Razorpay** — Payment processing (servers in India, PCI-DSS compliant)
- **Sentry** — Error monitoring (anonymized stack traces only)
- **PostHog** — Product analytics (opt-in only, GDPR compliant, EU-hosted)
- **Cloudinary** — Profile photo and asset storage
- **Google OAuth** — Authentication (optional, only if you choose Google login)

We maintain Data Processing Agreements (DPAs) with all sub-processors and require them to adhere to equivalent data protection standards.`,
  },
  {
    id: 'data-retention',
    title: '8. Data Retention',
    content: `We retain your data for as long as your account is active and for a reasonable period after closure:

- **Active account data:** Retained for the duration of your account
- **Deleted account data:** All personal data removed within 30 days of account deletion
- **Payment records:** Retained for 7 years for tax and financial compliance purposes
- **Anonymized analytics:** Retained indefinitely (no personal identifiers)
- **Support conversation logs:** Retained for 2 years for quality and compliance

You may request early deletion of your data by submitting a request to privacy@entreskillhub.com.`,
  },
  {
    id: 'user-rights',
    title: '9. Your Rights',
    content: `Regardless of where you are located, you have the following rights regarding your personal data:

- **Right to access:** Request a copy of all personal data we hold about you
- **Right to rectification:** Correct any inaccurate or incomplete data
- **Right to erasure ("right to be forgotten"):** Request deletion of your personal data
- **Right to data portability:** Receive your data in a machine-readable format (JSON)
- **Right to object:** Object to processing for legitimate interests or direct marketing
- **Right to restrict processing:** Request that we pause processing while a dispute is resolved
- **Right to withdraw consent:** Withdraw consent for analytics and marketing at any time

To exercise any of these rights, email privacy@entreskillhub.com or use the Data Requests tool in Account Settings. We will respond within 30 days. EEA residents may also lodge a complaint with their local Data Protection Authority.`,
  },
  {
    id: 'account-deletion',
    title: '10. Account Deletion',
    content: `You can delete your account at any time:

1. Go to Settings → Account → Delete Account
2. Confirm via email verification
3. Your account and all associated personal data will be permanently deleted within 30 days

After deletion: roadmaps you contributed to community templates will be anonymized, not removed. Financial records required by law are retained for 7 years but are disassociated from your identity.`,
  },
  {
    id: 'security',
    title: '11. Data Security',
    content: `We implement industry-standard security measures:

- All data in transit is encrypted using TLS 1.2+
- Data at rest is encrypted using AES-256
- Passwords are hashed with bcrypt (cost factor 12)
- Regular penetration testing and vulnerability scanning
- SOC 2-compliant infrastructure via Vercel and MongoDB Atlas
- Rate limiting and DDoS protection on all API endpoints
- Staff access to personal data is role-limited and audit-logged

Despite our best efforts, no system is 100% secure. Please report any suspected security issues to security@entreskillhub.com.`,
  },
  {
    id: 'children',
    title: "12. Children's Privacy",
    content: `Our Service is not directed to individuals under the age of 16. We do not knowingly collect personal data from children. If you are a parent or guardian and believe your child has provided us with personal data, please contact us at privacy@entreskillhub.com and we will delete the information within 7 days.`,
  },
  {
    id: 'changes',
    title: '13. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. When we make material changes, we will notify you by email (if you have an account) and display a notice on the platform at least 30 days before the changes take effect. The "Last Updated" date at the top of this page always reflects the most recent revision.

Your continued use of the Service after changes take effect constitutes acceptance of the updated Policy.`,
  },
  {
    id: 'contact',
    title: '14. Contact & DPO',
    content: `For any privacy-related questions, data requests, or concerns, contact us at:

Email: privacy@entreskillhub.com
Post: Data Protection Officer, EntreSkill Hub Technologies Pvt. Ltd., 91Springboard, Koramangala, Bengaluru — 560034, India

We aim to respond to all privacy inquiries within 48 hours.`,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative pt-24 pb-16 border-b overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <BreadcrumbNav items={[{ label: 'Privacy Policy' }]} />
          <div className="flex items-start gap-5 animate-fade-in-up">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 mt-1 hover:scale-[1.08] hover:rotate-[-4deg] transition-transform duration-300 ease-out">
              <Shield className="h-7 w-7 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-4xl font-bold font-heading mb-3">Privacy Policy</h1>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                We are committed to being transparent about how we collect and use data. This document tells you everything — no legalese designed to obscure what we actually do.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <Badge variant="outline">Effective: {EFFECTIVE_DATE}</Badge>
                <Badge variant="ghost">Last Updated: {LAST_UPDATED}</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          <aside className="hidden lg:block">
            <nav aria-label="Table of contents" className="sticky top-24">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 animate-fade-in-up">
                Contents
              </p>
              <ul className="space-y-2">
                {SECTIONS.map(({ id, title }, index) => (
                  <li key={id} className="animate-fade-in-up" style={{ animationDelay: `${index * 60}ms` }}>
                    <a
                      href={`#${id}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors block py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="lg:col-span-3 space-y-6">
            {SECTIONS.map(({ id, title, content }, index) => (
              <section key={id} id={id} className="animate-fade-in-up" style={{ animationDelay: `${index * 40}ms` }}>
                <Card size="sm">
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {content.split('\n\n').map((para, i) => (
                        <div key={i}>
                          {para.split('\n').map((line, j) => (
                            <p
                              key={j}
                              className={`text-sm leading-relaxed ${
                                line.startsWith('- ')
                                  ? 'text-muted-foreground pl-4 relative before:absolute before:left-0 before:content-["•"] before:text-primary ml-2'
                                  : line.startsWith('**')
                                  ? 'font-semibold text-foreground mt-2'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {line.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            ))}

            <div className="animate-fade-in-up">
              <Card glow className="overflow-hidden">
                <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Mail className="h-8 w-8 text-primary shrink-0" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="font-semibold mb-1">Questions about your privacy?</p>
                    <p className="text-sm text-muted-foreground">Our Data Protection team responds to all inquiries within 48 hours.</p>
                  </div>
                  <Link
                    href="mailto:privacy@entreskillhub.com"
                    className={cn(
                      "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-300 ease-out outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px active:scale-[0.98]",
                      buttonVariants({ variant: 'default', size: 'default' })
                    )}
                  >
                    Email Us <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}