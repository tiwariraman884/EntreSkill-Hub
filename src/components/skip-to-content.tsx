"use client"

import { cn } from "@/lib/utils"

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999]",
        "focus:px-4 focus:py-2.5 focus:rounded-xl",
        "focus:bg-primary focus:text-white focus:shadow-lg focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "focus:text-sm focus:font-semibold focus:outline-none"
      )}
    >
      Skip to main content
    </a>
  )
}
