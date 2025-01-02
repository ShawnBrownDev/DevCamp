"use client";

import { useState } from 'react';
import { useSupabase } from '@/lib/supabase/hooks';
import type { Course } from '@/lib/types/courses';

export function useCourseManagement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabase();

  const createCourse = async (courseData: Omit<Course, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: createError } = await supabase
        .from('courses')
        .insert([courseData])
        .select()
        .single();

      if (createError) throw createError;
      return data;
    } catch (err: any) {
      console.error('Error creating course:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (courseId: string, courseData: Partial<Course>) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: updateError } = await supabase
        .from('courses')
        .update(courseData)
        .eq('id', courseId)
        .select()
        .single();

      if (updateError) throw updateError;
      return data;
    } catch (err: any) {
      console.error('Error updating course:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { error: deleteError } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);

      if (deleteError) throw deleteError;
    } catch (err: any) {
      console.error('Error deleting course:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createCourse,
    updateCourse,
    deleteCourse
  };
}