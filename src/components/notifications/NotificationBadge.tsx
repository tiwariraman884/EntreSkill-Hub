"use client";

import { cn } from "@/lib/utils";

interface NotificationBadgeProps {
  count: number;
  className?: string;
}

export function NotificationBadge({ count, className }: NotificationBadgeProps) {
  if (count === 0) return null;
  
  return (
    <span
      className={cn(
        "absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-danger text-white text-[10px] font-bold px-1.5 ring-2 ring-white shadow-lg",
        className
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
