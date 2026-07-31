"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";

interface Notification {
  _id: string;
  type: string;
  category: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface UseRealtimeNotificationsOptions {
  channelName?: string;
  supabaseAnonKey?: string;
  supabaseUrl?: string;
  pollingInterval?: number;
  enabled?: boolean;
  onNewNotification?: (notification: Notification) => void;
}

type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

export function useRealtimeNotifications({
  channelName,
  supabaseAnonKey,
  supabaseUrl,
  pollingInterval = 30000,
  enabled = true,
  onNewNotification,
}: UseRealtimeNotificationsOptions = {}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected");
  const [isOffline, setIsOffline] = useState(false);

  const lastNotificationIdRef = useRef<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 10;
  const connectWebSocketRef = useRef<() => void>(() => {});

  // Use refs to avoid stale closures and hoisting issues
  const onNewNotificationRef = useRef(onNewNotification);
  const wsConfigRef = useRef({ channelName, supabaseAnonKey, supabaseUrl });

  // Update refs on render (safe pattern for refs vs state)
  useEffect(() => {
    onNewNotificationRef.current = onNewNotification;
    wsConfigRef.current = { channelName, supabaseAnonKey, supabaseUrl };
  });

  const fetchNotifications = useCallback(async (showToast = false) => {
    try {
      setError(null);
      const res = await fetch("/api/notifications");
      if (!res.ok) throw new Error("Failed to fetch notifications");
      const data = await res.json();
      const items = data.notifications || [];
      setNotifications(items);
      const uCount = items.filter((n: Notification) => !n.read).length;
      setUnreadCount(uCount);

      if (showToast && items.length > 0) {
        const latest = items[0];
        if (latest._id !== lastNotificationIdRef.current && !latest.read) {
          lastNotificationIdRef.current = latest._id;
          onNewNotificationRef.current?.(latest);
          toast(latest.message || latest.title, {
            description: latest.type,
            duration: 4000,
          });
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Define connectWebSocket via ref to break circular dependency
  useEffect(() => {
    connectWebSocketRef.current = () => {
      const { channelName: ch, supabaseAnonKey: key, supabaseUrl: url } = wsConfigRef.current;
      if (!ch || !url || !key) return;

      try {
        setConnectionStatus("connecting");
        const wsUrl = url.replace("https", "wss") + "/realtime/v1/websocket?apikey=" + key;
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          setConnectionStatus("connected");
          reconnectAttemptsRef.current = 0;

          ws.send(JSON.stringify({
            type: "subscribe",
            channel: ch,
            config: { broadcast: { ack: false }, presence: { key: "" } },
          }));

          heartbeatRef.current = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: "heartbeat" }));
            }
          }, 15000);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === "broadcast" && data.payload?.type === "notification") {
              const newNotif = data.payload.notification as Notification;
              setNotifications((prev) => [newNotif, ...prev]);
              setUnreadCount((prev) => prev + 1);
              onNewNotificationRef.current?.(newNotif);
              toast(newNotif.message || newNotif.title, {
                description: newNotif.type,
                duration: 4000,
              });
            }
          } catch {
            // ignore
          }
        };

        ws.onerror = () => {
          setConnectionStatus("error");
        };

        ws.onclose = () => {
          setConnectionStatus("disconnected");
          if (heartbeatRef.current) clearInterval(heartbeatRef.current);

          if (reconnectAttemptsRef.current < maxReconnectAttempts) {
            const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
            reconnectTimeoutRef.current = setTimeout(() => {
              reconnectAttemptsRef.current++;
              connectWebSocketRef.current();
            }, delay);
          }
        };
      } catch {
        setConnectionStatus("error");
      }
    };
  }, []);

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      fetchNotifications();
    };
    const handleOffline = () => {
      setIsOffline(true);
      setConnectionStatus("disconnected");
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [fetchNotifications]);

  // Initialize connection
  useEffect(() => {
    if (!enabled) return;

    fetchNotifications();

    const { channelName: ch, supabaseAnonKey: key, supabaseUrl: url } = wsConfigRef.current;
    if (ch && url && key) {
      connectWebSocketRef.current();
    }

    intervalRef.current = setInterval(() => fetchNotifications(true), pollingInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (wsRef.current) wsRef.current.close();
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, [enabled, pollingInterval, fetchNotifications]);

  const markAsRead = useCallback(async (id: string) => {
    setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, read: true } : n)));
    setUnreadCount((prev) => Math.max(0, prev - 1));

    try {
      const res = await fetch(`/api/notifications/${id}/read`, { method: "PATCH" });
      if (!res.ok) throw new Error("Failed to mark as read");
    } catch {
      setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, read: false } : n)));
      setUnreadCount((prev) => prev + 1);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    const prevNotifications = [...notifications];
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);

    try {
      const res = await fetch("/api/notifications/read-all", { method: "PATCH" });
      if (!res.ok) throw new Error("Failed to mark all as read");
    } catch {
      setNotifications(prevNotifications);
      setUnreadCount(prevNotifications.filter((n) => !n.read).length);
    }
  }, [notifications]);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    connectionStatus,
    isOffline,
    refetch: () => fetchNotifications(true),
    markAsRead,
    markAllAsRead,
  };
}

