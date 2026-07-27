import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  BookOpen, Map, Video, CheckSquare, BarChart2, Bookmark, Lightbulb,
} from "lucide-react";
import AuthLoginForm from "@/components/auth/auth-login-form";

export const metadata: Metadata = {
  title: "Continue Learning — EntreSkill Hub",
  description: "Sign in to access personalized learning resources, AI-powered business roadmaps, videos, articles, and progress tracking.",
};

const FEATURES = [
  { icon: Map, label: "Personalized Learning Roadmaps" },
  { icon: Lightbulb, label: "AI Business Recommendations" },
  { icon: Video, label: "Curated Videos & Articles" },
  { icon: CheckSquare, label: "Step-by-Step Business Checklists" },
  { icon: BarChart2, label: "Progress Tracking Dashboard" },
  { icon: Bookmark, label: "Bookmark & Save Resources" },
];

export default function LoginLearnPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* ─── Left Panel ─── */}
      <aside className="hidden lg:flex flex-col justify-between w-[46%] xl:w-[44%] bg-primary text-primary-foreground px-12 py-16 relative overflow-hidden shrink-0">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="EntreSkill Hub Logo" width={40} height={40} className="object-contain select-none shrink-0" />
            <span className="font-bold text-xl">EntreSkill Hub</span>
          </Link>
        </div>

        {/* Main copy */}
        <div className="relative z-10 space-y-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-sm font-medium mb-6">
              <BookOpen className="size-4" />
              Learning Platform
            </div>
            <h1 className="text-3xl xl:text-4xl font-bold font-heading leading-tight mb-4">
              Continue Your<br />Learning Journey
            </h1>
            <p className="text-primary-foreground/80 leading-relaxed">
              Access personalized learning resources, AI-powered business roadmaps, videos, articles, checklists, and track your entrepreneurial progress.
            </p>
          </div>

          <ul className="space-y-3" aria-label="Platform features">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <Icon className="size-3.5 text-white" aria-hidden="true" />
                </div>
                <span className="text-sm text-primary-foreground/90">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10 border-t border-white/20 pt-8">
          <blockquote className="text-sm text-primary-foreground/70 italic leading-relaxed">
            &ldquo;EntreSkill Hub gave me a clear roadmap to launch my catering business. The learning content is genuinely practical.&rdquo;
          </blockquote>
          <div className="mt-3 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://i.pravatar.cc/40?img=47" alt="Priya Sharma" className="w-8 h-8 rounded-full" />
            <div>
              <p className="text-xs font-semibold">Priya Sharma</p>
              <p className="text-xs text-primary-foreground/60">Home Bakery Founder</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Right Panel ─── */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Image src="/logo.png" alt="EntreSkill Hub Logo" width={40} height={40} className="object-contain select-none shrink-0" />
            <span className="font-bold text-lg">EntreSkill Hub</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-sm font-medium mb-4">
              <BookOpen className="size-4" aria-hidden="true" />
              Learning Platform
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-2">
              Sign in to learn
            </h2>
            <p className="text-muted-foreground text-sm">
              Access your personalized dashboard and continue where you left off.
            </p>
          </div>

          {/* Form */}
          <Suspense fallback={<div className="h-80 rounded-2xl bg-muted/30 animate-pulse" />}>
            <AuthLoginForm
              ctaLabel="Continue Learning"
              defaultRedirect="/learn"
              registerHref="/register"
              registerLabel="Create free account"
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
