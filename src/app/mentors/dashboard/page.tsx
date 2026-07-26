"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, FilePlus, MessageSquare, CheckCircle, XCircle, TrendingUp, Clock, AlertCircle } from "lucide-react";
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
          fetch("/api/mentors/stats")
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

  const handleSessionAction = async (sessionId: string, action: "confirm" | "decline" | "reschedule", data?: { scheduledAt?: string; meetingLink?: string }) => {
    setActionLoading(sessionId);
    try {
      const res = await fetch(`/api/sessions/${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, scheduledAt: data?.scheduledAt, meetingLink: data?.meetingLink })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Action failed");
      }

      const updatedSession = await res.json();
      setSessions(prev => prev.map(s => s._id === sessionId ? updatedSession.session : s));
      toast.success(`Session ${action}ed successfully`);
    } catch (error) {
      console.error("Session action error", error);
      toast.error(error instanceof Error ? error.message : "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      requested: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "requested": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "confirmed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "completed": return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case "cancelled": return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-muted rounded w-1/2" />
                  <div className="h-3 bg-muted rounded w-2/3 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="animate-pulse">
            <CardHeader>
              <div className="h-5 bg-muted rounded w-1/3" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-muted rounded-full" />
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2" />
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your mentorship sessions, requests, and communications.</p>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSessions}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingRequests}</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.confirmedSessions}</div>
              <p className="text-xs text-muted-foreground">Scheduled sessions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.completedSessions}</div>
              <p className="text-xs text-muted-foreground">Finished sessions</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Session Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sessions.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No session requests at this time.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div key={session._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(session.status)}
                      <div>
                        <p className="font-medium">Session {session._id.substring(0, 8)}</p>
                        <p className="text-sm text-muted-foreground">
                          Status: <Badge className={`${getStatusColor(session.status)} text-xs ml-1`}>{session.status}</Badge>
                        </p>
                        {session.scheduledAt && (
                          <p className="text-xs text-muted-foreground">Scheduled: {new Date(session.scheduledAt).toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {session.status === "requested" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                            onClick={() => handleSessionAction(session._id, "confirm")}
                            disabled={actionLoading === session._id}
                          >
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => handleSessionAction(session._id, "decline")}
                            disabled={actionLoading === session._id}
                          >
                            Decline
                          </Button>
                        </>
                      )}
                      {session.status === "confirmed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const meetingLink = window.prompt("Enter meeting link:", session.meetingLink || "");
                            if (meetingLink !== null) {
                              handleSessionAction(session._id, "reschedule", { meetingLink });
                            }
                          }}
                          disabled={actionLoading === session._id}
                        >
                          Add Meeting Link
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FilePlus className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => window.location.href = "/mentors/profile/edit"}
              >
                Edit Mentor Profile
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => window.location.href = "/mentors/resources/upload"}
              >
                Upload New Resource
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => window.location.href = "/mentors/sessions/new"}
              >
                Schedule New Session
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => window.location.href = "/mentors/analytics"}
              >
                View Analytics & Reports
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => window.location.href = "/mentors/notifications"}
              >
                Manage Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
