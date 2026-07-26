import type { Metadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/session-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import * as Sentry from "@sentry/nextjs";
import { GlobalStateProvider } from "@/context/GlobalStateContext";

export const dynamic = "force-dynamic";

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
        <SessionProvider>
          <GlobalStateProvider>
            <Header />
            <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>}>
              <main className="flex-1">{children}</main>
            </Sentry.ErrorBoundary>
            <Footer />
            <Toaster />
          </GlobalStateProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
