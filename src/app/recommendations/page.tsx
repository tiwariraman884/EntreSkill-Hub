"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { RefreshCw, Heart, ArrowRight, Star } from "lucide-react";

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

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
    },
  }),
};

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
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-foreground">
            Recommended For You
          </h1>
          <p className="text-muted-foreground mt-2.5 text-base leading-relaxed">
            Business ideas matched to your skills and interests
          </p>
        </div>
        <Button variant="outline" onClick={fetchRecommendations} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </motion.div>

      {fallback && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-xl border border-marigold/30 bg-gradient-to-r from-marigold/5 to-transparent"
        >
          <p className="text-sm text-foreground font-medium leading-relaxed">
            We couldn&apos;t find a strong match yet — here are popular starting points.
          </p>
        </motion.div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {ideas.length > 0 ? (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {ideas.map((idea, i) => (
                <motion.div
                  key={idea._id}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Card hoverable className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between gap-3">
                        <span className="line-clamp-1 leading-snug text-base">{idea.title}</span>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <Badge variant="secondary">{idea.difficultyLevel}</Badge>
                          {idea.score > 0 && (
                            <div className="flex items-center gap-1 text-xs font-bold text-indigo">
                              <Star className="h-3.5 w-3.5 fill-current" />
                              {Math.round(idea.score * 100)}%
                            </div>
                          )}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {idea.description}
                      </p>
                      <div className="space-y-2.5 rounded-xl bg-muted/20 p-3.5 border border-border/40">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Startup Cost</span>
                          <span className="font-semibold text-foreground">
                            ₹{idea.estimatedStartupCostINR.min.toLocaleString()} – ₹{idea.estimatedStartupCostINR.max.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-px bg-border/60" />
                        <div className="text-sm">
                          <span className="text-muted-foreground block mb-1">Why recommended</span>
                          <span className="text-primary font-medium leading-snug">{idea.matchReason}</span>
                        </div>
                      </div>
                      <div className="mt-auto flex items-center gap-2.5 pt-2">
                        <Link
                          href={`/roadmaps/${idea.roadmapId}`}
                          className="inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo to-indigo-light text-white text-sm font-semibold shadow-lg shadow-indigo/25 hover:shadow-xl hover:shadow-indigo/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex-1"
                        >
                          View Roadmap
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground" aria-label="Save idea">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <EmptyState
              icon="book"
              title="No recommendations yet"
              description="Complete your assessment to get personalized business ideas tailored to your skills."
              actionLabel="Take Assessment"
              actionHref="/assessment"
            />
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
