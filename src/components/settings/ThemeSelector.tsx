"use client";

import { Sun, Moon, Monitor, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Theme } from "@/types/appearance";

interface ThemeOption {
  value: Theme;
  label: string;
  icon: React.ElementType;
  desc: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  { value: "light", label: "Light", icon: Sun, desc: "Bright and clean" },
  { value: "dark", label: "Dark", icon: Moon, desc: "Easy on the eyes" },
  { value: "system", label: "System", icon: Monitor, desc: "Follows system preference" },
];

interface ThemeSelectorProps {
  currentTheme: Theme;
  onChange: (theme: Theme) => void;
}

export function ThemeSelector({ currentTheme, onChange }: ThemeSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {THEME_OPTIONS.map((option) => {
        const isSelected = option.value === currentTheme;
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "group relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 overflow-hidden bg-white dark:bg-[#1e293b]/50",
              isSelected ? "border-primary/70 shadow-md shadow-primary/10" : "border-border hover:border-primary/40"
            )}
          >
            {/* Gradient border & glow on selection */}
            {isSelected && (
              <div className="absolute inset-0 p-0.5 rounded-2xl bg-linear-to-r from-primary to-primary-light -z-10">
                <div className="absolute inset-0 bg-linear-to-r from-primary to-primary-light opacity-25 blur-lg" />
                <div className="w-full h-full bg-white dark:bg-surface rounded-2xl" />
              </div>
            )}

            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300",
                "group-hover:bg-primary/20 group-hover:-translate-y-1 group-hover:scale-105 group-active:scale-95"
              )}
            >
              <Icon className="size-6" />
            </div>

            <div className="text-center z-10">
              <p className="font-semibold text-sm text-foreground">{option.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{option.desc}</p>
            </div>

            {isSelected && (
              <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white shadow-sm animate-in zoom-in-75 duration-200">
                <Check className="size-3 stroke-3" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
