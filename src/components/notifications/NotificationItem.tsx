"use client";

import { type Notification } from "@/lib/notification-types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";

interface NotificationItemProps {
  notification: Notification;
  onMarkRead?: (id: string) => void;
  onMarkUnread?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function NotificationItem({ notification, onMarkRead, onMarkUnread, onDelete }: NotificationItemProps) {
  return (
    <div
      className={cn(
        "group relative flex gap-3 p-4 rounded-xl transition-all duration-200",
        notification.read
          ? "bg-muted/20 hover:bg-muted/40"
          : "bg-indigo/5 hover:bg-indigo/10 border border-indigo/10"
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              notification.read ? "bg-muted" : "bg-indigo/10"
            )}>
              {notification.read ? (
                <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-indigo animate-pulse" />
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className={cn(
                  "text-sm font-semibold leading-tight",
                  !notification.read && "text-indigo"
                )}>
                  {notification.title}
                </p>
                <p className="text-xs text-thread mt-1 leading-relaxed">
                  {notification.description}
                </p>
                <p className="text-[11px] text-thread/70 mt-1.5 font-medium">
                  {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 rounded-full bg-indigo shrink-0 mt-1" />
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!notification.read ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-lg hover:bg-indigo/10"
            onClick={() => onMarkRead?.(notification.id)}
          >
            <CheckCircle2 className="size-3.5 text-indigo" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-lg hover:bg-muted"
            onClick={() => onMarkUnread?.(notification.id)}
          >
            <Circle className="size-3.5 text-thread" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-lg hover:bg-danger/10"
          onClick={() => onDelete?.(notification.id)}
        >
          <svg className="size-3.5 text-thread hover:text-danger" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
