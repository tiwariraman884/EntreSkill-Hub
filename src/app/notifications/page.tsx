"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { CheckCheck, Trash2, Clock, RefreshCw, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Notification {
  _id: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const TYPE_LABELS: Record<string, string> = {
  achievement: "Achievement",
  mentor: "Mentor",
  learning: "Learning",
  certificate: "Certificate",
  system: "System",
  idea: "Idea",
  streak: "Streak",
  level: "Level",
  message: "Message",
  hackathon: "Hackathon",
  recommendation: "Recommendation",
  goal: "Goal",
};

const TYPE_VARIANTS: Record<string, "default" | "secondary" | "outline" | "destructive" | "ghost"> = {
  achievement: "default",
  mentor: "secondary",
  learning: "default",
  certificate: "secondary",
  system: "outline",
  idea: "secondary",
  streak: "default",
  level: "default",
  message: "outline",
  hackathon: "secondary",
  recommendation: "default",
  goal: "default",
};

type TimeGroup = "Today" | "Yesterday" | "This Week" | "Earlier";

function getTimeGroup(dateString: string): TimeGroup {
  const date = new Date(dateString);
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(todayStart.getTime() - 86400000);
  const weekStart = new Date(todayStart.getTime() - todayStart.getDay() * 86400000);
  if (date >= todayStart) return "Today";
  if (date >= yesterdayStart) return "Yesterday";
  if (date >= weekStart) return "This Week";
  return "Earlier";
}

function groupNotifications(items: Notification[]): [TimeGroup, Notification[]][] {
  const groups = new Map<TimeGroup, Notification[]>();
  for (const item of items) {
    const group = getTimeGroup(item.createdAt);
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(item);
  }
  const order: TimeGroup[] = ["Today", "Yesterday", "This Week", "Earlier"];
  return order.filter((g) => groups.has(g)).map((g) => [g, groups.get(g)!]);
}

function NotificationSkeleton() {
  return (
    <Card size="default">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-6 w-24 rounded-full bg-muted animate-pulse" />
              <div className="h-4 w-20 rounded-full bg-muted/70 animate-pulse" />
            </div>
            <div className="h-4 w-full rounded-lg bg-muted animate-pulse" />
            <div className="h-4 w-2/3 rounded-lg bg-muted/70 animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-9 w-9 rounded-xl bg-muted animate-pulse" />
            <div className="h-9 w-9 rounded-xl bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setFetchError(null);
      const url = new URL("/api/notifications", window.location.origin);
      if (filter === "unread") url.searchParams.set("unreadOnly", "true");
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch notifications");
      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load notifications";
      setFetchError(message);
      if (loading) toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [filter, loading]);

  useEffect(() => {
    fetchNotifications();
    intervalRef.current = setInterval(() => fetchNotifications(), 30000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [fetchNotifications]);

  const handleMarkRead = async (id: string) => {
    try {
      const res = await fetch("/api/notifications/" + id + "/read", { method: "PATCH" });
      if (!res.ok) throw new Error("Failed to mark as read");
      setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, read: true } : n)));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to mark as read";
      toast.error(message);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const res = await fetch("/api/notifications/read-all", { method: "PATCH" });
      if (!res.ok) throw new Error("Failed to mark all as read");
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      toast.success("All notifications marked as read");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to mark all as read";
      toast.error(message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/notifications/" + id, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete notification");
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      toast.success("Notification deleted");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete notification";
      toast.error(message);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return diffMins + "m ago";
    if (diffHours < 24) return diffHours + "h ago";
    if (diffDays < 7) return diffDays + "d ago";
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  const renderedGroups: [TimeGroup, Notification[]][] = filter === "all"
    ? groupNotifications(notifications)
    : groupNotifications(notifications.filter((n) => !n.read));

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight text-foreground">
            Notifications
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm sm:text-base">
            {unreadCount > 0
              ? "You have " + unreadCount + " unread notification" + (unreadCount === 1 ? "" : "s")
              : "You are all caught up"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setLoading(true); fetchNotifications(); }}
            className="rounded-xl"
            aria-label="Refresh notifications"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          {(["all", "unread"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              size="sm"
              className="rounded-xl"
            >
              {f === "all" ? "All" : "Unread"}
            </Button>
          ))}
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllRead}
              className="rounded-xl text-primary hover:text-primary hover:bg-primary/5"
            >
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Error State */}
      {fetchError && !loading && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border-2 border-danger/20 bg-danger/5 px-4 py-3 text-sm">
          <AlertCircle className="size-5 text-danger shrink-0" />
          <span className="font-medium text-danger">{fetchError}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setLoading(true); setFetchError(null); fetchNotifications(); }}
            className="ml-auto text-primary"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="space-y-4" role="status" aria-label="Loading notifications">
          {[1, 2, 3].map((i) => (
            <NotificationSkeleton key={i} />
          ))}
          <span className="sr-only">Loading notifications...</span>
        </div>
      ) : notifications.length === 0 ? (
        <EmptyState
          icon="search"
          title="No notifications"
          description="You are all caught up — we will let you know when something arrives."
        />
      ) : (
        <motion.div
          key={filter}
          className="space-y-6"
          layout
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.06, when: "beforeChildren" },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          {renderedGroups.map(([group, items]) => (
            <div key={group}>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                {group}
              </h2>
              <div className="space-y-3">
                {items.map((notification) => {
                  const badgeVariant = TYPE_VARIANTS[notification.type] || "outline";
                  const badgeLabel = TYPE_LABELS[notification.type] || notification.type;
                  return (
                    <motion.div
                      key={notification._id}
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { type: "spring", stiffness: 300, damping: 24 },
                        },
                      }}
                    >
                      <Card
                        hoverable
                        glow={!notification.read}
                        className={cn(!notification.read && "bg-primary/[0.02]")}
                      >
                        <div className="p-4 sm:p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0 space-y-2.5">
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge variant={badgeVariant} className="capitalize rounded-full">
                                  {badgeLabel}
                                </Badge>
                                {!notification.read && (
                                  <span className="inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_0_3px_rgba(79,70,229,0.15)]" />
                                )}
                              </div>
                              <p className="text-sm text-foreground leading-relaxed">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>{formatRelativeTime(notification.createdAt)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 pt-1 shrink-0">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleMarkRead(notification._id)}
                                  title="Mark as read"
                                  className="rounded-xl hover:bg-primary/10 hover:text-primary"
                                >
                                  <CheckCheck className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(notification._id)}
                                title="Delete"
                                className="rounded-xl hover:bg-danger/10 hover:text-danger"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

