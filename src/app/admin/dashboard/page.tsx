"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Users, BookOpen, Flag, Activity } from "lucide-react";
import { useEffect, useState } from "react";

interface AnalyticsResponse {
  metrics: {
    totalUsers: number;
    activeMentors: number;
    contentModules: number;
    openReports: number;
  };
  systemHealth: {
    cpu: number;
    memory: number;
    dbConnections: number;
    status: string;
  };
}

export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/admin/analytics");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: loading ? "..." : data?.metrics?.totalUsers || 0,
      icon: Users,
      iconColor: "text-muted-foreground",
      sub: "+12% from last month",
    },
    {
      title: "Active Mentors",
      value: loading ? "..." : data?.metrics?.activeMentors || 0,
      icon: Users,
      iconColor: "text-primary",
      sub: "+4 new this week",
    },
    {
      title: "Content Modules",
      value: loading ? "..." : data?.metrics?.contentModules || 0,
      icon: BookOpen,
      iconColor: "text-muted-foreground",
      sub: "+24 added recently",
    },
    {
      title: "Open Reports",
      value: loading ? "..." : data?.metrics?.openReports || 0,
      icon: Flag,
      iconColor: "text-destructive",
      sub: "Requires attention",
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold tracking-tight font-heading">Admin Overview</h1>
        <p className="text-muted-foreground text-lg mt-2 max-w-3xl">
          Welcome to the EntreSkill Hub administration panel. Here is a summary of your platform&apos;s activity.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card hoverable>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="p-2 bg-muted/60 rounded-xl">
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-heading animate-count-up">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-primary/10 rounded-2xl">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">New mentor registered</p>
                    <p className="text-xs text-muted-foreground">Sarah Jenkins joined 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-primary/10 rounded-2xl">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">New roadmap published</p>
                    <p className="text-xs text-muted-foreground">&quot;Tech Startup 101&quot; published by Admin</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-destructive/10 rounded-2xl">
                    <Flag className="h-4 w-4 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">New report submitted</p>
                    <p className="text-xs text-muted-foreground">Content issue reported on module #42</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Database Connection</span>
                  <Badge variant="default">Operational</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">API Endpoints</span>
                  <Badge variant="default">Operational</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Email Service</span>
                  <Badge variant="default">Operational</Badge>
                </div>
                <div className="pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Last checked: Just now</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
