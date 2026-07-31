"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NotificationItem } from "./NotificationItem";
import { 
  NOTIFICATIONS, 
  NOTIFICATION_CATEGORIES
} from "@/data/mock-notifications";
import type { 
  Notification,
  NotificationCategory
} from "@/lib/notification-types";
import { 
  Search, Settings, CheckCheck, Trash2, ExternalLink,
  X, Inbox
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}

export default function NotificationPanel({ open, onClose, anchorRef }: NotificationPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<NotificationCategory>("all");
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const panelRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 64, right: 24 });

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  useEffect(() => {
    if (open && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 12, right: 24 });
    }
  }, [open, anchorRef]);

  const filtered = useMemo(() => {
    let result = notifications;
    
    if (category === "unread") {
      result = result.filter(n => !n.read);
    } else if (category !== "all") {
      result = result.filter(n => n.category === category);
    }
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(n => 
        n.title.toLowerCase().includes(q) || 
        n.description.toLowerCase().includes(q)
      );
    }
    
    return result;
  }, [notifications, category, searchQuery]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markUnread = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: false } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node) && 
          anchorRef.current && !anchorRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[45]" onClick={onClose} />
      
      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed z-50 w-[420px] max-h-[650px] bg-white/95 backdrop-blur-2xl border-2 border-border/40 rounded-2xl shadow-2xl shadow-indigo/10 flex flex-col animate-scale-in"
        style={{
          top: position.top,
          right: position.right,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold font-heading">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-indigo/10 text-indigo text-xs font-bold">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Link href="/settings" className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8 rounded-lg hover:bg-indigo/10" })}>
              <Settings className="size-4 text-thread" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg hover:bg-muted"
              onClick={onClose}
            >
              <X className="size-4 text-thread" />
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 p-3 border-b border-border/40">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs font-semibold text-indigo hover:bg-indigo/10"
            onClick={markAllAsRead}
          >
            <CheckCheck className="size-3.5 mr-1.5" />
            Mark all as read
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs font-semibold text-danger hover:bg-danger/10"
            onClick={clearAll}
          >
            <Trash2 className="size-3.5 mr-1.5" />
            Clear all
          </Button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-border/40">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-thread" />
            <Input
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm border-2 border-transparent focus:border-indigo/30 bg-muted/30"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-2 border-b border-border/40 overflow-x-auto">
          {NOTIFICATION_CATEGORIES.map((cat: { value: NotificationCategory; label: string }) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200",
                category === cat.value
                  ? "bg-indigo text-white shadow-md shadow-indigo/20"
                  : "text-thread hover:text-ink hover:bg-muted"
              )}
            >
              {cat.label}
              {cat.value === "unread" && unreadCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-indigo/20 text-indigo text-[10px] font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-3">
                <Inbox className="size-8 text-thread/50" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">No notifications</p>
              <p className="text-xs text-thread">You&apos;re all caught up!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.slice(0, 20).map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={markRead}
                  onMarkUnread={markUnread}
                  onDelete={deleteNotification}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="p-3 border-t border-border/40">
            <Link href="/notifications" className={buttonVariants({ variant: "ghost", className: "w-full h-9 text-sm font-semibold text-indigo hover:bg-indigo/10" })}>
              View all notifications
              <ExternalLink className="size-3.5 ml-1.5" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
