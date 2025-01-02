"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { UserAvatar } from "@/components/chat/UserAvatar";
import { MessageActions } from "./MessageActions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth";
import type { Message } from "@/lib/types/chat";

interface ChatMessageProps {
  message: Message;
  onEdit: (messageId: string, content: string) => Promise<void>;
  onDelete: (messageId: string) => Promise<void>;
}

export function ChatMessage({ message, onEdit, onDelete }: ChatMessageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const isOwnMessage = user?.id === message.user_id;

  const handleEdit = async () => {
    if (!editedContent.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onEdit(message.id, editedContent);
      setIsEditing(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onDelete(message.id);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-start gap-4 p-4 group hover:bg-accent/5">
      <UserAvatar user={message.user} />
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {message.user?.first_name && message.user?.last_name
              ? `${message.user.first_name} ${message.user.last_name}`
              : message.user?.username}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
          </span>
        </div>

        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[60px]"
              disabled={isSubmitting}
            />
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={handleEdit}
                disabled={isSubmitting || !editedContent.trim()}
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsEditing(false);
                  setEditedContent(message.content);
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-foreground">{message.content}</p>
        )}
      </div>

      {isOwnMessage && !isEditing && (
        <MessageActions
          onEdit={() => setIsEditing(true)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}