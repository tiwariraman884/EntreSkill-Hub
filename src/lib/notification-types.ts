export type NotificationCategory = "all" | "unread" | "learning" | "certificates" | "mentors" | "ideas" | "achievements" | "system";

export type NotificationType = "achievement" | "mentor" | "learning" | "certificate" | "system" | "idea" | "streak" | "level" | "message" | "hackathon" | "recommendation" | "goal";

export interface Notification {
  id: string;
  type: NotificationType;
  category: Exclude<NotificationCategory, "all" | "unread">;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  icon?: React.ReactNode;
  link?: string;
}

export interface DummyUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  bio?: string;
  college?: string;
  degree?: string;
  department?: string;
  skills: string[];
  github?: string;
  linkedin?: string;
  portfolio?: string;
  website?: string;
  location?: string;
  dateOfBirth?: string;
  occupation?: string;
  startupInterests?: string[];
  preferredIndustries?: string[];
  role: string;
  avatarUrl?: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streakDays: number;
  certificates: number;
  courses: number;
  roadmaps: number;
  projects: number;
  mentorSessions: number;
  bookmarks: number;
  achievements: number;
  completionPercentage: number;
}
