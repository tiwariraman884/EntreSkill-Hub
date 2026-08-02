"use client";

import { cn } from "@/lib/utils";

interface SettingsCardProps {
  children: React.ReactNode;
  className?: string;
  delayIndex?: number;
  reducedMotion?: boolean;
}

export function SettingsCard({
  children,
  className,
  delayIndex = 0,
  reducedMotion = false,
}: SettingsCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-white dark:bg-surface border border-border/80 p-8",
        "shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)]",
        "hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.3)]",
        "transition-all duration-300",
        !reducedMotion && "animate-in fade-in slide-in-from-bottom-3 duration-300",
        className
      )}
      style={!reducedMotion ? { animationDelay: `${delayIndex * 70}ms` } : undefined}
    >
      {children}
    </div>
  );
}
