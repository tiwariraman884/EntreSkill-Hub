"use client";

import NotificationBell from "@/components/notifications/NotificationBell";
import ProfileDropdown from "@/components/profile/ProfileDropdown";

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  return (
    <div className="flex items-center gap-2">
      <NotificationBell />
      <ProfileDropdown user={user} />
    </div>
  );
}
