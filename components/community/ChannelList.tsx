"use client";

import { Hash, Lock, Plus, Trash } from "lucide-react";
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
import { supabase } from "@/lib/supabase";

interface ChannelListProps {
  channels: Channel[];
  selectedChannelId?: string;
  onSelectChannel: (channelId: string) => void;
}

export function ChannelList({ channels, selectedChannelId, onSelectChannel }: ChannelListProps) {
  const { isAdmin } = useAdminCheck();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleDeleteChannel = async (channelId: string) => {
    if (!confirm("Are you sure you want to delete this channel?")) return;

    try {
      const { error } = await supabase
        .from('channels')
        .delete()
        .eq('id', channelId);

      if (error) throw error;
    } catch (err) {
      console.error('Error deleting channel:', err);
      alert('Failed to delete channel');
    }
  };

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
            <div
              key={channel.id}
              className={cn(
                "flex items-center justify-between px-4 py-2 rounded-md transition-colors group",
                "hover:bg-accent hover:text-accent-foreground",
                selectedChannelId === channel.id && "bg-accent text-accent-foreground"
              )}
            >
              <Button
                variant="ghost"
                className="flex-1 flex items-center justify-start gap-x-2 p-0 h-auto font-medium"
                onClick={() => onSelectChannel(channel.id)}
              >
                {channel.is_private ? (
                  <Lock className="h-4 w-4 shrink-0" />
                ) : (
                  <Hash className="h-4 w-4 shrink-0" />
                )}
                <span className="truncate">{channel.name}</span>
              </Button>
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100"
                  onClick={() => handleDeleteChannel(channel.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}