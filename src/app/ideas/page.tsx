"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ALL_IDEAS, BusinessIdea } from "@/data/mock-ideas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search, SlidersHorizontal, Sparkles, Clock, ArrowRight, Bookmark,
  Zap, BarChart3, TrendingUp, Shield, Target, Lightbulb
} from "lucide-react";

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

    if (category !== "All") {
      result = result.filter(i => i.category === category);
    }

    if (difficulty !== "All") {
      result = result.filter(i => i.difficulty === difficulty);
    }

    // Sort
    result.sort((a, b) => {
      if (sort === "popularity") {
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      }
      if (sort === "match") {
        return b.aiMatchScore - a.aiMatchScore;
      }
      if (sort === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });

    return result;
  }, [search, category, difficulty, sort]);

  return (
    <div className="min-h-screen bg-background">
      {/* Public marketing hero */}
      <section className="relative border-b bg-gradient-to-br from-primary/6 via-background to-secondary/4 pt-20 pb-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 text-secondary-foreground text-sm font-medium mb-6">
              <Zap className="h-4 w-4 fill-secondary text-secondary" aria-hidden="true" />
              AI-Powered Startup Explorer
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-5 text-balance leading-tight">
              Find your next{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                business idea
              </span>{" "}
              — validated by AI
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Browse 200+ curated startup ideas with market validation, SWOT analysis, revenue models, and AI-generated launch checklists. Or describe your skills and let our AI generate 10 personalized ideas just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <button
                onClick={() => document.getElementById("idea-explorer")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Explore Ideas <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl border-2 border-border font-semibold hover:bg-muted/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" /> Generate My Idea
              </Link>
            </div>

            {/* Trending categories */}
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-xs text-muted-foreground self-center mr-1">Trending:</span>
              {TRENDING_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat === category ? "All" : cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    category === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Feature chips */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {IDEA_FEATURES.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="group flex flex-col items-center text-center gap-2 p-4 rounded-xl border bg-card/70 hover:bg-card hover:border-primary/40 hover:shadow-sm transition-all"
                title={desc}
              >
                <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                </div>
                <p className="text-xs font-semibold leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Existing explorer content */}
      <div id="idea-explorer" className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-3">Discover Business Ideas</h2>
          <p className="text-muted-foreground text-base max-w-2xl">
            Explore validated startup ideas curated by our AI — filtered by market demand, investment size, and your personal skills.
          </p>
        </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true" />
          <Input 
            placeholder="Search ideas (e.g., Bakery, Freelance)..." 
            className="pl-9 h-11"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={category} onValueChange={(val) => setCategory(val || "All")}>
            <SelectTrigger className="w-[160px] h-11">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={difficulty} onValueChange={(val) => setDifficulty(val || "All")}>
            <SelectTrigger className="w-[140px] h-11">
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
            <SelectTrigger className="w-[160px] h-11">
              <SlidersHorizontal className="size-4 mr-2 text-muted-foreground" aria-hidden="true" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Most Popular</SelectItem>
              <SelectItem value="match">Best Match (AI)</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredIdeas.length === 0 ? (
        <div className="text-center py-24 border rounded-xl bg-muted/20">
          <p className="text-muted-foreground">No business ideas found matching your criteria.</p>
          <Button variant="link" onClick={() => { setSearch(""); setCategory("All"); setDifficulty("All"); }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

function IdeaCard({ idea }: { idea: BusinessIdea }) {
  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-md transition-shadow group">
      <div className="h-48 bg-muted relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={idea.coverImage} 
          alt={idea.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-background/90 text-foreground hover:bg-background/90 backdrop-blur-sm border-none shadow-sm">
            {idea.category}
          </Badge>
        </div>
        <Button size="icon" variant="secondary" className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background shadow-sm">
          <Bookmark className="size-4" />
        </Button>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-1">
          <Badge variant={idea.difficulty === "Beginner" ? "default" : idea.difficulty === "Intermediate" ? "secondary" : "outline"} className="text-xs">
            {idea.difficulty}
          </Badge>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
            <Sparkles className="size-3" />
            {idea.aiMatchScore}% Match
          </div>
        </div>
        <CardTitle className="text-xl line-clamp-1">{idea.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {idea.shortDescription}
        </p>
        
        <div className="space-y-2 text-sm bg-muted/30 p-3 rounded-lg">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Investment:</span>
            <span className="font-medium">₹{(idea.investment.min/1000).toFixed(0)}k - {(idea.investment.max/1000).toFixed(0)}k</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Monthly Est:</span>
            <span className="font-medium text-emerald-600">₹{(idea.expectedMonthlyIncome.min/1000).toFixed(0)}k+</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time to Start:</span>
            <span className="font-medium flex items-center gap-1">
              <Clock className="size-3" /> {idea.timeToStart}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Link href={`/ideas/${idea.id}`} className="w-full">
          <Button className="w-full group-hover:bg-primary/90">
            View Details
            <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
