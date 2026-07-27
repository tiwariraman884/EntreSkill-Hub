"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, RefreshCw, Heart, ArrowRight } from "lucide-react";

interface Idea {
  _id: string;
  title: string;
  description: string;
  difficultyLevel: string;
  estimatedStartupCostINR: { min: number; max: number };
  roadmapId: string;
  score: number;
  matchReason: string;
}

export default function RecommendationsPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [fallback, setFallback] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/recommendations");
      const result = await res.json();
      if (res.ok) {
        setIdeas(result.data || []);
        setFallback(result.fallback || false);
      } else {
        console.error("API error:", result.error);
        setIdeas([]);
      }
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Recommended For You</h1>
          <p className="text-muted-foreground mt-2">Business ideas matched to your skills and interests</p>
        </div>
        <Button variant="outline" onClick={fetchRecommendations} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {fallback && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg border">
          <p className="text-sm text-muted-foreground">
            We couldn&apos;t find a strong match yet — here are popular starting points.
          </p>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <Card key={idea._id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="line-clamp-1">{idea.title}</span>
                  <Badge variant="secondary">{idea.difficultyLevel}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{idea.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Startup Cost:</span>
                    <span className="font-medium">₹{idea.estimatedStartupCostINR.min.toLocaleString()} - ₹{idea.estimatedStartupCostINR.max.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Why recommended:</span>
                    <span className="font-medium text-primary">{idea.matchReason}</span>
                  </div>
                </div>
                <div className="mt-auto flex items-center gap-2">
                  <Link
                    href={`/roadmaps/${idea.roadmapId}`}
                    className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex-1"
                  >
                    View Roadmap
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && ideas.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No recommendations yet</h3>
          <p className="text-muted-foreground mb-4">Complete your assessment to get personalized business ideas.</p>
          <Link
            href="/assessment"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Take Assessment
          </Link>
        </div>
      )}
    </div>
  );
}
