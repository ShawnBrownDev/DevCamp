"use client";

import { useState, useEffect } from 'react';
import type { Course, CourseProgress } from '@/lib/types/courses';
import { supabase } from '@/lib/supabase';

const COURSES_QUERY = `
  *,
  course_progress!course_id (
    completed_lessons,
    total_lessons,
    completion_percentage,
    last_activity
  )
`;

export function useCoursesQuery() {
  const [courses, setCourses] = useState<(Course & { progress?: CourseProgress })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true);
        setError(null);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data, error: coursesError } = await supabase
          .from('courses')
          .select(COURSES_QUERY)
          .order('created_at', { ascending: false });

        if (coursesError) throw coursesError;

        // Transform the data to match the expected format
        const coursesWithProgress = data?.map(course => ({
          ...course,
          progress: course.course_progress?.[0] || null
        })) || [];

        setCourses(coursesWithProgress);
      } catch (err: any) {
        console.error('Error loading courses:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, [supabase]);

  return { courses, loading, error };
}