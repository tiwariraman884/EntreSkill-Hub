"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Flag, 
  LineChart, 
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Content Curation",
    href: "/admin/content",
    icon: BookOpen,
  },
  {
    title: "Feedback & Reports",
    href: "/admin/reports",
    icon: Flag,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: LineChart,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col w-64 border-r min-h-screen bg-muted/40 p-4">
      <div className="mb-8 px-4">
        <h2 className="text-xl font-bold tracking-tight">Admin Portal</h2>
        <p className="text-sm text-muted-foreground">EntreSkill Hub</p>
      </div>

      <div className="space-y-1 flex-1">
        {sidebarNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <span
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all",
                  isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto space-y-1 pt-4 border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground gap-3" 
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </nav>
  );
}
