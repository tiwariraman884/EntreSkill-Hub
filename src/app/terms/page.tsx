import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Scale, ArrowRight, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service — EntreSkill Hub',
  description: 'Read the EntreSkill Hub Terms of Service. These terms govern your use of our platform, content, subscriptions, and community.',
}

const LAST_UPDATED = 'July 1, 2026'

const SECTIONS = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: `By accessing or using EntreSkill Hub ("the Service", "Platform"), you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.

If you do not agree to these Terms, please do not use the Service. We reserve the right to update these Terms at any time, with 30 days' prior notice for material changes.`,
  },
  {
    id: 'accounts',
    title: '2. Account Registration & Eligibility',
    content: `To access most features, you must create an account. You agree to:

- Be at least 16 years of age (or the applicable age of digital consent in your jurisdiction)
- Provide accurate, current, and complete registration information
- Maintain the security of your credentials and notify us immediately of any unauthorized access
- Not create accounts using another person's identity or for deceptive purposes

You are responsible for all activity that occurs under your account. EntreSkill Hub may terminate accounts that violate these Terms or applicable laws.`,
  },
  {
    id: 'user-responsibilities',
    title: '3. User Responsibilities',
    content: `You agree to use the Service only for lawful purposes and in accordance with these Terms. Specifically, you agree not to:

- Upload, share, or transmit content that is unlawful, defamatory, obscene, harassing, or otherwise objectionable
- Attempt to probe, scan, or test the vulnerability of any system or network
- Use automated tools to scrape, crawl, or extract data from the Platform without written permission
- Interfere with or disrupt the integrity or performance of the Service
- Impersonate any person, organization, or entity
- Use the Service to send unsolicited communications (spam)
- Attempt to circumvent any access controls or subscription gates

We reserve the right to investigate violations and take appropriate action, including suspension or termination of accounts.`,
  },
  {
    id: 'content-ownership',
    title: '4. Content Ownership & Licenses',
    content: `**Your content:** Content you create on the Platform — including notes, roadmap customizations, idea submissions, and reviews — remains yours. You grant EntreSkill Hub a worldwide, non-exclusive, royalty-free license to store, display, and process your content solely to provide the Service.

**Platform content:** All course materials, learning paths, UI designs, illustrations, branding, and editorial content created by EntreSkill Hub are our exclusive intellectual property. You may not reproduce, distribute, or create derivative works without written permission.

**Community content:** Content submitted to shared resources (e.g., public roadmap templates) is licensed under a Creative Commons Attribution 4.0 International (CC BY 4.0) license unless otherwise noted.

**AI-generated outputs:** Roadmaps, recommendations, and other AI-generated outputs are provided "as is" for educational purposes. You may use them freely in your own work.`,
  },
  {
    id: 'payments',
    title: '5. Payments & Billing',
    content: `**Free plan:** Our free plan provides access to foundational courses, basic roadmaps, and community features with no credit card required.

**Pro subscription:** The Pro plan is billed monthly or annually at the rate displayed at checkout. All prices are in INR unless otherwise specified. International pricing may vary.

**Payment processing:** All payments are processed securely by Razorpay. EntreSkill Hub does not store your payment card details.

**Automatic renewal:** Subscriptions automatically renew at the end of each billing period. You will receive a reminder email 7 days before renewal.

**Price changes:** We will provide at least 30 days' notice before changing subscription prices. Existing subscribers are grandfathered at their current rate for their current billing period.`,
  },
  {
    id: 'refunds',
    title: '6. Refund Policy',
    content: `We offer a full refund within 7 days of any subscription payment — no questions asked. To request a refund, email billing@entreskillhub.com with your account email and transaction ID.

After the 7-day window:
- Monthly subscribers: No refund for the current period, but access continues until period end
- Annual subscribers: A pro-rated refund for unused full months may be requested by emailing billing@entreskillhub.com

Certificates and downloaded materials are non-refundable once issued.`,
  },
  {
    id: 'subscriptions',
    title: '7. Subscription Features & Limitations',
    content: `**Free plan includes:** Access to all free courses, basic AI roadmap generation (3 per month), community forums, and public mentor profiles.

**Pro plan includes:** Unlimited AI roadmaps, advanced skill assessments, practice labs, certificate generation, mentor booking discounts (20%), priority support, and API access.

EntreSkill Hub reserves the right to modify the features included in each plan with 30 days' notice. If a material feature you paid for is removed, you are eligible for a pro-rated refund.`,
  },
  {
    id: 'prohibited',
    title: '8. Prohibited Activities',
    content: `The following activities are expressly prohibited:

- **Academic dishonesty:** Presenting EntreSkill Hub certificates as credentials for programs or employers in a misleading manner
- **Content theft:** Downloading, redistributing, or reselling course materials, videos, or proprietary content
- **Circumventing paywalls:** Using developer tools, proxies, or other means to access paid features without payment
- **Fake reviews:** Submitting false or manipulated mentor or course reviews
- **Harmful automation:** Running bots that generate fake accounts, inflate metrics, or stress-test our infrastructure
- **Competitive scraping:** Using the Platform to build a competing service or to systematically copy our content library

Violations may result in immediate account termination and potential legal action.`,
  },
  {
    id: 'liability',
    title: '9. Disclaimer of Warranties & Limitation of Liability',
    content: `The Service is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.

EntreSkill Hub does not warrant that:
- The Service will be uninterrupted, timely, secure, or error-free
- Any specific business or career outcomes will result from using the Service
- Information provided by mentors or in courses is complete, accurate, or current

To the maximum extent permitted by applicable law, EntreSkill Hub shall not be liable for indirect, incidental, special, consequential, or punitive damages. Our total liability to you for any claim arising from these Terms shall not exceed the greater of (a) the amount you paid to us in the 12 months preceding the claim, or (b) ₹5,000.`,
  },
  {
    id: 'termination',
    title: '10. Termination',
    content: `**By you:** You may close your account at any time from Settings → Account → Delete Account. Closing your account cancels any active subscriptions at the end of the current billing period.

**By us:** We may suspend or terminate your account immediately if:
- You violate these Terms
- We are required to do so by law
- We reasonably believe your account poses a security risk to other users

On termination, your access to the Service ceases immediately. We will retain your data per our Privacy Policy and applicable legal obligations.`,
  },
  {
    id: 'dispute',
    title: '11. Dispute Resolution',
    content: `**Informal resolution:** We encourage you to contact us first at legal@entreskillhub.com. Most disputes can be resolved informally within 15 business days.

**Arbitration:** If informal resolution fails, disputes shall be submitted to binding arbitration under the Arbitration and Conciliation Act, 1996 (India). Arbitration shall take place in Bengaluru, Karnataka, India, and be conducted in English.

**Class action waiver:** You agree to resolve disputes only on an individual basis. Class action lawsuits are not permitted under these Terms.

**Exceptions:** Either party may seek emergency injunctive relief from a court of competent jurisdiction to prevent irreparable harm.`,
  },
  {
    id: 'governing-law',
    title: '12. Governing Law',
    content: `These Terms are governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any disputes not subject to arbitration shall be submitted to the exclusive jurisdiction of the courts of Bengaluru, Karnataka, India.

If you are located in the European Union, you may also have rights under applicable EU consumer protection laws that these Terms do not override.`,
  },
  {
    id: 'updates',
    title: '13. Updates to These Terms',
    content: `We may modify these Terms at any time. For material changes, we will:

1. Email all registered users at least 30 days before the changes take effect
2. Display a prominent banner on the Platform
3. Require re-acceptance if the changes significantly affect your rights

For minor changes (typos, clarifications), we will update the "Last Updated" date without advance notice. Continued use of the Service after the effective date constitutes acceptance.`,
  },
  {
    id: 'contact',
    title: '14. Contact',
    content: `For legal inquiries, email legal@entreskillhub.com. For general support, use support@entreskillhub.com.

EntreSkill Hub Technologies Pvt. Ltd.
91Springboard, Koramangala
Bengaluru — 560034, Karnataka, India`,
  },
]

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative pt-24 pb-16 border-b overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <BreadcrumbNav items={[{ label: 'Terms of Service' }]} />
          <div className="flex items-start gap-5 animate-fade-in-up">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 mt-1 hover:scale-[1.08] hover:rotate-[-4deg] transition-transform duration-300 ease-out">
              <Scale className="h-7 w-7 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-4xl font-bold font-heading mb-3">Terms of Service</h1>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                Please read these terms carefully before using EntreSkill Hub. They govern your relationship with us and outline both your rights and responsibilities on the platform.
              </p>
              <div className="mt-4">
                <Badge variant="outline">Last Updated: {LAST_UPDATED}</Badge>
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
                    <p className="font-semibold mb-1">Legal questions?</p>
                    <p className="text-sm text-muted-foreground">Our legal team is reachable at legal@entreskillhub.com. We respond within 2 business days.</p>
                  </div>
                  <Link
                    href="/contact"
                    className={cn(
                      "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-300 ease-out outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px active:scale-[0.98]",
                      buttonVariants({ variant: 'default', size: 'default' })
                    )}
                  >
                    Contact Us <ArrowRight className="h-4 w-4" />
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