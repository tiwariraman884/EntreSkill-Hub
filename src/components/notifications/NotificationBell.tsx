"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { NotificationBadge } from "./NotificationBadge";
import NotificationPanel from "./NotificationPanel";
import { Bell } from "lucide-react";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        ref={bellRef}
        variant="ghost"
        size="icon"
        className="relative rounded-xl hover:bg-indigo/10 transition-all duration-200"
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell className="size-5 text-thread" />
        <NotificationBadge count={3} />
      </Button>

      <NotificationPanel
        open={open}
        onClose={() => setOpen(false)}
        anchorRef={bellRef}
      />
    </>
  );
}
