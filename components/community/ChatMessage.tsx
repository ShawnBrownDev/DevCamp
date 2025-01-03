"use client";

import { formatDistanceToNow } from "date-fns";
import { UserAvatar } from "@/components/community/UserAvatar";
import type { Message } from "@/lib/types/chat";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  if (!message?.user_data) return null;

  return (
    <div className="flex items-start gap-4 p-4 hover:bg-accent/5 transition-colors">
      <UserAvatar 
        username={message.user_data.username}
        avatarUrl={message.user_data.avatar_url}
        size="md"
      />
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {message.user_data.first_name && message.user_data.last_name 
              ? `${message.user_data.first_name} ${message.user_data.last_name}`
              : message.user_data.username}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(message.created_at), {
              addSuffix: true,
            })}
          </span>
        </div>
        <p className="text-sm text-foreground whitespace-pre-wrap break-words">
          {message.content}
        </p>
      </div>
    </div>
  );
}