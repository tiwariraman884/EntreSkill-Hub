"use client";

import { cn } from "@/lib/utils";
import type { AccentColor } from "@/types/appearance";

interface ColorOption {
  value: AccentColor;
  colorClass: string;
  label: string;
}

const COLOR_OPTIONS: ColorOption[] = [
  { value: "blue", colorClass: "bg-[#2563EB]", label: "Blue" },
  { value: "purple", colorClass: "bg-[#7C3AED]", label: "Purple" },
  { value: "green", colorClass: "bg-[#059669]", label: "Green" },
  { value: "orange", colorClass: "bg-[#D97706]", label: "Orange" },
  { value: "pink", colorClass: "bg-[#DB2777]", label: "Pink" },
  { value: "red", colorClass: "bg-[#DC2626]", label: "Red" },
  { value: "yellow", colorClass: "bg-[#CA8A04]", label: "Yellow" },
  { value: "indigo", colorClass: "bg-[#2B3A67]", label: "Indigo" },
  { value: "teal", colorClass: "bg-[#0D9488]", label: "Teal" },
];

interface ColorPickerProps {
  value: AccentColor;
  onChange: (color: AccentColor) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-4" role="radiogroup" aria-label="Accent color">
      {COLOR_OPTIONS.map((option) => {
        const isSelected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={option.label}
            onClick={() => onChange(option.value)}
            className={cn(
              "group relative flex h-14 w-14 items-center justify-center rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer transition-all duration-200",
              isSelected && "ring-2 ring-primary ring-offset-2"
            )}
          >
            <div
              className={cn(
                "relative h-10 w-10 rounded-xl transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:scale-110 group-hover:rotate-5 group-active:scale-90",
                option.colorClass
              )}
            >
              {/* Internal highlight on hover */}
              <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </div>
          </button>
        );
      })}
    </div>
  );
}
