export interface RealtimeMessage {
  id: string;
  topic: string;
  extension: string;
  payload: {
    content: string;
    user_id: string;
    channel_id: string;
    username: string;
    avatar_url?: string;
  };
  event: string;
  private: boolean;
  inserted_at: string;
}

export interface RealtimePresence {
  user_id: string;
  username: string;
  online_at: string;
}