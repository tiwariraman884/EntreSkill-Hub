"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Calendar,
  BookOpen,
  Lightbulb,
  Map,
  Users,
  Search,
  ArrowRight,
} from "lucide-react";

interface EmptyStateProps {
  icon?: "calendar" | "book" | "idea" | "search" | "map" | "users";
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

const ICONS = {
  calendar: Calendar,
  book: BookOpen,
  idea: Lightbulb,
  search: Search,
  map: Map,
  users: Users,
};

export function EmptyState({
  icon = "calendar",
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) {
  const IconComponent = ICONS[icon];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        "rounded-2xl border border-dashed border-border/70",
        "bg-gradient-to-br from-muted/20 to-muted/5",
        "animate-in fade-in slide-in-from-bottom-4 duration-300",
        className
      )}
    >
      <div className="relative mb-6 animate-in zoom-in-90 duration-300 delay-100">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo/10 to-indigo-light/10 border border-indigo/10 flex items-center justify-center shadow-lg">
          {IconComponent ? (
            <IconComponent className="w-10 h-10 text-indigo/60" />
          ) : null}
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-marigold/40 animate-pulse" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-indigo/30 animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>

      <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-thread leading-relaxed max-w-xs mb-6">{description}</p>

      {(actionLabel && actionHref) && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-200">
          <Link
            href={actionHref}
            className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-gradient-to-r from-indigo to-indigo-light text-white text-sm font-semibold shadow-lg shadow-indigo/25 hover:shadow-xl hover:shadow-indigo/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {actionLabel}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-gradient-to-r from-indigo to-indigo-light text-white text-sm font-semibold shadow-lg shadow-indigo/25 hover:shadow-xl hover:shadow-indigo/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring animate-in fade-in slide-in-from-bottom-2 duration-300 delay-200"
        >
          {actionLabel}
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
