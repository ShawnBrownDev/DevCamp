"use client";

import { useState } from "react";
import { AuthenticatedRoute } from "@/components/auth/AuthenticatedRoute";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ChannelList } from "@/components/community/ChannelList";
import { ChatContainer } from "@/components/community/ChatContainer";
import { LoadingState } from "@/components/community/LoadingState";
import { EmptyState } from "@/components/community/EmptyState";
import { useCommunity, useMessages } from "@/lib/hooks";

export default function CommunityPage() {
  const { channels, loading: channelsLoading, error: channelsError } = useCommunity();
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  
  const { 
    messages, 
    error: messagesError, 
    isLoading: messagesLoading,
    sendMessage,
    editMessage,
    deleteMessage
  } = useMessages(selectedChannelId);

  if (channelsLoading) {
    return (
      <AuthenticatedRoute>
        <DashboardLayout>
          <LoadingState />
        </DashboardLayout>
      </AuthenticatedRoute>
    );
  }

  if (channelsError) {
    return (
      <AuthenticatedRoute>
        <DashboardLayout>
          <EmptyState 
            title="Unable to load community"
            description={channelsError}
          />
        </DashboardLayout>
      </AuthenticatedRoute>
    );
  }

  return (
    <AuthenticatedRoute>
      <DashboardLayout>
        <div className="flex h-[calc(100vh-4rem)]">
          <div className="w-64 border-r bg-muted/10">
            <ChannelList
              channels={channels}
              selectedChannelId={selectedChannelId || undefined}
              onSelectChannel={setSelectedChannelId}
            />
          </div>
          <div className="flex-1">
            {selectedChannelId ? (
              <ChatContainer
                messages={messages}
                onSendMessage={sendMessage}
                onEditMessage={editMessage}
                onDeleteMessage={deleteMessage}
                isLoading={messagesLoading}
                error={messagesError}
              />
            ) : (
              <EmptyState
                title="Select a channel"
                description="Choose a channel from the sidebar to start chatting"
              />
            )}
          </div>
        </div>
      </DashboardLayout>
    </AuthenticatedRoute>
  );
}