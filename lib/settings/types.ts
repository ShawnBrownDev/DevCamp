```typescript
export interface NotificationSettings {
  emailNotifications: {
    courseUpdates: boolean;
    assignmentReminders: boolean;
    communityMessages: boolean;
  };
  pushNotifications: {
    directMessages: boolean;
    mentions: boolean;
    threadReplies: boolean;
  };
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  features: {
    betaFeatures: boolean;
    advancedChat: boolean;
    customThemes: boolean;
  };
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  activeSessions: {
    id: string;
    device: string;
    lastActive: string;
    location: string;
  }[];
}
```