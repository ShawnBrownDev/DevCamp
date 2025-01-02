"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/lib/types/chat";

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
}

export function UserAvatar({ user, size = "md" }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };

  const initials = user.first_name && user.last_name
    ? `${user.first_name[0]}${user.last_name[0]}`
    : user.username[0].toUpperCase();

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={user.avatar_url || undefined} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}