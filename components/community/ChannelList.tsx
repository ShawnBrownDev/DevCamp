"use client";

import { Hash, Lock, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Channel } from "@/lib/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useAdminCheck } from "@/lib/hooks/useAdminCheck";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateChannelForm } from "./CreateChannelForm";

interface ChannelListProps {
  channels: Channel[];
  selectedChannelId?: string | null;
  onSelectChannel: (channelId: string) => void;
}

export function ChannelList({ 
  channels, 
  selectedChannelId, 
  onSelectChannel 
}: ChannelListProps) {
  const { isAdmin } = useAdminCheck();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <ScrollArea className="h-full">
      <div className="space-y-1 p-3">
        <div className="flex items-center justify-between mb-2 px-4">
          <h2 className="text-lg font-semibold tracking-tight">Channels</h2>
          {isAdmin && (
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Channel</DialogTitle>
                </DialogHeader>
                <CreateChannelForm onSuccess={() => setShowCreateDialog(false)} />
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="space-y-1">
          {channels.map((channel) => (
            <Button
              key={channel.id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 px-4",
                selectedChannelId === channel.id && "bg-accent"
              )}
              onClick={() => onSelectChannel(channel.id)}
            >
              {channel.is_private ? (
                <Lock className="h-4 w-4 shrink-0" />
              ) : (
                <Hash className="h-4 w-4 shrink-0" />
              )}
              <span className="truncate">{channel.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}