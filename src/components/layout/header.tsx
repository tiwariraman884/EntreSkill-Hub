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
import { motion, AnimatePresence } from "framer-motion";
import UserMenu from "@/components/profile/UserMenu";
import { useProfileContext } from "@/context/ProfileContext";

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

  return (
    <div className="relative" ref={ref}>
      <Link
        href={href}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
          isActive
            ? "text-primary bg-primary/8 shadow-sm shadow-primary/10"
            : "text-thread hover:text-ink hover:bg-muted/60"
        }`}
        aria-current={isActive ? "page" : undefined}
        onClick={() => setOpen(false)}
      >
        {isActive && (
          <motion.span
            layoutId="nav-indicator"
            className="absolute inset-x-2 -bottom-1 h-0.5 bg-linear-to-r from-primary to-accent rounded-full"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )}
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
        {dropdownItems && (
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.div>
        )}
      </Link>
      
      {dropdownItems && open && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-card border border-border/60 shadow-premium-hover py-2 z-50"
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
        </motion.div>
      )}
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { profile, isLoading: profileLoading } = useProfileContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuthed = !!session;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (status === "loading" || profileLoading) {
    return (
      <header className="sticky top-0 z-50 border-b border-border/40 bg-white/80 backdrop-blur-2xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="EntreSkill Hub Logo" width={48} height={48} priority className="h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 object-contain select-none shrink-0" />
            <span className="font-bold text-xl bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">EntreSkill Hub</span>
          </div>
        </div>
      </header>
    );
  }

  return (
        <motion.header
          className={`sticky top-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-card/90 backdrop-blur-2xl border-b border-border/40 shadow-premium"
              : "bg-card/70 backdrop-blur-xl border-b border-transparent"
          }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group" aria-label="EntreSkill Hub home">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-9 w-9 md:h-10 md:w-10 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300"
            >
              <Image 
                src="/logo.png" 
                alt="EntreSkill Hub Logo" 
                width={48} 
                height={48} 
                priority 
                className="h-9 w-9 md:h-10 md:w-10 object-contain select-none shrink-0"
              />
            </motion.div>
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
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden flex items-center justify-center h-10 w-10 rounded-xl hover:bg-muted/60 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>

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
                    className="inline-flex h-10 items-center justify-center rounded-xl border-2 border-primary/20 bg-card px-5 py-2 text-sm font-semibold transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex h-10 items-center justify-center rounded-xl bg-linear-to-r from-primary to-primary-light px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-px active:translate-y-0 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Get Started
                  </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/40 bg-white/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 space-y-1" aria-label="Mobile navigation">
              {isAuthed && (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-thread hover:text-ink hover:bg-muted/60 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              )}
              <Link
                href="/learn"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-thread hover:text-ink hover:bg-muted/60 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <Compass className="h-4 w-4" />
                Learn
              </Link>
              <Link
                href="/roadmaps"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-thread hover:text-ink hover:bg-muted/60 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <Map className="h-4 w-4" />
                Roadmaps
              </Link>
              <Link
                href="/mentors"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-thread hover:text-ink hover:bg-muted/60 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <MessageSquare className="h-4 w-4" />
                Mentors
              </Link>
              <Link
                href="/ideas"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-thread hover:text-ink hover:bg-muted/60 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <Sparkles className="h-4 w-4" />
                Ideas
              </Link>
              {session ? (
                <>
                  <Link
                    href="/notifications"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-thread hover:text-ink hover:bg-muted/60 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Bell className="h-4 w-4" />
                    Notifications
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-thread hover:text-ink hover:bg-muted/60 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
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
                    className="inline-flex h-10 items-center justify-center rounded-xl border-2 border-primary/20 bg-card px-5 py-2 text-sm font-semibold transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
