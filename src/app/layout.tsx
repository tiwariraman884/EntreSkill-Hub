import type { Metadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/session-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import * as Sentry from "@sentry/nextjs";
import { GlobalStateProvider } from "@/context/GlobalStateContext";
import { AppearanceProvider } from "@/context/AppearanceContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { PageTransition } from "@/components/page-transition";
import { SkipToContent } from "@/components/skip-to-content";
import { Suspense } from "react";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontHeading = Roboto_Slab({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EntreSkill Hub — Skill-to-Startup Enablement Platform",
  description: "Convert your skills into structured paths toward micro-entrepreneurship. Discover business ideas, access roadmaps, and connect with mentors.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
    >
      <body className="min-h-full flex flex-col">
        <SkipToContent />
        <SessionProvider>
          <GlobalStateProvider>
            <AppearanceProvider>
              <ProfileProvider>
                <Header />
                <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>}>
                  <Suspense fallback={<div className="flex-1 animate-pulse bg-muted/20 min-h-screen" />}>
                    <PageTransition>
                      <main id="main-content" className="flex-1">
                        {children}
                      </main>
                    </PageTransition>
                  </Suspense>
                </Sentry.ErrorBoundary>
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
