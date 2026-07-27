"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MOCK_LEARNING_RESOURCES } from "@/data/mock-learning";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, PlayCircle, FileText, CheckSquare, Bookmark, CheckCircle2, Clock, Eye, Star } from "lucide-react";
import { cn } from "@/lib/utils";

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

    if (category !== "All") {
      result = result.filter(r => r.category === category);
    }

    if (difficulty !== "All") {
      result = result.filter(r => r.difficulty === difficulty);
    }

    if (type !== "All") {
      result = result.filter(r => r.type === type);
    }

    // Sort
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
    if (isBookmarked(id)) {
      removeBookmark(id);
    } else {
      addBookmark(id, "learning");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Learning Portal</h1>
        <p className="text-muted-foreground text-lg">
          Access high-quality courses, articles, and checklists tailored to your entrepreneurial journey.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input 
            placeholder="Search resources, topics, or tags..." 
            className="pl-9 h-11"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <Select value={category} onValueChange={(val) => setCategory(val || "All")}>
            <SelectTrigger className="w-[150px] h-11">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={(val) => setType(val || "All")}>
            <SelectTrigger className="w-[140px] h-11">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Formats</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="article">Articles</SelectItem>
              <SelectItem value="checklist">Checklists</SelectItem>
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
          <Select value={sort} onValueChange={(val) => setSort(val || "popular")}>
            <SelectTrigger className="w-[160px] h-11">
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

      <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
        <span>Showing {filteredResources.length} resources</span>
      </div>

      {filteredResources.length === 0 ? (
        <div className="text-center py-24 border rounded-xl bg-muted/20">
          <p className="text-muted-foreground">No resources found matching your search.</p>
          <Button variant="link" onClick={() => { setSearch(""); setCategory("All"); setDifficulty("All"); setType("All"); }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredResources.map((resource) => {
            const completed = isResourceCompleted(resource.id);
            const bookmarked = isBookmarked(resource.id);
            return (
              <Link href={`/resource/${resource.id}`} key={resource.id} className="group">
                <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 relative overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={resource.thumbnail} 
                      alt={resource.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-none shadow-sm flex items-center gap-1.5 hover:bg-background/90">
                        {resource.type === "video" && <PlayCircle className="size-3 text-red-500" />}
                        {resource.type === "article" && <FileText className="size-3 text-blue-500" />}
                        {resource.type === "checklist" && <CheckSquare className="size-3 text-emerald-500" />}
                        <span className="capitalize">{resource.type}</span>
                      </Badge>
                    </div>
                    {completed && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-emerald-500 text-white border-none shadow-sm hover:bg-emerald-600">
                          <CheckCircle2 className="size-3 mr-1" /> Completed
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-primary">{resource.category}</span>
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                        <Star className="size-3 fill-current" /> {resource.rating.toFixed(1)}
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2 leading-tight group-hover:text-primary transition-colors">{resource.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="p-4 pt-0 flex-1">
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {resource.duration}</span>
                      <span className="flex items-center gap-1"><Eye className="size-3" /> {resource.views.toLocaleString()}</span>
                      <span className={cn(
                        "px-1.5 py-0.5 rounded-sm font-medium",
                        resource.difficulty === "Beginner" ? "bg-green-100 text-green-700" :
                        resource.difficulty === "Intermediate" ? "bg-blue-100 text-blue-700" :
                        "bg-purple-100 text-purple-700"
                      )}>
                        {resource.difficulty}
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0 border-t flex justify-between items-center bg-muted/10">
                    <div className="text-xs text-muted-foreground">
                      {resource.tags.slice(0, 2).map(tag => `#${tag}`).join(" ")}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={cn("size-8 rounded-full", bookmarked && "text-primary")}
                      onClick={(e) => toggleBookmark(resource.id, e)}
                    >
                      <Bookmark className={cn("size-4", bookmarked && "fill-current")} />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
