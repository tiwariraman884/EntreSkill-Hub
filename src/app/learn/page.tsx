"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { MOCK_LEARNING_RESOURCES } from "@/data/mock-learning";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Card, CardContent, CardFooter, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Progress, ProgressIndicator, ProgressTrack,
} from "@/components/ui/progress";
import {
   Search, PlayCircle, FileText, CheckSquare, Bookmark, CheckCircle2,
   Clock, Eye, Star, Zap, GraduationCap, Trophy, TrendingUp,
 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function LearnPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("popular");

  const { isBookmarked, addBookmark, removeBookmark, isResourceCompleted } = useGlobalState();

  const categories = ["All", ...Array.from(new Set(MOCK_LEARNING_RESOURCES.map(r => r.category)))];

  const filteredResources = useMemo(() => {
    let result = MOCK_LEARNING_RESOURCES;
    if (search) {
      result = result.filter(r =>
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase()) ||
        r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      );
    }
    if (category !== "All") result = result.filter(r => r.category === category);
    if (difficulty !== "All") result = result.filter(r => r.difficulty === difficulty);
    if (type !== "All") result = result.filter(r => r.type === type);

    result.sort((a, b) => {
      if (sort === "popular") return b.views - a.views;
      if (sort === "highest_rated") return b.rating - a.rating;
      if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });
    return result;
  }, [search, category, difficulty, type, sort]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (isBookmarked(id)) removeBookmark(id);
    else addBookmark(id, "learning");
  };

  const typeConfig: Record<string, { icon: typeof PlayCircle; color: string; bg: string; border: string; label: string }> = {
    video:    { icon: PlayCircle,  color: "text-white",             bg: "bg-linear-to-r from-[#DC2626] to-[#EF4444]",       border: "border-[#DC2626]", label: "Video" },
    article:  { icon: FileText,    color: "text-white",             bg: "bg-linear-to-r from-indigo to-indigo-light",       border: "border-indigo",    label: "Article" },
    checklist:{ icon: CheckSquare, color: "text-white",             bg: "bg-linear-to-r from-emerald-600 to-emerald-500",   border: "border-emerald-600", label: "Checklist" },
  };

  const difficultyClasses: Record<string, string> = {
    Beginner:     "bg-surface-accent text-indigo-light border border-indigo/20",
    Intermediate: "bg-surface-success text-verified border border-emerald-500/20",
    Advanced:     "bg-surface-danger text-terracotta-deep border border-danger/20",
  };

  const stats = [
    { icon: GraduationCap, label: "Total Courses",  value: "50+",  iconBg: "from-indigo to-indigo-light" },
    { icon: Trophy,        label: "Completion Rate", value: "94%", iconBg: "from-marigold to-marigold-light" },
    { icon: Star,          label: "Avg. Rating",     value: "4.8", iconBg: "from-marigold to-marigold-light" },
    { icon: TrendingUp,    label: "Active Learners", value: "12k+", iconBg: "from-indigo to-indigo-light" },
  ];

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setDifficulty("All");
    setType("All");
    setSort("popular");
  };

  const hasActiveFilters = search || category !== "All" || difficulty !== "All" || type !== "All" || sort !== "popular";

  return (
    <div className="min-h-screen bg-canvas">
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-linear-to-br from-indigo via-indigo-dark to-[#3730A3] py-16 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),_transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(245,158,11,0.18),_transparent_55%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-87.5 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06),_transparent)] pointer-events-none" />
        <div className="absolute top-10 right-10 w-20 h-20 rounded-full border border-white/10 animate-float opacity-40" />
        <div className="absolute bottom-10 left-10 w-12 h-12 rounded-full border border-marigold/20 animate-float-delayed opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold mb-6 backdrop-blur-sm">
                <Zap className="size-3.5 fill-marigold text-marigold" />
                Curated Learning Hub
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.875rem] font-bold font-heading text-white mb-5 leading-tight tracking-tight">
                Master the skills of a
                <br />
                <span className="bg-linear-to-r from-marigold-light via-marigold to-marigold-dark bg-clip-text text-transparent">
                  successful entrepreneur
                </span>
              </h1>

              <p className="text-white/60 leading-relaxed mb-8 max-w-lg text-sm sm:text-base">
                Expert-led courses, articles, and checklists built to keep you ahead in your entrepreneurial journey — at your own pace.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button
                  size="default"
                  variant="default"
                  onClick={() => document.getElementById("library")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Browse Library
                </Button>
                <Link
                  href="/assessment"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                    "border-white/25 text-white hover:bg-white/10 hover:border-white/50 hover:shadow-lg hover:shadow-white/5"
                  )}
                >
                  Take Assessment
                </Link>
              </div>
            </div>

            <div
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-5 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 cursor-default group"
                >
                  <div className={cn("w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center mb-3.5 shadow-lg", stat.iconBg)}>
                    <stat.icon className="size-5 text-white" />
                  </div>
                  <p className="text-[1.65rem] font-bold text-white leading-none mb-1 tracking-tight">{stat.value}</p>
                  <p className="text-[11px] text-white/50 font-semibold uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-canvas to-transparent pointer-events-none" />
      </section>

      {/* ─── Library ───────────────────────────────────────── */}
      <div id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink mb-1.5 tracking-tight">
              Learning Library
            </h2>
            <p className="text-sm text-thread">
              Showing{" "}
              <span className="font-bold text-ink">{filteredResources.length}</span>
              {" "}resource{filteredResources.length !== 1 ? "s" : ""}
            </p>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-indigo hover:text-indigo-light -mr-2 self-start sm:self-auto"
            >
              Clear all filters
            </Button>
          )}
        </div>

        {/* ─── Filters ─────────────────── */}
        <div
          className="flex flex-col xl:flex-row gap-3 mb-10"
        >
          <div className="relative flex-1 xl:max-w-sm group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-thread group-focus-within:text-indigo transition-colors duration-200" />
            <Input
              placeholder="Search resources, topics, tags…"
              className="pl-10 h-11 bg-surface-elevated rounded-xl border-border shadow-premium focus:border-indigo/40 focus:shadow-premium-hover focus:ring-2 focus:ring-indigo/10 transition-all duration-300 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Select value={category} onValueChange={(v) => setCategory(v || "All")}>
              <SelectTrigger className="h-11 rounded-xl bg-surface-elevated border-border shadow-premium w-37.5 transition-all duration-300 hover:border-indigo/30 text-sm">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={type} onValueChange={(v) => setType(v || "All")}>
              <SelectTrigger className="h-11 rounded-xl bg-surface-elevated border-border shadow-premium w-37.5 transition-all duration-300 hover:border-indigo/30 text-sm">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="article">Article</SelectItem>
                <SelectItem value="checklist">Checklist</SelectItem>
              </SelectContent>
            </Select>

            <Select value={difficulty} onValueChange={(v) => setDifficulty(v || "All")}>
              <SelectTrigger className="h-11 rounded-xl bg-surface-elevated border-border shadow-premium w-40 transition-all duration-300 hover:border-indigo/30 text-sm">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={(v) => setSort(v || "popular")}>
              <SelectTrigger className="h-11 rounded-xl bg-surface-elevated border-border shadow-premium w-42.5 transition-all duration-300 hover:border-indigo/30 text-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="highest_rated">Highest Rated</SelectItem>
                <SelectItem value="newest">Recently Added</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ─── Active filter pills ─────────────────── */}
        
          {hasActiveFilters && (
            <div
              className="flex flex-wrap gap-2 mb-8"
            >
              {search && (
                <Badge variant="secondary" className="gap-1.5 pr-1">
                  Search: &quot;{search}&quot;
                  <button onClick={() => setSearch("")} className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors">
                    <span className="sr-only">Remove search</span>
                    <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </Badge>
              )}
              {category !== "All" && (
                <Badge variant="secondary" className="gap-1.5 pr-1">
                  {category}
                  <button onClick={() => setCategory("All")} className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors">
                    <span className="sr-only">Remove category</span>
                    <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </Badge>
              )}
              {difficulty !== "All" && (
                <Badge variant="secondary" className="gap-1.5 pr-1">
                  {difficulty}
                  <button onClick={() => setDifficulty("All")} className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors">
                    <span className="sr-only">Remove difficulty</span>
                    <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </Badge>
              )}
              {type !== "All" && (
                <Badge variant="secondary" className="gap-1.5 pr-1 capitalize">
                  {type}
                  <button onClick={() => setType("All")} className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors">
                    <span className="sr-only">Remove type</span>
                    <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </Badge>
              )}
            </div>
          )}
        

        {/* ─── Grid / Empty ─────────────────── */}
        {filteredResources.length === 0 ? (
          <div
          >
            <EmptyState
              icon="search"
              title="No resources found"
              description="Try adjusting your search or filters to discover something new."
              actionLabel="Clear Filters"
              onAction={clearFilters}
              className="py-20"
            />
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filteredResources.map((resource) => {
              const completed   = isResourceCompleted(resource.id);
              const bookmarked  = isBookmarked(resource.id);
              const tc          = typeConfig[resource.type] ?? typeConfig.article;
              const TypeIcon    = tc.icon;

              const idSeed        = resource.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
              const simulatedProg = completed ? 100 : idSeed % 71;

              return (
                <div
                  key={resource.id}
                >
                  <Link
                    href={`/learn/${resource.id}`}
                    className="group/card block h-full"
                  >
                    <Card
                      size="default"
                      hoverable
                      glow={completed}
                      className={cn(
                        "flex flex-col h-full overflow-hidden p-0",
                        completed && "ring-1 ring-verified/30"
                      )}
                    >
                      {/* ── Thumbnail ── */}
                      <div className="relative h-44 overflow-hidden bg-muted">
                        <Image
                          src={resource.thumbnail}
                          alt={resource.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                        {/* Type badge — top-left */}
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-lg backdrop-blur-sm border",
                              tc.bg, tc.color, tc.border
                            )}
                          >
                            <TypeIcon className="size-3" />
                            {tc.label}
                          </span>
                        </div>

                        {/* Completed ribbon — top-right */}
                        {completed && (
                          <div className="absolute top-2.5 right-2.5 z-10">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-verified text-white text-[11px] font-bold shadow-md shadow-verified/30">
                              <CheckCircle2 className="size-3" />
                              Done
                            </span>
                          </div>
                        )}

                        {/* Video play overlay */}
                        {resource.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                            <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-xl backdrop-blur-sm group-hover/card:scale-110 transition-transform duration-300">
                              <PlayCircle className="size-6 text-indigo ml-0.5" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* ── Card body ── */}
                      <CardContent className="flex flex-col flex-1 gap-3 p-4">
                        {/* Category + Rating */}
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-indigo uppercase tracking-wider">{resource.category}</span>
                          <div className="flex items-center gap-1 text-[11px] font-bold text-marigold">
                            <Star className="size-3 fill-marigold" />
                            {resource.rating.toFixed(1)}
                          </div>
                        </div>

                        {/* Title */}
                        <CardTitle className="text-sm leading-snug line-clamp-2">
                          {resource.title}
                        </CardTitle>

                        {/* Meta row */}
                        <div className="flex items-center flex-wrap gap-2">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[10px] font-bold px-2 py-0.5 rounded-full border-0",
                              difficultyClasses[resource.difficulty] ?? "bg-muted text-muted-foreground"
                            )}
                          >
                            {resource.difficulty}
                          </Badge>
                          <span className="flex items-center gap-1 text-[11px] text-thread font-medium">
                            <Clock className="size-3" />
                            {resource.duration}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-thread font-medium">
                            <Eye className="size-3" />
                            {resource.views.toLocaleString()}
                          </span>
                        </div>

                        {/* Progress bar */}
                        {simulatedProg > 0 && simulatedProg < 100 && (
                          <div>
                            <div className="flex justify-between text-[10px] text-thread mb-1.5 font-medium">
                              <span>Progress</span>
                              <span className="font-bold text-indigo tabular-nums">{simulatedProg}%</span>
                            </div>
                            <Progress value={simulatedProg}>
                              <ProgressTrack className="h-1.5 bg-muted/80 rounded-full">
                                <ProgressIndicator className="shadow-sm shadow-indigo/30" />
                              </ProgressTrack>
                            </Progress>
                          </div>
                        )}
                      </CardContent>

                      {/* ── Card footer ── */}
                      <CardFooter className="flex items-center justify-between px-4 py-3 border-t border-border/40">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo group-hover/card:gap-2 transition-all duration-300">
                          {completed ? "Review" : simulatedProg > 0 ? "Continue" : "Start"}
                          <span className="group-hover/card:translate-x-0.5 transition-transform duration-300">→</span>
                        </span>
                        <button
                          onClick={(e) => toggleBookmark(resource.id, e)}
                          aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110",
                            bookmarked
                              ? "bg-linear-to-r from-indigo to-indigo-light text-white shadow-md shadow-indigo/25"
                              : "bg-muted text-thread hover:bg-indigo/10 hover:text-indigo"
                          )}
                        >
                          <Bookmark className={cn("size-3.5", bookmarked && "fill-current")} />
                        </button>
                      </CardFooter>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}