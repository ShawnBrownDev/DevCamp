"use client";

import { Hash, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Channel } from "@/lib/types/community";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChannelListProps {
  channels: Channel[];
  selectedChannelId?: string;
  onSelectChannel: (channelId: string) => void;
}

export function ChannelList({ channels, selectedChannelId, onSelectChannel }: ChannelListProps) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-1 p-3">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Channels
        </h2>
        <div className="space-y-1">
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => onSelectChannel(channel.id)}
              className={cn(
                "w-full flex items-center gap-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                selectedChannelId === channel.id && "bg-accent text-accent-foreground"
              )}
            >
              {channel.is_private ? (
                <Lock className="h-4 w-4 shrink-0" />
              ) : (
                <Hash className="h-4 w-4 shrink-0" />
              )}
              <span className="truncate">{channel.name}</span>
            </button>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}