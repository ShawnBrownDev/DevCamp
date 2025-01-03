"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AuthenticatedRoute } from "@/components/auth/AuthenticatedRoute";
import { ProfileCard } from "@/components/profile/ProfileCard";

export default function ProfilePage() {
  return (
    <AuthenticatedRoute>
      <DashboardLayout>
        <div className="container max-w-4xl mx-auto py-8">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Profile</h1>
              <p className="text-muted-foreground">
                Manage your personal information and preferences
              </p>
            </div>

            <ProfileCard />
          </div>
        </div>
      </DashboardLayout>
    </AuthenticatedRoute>
  );
}