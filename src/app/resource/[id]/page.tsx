"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { MOCK_LEARNING_RESOURCES } from "@/data/mock-learning";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, CheckSquare, Bookmark, CheckCircle2, Clock, Eye, Star, ArrowRight, Share2, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ResourcePage({ params }: { params: { id: string } }) {
  const resource = MOCK_LEARNING_RESOURCES.find(r => r.id === params.id);
  const { isBookmarked, addBookmark, removeBookmark, isResourceCompleted, markResourceComplete } = useGlobalState();

  if (!resource) {
    notFound();
  }

  const completed = isResourceCompleted(resource.id);
  const bookmarked = isBookmarked(resource.id);

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(resource.id);
    } else {
      addBookmark(resource.id, "learning");
    }
  };

  const handleComplete = () => {
    markResourceComplete(resource.id);
  };

  return (
    <div className="bg-muted/10 min-h-screen pb-20">
      {/* ─── HEADER ─── */}
      <div className="bg-background border-b sticky top-16 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <Link href="/learn" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="size-4 mr-2" /> Back to Library
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={toggleBookmark} className={cn(bookmarked && "text-primary border-primary/50 bg-primary/5")}>
              <Bookmark className={cn("size-4 mr-2", bookmarked && "fill-current")} />
              {bookmarked ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Share2 className="size-4 mr-2" /> Share
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Player / Header Image */}
            <div className="rounded-2xl overflow-hidden bg-black border shadow-lg relative aspect-video flex items-center justify-center">
              {resource.type === "video" && resource.videoUrl ? (
                <iframe 
                  src={resource.videoUrl} 
                  title={resource.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                    {resource.type === "article" && <FileText className="size-16 mb-4 opacity-80" />}
                    {resource.type === "checklist" && <CheckSquare className="size-16 mb-4 opacity-80" />}
                    <h2 className="text-2xl font-bold font-heading">{resource.title}</h2>
                    <p className="opacity-80 mt-2 max-w-md">{resource.description}</p>
                  </div>
                </>
              )}
            </div>

            {/* Title & Meta */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-2.5 py-0.5 text-xs rounded-full">
                  {resource.category}
                </Badge>
                <Badge variant={resource.difficulty === "Beginner" ? "default" : resource.difficulty === "Intermediate" ? "secondary" : "outline"} className="px-2.5 py-0.5 text-xs rounded-full">
                  {resource.difficulty}
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-2">
                  <Clock className="size-3.5" /> {resource.duration}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-2">
                  <Eye className="size-3.5" /> {resource.views.toLocaleString()} views
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
                {resource.title}
              </h1>
              
              <div className="flex items-center justify-between py-4 border-y">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {/* Fake avatars for "Learners" */}
                    {[1, 2, 3].map(i => (
                      <div key={i} className="size-8 rounded-full bg-muted border-2 border-background flex items-center justify-center overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                      </div>
                    ))}
                    <div className="size-8 rounded-full bg-secondary text-secondary-foreground border-2 border-background flex items-center justify-center text-[10px] font-bold">
                      +2k
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Star className="size-4 text-amber-500 fill-current" /> {resource.rating.toFixed(1)} <span className="text-muted-foreground font-normal">(420 ratings)</span>
                  </div>
                </div>

                {!completed ? (
                  <Button onClick={handleComplete} className="bg-emerald-600 hover:bg-emerald-700">
                    <CheckCircle2 className="size-4 mr-2" /> Mark Complete
                  </Button>
                ) : (
                  <div className="flex items-center text-emerald-600 font-semibold bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">
                    <Award className="size-5 mr-2" /> Completed (+50 XP)
                  </div>
                )}
              </div>
            </div>

            {/* Content Body */}
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                {resource.content || resource.description}
              </p>

              <h3>Learning Objectives</h3>
              <ul className="space-y-2 mb-8">
                {resource.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">
                      {i + 1}
                    </div>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
              
              {resource.type === "article" && (
                <>
                  <h3>1. Introduction</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <h3>2. Core Frameworks</h3>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </>
              )}
            </div>
            
            {/* Action Footer */}
            {!completed && (
              <div className="mt-12 p-6 bg-muted/30 border rounded-2xl flex flex-col items-center text-center">
                <h3 className="font-bold text-lg mb-2">Finished this lesson?</h3>
                <p className="text-muted-foreground text-sm mb-4">Mark it as complete to earn XP and update your dashboard progress.</p>
                <Button size="lg" onClick={handleComplete} className="w-full sm:w-auto">
                  Mark Complete <ArrowRight className="size-4 ml-2" />
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-background border rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold font-heading mb-4">Table of Contents</h3>
              <div className="space-y-3 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-muted">
                {["Introduction", "Core Concepts", "Real-world Examples", "Conclusion"].map((chapter, i) => (
                  <div key={i} className="flex items-center gap-3 relative z-10">
                    <div className={cn("size-6 rounded-full border-2 bg-background flex items-center justify-center text-xs font-bold", i === 0 ? "border-primary text-primary" : "border-muted-foreground text-muted-foreground")}>
                      {i + 1}
                    </div>
                    <span className={cn("text-sm", i === 0 ? "font-semibold text-foreground" : "text-muted-foreground")}>{chapter}</span>
                  </div>
                ))}
              </div>
            </div>

            {resource.mentorId && (
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6 relative overflow-hidden">
                <h3 className="font-bold font-heading mb-2 text-primary">Need Clarification?</h3>
                <p className="text-sm text-foreground/80 mb-4">
                  Discuss this topic directly with a mentor who specializes in {resource.category}.
                </p>
                <Link href={`/mentors/${resource.mentorId}`} className="w-full">
                  <Button variant="outline" className="w-full bg-background/50 hover:bg-background">
                    Book Mentor Session
                  </Button>
                </Link>
              </div>
            )}

            <div className="bg-background border rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold font-heading mb-4">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="font-normal capitalize cursor-pointer hover:bg-secondary/80">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
