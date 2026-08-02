import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import nextDynamic from "next/dynamic";
import { SkeletonStatCard, SkeletonCard } from "@/components/ui/skeleton-card";
import {
  QuickActions,
  AICoachBanner,
  AIFeaturesGrid,
  RecentActivity,
} from "./components/dashboard-actions";

export const dynamic = "force-dynamic";

// Dynamic Imports for Client Components
const DashboardKPIs = nextDynamic(() => import("./components/dashboard-kpis"), {
  loading: () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => <SkeletonStatCard key={i} />)}
    </div>
  ),
});

const DashboardAnalytics = nextDynamic(() => import("./components/dashboard-analytics"), {
  loading: () => <SkeletonCard className="h-64" />,
});

const ContinueLearning = nextDynamic(() => import("./components/dashboard-resources").then(mod => mod.ContinueLearning), {
  loading: () => <SkeletonCard className="h-64" />,
});

const DashboardBookmarks = nextDynamic(() => import("./components/dashboard-resources").then(mod => mod.DashboardBookmarks), {
  loading: () => null,
});

const DashboardSidebar = nextDynamic(() => import("./components/dashboard-sidebar"), {
  loading: () => (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  ),
});

// Mock Data for Analytics
const weeklyData = [
  { day: "Mon", minutes: 65 }, { day: "Tue", minutes: 82 }, { day: "Wed", minutes: 45 },
  { day: "Thu", minutes: 94 }, { day: "Fri", minutes: 110 }, { day: "Sat", minutes: 58 },
  { day: "Sun", minutes: 78 },
];

const skillData = [
  { subject: "Business", A: 85 }, { subject: "Marketing", A: 72 }, { subject: "Finance", A: 60 },
  { subject: "Legal", A: 45 }, { subject: "Product", A: 90 }, { subject: "Leadership", A: 68 },
];


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Sticky Header */}
      <header className="sticky top-16 z-30 bg-card/80 backdrop-blur-xl border-b border-border/40 shadow-premium animate-fade-in-up">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading tracking-tight">
              Welcome back,{" "}
              <span className="bg-linear-to-r from-indigo to-indigo-light bg-clip-text text-transparent">
                {user?.name?.split(" ")[0] || "Entrepreneur"}
              </span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1 font-sans">Here is your progress for today.</p>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-6 py-8 space-y-8 font-sans">
        {/* KPI Row (Client Component) */}
        <DashboardKPIs />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Server Components */}
            <QuickActions />
            
            {/* Client Component (Heavy Charts) */}
            <DashboardAnalytics weeklyData={weeklyData} skillData={skillData} />
            
            {/* Client Component */}
            <ContinueLearning />
            <DashboardBookmarks />
            
            {/* Server Components */}
            <AICoachBanner />
            <AIFeaturesGrid />
            <RecentActivity />
          </div>

          {/* Sidebar (Client Component) */}
          <DashboardSidebar />
        </div>
      </main>
    </div>
  );
}
