"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Users, Activity } from "lucide-react";

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

function HealthBar({
  label,
  percent,
  color,
}: {
  label: string;
  percent: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium flex items-center gap-2">
          <Server className="h-4 w-4 text-muted-foreground" /> {label}
        </span>
        <span className="text-sm font-semibold tabular-nums">{percent}%</span>
      </div>
      <div className="w-full bg-muted/60 rounded-full h-2.5">
        <motion.div
          className={`${color} h-2.5 rounded-full`}
          style={{ width: `${percent}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAnalytics() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/analytics");
        if (!res.ok) {
          throw new Error("Failed to fetch analytics");
        }
        const json: AnalyticsResponse = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight font-heading">Analytics & Health</h1>
          <p className="text-muted-foreground text-lg mt-2">
            Monitor platform performance, engagement metrics, and system health.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="h-4 w-1/2 rounded skeleton" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-1/3 rounded skeleton mt-1" />
                <div className="h-3 w-2/3 rounded skeleton mt-3" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="overflow-hidden">
          <CardHeader>
            <div className="h-5 w-1/3 rounded skeleton" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="h-4 w-1/2 rounded skeleton mb-1.5" />
                <div className="h-2.5 w-full rounded-full skeleton" />
              </div>
              <div>
                <div className="h-4 w-1/2 rounded skeleton mb-1.5" />
                <div className="h-2.5 w-full rounded-full skeleton" />
              </div>
              <div>
                <div className="h-4 w-1/2 rounded skeleton mb-1.5" />
                <div className="h-2.5 w-full rounded-full skeleton" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="border rounded-2xl p-8 text-center bg-card">
        <p className="text-destructive">{error || "No analytics data available"}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold tracking-tight font-heading">Analytics & Health</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Monitor platform performance, engagement metrics, and system health.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Total Users",
            value: data.metrics.totalUsers,
            icon: Users,
            sub: "Registered accounts",
          },
          {
            title: "Active Mentors",
            value: data.metrics.activeMentors,
            icon: Activity,
            sub: "Verified mentors",
          },
          {
            title: "Content Modules",
            value: data.metrics.contentModules,
            icon: Server,
            sub: "Active ideas",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card hoverable>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                <div className="p-2 bg-muted/60 rounded-xl">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-heading tabular-nums animate-count-up">
                  {item.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>System Health Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <HealthBar
                  label="Web Server CPU"
                  percent={data.systemHealth.cpu}
                  color="bg-gradient-to-r from-indigo to-indigo-light"
                />
                <HealthBar
                  label="Web Server Memory"
                  percent={data.systemHealth.memory}
                  color="bg-gradient-to-r from-marigold to-marigold-light"
                />
                <HealthBar
                  label="Database Connections"
                  percent={data.systemHealth.dbConnections}
                  color="bg-gradient-to-r from-verified to-emerald-400"
                />

                <div className="pt-4 mt-4 border-t border-border/60">
                  <p className="text-sm text-muted-foreground">
                    Status:{" "}
                    <span className="font-medium text-ink">{data.systemHealth.status}</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Open reports: {data.metrics.openReports}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
