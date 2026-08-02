"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Compass,
  LayoutDashboard,
  User as UserIcon,
  ChevronDown,
  Sparkles,
  Menu,
  X,
  Map,
  MessageSquare,
  Bell,
  Settings,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import UserMenu from "@/components/profile/UserMenu";
import { useProfileContext } from "@/context/ProfileContext";

// ─── NavLink ─────────────────────────────────────────────────────────────────
// Fully CSS-driven — no framer-motion dependency.

function NavLink({
  label,
  icon: Icon,
  authedHref,
  anonHref,
  pathname,
  isAuthed,
  dropdownItems,
}: {
  label: string;
  icon: React.ElementType;
  authedHref: string;
  anonHref: string;
  pathname: string;
  isAuthed: boolean;
  dropdownItems?: { label: string; href: string }[];
}) {
  const href = isAuthed ? authedHref : anonHref;
  const isActive = pathname === authedHref || pathname.startsWith(authedHref + "/");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <Link
        href={href}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
          isActive
            ? "text-primary bg-primary/8 shadow-sm shadow-primary/10"
            : "text-thread hover:text-ink hover:bg-muted/60"
        }`}
        aria-current={isActive ? "page" : undefined}
        onClick={() => setOpen(false)}
      >
        {/* Active indicator — CSS transition only, no framer-motion */}
        {isActive && (
          <span className="absolute inset-x-2 -bottom-1 h-0.5 bg-linear-to-r from-primary to-accent rounded-full" />
        )}
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
        {dropdownItems && (
          <ChevronDown
            className="h-3.5 w-3.5 transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        )}
      </Link>

      {dropdownItems && open && (
        <div
          className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-card border border-border/60 shadow-premium-hover py-2 z-50"
          style={{
            animation: "scaleIn 0.15s ease-out",
            transformOrigin: "top left",
          }}
        >
          {dropdownItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { profile, isLoading: profileLoading } = useProfileContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuthed = !!session;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (status === "loading" || profileLoading) {
    return (
      <header className="sticky top-0 z-50 border-b border-border/40 bg-white/80 backdrop-blur-2xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt=""
              width={44}
              height={44}
              priority
              className="h-10 w-10 md:h-11 md:w-11 object-contain select-none shrink-0"
              sizes="44px"
            />
            <span className="font-bold text-xl bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              EntreSkill Hub
            </span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/90 backdrop-blur-2xl border-b border-border/40 shadow-premium"
          : "bg-card/70 backdrop-blur-xl border-b border-transparent"
      }`}
      style={{ animation: "slideDown 0.3s ease-out" }}
    >
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group" aria-label="EntreSkill Hub home">
            {/* Logo — CSS scale on hover, no framer-motion */}
            <div className="relative h-9 w-9 md:h-10 md:w-10 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-200 group-hover:scale-105 active:scale-95">
              <Image
                src="/logo.png"
                alt=""
                width={44}
                height={44}
                priority
                className="h-9 w-9 md:h-10 md:w-10 object-contain select-none shrink-0"
                sizes="44px"
              />
            </div>
            <span className="font-bold text-lg hidden sm:inline-block tracking-tight bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              EntreSkill Hub
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {isAuthed && (
              <NavLink
                label="Dashboard"
                icon={LayoutDashboard}
                authedHref="/dashboard"
                anonHref="/login"
                pathname={pathname}
                isAuthed={isAuthed}
              />
            )}
            <NavLink
              label="Learn"
              icon={Compass}
              authedHref="/learn"
              anonHref="/login/learn"
              pathname={pathname}
              isAuthed={isAuthed}
              dropdownItems={[
                { label: "All Courses", href: "/learn" },
                { label: "Learning Hub", href: "/learning-hub" },
                { label: "Roadmaps", href: "/roadmaps" },
              ]}
            />
            <NavLink
              label="Roadmaps"
              icon={Map}
              authedHref="/roadmaps"
              anonHref="/login"
              pathname={pathname}
              isAuthed={isAuthed}
            />
            <NavLink
              label="Mentors"
              icon={UserIcon}
              authedHref="/mentors"
              anonHref="/login/mentor"
              pathname={pathname}
              isAuthed={isAuthed}
            />
            <NavLink
              label="Ideas"
              icon={Sparkles}
              authedHref="/ideas"
              anonHref="/login"
              pathname={pathname}
              isAuthed={isAuthed}
            />
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden flex items-center justify-center h-10 w-10 rounded-xl hover:bg-muted/60 transition-colors active:scale-95"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {session ? (
              <div className="flex items-center gap-2">
                <UserMenu
                  user={{
                    name: profile?.name || session.user.name,
                    email: profile?.email || session.user.email,
                    image: profile?.profile?.avatar || session.user.image,
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="inline-flex h-10 items-center justify-center rounded-xl border-2 border-primary/20 bg-card px-5 py-2 text-sm font-semibold transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-linear-to-r from-primary to-primary-light px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-px active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation — CSS-only expand animation */}
      <div
        id="mobile-nav"
        className="lg:hidden border-t border-border/40 bg-white/95 backdrop-blur-xl overflow-hidden"
        style={{
          display: mobileOpen ? "block" : "none",
        }}
        aria-hidden={!mobileOpen}
      >
        <nav className="container mx-auto px-4 py-4 space-y-1" aria-label="Mobile navigation">
          {isAuthed && (
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-thread hover:text-ink hover:bg-muted/60 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              Dashboard
            </Link>
          )}
          <Link
            href="/learn"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-thread hover:text-ink hover:bg-muted/60 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            <Compass className="h-4 w-4" aria-hidden="true" />
            Learn
          </Link>
          <Link
            href="/roadmaps"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-thread hover:text-ink hover:bg-muted/60 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            <Map className="h-4 w-4" aria-hidden="true" />
            Roadmaps
          </Link>
          <Link
            href="/mentors"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-thread hover:text-ink hover:bg-muted/60 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Mentors
          </Link>
          <Link
            href="/ideas"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-thread hover:text-ink hover:bg-muted/60 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Ideas
          </Link>
          {session ? (
            <>
              <Link
                href="/notifications"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-thread hover:text-ink hover:bg-muted/60 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <Bell className="h-4 w-4" aria-hidden="true" />
                Notifications
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-thread hover:text-ink hover:bg-muted/60 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <Settings className="h-4 w-4" aria-hidden="true" />
                Settings
              </Link>
              <div className="pt-2 border-t border-border/40">
                <UserMenu
                  user={{
                    name: profile?.name || session.user.name,
                    email: profile?.email || session.user.email,
                    image: profile?.profile?.avatar || session.user.image,
                  }}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center rounded-xl border-2 border-primary/20 bg-card px-5 py-2 text-sm font-semibold transition-all duration-200 hover:border-primary/40 hover:bg-primary/5"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-linear-to-r from-primary to-primary-light px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
