"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  username: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg";
}

export function UserAvatar({ username, avatarUrl, size = "md" }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };

  const getInitials = () => username[0].toUpperCase();

  return (
    <Avatar className={sizeClasses[size]}>
      {avatarUrl && (
        <AvatarImage 
          src={avatarUrl} 
          alt={username} 
        />
      )}
      <AvatarFallback>{getInitials()}</AvatarFallback>
    </Avatar>
  );
}