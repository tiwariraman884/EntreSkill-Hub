export type Theme = "light" | "dark" | "system";
export type FontSize = "small" | "medium" | "large" | "xl";
export type AccentColor = "indigo" | "blue" | "purple" | "green" | "orange" | "red" | "teal" | "rose" | "slate" | "pink" | "yellow";
export type BorderRadius = "rounded" | "modern" | "sharp";
export type CardDensity = "comfortable" | "compact";

export interface AppearanceSettings {
  theme: Theme;
  fontSize: FontSize;
  accentColor: AccentColor;
  compactMode: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  borderRadius: BorderRadius;
  cardDensity: CardDensity;
}

export const DEFAULT_APPEARANCE: AppearanceSettings = {
  theme: "system",
  fontSize: "medium",
  accentColor: "indigo",
  compactMode: false,
  highContrast: false,
  reducedMotion: false,
  borderRadius: "modern",
  cardDensity: "comfortable",
};

export const ACCENT_PALETTES: Record<AccentColor, { primary: string; primaryForeground: string; light: string; dark: string; ring: string }> = {
  indigo: { primary: "#2B3A67", primaryForeground: "#FFFFFF", light: "#4B5A87", dark: "#1E2D52", ring: "#2B3A67" },
  blue: { primary: "#2563EB", primaryForeground: "#FFFFFF", light: "#60A5FA", dark: "#1D4ED8", ring: "#2563EB" },
  purple: { primary: "#7C3AED", primaryForeground: "#FFFFFF", light: "#A78BFA", dark: "#6D28D9", ring: "#7C3AED" },
  green: { primary: "#059669", primaryForeground: "#FFFFFF", light: "#34D399", dark: "#047857", ring: "#059669" },
  orange: { primary: "#D97706", primaryForeground: "#FFFFFF", light: "#FBBF24", dark: "#B45309", ring: "#D97706" },
  red: { primary: "#DC2626", primaryForeground: "#FFFFFF", light: "#F87171", dark: "#B91C1C", ring: "#DC2626" },
  teal: { primary: "#0D9488", primaryForeground: "#FFFFFF", light: "#2DD4BF", dark: "#0F766E", ring: "#0D9488" },
  rose: { primary: "#E11D48", primaryForeground: "#FFFFFF", light: "#FB7185", dark: "#BE123C", ring: "#E11D48" },
  slate: { primary: "#475569", primaryForeground: "#FFFFFF", light: "#94A3B8", dark: "#334155", ring: "#475569" },
  pink: { primary: "#DB2777", primaryForeground: "#FFFFFF", light: "#F472B6", dark: "#9D174D", ring: "#DB2777" },
  yellow: { primary: "#CA8A04", primaryForeground: "#FFFFFF", light: "#FACC15", dark: "#854D0E", ring: "#CA8A04" },
};

export const FONT_SIZE_SCALES: Record<FontSize, { base: string; sm: string; lg: string; xl: string }> = {
  small: { base: "14px", sm: "13px", lg: "16px", xl: "18px" },
  medium: { base: "16px", sm: "14px", lg: "18px", xl: "20px" },
  large: { base: "18px", sm: "16px", lg: "20px", xl: "22px" },
  xl: { base: "20px", sm: "18px", lg: "22px", xl: "24px" },
};

export const BORDER_RADIUS_TOKENS: Record<BorderRadius, { sm: string; md: string; lg: string; xl: string; full: string }> = {
  rounded: { sm: "12px", md: "16px", lg: "20px", xl: "28px", full: "9999px" },
  modern: { sm: "8px", md: "12px", lg: "16px", xl: "24px", full: "9999px" },
  sharp: { sm: "4px", md: "6px", lg: "8px", xl: "12px", full: "9999px" },
};

export const CARD_DENSITY_SPACING: Record<CardDensity, { padding: string; gap: string; headerPadding: string; contentPadding: string }> = {
  comfortable: { padding: "24px", gap: "24px", headerPadding: "24px", contentPadding: "24px" },
  compact: { padding: "16px", gap: "16px", headerPadding: "16px", contentPadding: "16px" },
};
