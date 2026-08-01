import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ShieldCheck, Users, MessageCircle, Star, Rocket, HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AuthLoginForm from "@/components/auth/auth-login-form";

export const metadata: Metadata = {
  title: "Connect with Mentors — EntreSkill Hub",
  description: "Sign in to book sessions with verified mentors, receive personalized guidance, and accelerate your business journey.",
};

const FEATURES = [
  { icon: ShieldCheck, label: "Verified Industry Mentors" },
  { icon: Users, label: "One-on-One Private Sessions" },
  { icon: Rocket, label: "Startup & Growth Guidance" },
  { icon: Star, label: "Business Plan Reviews" },
  { icon: HelpCircle, label: "Q&A and Ongoing Support" },
  { icon: MessageCircle, label: "Live Mentorship Sessions" },
];

export default function LoginMentorPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* ─── Left Panel ─── */}
      <aside className="hidden lg:flex flex-col justify-between w-[46%] xl:w-[44%] text-foreground px-12 py-16 relative overflow-hidden shrink-0 border-r bg-muted/30">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-3 duration-600 ease-out">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="EntreSkill Hub Logo" width={40} height={40} className="object-contain select-none shrink-0" />
            <span className="font-bold text-xl">EntreSkill Hub</span>
          </Link>
        </div>

        {/* Main copy */}
        <div className="relative z-10 space-y-10">
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-600 ease-out delay-100">
            <Badge variant="outline" className="gap-1.5 border-primary/15 bg-primary/8 text-primary hover:bg-primary/10 hover:border-primary/25 mb-6">
              <Users className="size-3.5" aria-hidden="true" />
              Mentor Network
            </Badge>
            <h1 className="text-3xl xl:text-4xl font-bold font-heading leading-tight mb-4">
              Connect with<br />Expert Mentors
            </h1>
            <p className="text-muted-foreground leading-relaxed text-base">
              Book sessions with experienced entrepreneurs, receive personalized guidance, ask questions, and accelerate your business journey with expert support.
            </p>
          </div>

          <ul className="space-y-3" aria-label="Mentorship features">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-500 ease-out">
                <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="size-4 text-primary" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </li>
            ))}
          </ul>

          {/* Mentor previews */}
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
            <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Trusted by founders from</p>
            {[
              { name: "Aarav Mehta", role: "SaaS Founder · 200+ sessions", img: "https://i.pravatar.cc/40?img=12" },
              { name: "Neha Kapoor", role: "D2C Expert · 150+ sessions", img: "https://i.pravatar.cc/40?img=5" },
            ].map((m) => (
              <div key={m.name} className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/60 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-300">
                <Image src={m.img} alt={m.name} width={36} height={36} className="w-9 h-9 rounded-full" />
                <div>
                  <p className="text-sm font-semibold">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
                <div className="ml-auto flex text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="size-3 fill-current" aria-hidden="true" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat */}
        <div className="relative z-10 border-t border-border/40 pt-8 grid grid-cols-3 gap-4 text-center animate-in fade-in duration-500 ease-out">
          {[
            { value: "150+", label: "Mentors" },
            { value: "2K+", label: "Sessions" },
            { value: "4.9★", label: "Rating" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold font-heading">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* ─── Right Panel ─── */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500 ease-out">
            <Image src="/logo.png" alt="EntreSkill Hub Logo" width={40} height={40} className="object-contain select-none shrink-0" />
            <span className="font-bold text-lg">EntreSkill Hub</span>
          </div>

          {/* Heading */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500 ease-out">
            <Badge variant="outline" className="gap-1.5 border-primary/15 bg-primary/8 text-primary hover:bg-primary/10 hover:border-primary/25 mb-4">
              <Users className="size-3.5" aria-hidden="true" />
              Mentor Network
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-2">
              Sign in to connect
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Book sessions with verified mentors and get expert guidance for your startup.
            </p>
          </div>

          {/* Form */}
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-500 ease-out">
            <Suspense fallback={<div className="h-80 rounded-2xl bg-muted/30 animate-pulse" />}>
              <AuthLoginForm
                ctaLabel="Find My Mentor"
                defaultRedirect="/mentors"
                registerHref="/register"
                registerLabel="Create free account"
              />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
