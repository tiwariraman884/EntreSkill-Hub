"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AssessmentDomain } from "@/data/mock-assessment";

export type BookmarkType = "idea" | "roadmap" | "learning" | "mentor";

export interface Bookmark {
  id: string; // The ID of the item
  type: BookmarkType;
  addedAt: string;
}

export interface UserStats {
  xp: number;
  level: number;
  streakDays: number;
  coursesCompleted: number;
}

export type AssessmentScores = Partial<Record<AssessmentDomain, number>>;

interface GlobalState {
  bookmarks: Bookmark[];
  completedResources: string[]; // array of learning resource IDs
  assessmentScores: AssessmentScores | null;
  stats: UserStats;
  addBookmark: (id: string, type: BookmarkType) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  markResourceComplete: (id: string) => void;
  isResourceCompleted: (id: string) => boolean;
  setAssessmentScores: (scores: AssessmentScores) => void;
  addXp: (amount: number) => void;
}

const defaultStats: UserStats = {
  xp: 150,
  level: 2,
  streakDays: 3,
  coursesCompleted: 0,
};

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export function GlobalStateProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [completedResources, setCompletedResources] = useState<string[]>([]);
  const [assessmentScores, setAssessmentScores] = useState<AssessmentScores | null>(null);
  const [stats, setStats] = useState<UserStats>(defaultStats);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    setTimeout(() => {
      const savedBookmarks = localStorage.getItem("entreskill_bookmarks");
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

      const savedCompleted = localStorage.getItem("entreskill_completed");
      if (savedCompleted) setCompletedResources(JSON.parse(savedCompleted));

      const savedScores = localStorage.getItem("entreskill_scores");
      if (savedScores) setAssessmentScores(JSON.parse(savedScores));

      const savedStats = localStorage.getItem("entreskill_stats");
      if (savedStats) setStats(JSON.parse(savedStats));

      setIsInitialized(true);
    }, 0);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("entreskill_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("entreskill_completed", JSON.stringify(completedResources));
  }, [completedResources, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("entreskill_scores", JSON.stringify(assessmentScores));
  }, [assessmentScores, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("entreskill_stats", JSON.stringify(stats));
  }, [stats, isInitialized]);

  const addBookmark = (id: string, type: BookmarkType) => {
    if (!bookmarks.find(b => b.id === id)) {
      setBookmarks(prev => [...prev, { id, type, addedAt: new Date().toISOString() }]);
    }
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const isBookmarked = (id: string) => !!bookmarks.find(b => b.id === id);

  const markResourceComplete = (id: string) => {
    if (!completedResources.includes(id)) {
      setCompletedResources(prev => [...prev, id]);
      setStats(prev => ({ ...prev, coursesCompleted: prev.coursesCompleted + 1, xp: prev.xp + 50 }));
    }
  };

  const isResourceCompleted = (id: string) => completedResources.includes(id);

  const addXp = (amount: number) => {
    setStats(prev => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 500) + 1;
      return { ...prev, xp: newXp, level: newLevel };
    });
  };

  return (
    <GlobalStateContext.Provider value={{
      bookmarks,
      completedResources,
      assessmentScores,
      stats,
      addBookmark,
      removeBookmark,
      isBookmarked,
      markResourceComplete,
      isResourceCompleted,
      setAssessmentScores,
      addXp
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
}
