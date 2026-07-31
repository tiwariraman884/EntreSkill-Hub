import type { Notification, DummyUser } from "../lib/notification-types";

export const DUMMY_USER: DummyUser = {
  id: "user-1",
  firstName: "Raman",
  lastName: "Kumar Tiwari",
  username: "tiwariraman884",
  email: "tiwariraman884@gmail.com",
  phone: "+91 98765 43210",
  bio: "Computer Science student passionate about entrepreneurship and building products that matter.",
  college: "Roorkee Institute of Technology",
  degree: "Bachelor of Technology",
  department: "Computer Science and Engineering",
  skills: ["JavaScript", "React", "Node.js", "TypeScript", "Next.js", "TailwindCSS", "MongoDB", "PostgreSQL"],
  github: "https://github.com/tiwariraman884",
  linkedin: "https://linkedin.com/in/tiwariraman884",
  portfolio: "https://tiwariraman884.vercel.app",
  website: "https://tiwariraman884.vercel.app",
  location: "Roorkee, Uttarakhand",
  dateOfBirth: "2003-05-15",
  occupation: "Computer Science Student",
  startupInterests: ["SaaS", "EdTech", "Developer Tools"],
  preferredIndustries: ["Technology", "Education", "Healthcare"],
  role: "Computer Science Student",
  avatarUrl: "https://i.pravatar.cc/150?img=12",
  level: 2,
  xp: 150,
  xpToNextLevel: 500,
  streakDays: 15,
  certificates: 8,
  courses: 24,
  roadmaps: 9,
  projects: 7,
  mentorSessions: 4,
  bookmarks: 18,
  achievements: 12,
  completionPercentage: 68,
};

function _timeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString();
}

function createNotification(
  id: string,
  type: Notification["type"],
  category: Notification["category"],
  title: string,
  description: string,
  minutesAgo: number,
  read = false,
  link?: string
): Notification {
  return {
    id,
    type,
    category,
    title,
    description,
    timestamp: new Date(Date.now() - minutesAgo * 60 * 1000),
    read,
    link,
  };
}

export const NOTIFICATIONS: Notification[] = [
  createNotification("n1", "achievement", "achievements", "🎉 Congratulations!", "You completed \"JavaScript Fundamentals\".", 2, false, "/learn/js-fundamentals"),
  createNotification("n2", "certificate", "certificates", "🏆 Certificate unlocked", "Your React certificate is now available.", 15, false, "/certificates/cert-1"),
  createNotification("n3", "mentor", "mentors", "👨‍🏫 Mentor accepted", "Aarav Mehta accepted your mentoring request.", 60, true, "/mentors/m1"),
  createNotification("n4", "streak", "achievements", "🔥 15 Day Learning Streak", "Keep going. You're building an incredible habit.", 120, false),
  createNotification("n5", "learning", "learning", "📚 New Course Released", "Advanced Node.js Backend is now available.", 180, true, "/learn/nodejs-backend"),
  createNotification("n6", "hackathon", "system", "🚀 Hackathon Alert", "National Hackathon registrations are now open.", 240, false, "/ideas/hackathon-2024"),
  createNotification("n7", "recommendation", "learning", "💡 AI Recommendation", "Continue the Backend Roadmap to unlock your next certificate.", 300, true, "/roadmaps/r-1"),
  createNotification("n8", "goal", "achievements", "⭐ Weekly Goal Achieved", "You completed all weekly tasks. Amazing work!", 360, false),
  createNotification("n9", "level", "achievements", "📈 Progress Increased", "Level 2 → Level 3. You're now a Pro Learner.", 420, true),
  createNotification("n10", "message", "mentors", "💬 New Mentor Message", "Priya Sharma sent you feedback on your pitch deck.", 480, false, "/mentors/m2"),
  createNotification("n11", "achievement", "achievements", "🏅 Badge Earned", "Fast Learner badge unlocked.", 540, true),
  createNotification("n12", "learning", "learning", "📘 Course Completed", "You finished \"UI/UX Design Fundamentals\".", 600, false, "/learn/ux-fundamentals"),
  createNotification("n13", "mentor", "mentors", "👨‍🏫 New Mentor Available", "Rohan Kapoor is now accepting mentorship sessions.", 660, true, "/mentors/m3"),
  createNotification("n14", "idea", "ideas", "💡 Business Idea Matched", "We found 3 new business ideas based on your skills.", 720, false, "/ideas"),
  createNotification("n15", "system", "system", "🔔 System Update", "New AI recommendation engine is now live.", 780, true),
  createNotification("n16", "learning", "learning", "📝 Quiz Available", "Test your knowledge with the new React quiz.", 840, false, "/learn/react-quiz"),
  createNotification("n17", "certificate", "certificates", "🎓 Certificate Ready", "Your Node.js certificate is ready for download.", 900, true, "/certificates/cert-2"),
  createNotification("n18", "streak", "achievements", "🔥 Streak Milestone", "You've maintained a 10-day learning streak!", 960, false),
  createNotification("n19", "mentor", "mentors", "📅 Session Reminder", "Your session with Aarav Mehta starts in 2 hours.", 1020, true, "/mentors/sessions/s1"),
  createNotification("n20", "learning", "learning", "🎥 Live Workshop", "Join the live workshop on Startup Funding tomorrow.", 1080, false, "/learn/workshop-funding"),
  createNotification("n21", "achievement", "achievements", "🏆 Top Performer", "You ranked in the top 5% of learners this month.", 1140, true),
  createNotification("n22", "idea", "ideas", "🚀 Idea Validated", "Your business idea \"Cloud Kitchen\" passed validation.", 1200, false, "/ideas/idea-2"),
  createNotification("n23", "system", "system", "🔒 Security Alert", "New login detected from Chrome on Windows.", 1260, true),
  createNotification("n24", "learning", "learning", "📊 Progress Report", "Your weekly learning report is ready.", 1320, false, "/learn/reports/weekly"),
  createNotification("n25", "mentor", "mentors", "⭐ Mentor Review", "You received a 5-star review from Priya Sharma.", 1380, true, "/mentors/m2/reviews"),
  createNotification("n26", "certificate", "certificates", "🎖️ Special Certificate", "You earned the \"Mentorship Master\" certificate.", 1440, false, "/certificates/cert-3"),
  createNotification("n27", "learning", "learning", "📚 Resource Added", "New resource added to your Learning Roadmap.", 1500, true, "/learn/roadmaps/r-1"),
  createNotification("n28", "achievement", "achievements", "🌟 Community Star", "You were featured as this week's Community Star.", 1560, false),
  createNotification("n29", "hackathon", "system", "🏁 Hackathon Reminder", "National Hackathon starts in 3 days. Prepare your team!", 1620, true, "/ideas/hackathon-2024"),
  createNotification("n30", "recommendation", "learning", "🎯 Personalized Path", "Based on your goals, we recommend the AI/ML track.", 1680, false, "/learn/ai-ml-track"),
  createNotification("n31", "system", "system", "💎 Feature Unlocked", "You unlocked the Advanced Analytics dashboard.", 1740, true),
  createNotification("n32", "learning", "learning", "🧪 Lab Completed", "You completed the React Testing Lab.", 1800, false, "/learn/react-lab"),
  createNotification("n33", "mentor", "mentors", "🤝 New Connection", "Sakshi Jain viewed your profile.", 1860, true, "/mentors/m8"),
  createNotification("n34", "idea", "ideas", "📈 Trending Idea", "\"AI Content Generator\" is trending in your region.", 1920, false, "/ideas/idea-5"),
  createNotification("n35", "streak", "achievements", "🔥 Streak Saved", "You used a streak freeze. Keep your momentum!", 1980, true),
];

export const NOTIFICATION_CATEGORIES = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "learning", label: "Learning" },
  { value: "certificates", label: "Certificates" },
  { value: "mentors", label: "Mentors" },
  { value: "ideas", label: "Ideas" },
  { value: "achievements", label: "Achievements" },
  { value: "system", label: "System" },
] as const;
