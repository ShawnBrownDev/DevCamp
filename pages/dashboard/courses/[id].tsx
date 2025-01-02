"use client";

import { useRouter } from "next/router";
import { AuthenticatedRoute } from "@/components/auth/AuthenticatedRoute";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CourseLessons } from "@/components/courses/CourseLessons";
import { useCoursesQuery } from "@/lib/hooks/courses/useCoursesQuery";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CoursePage() {
  const router = useRouter();
  const { id } = router.query;
  const { courses, loading } = useCoursesQuery();
  
  const course = courses.find(c => c.id === id);

  if (loading) {
    return (
      <AuthenticatedRoute>
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <LoadingSpinner />
          </div>
        </DashboardLayout>
      </AuthenticatedRoute>
    );
  }

  if (!course) {
    return (
      <AuthenticatedRoute>
        <DashboardLayout>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Course not found</p>
            <Button 
              variant="link" 
              onClick={() => router.push('/dashboard/courses')}
              className="mt-4"
            >
              Back to Courses
            </Button>
          </div>
        </DashboardLayout>
      </AuthenticatedRoute>
    );
  }

  return (
    <AuthenticatedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/dashboard/courses')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
          </div>

          <CourseLessons courseId={course.id} />
        </div>
      </DashboardLayout>
    </AuthenticatedRoute>
  );
}