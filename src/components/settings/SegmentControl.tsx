"use client";

import { cn } from "@/lib/utils";

interface Option<T> {
  value: T;
  label: string;
}

interface SegmentControlProps<T> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
}

export function SegmentControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: SegmentControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="relative flex rounded-2xl border-2 border-border p-1 bg-muted/30 w-full overflow-hidden"
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 z-10",
              isSelected
                ? "text-white bg-linear-to-r from-primary to-primary-light shadow-md shadow-primary/20"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
