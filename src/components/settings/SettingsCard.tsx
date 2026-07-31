"use client";

import { motion } from "framer-motion";
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
    <motion.div
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0 : 0.35,
        delay: reducedMotion ? 0 : delayIndex * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn(
        "rounded-3xl bg-white dark:bg-surface border border-border/80 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.3)] transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
