"use client";

import { create } from 'zustand';
import type { Message } from '@/lib/types/community';

interface MessageStore {
  messages: Message[];
  channelId: string | null;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  clear: () => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  channelId: null,
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({
      messages: [message, ...state.messages],
    })),
  clear: () => set({ messages: [], channelId: null }),
}));