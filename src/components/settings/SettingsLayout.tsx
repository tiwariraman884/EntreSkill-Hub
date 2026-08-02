"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";

interface SettingsLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  activeTabLabel: string;
}

export function SettingsLayout({
  sidebar,
  children,
  activeTabLabel,
}: SettingsLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-[#0f172a] transition-colors duration-300">
      <div className="max-w-360 mx-auto p-6 md:p-10 flex flex-col gap-8">
        
        {/* Mobile Header indicator and Toggle */}
        <div className="lg:hidden flex items-center justify-between border-b pb-4">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Category: <span className="text-foreground">{activeTabLabel}</span>
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-[#1e293b] border border-border shadow-sm text-sm font-medium hover:bg-muted"
          >
            <Menu className="size-4" />
            Menu
          </button>
        </div>

        {/* Desktop Layout grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Sidebar wrapper */}
          <div className="hidden lg:block w-[320px] shrink-0">
            {sidebar}
          </div>

          {/* Main Content wrapper */}
          <div className="flex-1 w-full min-w-0">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Drawer — CSS only */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/40 z-50 lg:hidden animate-in fade-in duration-200"
          />
          {/* Sidebar drawer panel */}
          <div
            className="fixed inset-y-0 left-0 w-80 bg-white dark:bg-[#0f172a] z-50 p-6 shadow-2xl overflow-y-auto lg:hidden animate-in slide-in-from-left duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-base font-bold text-foreground font-heading">Settings Navigation</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl hover:bg-muted"
                aria-label="Close navigation"
              >
                <X className="size-5" />
              </button>
            </div>
            <div onClick={() => setMobileOpen(false)}>
              {sidebar}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
