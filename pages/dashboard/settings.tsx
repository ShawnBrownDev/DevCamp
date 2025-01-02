"use client";

import { useState } from "react";
import { AuthenticatedRoute } from "@/components/auth/AuthenticatedRoute";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SettingsTabs } from "@/components/settings/SettingsTabs";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { PreferencesSettings } from "@/components/settings/PreferencesSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <AuthenticatedRoute>
      <DashboardLayout>
        <div className="container max-w-4xl mx-auto py-8">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account settings and preferences
              </p>
            </div>

            <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="space-y-8">
              {activeTab === "profile" && <ProfileSettings />}
              {activeTab === "preferences" && <PreferencesSettings />}
              {activeTab === "notifications" && <NotificationSettings />}
              {activeTab === "security" && <SecuritySettings />}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthenticatedRoute>
  );
}