"use client";

import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
  className?: string;
}

export function SectionTitle({
  title,
  description,
  icon: Icon,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("space-y-1 mb-6 text-left", className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-5" />
          </span>
        )}
        <h2 className="text-[22px] font-bold font-heading text-foreground tracking-tight">
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
