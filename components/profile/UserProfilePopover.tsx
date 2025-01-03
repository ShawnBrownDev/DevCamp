"use client";

import { UserAvatar } from "@/components/chat/UserAvatar";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { User } from "@/lib/types/chat";

interface UserProfilePopoverProps {
  user: User;
  children: React.ReactNode;
}

export function UserProfilePopover({ user, children }: UserProfilePopoverProps) {
  // Early return if user is invalid
  if (!user?.username) {
    return <>{children}</>;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="relative">
          <div className="h-20 bg-gradient-to-r from-primary/10 to-primary/5" />
          <div className="absolute -bottom-6 left-4">
            <UserAvatar user={user} size="lg" />
          </div>
        </div>
        <div className="p-4 pt-8 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">{user.username}</h4>
              {user.first_name && user.last_name && (
                <p className="text-sm text-muted-foreground">
                  {user.first_name} {user.last_name}
                </p>
              )}
            </div>
            <Badge variant="outline" className="capitalize">
              {user.role || 'user'}
            </Badge>
          </div>
          {user.bio && (
            <p className="text-sm text-muted-foreground border-t pt-2">
              {user.bio}
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}