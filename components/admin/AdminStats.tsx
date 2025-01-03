"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap, Activity } from "lucide-react";
import { useAdminStats } from "@/lib/hooks/admin/useAdminStats";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function AdminStats() {
  const { stats, loading, error } = useAdminStats();

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
              <LoadingSpinner className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-destructive">Error loading admin stats</p>
        </CardContent>
      </Card>
    );
  }

  const items = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
    },
    {
      title: "Active Users",
      value: stats?.activeUsers || 0,
      icon: Activity,
    },
    {
      title: "Total Courses",
      value: stats?.totalCourses || 0,
      icon: BookOpen,
    },
    {
      title: "Total Enrollments",
      value: stats?.totalEnrollments || 0,
      icon: GraduationCap,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.title} className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}