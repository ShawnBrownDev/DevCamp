"use client";

import { create } from 'zustand';
import type { Channel } from '@/lib/types/community';

interface ChannelStore {
  channels: Channel[];
  setChannels: (channels: Channel[]) => void;
  addChannel: (channel: Channel) => void;
  updateChannel: (channel: Channel) => void;
  removeChannel: (channelId: string) => void;
}

export const useChannelStore = create<ChannelStore>((set) => ({
  channels: [],
  setChannels: (channels) => set({ channels }),
  addChannel: (channel) => 
    set((state) => ({ 
      channels: [...state.channels, channel] 
    })),
  updateChannel: (channel) =>
    set((state) => ({
      channels: state.channels.map((ch) =>
        ch.id === channel.id ? channel : ch
      ),
    })),
  removeChannel: (channelId) =>
    set((state) => ({
      channels: state.channels.filter((ch) => ch.id !== channelId),
    })),
}));