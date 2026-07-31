"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import type { AppearanceSettings, Theme, AccentColor, FontSize, BorderRadius, CardDensity } from "@/types/appearance";
import { DEFAULT_APPEARANCE } from "@/types/appearance";

type AppearanceContextValue = {
  settings: AppearanceSettings;
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: AccentColor) => void;
  setFontSize: (size: FontSize) => void;
  setCompactMode: (enabled: boolean) => void;
  setHighContrast: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  setBorderRadius: (radius: BorderRadius) => void;
  setCardDensity: (density: CardDensity) => void;
  resetToDefaults: () => void;
};

const AppearanceContext = createContext<AppearanceContextValue | undefined>(undefined);

const STORAGE_KEY = "entreskill_appearance_settings";

function loadSettings(): AppearanceSettings {
  if (typeof window === "undefined") return DEFAULT_APPEARANCE;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<AppearanceSettings>;
      return { ...DEFAULT_APPEARANCE, ...parsed };
    }
  } catch {
    // ignore parse errors
  }
  return DEFAULT_APPEARANCE;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === "system" && systemDark);

  if (isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

function applyAccentColor(color: AccentColor) {
  const root = document.documentElement;
  const palette = {
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
  }[color];

  root.style.setProperty("--primary", palette.primary);
  root.style.setProperty("--primary-foreground", palette.primaryForeground);
  root.style.setProperty("--ring", palette.ring);
  root.style.setProperty("--accent-foreground", palette.primary);
}

function applyFontSize(size: FontSize) {
  const root = document.documentElement;
  const scales = {
    small: { base: "14px", sm: "13px", lg: "16px", xl: "18px" },
    medium: { base: "16px", sm: "14px", lg: "18px", xl: "20px" },
    large: { base: "18px", sm: "16px", lg: "20px", xl: "22px" },
    xl: { base: "20px", sm: "18px", lg: "22px", xl: "24px" },
  }[size];

  root.style.setProperty("--font-size-base", scales.base);
  root.style.setProperty("--font-size-sm", scales.sm);
  root.style.setProperty("--font-size-lg", scales.lg);
  root.style.setProperty("--font-size-xl", scales.xl);
}

function applyBorderRadius(radius: BorderRadius) {
  const root = document.documentElement;
  const tokens = {
    rounded: { sm: "12px", md: "16px", lg: "20px", xl: "28px", full: "9999px" },
    modern: { sm: "8px", md: "12px", lg: "16px", xl: "24px", full: "9999px" },
    sharp: { sm: "4px", md: "6px", lg: "8px", xl: "12px", full: "9999px" },
  }[radius];

  root.style.setProperty("--radius-sm", tokens.sm);
  root.style.setProperty("--radius-md", tokens.md);
  root.style.setProperty("--radius-lg", tokens.lg);
  root.style.setProperty("--radius-xl", tokens.xl);
  root.style.setProperty("--radius-full", tokens.full);
}

function applyCompactMode(enabled: boolean) {
  const root = document.documentElement;
  if (enabled) {
    root.style.setProperty("--spacing-unit", "0.75");
    root.classList.add("compact-mode");
  } else {
    root.style.setProperty("--spacing-unit", "1");
    root.classList.remove("compact-mode");
  }
}

function applyHighContrast(enabled: boolean) {
  const root = document.documentElement;
  if (enabled) {
    root.classList.add("high-contrast");
  } else {
    root.classList.remove("high-contrast");
  }
}

function applyReducedMotion(enabled: boolean) {
  const root = document.documentElement;
  if (enabled) {
    root.style.setProperty("--transition-fast", "0ms");
    root.style.setProperty("--transition-base", "0ms");
    root.style.setProperty("--transition-slow", "0ms");
    root.style.setProperty("--transition-spring", "0ms");
    root.style.setProperty("--transition-smooth", "0ms");
    root.classList.add("reduced-motion");
  } else {
    root.style.setProperty("--transition-fast", "150ms cubic-bezier(0.4, 0, 0.2, 1)");
    root.style.setProperty("--transition-base", "200ms cubic-bezier(0.4, 0, 0.2, 1)");
    root.style.setProperty("--transition-slow", "300ms cubic-bezier(0.4, 0, 0.2, 1)");
    root.style.setProperty("--transition-spring", "400ms cubic-bezier(0.34, 1.56, 0.64, 1)");
    root.style.setProperty("--transition-smooth", "500ms cubic-bezier(0.22, 1, 0.36, 1)");
    root.classList.remove("reduced-motion");
  }
}

export function applyAllSettings(settings: AppearanceSettings) {
  applyTheme(settings.theme);
  applyAccentColor(settings.accentColor);
  applyFontSize(settings.fontSize);
  applyBorderRadius(settings.borderRadius);
  applyCompactMode(settings.compactMode);
  applyHighContrast(settings.highContrast);
  applyReducedMotion(settings.reducedMotion);
}

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppearanceSettings>(DEFAULT_APPEARANCE);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    async function init() {
      const stored = loadSettings();
      let merged = stored;
      
      try {
        const res = await fetch("/api/appearance", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          if (data.appearance) {
            merged = { ...DEFAULT_APPEARANCE, ...stored, ...data.appearance };
          }
        }
      } catch {
        // use stored/local settings if server fetch fails
      }
      
      setSettings(merged);
      applyAllSettings(merged);
      setIsInitialized(true);

      const handleSystemThemeChange = (_e: MediaQueryListEvent) => {
        if (merged.theme === "system") {
          applyTheme("system");
        }
      };

      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
      darkModeQuery.addEventListener("change", handleSystemThemeChange);
      return () => darkModeQuery.removeEventListener("change", handleSystemThemeChange);
    }
    
    init();
  }, []);

  const persist = useCallback((next: AppearanceSettings) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  }, []);

  const syncToServer = useCallback(async (next: AppearanceSettings) => {
    try {
      await fetch("/api/appearance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appearance: next }),
      });
    } catch {
      // ignore sync errors
    }
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    setSettings((prev) => {
      const next = { ...prev, theme };
      applyTheme(next.theme);
      persist(next);
      syncToServer(next);
      return next;
    });
  }, [persist, syncToServer]);

  const setAccentColor = useCallback((accentColor: AccentColor) => {
    setSettings((prev) => {
      const next = { ...prev, accentColor };
      applyAccentColor(next.accentColor);
      persist(next);
      syncToServer(next);
      return next;
    });
  }, [persist, syncToServer]);

  const setFontSize = useCallback((fontSize: FontSize) => {
    setSettings((prev) => {
      const next = { ...prev, fontSize };
      applyFontSize(next.fontSize);
      persist(next);
      syncToServer(next);
      return next;
    });
  }, [persist, syncToServer]);

  const setCompactMode = useCallback((compactMode: boolean) => {
    setSettings((prev) => {
      const next = { ...prev, compactMode };
      applyCompactMode(next.compactMode);
      persist(next);
      syncToServer(next);
      return next;
    });
  }, [persist, syncToServer]);

  const setHighContrast = useCallback((highContrast: boolean) => {
    setSettings((prev) => {
      const next = { ...prev, highContrast };
      applyHighContrast(next.highContrast);
      persist(next);
      syncToServer(next);
      return next;
    });
  }, [persist, syncToServer]);

  const setReducedMotion = useCallback((reducedMotion: boolean) => {
    setSettings((prev) => {
      const next = { ...prev, reducedMotion };
      applyReducedMotion(next.reducedMotion);
      persist(next);
      syncToServer(next);
      return next;
    });
  }, [persist, syncToServer]);

  const setBorderRadius = useCallback((borderRadius: BorderRadius) => {
    setSettings((prev) => {
      const next = { ...prev, borderRadius };
      applyBorderRadius(next.borderRadius);
      persist(next);
      syncToServer(next);
      return next;
    });
  }, [persist, syncToServer]);

  const setCardDensity = useCallback((cardDensity: CardDensity) => {
    setSettings((prev) => {
      const next = { ...prev, cardDensity };
      persist(next);
      syncToServer(next);
      return next;
    });
  }, [persist, syncToServer]);

  const resetToDefaults = useCallback(() => {
    setSettings(DEFAULT_APPEARANCE);
    applyAllSettings(DEFAULT_APPEARANCE);
    persist(DEFAULT_APPEARANCE);
  }, [persist]);

  const value = useMemo<AppearanceContextValue>(() => ({
    settings,
    setTheme,
    setAccentColor,
    setFontSize,
    setCompactMode,
    setHighContrast,
    setReducedMotion,
    setBorderRadius,
    setCardDensity,
    resetToDefaults,
  }), [settings, setTheme, setAccentColor, setFontSize, setCompactMode, setHighContrast, setReducedMotion, setBorderRadius, setCardDensity, resetToDefaults]);

  return (
    <AppearanceContext.Provider value={value}>
      {isInitialized ? children : null}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error("useAppearance must be used within an AppearanceProvider");
  }
  return context;
}
