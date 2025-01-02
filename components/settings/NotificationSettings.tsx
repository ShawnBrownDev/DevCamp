"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>
            Configure when you want to receive email notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="course-updates">Course Updates</Label>
            <Switch id="course-updates" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="assignment-reminders">Assignment Reminders</Label>
            <Switch id="assignment-reminders" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="community-messages">Community Messages</Label>
            <Switch id="community-messages" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>
            Configure your push notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="direct-messages">Direct Messages</Label>
            <Switch id="direct-messages" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="mentions">Mentions</Label>
            <Switch id="mentions" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="thread-replies">Thread Replies</Label>
            <Switch id="thread-replies" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}