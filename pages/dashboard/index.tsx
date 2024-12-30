"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CourseProgress } from "@/components/dashboard/CourseProgress";
import { UpcomingLessons } from "@/components/dashboard/UpcomingLessons";
import { WeeklyActivity } from "@/components/dashboard/WeeklyActivity";
import { NextAssignments } from "@/components/dashboard/NextAssignments";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to access the dashboard.</div>;
  }

  return (
    <DashboardLayout>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CourseProgress />
        <UpcomingLessons />
        <WeeklyActivity />
        <NextAssignments className="md:col-span-2 lg:col-span-3" />
      </div>
    </DashboardLayout>
  );
}