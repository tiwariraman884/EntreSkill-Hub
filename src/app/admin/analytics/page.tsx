"use client";

import { useState, useEffect } from "react";
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
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted rounded w-2/3 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="border rounded-xl p-8 text-center">
        <p className="text-destructive">{error || "No analytics data available"}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Health</h1>
          <p className="text-muted-foreground mt-2">
            Monitor platform performance, engagement metrics, and system health.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.metrics.totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">Registered accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Mentors</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.metrics.activeMentors}</div>
            <p className="text-xs text-muted-foreground mt-1">Verified mentors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Content Modules</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.metrics.contentModules}</div>
            <p className="text-xs text-muted-foreground mt-1">Active ideas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <HealthBar label="Web Server CPU" percent={data.systemHealth.cpu} color="bg-primary" />
              <HealthBar label="Web Server Memory" percent={data.systemHealth.memory} color="bg-yellow-500" />
              <HealthBar label="Database Connections" percent={data.systemHealth.dbConnections} color="bg-green-500" />

              <div className="pt-4 mt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Status: <span className="font-medium text-ink">{data.systemHealth.status}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Open reports: {data.metrics.openReports}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function HealthBar({ label, percent, color }: { label: string; percent: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium flex items-center gap-2">
          <Server className="h-4 w-4" /> {label}
        </span>
        <span className="text-sm font-medium">{percent}%</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div className={`${color} h-2 rounded-full`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
