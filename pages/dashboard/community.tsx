"use client";

import { useState } from "react";
import { AuthenticatedRoute } from "@/components/auth/AuthenticatedRoute";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ChannelList } from "@/components/community/ChannelList";
import { ChatContainer } from "@/components/community/ChatContainer";
import { EmptyState } from "@/components/community/EmptyState";
import { useChannels } from "@/lib/hooks/chat/useChannels";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function CommunityPage() {
  const { channels, loading } = useChannels();
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);

  if (loading) {
    return (
      <AuthenticatedRoute>
        <DashboardLayout>
          <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
            <LoadingSpinner />
          </div>
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
              selectedChannelId={selectedChannelId}
              onSelectChannel={setSelectedChannelId}
            />
          </div>
          <div className="flex-1">
            {selectedChannelId ? (
              <ChatContainer channelId={selectedChannelId} />
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