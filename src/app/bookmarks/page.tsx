"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
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
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Saved Resources</h1>
        <p className="text-muted-foreground mt-2">Resources you have bookmarked for later.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="flex flex-col animate-pulse">
              <CardHeader>
                <div className="h-5 bg-muted rounded w-2/3" />
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-full mb-3" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="border rounded-xl p-8 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">You haven&apos;t saved any resources yet.</p>
            <a href="/learn" className={cn(buttonVariants({ variant: "outline" }))}>
              Explore Resources
            </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => (
            <Card key={`${bookmark.targetType}-${bookmark.targetId}`} className="flex flex-col">
              <CardHeader>
                <CardTitle className="line-clamp-2">
                  {bookmark.target?.title || "Untitled Resource"}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {bookmark.target?.description || "Bookmarked resource"}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="capitalize">
                    {bookmark.targetType}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(bookmark.targetType, bookmark.targetId)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
