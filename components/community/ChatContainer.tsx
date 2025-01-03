"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useMessages } from "@/lib/hooks/chat/useMessages";

interface ChatContainerProps {
  channelId: string;
}

export function ChatContainer({ channelId }: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, error, isLoading, sendMessage } = useMessages(channelId);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    scrollToBottom();
    // Add a small delay to ensure new content is rendered
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {error && (
        <Alert variant="destructive" className="mx-4 my-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
}