"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { BookOpen, Compass, Menu, User as UserIcon, LogOut } from "lucide-react";
import { useState } from "react";

/** A nav link that is always rendered — authenticated users get the real href,
 *  unauthenticated users get the login redirect href. */
function SmartNavLink({
  label,
  icon: Icon,
  authedHref,
  anonHref,
  pathname,
  isAuthed,
}: {
  label: string;
  icon: React.ElementType;
  authedHref: string;
  anonHref: string;
  pathname: string;
  isAuthed: boolean;
}) {
  const href = isAuthed ? authedHref : anonHref;
  const isActive = pathname === authedHref || pathname.startsWith(authedHref + "/");

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuthed = !!session;

  if (status === "loading") {
    return (
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="font-bold text-xl">EntreSkill Hub</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2" aria-label="EntreSkill Hub home">
            <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="font-bold text-xl hidden sm:inline-block">EntreSkill Hub</span>
          </Link>

          {/* Desktop Nav — visible for BOTH authed and unauthed */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {isAuthed && (
              <SmartNavLink
                label="Dashboard"
                icon={BookOpen}
                authedHref="/dashboard"
                anonHref="/login"
                pathname={pathname}
                isAuthed={isAuthed}
              />
            )}
            <SmartNavLink
              label="Learn"
              icon={Compass}
              authedHref="/learn"
              anonHref="/login/learn"
              pathname={pathname}
              isAuthed={isAuthed}
            />
            <SmartNavLink
              label="Mentors"
              icon={UserIcon}
              authedHref="/mentors"
              anonHref="/login/mentor"
              pathname={pathname}
              isAuthed={isAuthed}
            />
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-muted-foreground hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="size-4 mr-2" /> Log out
            </Button>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-lg border border-input bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Get Started
              </Link>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t px-4 py-3 space-y-1" role="navigation" aria-label="Mobile navigation">
          {isAuthed && (
            <SmartNavLink
              label="Dashboard"
              icon={BookOpen}
              authedHref="/dashboard"
              anonHref="/login"
              pathname={pathname}
              isAuthed={isAuthed}
            />
          )}
          <SmartNavLink
            label="Learn"
            icon={Compass}
            authedHref="/learn"
            anonHref="/login/learn"
            pathname={pathname}
            isAuthed={isAuthed}
          />
          <SmartNavLink
            label="Mentors"
            icon={UserIcon}
            authedHref="/mentors"
            anonHref="/login/mentor"
            pathname={pathname}
            isAuthed={isAuthed}
          />
          {!isAuthed ? (
            <div className="pt-3 border-t space-y-2">
              <Link
                href="/login"
                className="flex w-full items-center justify-center h-9 rounded-lg border border-input text-sm font-medium hover:bg-muted transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="flex w-full items-center justify-center h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80 transition-colors"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="pt-3 border-t">
              <Button 
                variant="ghost" 
                className="flex w-full justify-start text-muted-foreground hover:text-red-600 hover:bg-red-50"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="size-4 mr-2" /> Log out
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
