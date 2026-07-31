"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useProfileContext } from "@/context/ProfileContext";
import { profileSchema, accountSchema, notificationSchema, privacySchema } from "@/lib/validations/settings";
import type { ProfileInput, AccountInput, NotificationInput, PrivacyInput } from "@/lib/validations/settings";

const DEFAULT_PROFILE: ProfileInput = {
  name: "",
  bio: "",
  headline: "",
  location: "",
  college: "",
  degree: "",
  department: "",
  occupation: "",
  website: "",
  github: "",
  linkedin: "",
  twitter: "",
  portfolio: "",
  phone: "",
  publicProfileUrl: "",
  avatar: "",
};

const DEFAULT_ACCOUNT: AccountInput = {
  language: "en",
  timezone: "Asia/Kolkata",
  country: "",
  dateFormat: "MM/DD/YYYY",
  currency: "INR",
};

const DEFAULT_NOTIFICATIONS: NotificationInput = {
  email: true,
  push: true,
  mentorReminders: true,
  learningReminders: true,
  roadmapReminders: true,
  achievementAlerts: true,
  weeklySummary: true,
  marketingEmails: false,
  productUpdates: true,
  securityAlerts: true,
};

const DEFAULT_PRIVACY: PrivacyInput = {
  publicProfile: true,
  showEmail: false,
  showPhone: false,
  showSkills: true,
  showCertificates: true,
  showRoadmaps: true,
  showActivity: true,
  allowIndexing: true,
  allowMentorContact: true,
  showIdeas: true,
};

export function useProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileInput>(DEFAULT_PROFILE);
  const [account, setAccount] = useState<AccountInput>(DEFAULT_ACCOUNT);
  const [notifications, setNotifications] = useState<NotificationInput>(DEFAULT_NOTIFICATIONS);
  const [privacy, setPrivacy] = useState<PrivacyInput>(DEFAULT_PRIVACY);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { invalidateProfile } = useProfileContext();

  const profileForm = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: DEFAULT_PROFILE,
    mode: "onChange",
  });

  const accountForm = useForm<AccountInput>({
    resolver: zodResolver(accountSchema),
    defaultValues: DEFAULT_ACCOUNT,
    mode: "onChange",
  });

  const notificationForm = useForm<NotificationInput>({
    resolver: zodResolver(notificationSchema),
    defaultValues: DEFAULT_NOTIFICATIONS,
    mode: "onChange",
  });

  const privacyForm = useForm<PrivacyInput>({
    resolver: zodResolver(privacySchema),
    defaultValues: DEFAULT_PRIVACY,
    mode: "onChange",
  });

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/profile/me");
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();

      const profileData: ProfileInput = {
        name: data.name || "",
        bio: data.profile?.bio || "",
        headline: data.profile?.headline || "",
        location: data.profile?.location || "",
        college: data.profile?.college || "",
        degree: data.profile?.degree || "",
        department: data.profile?.department || "",
        occupation: data.profile?.occupation || "",
        website: data.profile?.website || "",
        github: data.profile?.github || "",
        linkedin: data.profile?.linkedin || "",
        twitter: data.profile?.twitter || "",
        portfolio: data.profile?.portfolio || "",
        phone: data.profile?.phone || "",
        publicProfileUrl: data.profile?.publicProfileUrl || "",
        avatar: data.profile?.avatar || "",
      };

      const accountData: AccountInput = {
        language: data.preferences?.language || "en",
        timezone: data.preferences?.timezone || "Asia/Kolkata",
        country: data.preferences?.country || "",
        dateFormat: data.preferences?.dateFormat || "MM/DD/YYYY",
        currency: data.preferences?.currency || "INR",
      };

      const notificationData: NotificationInput = {
        email: data.notifications?.email ?? true,
        push: data.notifications?.push ?? true,
        mentorReminders: data.notifications?.mentorReminders ?? true,
        learningReminders: data.notifications?.learningReminders ?? true,
        roadmapReminders: data.notifications?.roadmapReminders ?? true,
        achievementAlerts: data.notifications?.achievementAlerts ?? true,
        weeklySummary: data.notifications?.weeklySummary ?? true,
        marketingEmails: data.notifications?.marketingEmails ?? false,
        productUpdates: data.notifications?.productUpdates ?? true,
        securityAlerts: data.notifications?.securityAlerts ?? true,
      };

      const privacyData: PrivacyInput = {
        publicProfile: data.privacy?.publicProfile ?? true,
        showEmail: data.privacy?.showEmail ?? false,
        showPhone: data.privacy?.showPhone ?? false,
        showSkills: data.privacy?.showSkills ?? true,
        showCertificates: data.privacy?.showCertificates ?? true,
        showRoadmaps: data.privacy?.showRoadmaps ?? true,
        showActivity: data.privacy?.showActivity ?? true,
        allowIndexing: data.privacy?.allowIndexing ?? true,
        allowMentorContact: data.privacy?.allowMentorContact ?? true,
        showIdeas: data.privacy?.showIdeas ?? true,
      };

      setProfile(profileData);
      setAccount(accountData);
      setNotifications(notificationData);
      setPrivacy(privacyData);

      profileForm.reset(profileData);
      accountForm.reset(accountData);
      notificationForm.reset(notificationData);
      privacyForm.reset(privacyData);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  }, [profileForm, accountForm, notificationForm, privacyForm]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const saveProfile = useCallback(async (data: ProfileInput) => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, section: "profile" }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update profile");
      }

      const result = await response.json();
      setProfile(result.user.profile || data);
      setHasUnsavedChanges(false);
      invalidateProfile();
      toast.success("Profile updated successfully");
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update profile";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsSaving(false);
    }
  }, [invalidateProfile]);

  const saveAccount = useCallback(async (data: AccountInput) => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, section: "account" }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update account settings");
      }

      const result = await response.json();
      setAccount(result.preferences || data);
      setHasUnsavedChanges(false);
      invalidateProfile();
      toast.success("Account settings updated");
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update account settings";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsSaving(false);
    }
  }, [invalidateProfile]);

  const saveNotifications = useCallback(async (data: NotificationInput) => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, section: "notifications" }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update notification settings");
      }

      const result = await response.json();
      setNotifications(result.notifications || data);
      setHasUnsavedChanges(false);
      invalidateProfile();
      toast.success("Notification settings updated");
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update notification settings";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsSaving(false);
    }
  }, [invalidateProfile]);

  const savePrivacy = useCallback(async (data: PrivacyInput) => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, section: "privacy" }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update privacy settings");
      }

      const result = await response.json();
      setPrivacy(result.privacy || data);
      setHasUnsavedChanges(false);
      invalidateProfile();
      toast.success("Privacy settings updated");
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update privacy settings";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsSaving(false);
    }
  }, [invalidateProfile]);

  const uploadAvatar = useCallback(async (file: File): Promise<{ success: boolean; avatar?: string; error?: string }> => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch("/api/profile/avatar", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to upload avatar");
      }

      const result = await response.json();
      toast.success("Avatar uploaded successfully");
      invalidateProfile();
      return { success: true, avatar: result.avatar };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to upload avatar";
      toast.error(message);
      return { success: false, error: message };
    }
  }, [invalidateProfile]);

  const removeAvatar = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch("/api/profile/avatar", {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to remove avatar");
      }

      toast.success("Avatar removed");
      invalidateProfile();
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to remove avatar";
      toast.error(message);
      return { success: false, error: message };
    }
  }, [invalidateProfile]);

  const uploadCover = useCallback(async (file: File): Promise<{ success: boolean; coverPhoto?: string; error?: string }> => {
    try {
      const formData = new FormData();
      formData.append("cover", file);

      const response = await fetch("/api/profile/cover", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to upload cover photo");
      }

      const result = await response.json();
      toast.success("Cover photo uploaded successfully");
      invalidateProfile();
      return { success: true, coverPhoto: result.coverPhoto };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to upload cover photo";
      toast.error(message);
      return { success: false, error: message };
    }
  }, [invalidateProfile]);

  const removeCover = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch("/api/profile/cover", {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to remove cover photo");
      }

      toast.success("Cover photo removed");
      invalidateProfile();
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to remove cover photo";
      toast.error(message);
      return { success: false, error: message };
    }
  }, [invalidateProfile]);

  return {
    profile,
    account,
    notifications,
    privacy,
    isLoading,
    isSaving,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    profileForm,
    accountForm,
    notificationForm,
    privacyForm,
    fetchProfile,
    saveProfile,
    saveAccount,
    saveNotifications,
    savePrivacy,
    uploadAvatar,
    removeAvatar,
    uploadCover,
    removeCover,
  };
}
