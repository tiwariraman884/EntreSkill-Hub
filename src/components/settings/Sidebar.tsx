"use client";

import { cn } from "@/lib/utils";

export type SettingsTab = "general" | "account" | "appearance" | "notifications" | "privacy" | "security" | "danger";

interface SidebarItem {
  value: SettingsTab;
  label: string;
  icon: React.ElementType;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

interface SidebarProps {
  sections: SidebarSection[];
  activeTab: SettingsTab;
  onChange: (tab: SettingsTab) => void;
}

export function Sidebar({ sections, activeTab, onChange }: SidebarProps) {
  return (
    <aside className="w-80 shrink-0 flex flex-col gap-6 text-left">
      <div className="rounded-3xl bg-white dark:bg-surface border border-border/80 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.15)] space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="space-y-2">
            <h3 className="px-3 text-[11px] font-bold tracking-[0.14em] uppercase text-muted-foreground/80">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isSelected = item.value === activeTab;
                const Icon = item.icon;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => onChange(item.value)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 relative group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isSelected
                        ? "text-white shadow-md shadow-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:scale-[1.02]"
                    )}
                  >
                    {/* Selected background */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-linear-to-r from-primary to-primary-light rounded-2xl shadow-sm -z-10" />
                    )}

                    {/* Selected state left accent bar */}
                    {isSelected && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 bg-white rounded-r-full" />
                    )}

                    <Icon className="size-4 shrink-0" />
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
