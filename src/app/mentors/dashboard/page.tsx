"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Progress, ProgressIndicator, ProgressValue } from "@/components/ui/progress";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Users,
  FilePlus,
  MessageSquare,
  CheckCircle,
  XCircle,
  TrendingUp,
  Clock,
  BarChart3,
  Calendar,
  Bell,
} from "lucide-react";
import { toast } from "sonner";

interface MentorSession {
  _id: string;
  mentorId: string;
  menteeId: string;
  status: "requested" | "confirmed" | "completed" | "cancelled";
  scheduledAt?: string;
  meetingLink?: string;
  notes?: string;
  createdAt: string;
}

interface MentorStats {
  totalSessions: number;
  pendingRequests: number;
  confirmedSessions: number;
  completedSessions: number;
  cancelledSessions: number;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function MentorDashboard() {
  const [sessions, setSessions] = useState<MentorSession[]>([]);
  const [stats, setStats] = useState<MentorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setLoading(true);
      try {
        const [sessionsRes, statsRes] = await Promise.all([
          fetch("/api/mentors/sessions?mentor=true"),
          fetch("/api/mentors/stats"),
        ]);

        const sessionsData = sessionsRes.ok ? await sessionsRes.json() : { sessions: [] };
        const statsData = statsRes.ok ? await statsRes.json() : null;

        if (!cancelled) {
          setSessions(sessionsData.sessions || []);
          setStats(statsData?.stats || null);
        }
      } catch (error) {
        console.error("Failed to load mentor dashboard", error);
        if (!cancelled) {
          toast.error("Failed to load dashboard");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSessionAction = async (
    sessionId: string,
    action: "confirm" | "decline" | "reschedule",
    data?: { scheduledAt?: string; meetingLink?: string }
  ) => {
    setActionLoading(sessionId);
    try {
      const res = await fetch(`/api/sessions/${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, scheduledAt: data?.scheduledAt, meetingLink: data?.meetingLink }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Action failed");
      }

      const updatedSession = await res.json();
      setSessions((prev) => prev.map((s) => (s._id === sessionId ? updatedSession.session : s)));
      toast.success(`Session ${action}ed successfully`);
    } catch (error) {
      console.error("Session action error", error);
      toast.error(error instanceof Error ? error.message : "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<
      string,
      { variant: "default" | "secondary" | "destructive" | "outline"; className?: string }
    > = {
      requested: { variant: "secondary" },
      confirmed: { variant: "default" },
      completed: {
        variant: "outline",
        className:
          "border-emerald-500 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
      },
      cancelled: { variant: "destructive" },
    };
    const c = config[status] || { variant: "ghost" };
    return (
      <Badge variant={c.variant} className={c.className}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const completionRate = stats
    ? Math.round((stats.completedSessions / Math.max(stats.totalSessions, 1)) * 100)
    : 0;

  const statCards = stats
    ? [
        {
          label: "Total Sessions",
          value: stats.totalSessions,
          subtext: "All time sessions",
          icon: Users,
          color: "text-indigo",
          bg: "bg-indigo/10",
          border: "border-l-indigo",
        },
        {
          label: "Pending Requests",
          value: stats.pendingRequests,
          subtext: "Awaiting your response",
          icon: Clock,
          color: "text-marigold",
          bg: "bg-marigold/10",
          border: "border-l-marigold",
        },
        {
          label: "Confirmed",
          value: stats.confirmedSessions,
          subtext: "Scheduled sessions",
          icon: CheckCircle,
          color: "text-indigo-light",
          bg: "bg-indigo-light/10",
          border: "border-l-indigo-light",
        },
        {
          label: "Completed",
          value: stats.completedSessions,
          subtext: "Finished sessions",
          icon: TrendingUp,
          color: "text-verified",
          bg: "bg-verified/10",
          border: "border-l-verified",
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="h-10 w-64 bg-muted rounded-xl animate-pulse" />
            <div className="h-5 w-96 bg-muted rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} size="sm" className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 bg-muted rounded-lg w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-muted rounded-lg w-1/2 mb-2" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
          <Card size="sm" className="animate-pulse">
            <CardHeader>
              <div className="h-5 bg-muted rounded-lg w-1/3" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-muted rounded-xl" />
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded-lg w-3/4 mb-2" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold gradient-text-hero font-heading">Mentor Dashboard</h1>
        <p className="text-thread mt-3 text-base leading-relaxed max-w-2xl">
          Manage your mentorship sessions, requests, and communications all in one place.
        </p>
      </motion.div>

      {stats && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {statCards.map((card) => (
            <motion.div key={card.label} variants={cardItem}>
              <Card hoverable glow className={`border-l-4 ${card.border}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{card.label}</CardTitle>
                  <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                    <card.icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
                  <p className="text-xs text-thread mt-1">{card.subtext}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Card hoverable>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo" />
                Completion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Progress value={completionRate}>
                    <ProgressIndicator />
                  </Progress>
                </div>
                <ProgressValue>{(formattedValue) => formattedValue ? `${formattedValue}%` : null}</ProgressValue>
              </div>
              <p className="text-xs text-thread mt-3">
                {completionRate >= 70
                  ? "Excellent completion rate! Keep up the great work."
                  : "Focus on completing scheduled sessions to improve your rate."}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card hoverable className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-indigo" />
                Recent Session Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sessions.length === 0 ? (
                <EmptyState
                  icon="users"
                  title="No session requests"
                  description="You don't have any session requests at this time. New requests will appear here."
                />
              ) : (
                <div className="overflow-x-auto -mx-(--card-spacing)">
                  <table className="w-full caption-bottom text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Session</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Scheduled</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sessions.map((session) => (
                        <TableRow key={session._id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                <MessageSquare className="h-4 w-4 text-thread" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">
                                  Session {session._id.substring(0, 8)}
                                </p>
                                {session.scheduledAt && (
                                  <p className="text-xs text-thread">
                                    {new Date(session.scheduledAt).toLocaleDateString(undefined, {
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(session.status)}</TableCell>
                          <TableCell>
                            {session.scheduledAt ? (
                              <span className="text-xs text-thread">
                                {new Date(session.scheduledAt).toLocaleDateString(undefined, {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            ) : (
                              <span className="text-xs text-thread/60">Unscheduled</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-2">
                              {session.status === "requested" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-verified border-verified/30 hover:bg-verified/5 hover:border-verified/50"
                                    onClick={() => handleSessionAction(session._id, "confirm")}
                                    disabled={actionLoading === session._id}
                                  >
                                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                    Confirm
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-danger border-danger/30 hover:bg-danger/5 hover:border-danger/50"
                                    onClick={() => handleSessionAction(session._id, "decline")}
                                    disabled={actionLoading === session._id}
                                  >
                                    <XCircle className="h-3.5 w-3.5 mr-1" />
                                    Decline
                                  </Button>
                                </>
                              )}
                              {session.status === "confirmed" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    const meetingLink = window.prompt(
                                      "Enter meeting link:",
                                      session.meetingLink || ""
                                    );
                                    if (meetingLink !== null) {
                                      handleSessionAction(session._id, "reschedule", { meetingLink });
                                    }
                                  }}
                                  disabled={actionLoading === session._id}
                                >
                                  <MessageSquare className="h-3.5 w-3.5 mr-1" />
                                  Add Link
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card hoverable className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilePlus className="h-5 w-5 text-indigo" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => (window.location.href = "/mentors/profile/edit")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Edit Mentor Profile
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => (window.location.href = "/mentors/resources/upload")}
                >
                  <FilePlus className="h-4 w-4 mr-2" />
                  Upload New Resource
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => (window.location.href = "/mentors/sessions/new")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule New Session
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => (window.location.href = "/mentors/analytics")}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics & Reports
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => (window.location.href = "/mentors/notifications")}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Manage Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
