"use client";

import { AuthenticatedRoute } from "@/components/auth/AuthenticatedRoute";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { CourseFilters } from "@/components/courses/CourseFilters";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCoursesQuery } from "@/lib/hooks/courses/useCoursesQuery";
import { useCoursesFilter } from "@/lib/hooks/courses/useCoursesFilter";

export default function CoursesPage() {
  const { courses, loading, error } = useCoursesQuery();
  const {
    selectedLevel,
    setSelectedLevel,
    searchQuery,
    setSearchQuery,
    filteredCourses
  } = useCoursesFilter(courses);

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

  if (error) {
    return (
      <AuthenticatedRoute>
        <DashboardLayout>
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </DashboardLayout>
      </AuthenticatedRoute>
    );
  }

  return (
    <AuthenticatedRoute>
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Courses</h1>
              <p className="text-muted-foreground">
                Browse and continue your learning journey
              </p>
            </div>

            <CourseFilters
              selectedLevel={selectedLevel}
              onLevelChange={setSelectedLevel}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <CourseGrid courses={filteredCourses} />
          </div>
        </div>
      </DashboardLayout>
    </AuthenticatedRoute>
  );
}