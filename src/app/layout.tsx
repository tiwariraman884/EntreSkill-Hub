import type { Metadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/session-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { GlobalStateProvider } from "@/context/GlobalStateContext";
import { AppearanceProvider } from "@/context/AppearanceContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { PageTransition } from "@/components/page-transition";
import { SkipToContent } from "@/components/skip-to-content";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

// ── Sentry loaded lazily — keeps it out of the critical-path JS bundle ─────────
const SentryErrorBoundary = dynamic<{ children: ReactNode }>(
  () => import("@/components/providers/sentry-boundary"),
  { ssr: true }
);

// ── Fonts ─────────────────────────────────────────────────────────────────────
// display:'swap' = text is visible immediately with fallback font during load.
// Only latin subset to cut ~30% from font file size.
const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const fontHeading = Roboto_Slab({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],   // only the weights actually used
  display: "swap",
  preload: false,                  // heading font is non-critical; loads after paint
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://entreskillhub.com"),
  title: {
    default: "EntreSkill Hub — Skill-to-Startup Enablement Platform",
    template: "%s | EntreSkill Hub",
  },
  description:
    "Convert your skills into structured paths toward micro-entrepreneurship. Discover business ideas, access roadmaps, and connect with mentors.",
  keywords: ["entrepreneurship", "startup", "mentorship", "skills", "business ideas"],
  authors: [{ name: "EntreSkill Hub Team" }],
  creator: "EntreSkill Hub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://entreskillhub.com",
    title: "EntreSkill Hub",
    description: "Convert your skills into structured paths toward micro-entrepreneurship.",
    siteName: "EntreSkill Hub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EntreSkill Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EntreSkill Hub",
    description: "Convert your skills into structured paths toward micro-entrepreneurship.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontHeading.variable} font-sans h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "EntreSkill Hub",
              url: "https://entreskillhub.com",
              description: "Convert your skills into structured paths toward micro-entrepreneurship.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://entreskillhub.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "EntreSkill Hub",
              url: "https://entreskillhub.com",
              logo: "https://entreskillhub.com/logo.png",
              sameAs: [
                "https://twitter.com/entreskillhub",
                "https://linkedin.com/company/entreskillhub",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SkipToContent />
        <SessionProvider>
          <GlobalStateProvider>
            <AppearanceProvider>
              <ProfileProvider>
                <Header />
                <SentryErrorBoundary>
                  <Suspense
                    fallback={
                      <div
                        className="flex-1 animate-pulse bg-muted/20 min-h-screen"
                        aria-hidden="true"
                      />
                    }
                  >
                    <PageTransition>
                      <main id="main-content" className="flex-1">
                        {children}
                      </main>
                    </PageTransition>
                  </Suspense>
                </SentryErrorBoundary>
                <Footer />
                <Toaster />
              </ProfileProvider>
            </AppearanceProvider>
          </GlobalStateProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
