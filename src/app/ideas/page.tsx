"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_IDEAS, BusinessIdea } from "@/data/mock-ideas";
import {
  Search, SlidersHorizontal, Sparkles, Clock, ArrowRight, Bookmark,
  BarChart3, TrendingUp, Shield, Target, Lightbulb,
  DollarSign, Timer, Flame, Star,
} from "lucide-react";
import { useGlobalState } from "@/context/GlobalStateContext";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "@/components/ui/empty-state";

const IDEA_FEATURES = [
  { icon: Sparkles, label: "AI Idea Generator", desc: "Describe your skills and get 10 tailored business ideas in seconds" },
  { icon: BarChart3, label: "Market Validation", desc: "See TAM, competition density, and market readiness scores" },
  { icon: TrendingUp, label: "Revenue Models", desc: "Explore pricing strategies and realistic income projections" },
  { icon: Shield, label: "SWOT Analysis", desc: "AI-generated strengths, weaknesses, opportunities, and threats" },
  { icon: Target, label: "Idea Score", desc: "A composite 0–100 AI score across viability, timing, and competition" },
  { icon: Lightbulb, label: "Launch Checklist", desc: "Step-by-step action plan to go from idea to first customer" },
];

const TRENDING_CATEGORIES = [
  "AI Tools", "SaaS", "EdTech", "HealthTech", "Freelance Services",
  "E-commerce", "Content Creator", "FinTech", "Sustainability", "Local Services"
];

const difficultyConfig: Record<string, { badgeClass: string; dotClass: string }> = {
  Beginner: { badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200", dotClass: "bg-emerald-500" },
  Intermediate: { badgeClass: "bg-blue-50 text-blue-700 border-blue-200", dotClass: "bg-blue-500" },
  Advanced: { badgeClass: "bg-purple-50 text-purple-700 border-purple-200", dotClass: "bg-purple-500" },
};

const matchColorClass = (score: number) => {
  if (score >= 90) return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (score >= 75) return "text-indigo bg-indigo/10 border-indigo/20";
  return "text-amber-700 bg-amber-50 border-amber-200";
};

export default function IdeasPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [sort, setSort] = useState("popularity");

  const categories = ["All", ...Array.from(new Set(ALL_IDEAS.map(i => i.category)))];

  const filteredIdeas = useMemo(() => {
    let result = ALL_IDEAS;

    if (search) {
      result = result.filter(i =>
        i.title.toLowerCase().includes(search.toLowerCase()) ||
        i.shortDescription.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== "All") result = result.filter(i => i.category === category);
    if (difficulty !== "All") result = result.filter(i => i.difficulty === difficulty);

    result.sort((a, b) => {
      if (sort === "popularity") return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      if (sort === "match") return b.aiMatchScore - a.aiMatchScore;
      if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });

    return result;
  }, [search, category, difficulty, sort]);

  return (
    <div className="min-h-screen bg-canvas">
      {/* ─── Hero ───────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative border-b border-border/50 bg-gradient-to-br from-indigo/8 via-background to-marigold/5 pt-20 pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-indigo/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-marigold/8 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-semibold">
              <Sparkles className="size-4" aria-hidden="true" />
              AI-Powered Startup Explorer
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight mb-5 text-balance leading-tight text-ink">
              Find your next{" "}
              <span className="bg-gradient-to-r from-indigo to-indigo-light bg-clip-text text-transparent">
                business idea
              </span>
              {" "}— validated by AI
            </h1>

            <p className="text-lg text-thread leading-relaxed mb-8 max-w-2xl mx-auto">
              Browse 200+ curated startup ideas with market validation, SWOT analysis, revenue models, and AI-generated launch checklists.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Button
                variant="default"
                size="lg"
                onClick={() => document.getElementById("idea-explorer")?.scrollIntoView({ behavior: "smooth" })}
                className="gap-2"
              >
                Explore Ideas <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Link
                href="/register"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
              >
                <Sparkles className="size-4" aria-hidden="true" /> Generate My Idea
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-xs text-thread font-medium self-center mr-1">Trending:</span>
              {TRENDING_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat === category ? "All" : cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/40",
                    category === cat
                      ? "bg-indigo text-white border-indigo shadow-md shadow-indigo/20"
                      : "bg-white/80 text-thread border-border/60 hover:border-indigo/40 hover:text-indigo hover:bg-indigo/5"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {IDEA_FEATURES.map(({ icon: Icon, label, desc }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                title={desc}
              >
                <div className="group flex flex-col items-center text-center gap-2.5 p-4 rounded-2xl border border-border/40 bg-white/80 hover:bg-white hover:border-indigo/30 hover:shadow-premium transition-all duration-300 cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-indigo/8 flex items-center justify-center group-hover:bg-indigo/15 group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <Icon className="h-5 w-5 text-indigo" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-semibold leading-tight text-foreground">{label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── Explorer ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        id="idea-explorer"
        className="max-w-[1280px] mx-auto px-6 py-12 md:py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-ink mb-2">Discover Business Ideas</h2>
          <p className="text-thread text-base max-w-2xl">
            Explore validated startup ideas curated by our AI — filtered by market demand, investment size, and your personal skills.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-thread" aria-hidden="true" />
            <Input
              placeholder="Search ideas (e.g., Bakery, Freelance)..."
              className="pl-10 h-11 bg-surface-elevated border-border/60 rounded-2xl focus:border-indigo/40 focus:shadow-glow transition-all duration-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <Select value={category} onValueChange={(val) => setCategory(val || "All")}>
              <SelectTrigger className="w-[160px] h-11 rounded-2xl bg-surface-elevated border-border/60">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={difficulty} onValueChange={(val) => setDifficulty(val || "All")}>
              <SelectTrigger className="w-[150px] h-11 rounded-2xl bg-surface-elevated border-border/60">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(val) => setSort(val || "popularity")}>
              <SelectTrigger className="w-[170px] h-11 rounded-2xl bg-surface-elevated border-border/60">
                <SlidersHorizontal className="size-4 mr-2 text-thread" aria-hidden="true" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="match">Best Match (AI)</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Showing count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center justify-between mb-6"
        >
          <p className="text-sm text-thread font-medium">
            Showing{" "}
            <span className="text-foreground font-bold">{filteredIdeas.length}</span>{" "}
            {filteredIdeas.length === 1 ? "idea" : "ideas"}
          </p>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {filteredIdeas.length === 0 ? (
            <motion.div key="empty" layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <EmptyState
                icon="search"
                title="No ideas found"
                description="Try adjusting your search or filters to discover more business ideas."
                actionLabel="Clear Filters"
                onAction={() => { setSearch(""); setCategory("All"); setDifficulty("All"); }}
                className="py-20"
              />
            </motion.div>
          ) : (
            <motion.div layout key="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIdeas.map((idea, _index) => (
                <motion.div
                  key={idea.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    layout: { type: "spring", stiffness: 200, damping: 20 },
                    opacity: { duration: 0.35 },
                    y: { duration: 0.35 },
                    scale: { duration: 0.3 },
                  }}
                >
                  <IdeaCard idea={idea} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function IdeaCard({ idea }: { idea: BusinessIdea }) {
  const { isBookmarked, addBookmark, removeBookmark } = useGlobalState();
  const bookmarked = isBookmarked(idea.id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    if (bookmarked) removeBookmark(idea.id);
    else addBookmark(idea.id, "idea");
  };

  const diff = difficultyConfig[idea.difficulty] ?? difficultyConfig.Beginner;
  const matchColor = matchColorClass(idea.aiMatchScore);
  const marketDemandPct = Math.min(100, Math.round(idea.aiMatchScore * 0.9 + 10));

  return (
    <Card
      hoverable
      className="group flex flex-col rounded-2xl bg-surface-elevated border-border/40 shadow-premium hover:shadow-premium-hover hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
    >
      {/* Hero Image */}
      <div className="relative h-52 overflow-hidden bg-muted">
        <Image
          src={idea.coverImage}
          alt={idea.title}
          width={800}
          height={400}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <Badge variant="outline" className="bg-white/95 backdrop-blur-sm text-foreground border-white/60 shadow-sm">
            {idea.category}
          </Badge>
          {idea.popular && (
            <Badge className="bg-gradient-to-r from-orange-400 to-amber-500 text-white border-0 shadow-md">
              <Flame className="size-3" aria-hidden="true" /> Trending
            </Badge>
          )}
        </div>

        {/* Bookmark button */}
        <Button
          variant="ghost"
          size="icon-sm"
          className={cn(
            "absolute top-3 right-3 backdrop-blur-sm shadow-md transition-all duration-200 hover:scale-110 z-10",
            bookmarked
              ? "!bg-indigo !text-white shadow-indigo/30 hover:!bg-indigo hover:!text-white"
              : "!bg-white/90 !text-thread hover:!bg-white hover:!text-indigo"
          )}
          onClick={handleBookmark}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark idea"}
        >
          <Bookmark className={cn("size-4 transition-transform", bookmarked && "fill-current scale-110")} />
        </Button>

        {/* AI Match score */}
        <div className="absolute bottom-3 right-3">
          <span className={cn(
            "inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm",
            matchColor
          )}>
            <Star className="size-3 fill-current" aria-hidden="true" />
            {idea.aiMatchScore}% Match
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex-1 flex flex-col p-5 gap-3">
        {/* Difficulty + time */}
        <div className="flex items-center justify-between">
          <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border", diff.badgeClass)}>
            <span className={cn("w-1.5 h-1.5 rounded-full", diff.dotClass)} aria-hidden="true" />
            {idea.difficulty}
          </span>
          <span className="flex items-center gap-1 text-xs text-thread font-medium">
            <Timer className="size-3.5" aria-hidden="true" /> {idea.timeToStart}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold font-heading text-ink line-clamp-1 group-hover:text-indigo transition-colors duration-200">
          {idea.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-thread line-clamp-2 leading-relaxed">{idea.shortDescription}</p>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center p-2 rounded-xl bg-muted/40 border border-border/30">
            <DollarSign className="size-3.5 text-thread mb-1" aria-hidden="true" />
            <p className="text-[10px] text-thread font-medium uppercase tracking-wide">Investment</p>
            <p className="text-xs font-bold text-foreground mt-0.5">₹{(idea.investment.min / 1000).toFixed(0)}k+</p>
          </div>
          <div className="flex flex-col items-center p-2 rounded-xl bg-emerald-50/80 border border-emerald-100">
            <TrendingUp className="size-3.5 text-emerald-600 mb-1" aria-hidden="true" />
            <p className="text-[10px] text-emerald-700 font-medium uppercase tracking-wide">Monthly</p>
            <p className="text-xs font-bold text-emerald-700 mt-0.5">₹{(idea.expectedMonthlyIncome.min / 1000).toFixed(0)}k+</p>
          </div>
          <div className="flex flex-col items-center p-2 rounded-xl bg-indigo/5 border border-indigo/10">
            <Clock className="size-3.5 text-indigo mb-1" aria-hidden="true" />
            <p className="text-[10px] text-indigo font-medium uppercase tracking-wide">Launch</p>
            <p className="text-xs font-bold text-indigo mt-0.5 text-center leading-tight">{idea.timeToStart}</p>
          </div>
        </div>

        {/* Market demand bar */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] text-thread font-medium">Market Demand</span>
            <span className="text-[11px] font-bold text-foreground">{marketDemandPct}%</span>
          </div>
          <div className="h-1.5 bg-muted/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo to-indigo-light rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${marketDemandPct}%` }}
            />
          </div>
        </div>

        {/* Footer CTA */}
        <Link href={`/ideas/${idea.id}`} className="mt-auto">
          <Button variant="default" size="sm" className="w-full gap-2 mt-1">
            View Details <ArrowRight className="size-3.5" aria-hidden="true" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
