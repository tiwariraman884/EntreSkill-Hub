"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface Profile {
  id: string;
  name: string;
  email: string;
  profile: {
    avatar: string;
    coverPhoto: string;
    bio: string;
    headline: string;
    location: string;
    college: string;
    degree: string;
    department: string;
    occupation: string;
    website: string;
    github: string;
    linkedin: string;
    twitter: string;
    portfolio: string;
    phone: string;
    publicProfileUrl: string;
  };
  preferences: {
    language: string;
    timezone: string;
    country: string;
    dateFormat: string;
    currency: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    mentorReminders: boolean;
    learningReminders: boolean;
    roadmapReminders: boolean;
    achievementAlerts: boolean;
    weeklySummary: boolean;
    marketingEmails: boolean;
    productUpdates: boolean;
    securityAlerts: boolean;
  };
  privacy: {
    publicProfile: boolean;
    showEmail: boolean;
    showPhone: boolean;
    showSkills: boolean;
    showCertificates: boolean;
    showRoadmaps: boolean;
    showActivity: boolean;
    allowIndexing: boolean;
    allowMentorContact: boolean;
    showIdeas: boolean;
  };
}

interface ProfileContextValue {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  invalidateProfile: () => void;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/profile/me", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (!response.ok) {
        if (response.status === 401) {
          setProfile(null);
          return;
        }
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();
      setProfile(data as Profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch profile");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<Profile>) => {
    setProfile((prev) => (prev ? { ...prev, ...data } : prev));
    await fetchProfile();
  }, [fetchProfile]);

  const invalidateProfile = useCallback(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <ProfileContext.Provider value={{ profile, isLoading, error, refreshProfile: fetchProfile, updateProfile, invalidateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
}
