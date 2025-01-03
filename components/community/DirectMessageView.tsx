"use client";

import { useDirectMessages } from "@/lib/hooks/chat/useDirectMessages";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { UserAvatar } from "../chat/UserAvatar";
import type { User } from "@/lib/types/chat";

interface DirectMessageViewProps {
  recipient: User;
}

export function DirectMessageView({ recipient }: DirectMessageViewProps) {
  const { messages, error, isLoading, sendMessage } = useDirectMessages(recipient.id);

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4">
        <div className="flex items-center gap-3">
          <UserAvatar user={recipient} size="sm" />
          <div>
            <h3 className="font-medium">
              {recipient.first_name && recipient.last_name
                ? `${recipient.first_name} ${recipient.last_name}`
                : recipient.username}
            </h3>
            {recipient.bio && (
              <p className="text-sm text-muted-foreground truncate">{recipient.bio}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onEdit={async () => {}}
              onDelete={async () => {}}
            />
          ))
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="mx-4 my-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <ChatInput 
        onSendMessage={sendMessage}
        placeholder={`Message ${recipient.username}...`}
      />
    </div>
  );
}