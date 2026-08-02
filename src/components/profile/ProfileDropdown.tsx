"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProfileAvatar } from "./ProfileAvatar";
import { LogoutDialog } from "./LogoutDialog";
import { DUMMY_USER } from "@/data/mock-notifications";
import { signOut } from "next-auth/react";
import {
  User,
  BookOpen,
  Award,
  Heart,
  Settings,
  Lock,
  Palette,
  HelpCircle,
  ChevronRight,
  Loader2,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProfileContext } from "@/context/ProfileContext";

interface ProfileDropdownProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { profile } = useProfileContext();

  // Use live profile as single source of truth for avatar
  const liveImage = profile?.profile?.avatar || user?.image || DUMMY_USER.avatarUrl;
  const displayName = profile?.name || user?.name || DUMMY_USER.firstName + " " + DUMMY_USER.lastName;
  const displayEmail = profile?.email || user?.email || DUMMY_USER.email;

  // Derive cache-busted avatar URL directly from liveImage (no state needed)
  const avatarUrl = liveImage || undefined;


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      localStorage.clear();
      sessionStorage.clear();
      await signOut({ callbackUrl: "/" });
    } catch {
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    { icon: User, label: "My Profile", href: "/profile", description: "View your profile" },
    { icon: BookOpen, label: "Learning Progress", href: "/dashboard", description: "Track your progress" },
    { icon: Award, label: "Achievements", href: "/achievements", description: "View badges & awards" },
    { icon: Heart, label: "Saved Items", href: "/bookmarks", description: "Your saved resources" },
  ];

  const settingsItems = [
    { icon: Settings, label: "Account Settings", href: "/settings" },
    { icon: Lock, label: "Privacy", href: "/settings?tab=privacy" },
    { icon: Palette, label: "Appearance", href: "/settings?tab=appearance" },
    { icon: HelpCircle, label: "Help Center", href: "/contact" },
  ];

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="ghost"
          className="flex items-center gap-3 h-10 px-3 rounded-xl hover:bg-indigo/10 transition-all duration-200"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-haspopup="true"
        >
          <ProfileAvatar src={avatarUrl} name={displayName} size="sm" />
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-semibold leading-tight">{displayName}</span>
            <span className="text-xs text-thread leading-tight">{DUMMY_USER.role}</span>
          </div>
          <ChevronRight className={cn("size-4 text-thread transition-transform duration-200 hidden md:block", open && "rotate-90")} />
        </Button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-card/95 backdrop-blur-2xl border-2 border-border/40 rounded-2xl shadow-2xl shadow-indigo/10 z-50 animate-scale-in overflow-hidden">
            {/* Profile Header */}
            <div className="p-4 border-b border-border/40 bg-linear-to-br from-indigo/5 to-marigold/5">
              <div className="flex items-center gap-3">
                <ProfileAvatar src={avatarUrl} name={displayName} size="default" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold truncate">{displayName}</h4>
                  <p className="text-xs text-thread truncate">{displayEmail}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] text-emerald-600 font-medium">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2 space-y-0.5">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-thread hover:text-ink hover:bg-muted/50 transition-all duration-200 group"
                  onClick={() => setOpen(false)}
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo/10 flex items-center justify-center group-hover:bg-indigo/20 transition-colors">
                    <item.icon className="size-4 text-indigo" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-[11px] text-thread/70">{item.description}</p>
                  </div>
                  <ChevronRight className="size-3.5 text-thread/50 group-hover:text-indigo transition-colors" />
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="mx-4 my-2 border-t border-border/40" />

            {/* Settings Items */}
            <div className="p-2 space-y-0.5">
              {settingsItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-thread hover:text-ink hover:bg-muted/50 transition-all duration-200 group"
                  onClick={() => setOpen(false)}
                >
                  <div className="w-8 h-8 rounded-lg bg-marigold/10 flex items-center justify-center group-hover:bg-marigold/20 transition-colors">
                    <item.icon className="size-4 text-marigold-dark" />
                  </div>
                  <span className="font-medium text-sm flex-1">{item.label}</span>
                  <ChevronRight className="size-3.5 text-thread/50 group-hover:text-marigold transition-colors" />
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="mx-4 my-2 border-t border-border/40" />

            {/* Logout */}
            <div className="p-2">
              <button
                onClick={() => {
                  setOpen(false);
                  setLogoutOpen(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-danger hover:bg-danger/10 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center">
                  {isLoggingOut ? (
                    <Loader2 className="size-4 text-danger animate-spin" />
                  ) : (
                    <LogOut className="size-4 text-danger" />
                  )}
                </div>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <LogoutDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        onConfirm={handleLogout}
      />
    </>
  );
}
