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
import { Search, SlidersHorizontal, Sparkles, Clock, ArrowRight, Bookmark } from "lucide-react";

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
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">Discover Business Ideas</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Explore validated startup ideas, curated based on market demand, investment size, and your personal skills.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
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
              <SlidersHorizontal className="size-4 mr-2 text-muted-foreground" />
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
