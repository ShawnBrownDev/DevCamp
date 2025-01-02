```typescript
"use client";

import { useState, useEffect } from 'react';
import { useSupabase } from '@/lib/supabase/hooks';
import type { Course, CourseProgress } from '@/lib/types/courses';

export function useCourses() {
  const [courses, setCourses] = useState<(Course & { progress?: CourseProgress })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabase();

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true);
        const { data, error: coursesError } = await supabase
          .from('courses')
          .select(`
            *,
            progress:progress(
              completed_lessons,
              total_lessons,
              last_accessed,
              completion_percentage
            )
          `)
          .order('created_at', { ascending: false });

        if (coursesError) throw coursesError;
        setCourses(data || []);
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
```