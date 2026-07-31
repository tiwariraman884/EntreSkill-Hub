"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { Trash2, Bookmark } from "lucide-react";
import { toast } from "sonner";

interface Bookmark {
  _id: string;
  targetType: string;
  targetId: string;
  createdAt: string;
  target?: {
    _id: string;
    title: string;
    type?: string;
    description?: string;
  };
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/bookmarks");
      if (!res.ok) {
        throw new Error("Failed to fetch bookmarks");
      }
      const data = await res.json();
      setBookmarks(data.bookmarks || []);
    } catch (error) {
      console.error("Bookmarks fetch error", error);
      toast.error("Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const handleRemove = async (targetType: string, targetId: string) => {
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetType, targetId }),
      });

      if (!res.ok) {
        throw new Error("Failed to remove bookmark");
      }

      setBookmarks((prev) => prev.filter((b) => !(b.targetType === targetType && b.targetId === targetId)));
      toast.success("Bookmark removed");
    } catch (error) {
      console.error("Remove bookmark error", error);
      toast.error("Failed to remove bookmark");
    }
  };

  return (
    <div className="min-h-screen bg-canvas">
      {/* ─── Header ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo via-indigo-light to-indigo-dark py-14 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1),_transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(232,163,61,0.14),_transparent)] pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-white fill-white/60" />
            </div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold">
              Saved Resources
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-3 leading-tight">
            Your Bookmarks
          </h1>
          <p className="text-white/65 leading-relaxed max-w-2xl text-sm sm:text-base">
            Resources you have bookmarked for later. Pick up right where you left off.
          </p>
        </div>
      </section>

      {/* ─── Content ───────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : bookmarks.length === 0 ? (
          <EmptyState
            icon="book"
            title="No bookmarks yet"
            description="You haven't saved any resources yet. Explore the learning hub and bookmark what matters most."
            actionLabel="Explore Resources"
            actionHref="/learn"
            className="py-16"
          />
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {bookmarks.map((bookmark) => (
              <motion.div
                key={`${bookmark.targetType}-${bookmark.targetId}`}
                variants={itemVariants}
                layout
              >
                <Card
                  size="default"
                  hoverable
                  className="flex flex-col h-full"
                >
                  <CardHeader>
                    <CardTitle className="line-clamp-2">
                      {bookmark.target?.title || "Untitled Resource"}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {bookmark.target?.description || "Bookmarked resource"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col gap-4">
                    <div className="flex items-center justify-between mt-auto">
                      <Badge variant="secondary" className="capitalize">
                        {bookmark.targetType}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemove(bookmark.targetType, bookmark.targetId)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
