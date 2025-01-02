"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/hooks/useAuth";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CourseProgress } from "@/components/dashboard/CourseProgress";
import { UpcomingLessons } from "@/components/dashboard/UpcomingLessons";
import { WeeklyActivity } from "@/components/dashboard/WeeklyActivity";
import { NextAssignments } from "@/components/dashboard/NextAssignments";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push({
        pathname: '/login',
        query: { returnUrl: '/dashboard' }
      });
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
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