"use client";

import { UserProfilePopover } from "@/components/profile/UserProfilePopover";
import type { User } from "@/lib/types/chat";

interface MessageAuthorProps {
  user: User;
}

export function MessageAuthor({ user }: MessageAuthorProps) {
  if (!user?.username) {
    return <span className="font-medium text-muted-foreground">Unknown User</span>;
  }

  const displayName = user.first_name && user.last_name
    ? `${user.first_name} ${user.last_name}`
    : user.username;

  return (
    <UserProfilePopover user={user}>
      <button className="font-medium hover:underline">
        {displayName}
      </button>
    </UserProfilePopover>
  );
}