"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Search, X, BookOpen, Lightbulb, Users, Map, Command,
  BookMarked, LayoutDashboard, FileText,
  Settings, Bell, User
} from "lucide-react";
import { MOCK_LEARNING_RESOURCES } from "@/data/mock-learning";
import { ALL_IDEAS } from "@/data/mock-ideas";
import { MOCK_ROADMAPS } from "@/data/mock-roadmaps";

type SearchResultType = "course" | "idea" | "mentor" | "roadmap" | "command";

type SearchResultItem = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  type: SearchResultType;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
};

type CommandItem = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  type: "command";
  icon: React.ComponentType<{ className?: string }>;
  href: string;
};

const MOCK_MENTORS = [
  {
    mentorId: "m1",
    name: "Aarav Mehta",
    designation: "Founder",
    company: "ScaleForge AI",
    location: "Bengaluru",
    expertise: ["Startup Validation", "AI & ML", "Fundraising"],
    rating: 4.9,
  },
  {
    mentorId: "m2",
    name: "Priya Sharma",
    designation: "Product Director",
    company: "Razorpay",
    location: "Bengaluru",
    expertise: ["Product Development", "FinTech", "MVP"],
    rating: 4.8,
  },
  {
    mentorId: "m3",
    name: "Rahul Verma",
    designation: "Marketing Head",
    company: "Zomato",
    location: "Delhi",
    expertise: ["Digital Marketing", "Growth", "Branding"],
    rating: 4.7,
  },
];

const COMMANDS: CommandItem[] = [
  { id: "cmd-dashboard", title: "Go to Dashboard", subtitle: "Navigation", category: "Commands", type: "command", icon: LayoutDashboard, href: "/dashboard" },
  { id: "cmd-assessment", title: "Take Assessment", subtitle: "Navigation", category: "Commands", type: "command", icon: FileText, href: "/assessment" },
  { id: "cmd-bookmarks", title: "View Bookmarks", subtitle: "Navigation", category: "Commands", type: "command", icon: BookMarked, href: "/bookmarks" },
  { id: "cmd-settings", title: "Settings", subtitle: "Navigation", category: "Commands", type: "command", icon: Settings, href: "/settings" },
  { id: "cmd-notifications", title: "Notifications", subtitle: "Navigation", category: "Commands", type: "command", icon: Bell, href: "/notifications" },
  { id: "cmd-profile", title: "Profile", subtitle: "Navigation", category: "Commands", type: "command", icon: User, href: "/profile" },
];

type SectionType = "courses" | "ideas" | "mentors" | "roadmaps" | "commands";

interface Section {
  key: SectionType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: SearchResultItem[];
}

const RECENT_SEARCHES = [
  "Marketing Strategy",
  "Cloud Kitchen",
  "Startup Funding",
  "Product Roadmap",
];

function searchItem(item: SearchResultItem | CommandItem, query: string): boolean {
  const q = query.toLowerCase();
  return (
    item.title.toLowerCase().includes(q) ||
    item.subtitle.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  );
}

export default function UniversalSearch({ open: controlledOpen, onOpenChange }: { open?: boolean; onOpenChange?: (open: boolean) => void } = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  
  const setOpen = useCallback((next: boolean) => {
    if (isControlled && onOpenChange) {
      onOpenChange(next);
    } else {
      setInternalOpen(next);
    }
    if (next) {
      setQuery("");
      setSelectedIndex(0);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
      setTimeout(() => {
        if (!isControlled) setInternalOpen(false);
        setQuery("");
        setSelectedIndex(0);
      }, 300);
    }
  }, [isControlled, onOpenChange]);

  const openSearch = useCallback(() => setOpen(true), [setOpen]);
  const closeSearch = useCallback(() => setOpen(false), [setOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
      const isCmdK = e.metaKey && e.key.toLowerCase() === "k";

      if (isCtrlK || isCmdK) {
        e.preventDefault();
        if (!isOpen) {
          openSearch();
        } else {
          closeSearch();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, openSearch, closeSearch]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredSections = useMemo<Section[]>(() => {
    if (!query.trim()) {
      return [
        {
          key: "courses",
          label: "Courses",
          icon: BookOpen,
          items: MOCK_LEARNING_RESOURCES.slice(0, 5).map((r) => ({
            id: r.id,
            title: r.title,
            subtitle: `${r.difficulty} · ${r.duration}`,
            category: r.category,
            type: "course" as SearchResultType,
            icon: BookOpen,
            href: `/resource/${r.id}`,
          })),
        },
        {
          key: "ideas",
          label: "Ideas",
          icon: Lightbulb,
          items: ALL_IDEAS.slice(0, 5).map((idea) => ({
            id: idea.id,
            title: idea.title,
            subtitle: `${idea.difficulty} · ${idea.category}`,
            category: idea.category,
            type: "idea" as SearchResultType,
            icon: Lightbulb,
            href: `/ideas/${idea.id}`,
          })),
        },
        {
          key: "mentors",
          label: "Mentors",
          icon: Users,
          items: MOCK_MENTORS.map((m) => ({
            id: m.mentorId,
            title: m.name,
            subtitle: `${m.designation} at ${m.company}`,
            category: m.location,
            type: "mentor" as SearchResultType,
            icon: Users,
            href: `/mentors`,
          })),
        },
        {
          key: "roadmaps",
          label: "Roadmaps",
          icon: Map,
          items: MOCK_ROADMAPS.slice(0, 5).map((r) => ({
            id: r.id,
            title: r.title,
            subtitle: `${r.difficulty} · ${r.estimatedDuration}`,
            category: "Roadmap",
            type: "roadmap" as SearchResultType,
            icon: Map,
            href: `/roadmaps`,
          })),
        },
        {
          key: "commands",
          label: "Quick Commands",
          icon: Command,
          items: COMMANDS.map((c) => ({
            id: c.id,
            title: c.title,
            subtitle: c.subtitle,
            category: c.category,
            type: "command" as SearchResultType,
            icon: c.icon,
            href: c.href,
          })),
        },
      ];
    }

    const q = query.toLowerCase();
    const sections: Section[] = [];
    const sectionsConfig: { key: SectionType; label: string; icon: React.ComponentType<{ className?: string }>; items: SearchResultItem[] | CommandItem[] }[] = [
      {
        key: "courses",
        label: "Courses",
        icon: BookOpen,
        items: MOCK_LEARNING_RESOURCES.map((r) => ({
          id: r.id,
          title: r.title,
          subtitle: `${r.difficulty} · ${r.duration}`,
          category: r.category,
          type: "course" as SearchResultType,
          icon: BookOpen,
          href: `/resource/${r.id}`,
        })),
      },
      {
        key: "ideas",
        label: "Ideas",
        icon: Lightbulb,
        items: ALL_IDEAS.map((idea) => ({
          id: idea.id,
          title: idea.title,
          subtitle: `${idea.difficulty} · ${idea.category}`,
          category: idea.category,
          type: "idea" as SearchResultType,
          icon: Lightbulb,
          href: `/ideas/${idea.id}`,
        })),
      },
      {
        key: "mentors",
        label: "Mentors",
        icon: Users,
        items: MOCK_MENTORS.map((m) => ({
          id: m.mentorId,
          title: m.name,
          subtitle: `${m.designation} at ${m.company}`,
          category: m.location,
          type: "mentor" as SearchResultType,
          icon: Users,
          href: `/mentors`,
        })),
      },
      {
        key: "roadmaps",
        label: "Roadmaps",
        icon: Map,
        items: MOCK_ROADMAPS.map((r) => ({
          id: r.id,
          title: r.title,
          subtitle: `${r.difficulty} · ${r.estimatedDuration}`,
          category: "Roadmap",
          type: "roadmap" as SearchResultType,
          icon: Map,
          href: `/roadmaps`,
        })),
      },
      {
        key: "commands",
        label: "Quick Commands",
        icon: Command,
        items: COMMANDS.map((c) => ({
          id: c.id,
          title: c.title,
          subtitle: c.subtitle,
          category: c.category,
          type: "command" as SearchResultType,
          icon: c.icon,
          href: c.href,
        })),
      },
    ];

    for (const section of sectionsConfig) {
      const filtered = section.items.filter((item) => searchItem(item, q));
      if (filtered.length > 0) {
        sections.push({
          key: section.key,
          label: section.label,
          icon: section.icon,
          items: filtered as SearchResultItem[],
        });
      }
    }

    return sections;
  }, [query]);

  const flatItems = useMemo(() => {
    return filteredSections.flatMap((section) => section.items);
  }, [filteredSections]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [flatItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, flatItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = flatItems[selectedIndex];
        if (item) {
          if (item.href) {
            window.location.href = item.href;
          }
          closeSearch();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, flatItems, selectedIndex, closeSearch]);

  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      selectedEl?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const handleRecentClick = (recent: string) => {
    setQuery(recent);
    inputRef.current?.focus();
  };

  const clearQuery = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const _sectionKeyToType: Record<SectionType, string> = {
    courses: "course",
    ideas: "idea",
    mentors: "mentor",
    roadmaps: "roadmap",
    commands: "command",
  };

  const showRecent = isOpen && isVisible && !query.trim();
  const showResults = isOpen && isVisible && query.trim().length > 0;
  const showEmpty = showResults && filteredSections.length === 0;

  const _selectedItem = flatItems[selectedIndex];

  return (
    isOpen && (
      <div
        ref={overlayRef}
        className={cn(
          "fixed inset-0 z-[1300] flex items-start justify-center pt-24",
          "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeSearch}
        />

        <div
          role="dialog"
          aria-modal="true"
          className={cn(
            "relative w-full max-w-2xl mx-4",
            "bg-surface-elevated rounded-3xl shadow-2xl border border-border/60",
            "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "transform",
            isVisible ? "scale-100 opacity-100" : "scale-[0.95] opacity-0"
          )}
        >
          {/* Search Input Area */}
          <div className="flex items-center gap-3 px-5 pt-5 pb-2">
            <div className="relative flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search everything..."
              className={cn(
                "pl-11 pr-10 h-14 text-base border-none shadow-none",
                "bg-transparent focus-visible:ring-0 font-sans",
                "placeholder:text-muted-foreground/60"
              )}
            />
            {query && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={clearQuery}
                className={cn(
                  "flex-shrink-0",
                  "text-muted-foreground hover:text-foreground",
                  "transition-all duration-200"
                )}
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            <div className="flex-shrink-0 flex gap-1">
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground font-sans">
                <Command className="w-3 h-3" />
                <span>K</span>
              </kbd>
            </div>
          </div>

          <div className="mx-5 border-b border-border/50" />

          {/* Content Area */}
          <div ref={listRef} className="max-h-[60vh] overflow-y-auto px-3 py-3">
            {showRecent && (
              <div className="space-y-3">
                <div className="px-2 pt-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sans">
                    Recent Searches
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 px-2">
                  {RECENT_SEARCHES.map((recent) => (
                    <button
                      key={recent}
                      onClick={() => handleRecentClick(recent)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg border border-border/60",
                        "bg-white/60 px-3 py-1.5 text-sm text-foreground",
                        "hover:bg-surface-accent hover:border-indigo/30 hover:text-indigo",
                        "transition-all duration-300",
                        "font-sans"
                      )}
                    >
                      <Search className="w-3.5 h-3.5 text-muted-foreground" />
                      {recent}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showResults && (
              <div className="space-y-5">
                {filteredSections.map((section) => {
                  const SectionIcon = section.icon;
                  return (
                    <div key={section.key}>
                      <div className="flex items-center gap-2 px-2 mb-2">
                        <SectionIcon className="w-4 h-4 text-muted-foreground" />
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sans">
                          {section.label}
                        </h3>
                        <Badge variant="outline" className="h-5 px-2 text-[10px] font-bold ml-auto">
                          {section.items.length}
                        </Badge>
                      </div>
                      <div className="space-y-0.5">
                        {section.items.map((item) => {
                          const ItemIcon = item.icon;
                          const flatIndex = flatItems.findIndex((f) => f.id === item.id);
                          const isSelected = flatIndex === selectedIndex && flatIndex >= 0;

                          return (
                            <button
                              key={item.id}
                              data-index={flatIndex}
                              onClick={() => {
                                if (item.href) {
                                  window.location.href = item.href;
                                }
                                closeSearch();
                              }}
                              onMouseEnter={() => setSelectedIndex(flatIndex)}
                              className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left",
                                "transition-all duration-200 ease-out",
                                "group cursor-pointer",
                                isSelected
                                  ? "bg-surface-accent shadow-[0_0_0_1px_rgba(43,58,103,0.12)]"
                                  : "hover:bg-surface-accent/60"
                              )}
                            >
                              <div
                                className={cn(
                                  "flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center",
                                  "transition-all duration-300",
                                  isSelected
                                    ? "bg-gradient-to-br from-indigo to-indigo-light text-white shadow-md shadow-indigo/25"
                                    : "bg-muted/80 text-muted-foreground group-hover:bg-indigo/10 group-hover:text-indigo"
                                )}
                              >
                                <ItemIcon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={cn(
                                    "text-sm font-medium truncate font-sans",
                                    isSelected ? "text-indigo" : "text-foreground"
                                  )}
                                >
                                  {item.title}
                                </p>
                                <p className="text-xs text-muted-foreground truncate font-sans">
                                  {item.subtitle}
                                </p>
                              </div>
                              <Badge
                                variant={isSelected ? "default" : "outline"}
                                className={cn(
                                  "text-[10px] font-bold transition-all duration-200",
                                  isSelected ? "bg-gradient-to-r from-indigo to-indigo-light text-white" : "text-muted-foreground border-border/60"
                                )}
                              >
                                Jump to
                              </Badge>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {showEmpty && (
              <div className="px-1">
                <EmptyState
                  icon="search"
                  title="No results found"
                  description="Try adjusting your search or browse categories to find what you&apos;re looking for."
                  actionLabel="Clear search"
                  onAction={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="py-8"
                />
              </div>
            )}
          </div>

          <div className="mx-5 border-t border-border/50" />

          {/* Footer Commands */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-xs text-muted-foreground font-sans">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-border bg-muted px-1.5 text-[10px] font-bold">
                  ⌘
                </kbd>
                <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-border bg-muted px-1.5 text-[10px] font-bold">
                  K
                </kbd>
                <span className="text-muted-foreground">to toggle</span>
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-border bg-muted px-1.5 text-[10px] font-bold">
                  ↑
                </kbd>
                <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-border bg-muted px-1.5 text-[10px] font-bold">
                  ↓
                </kbd>
                <span className="text-muted-foreground">to navigate</span>
              </span>
              <span className="hidden md:flex items-center gap-1.5">
                <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-border bg-muted px-1.5 text-[10px] font-bold">
                  ↵
                </kbd>
                <span className="text-muted-foreground">to select</span>
              </span>
            </div>
            <span className="hidden sm:flex items-center gap-1.5">
              <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-border bg-muted px-1.5 text-[10px] font-bold">
                Esc
              </kbd>
              <span className="text-muted-foreground">to close</span>
            </span>
          </div>
        </div>
      </div>
    )
  );
}
