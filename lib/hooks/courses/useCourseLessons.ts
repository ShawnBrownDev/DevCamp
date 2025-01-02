"use client";

import { useState, useEffect } from 'react';
import { useSupabase } from '@/lib/supabase/hooks';
import type { Lesson } from '@/lib/types/courses';

export function useCourseLessons(courseId: string) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabase();

  useEffect(() => {
    let mounted = true;

    async function loadLessons() {
      try {
        setLoading(true);
        const { data, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .eq('course_id', courseId)
          .order('order_index', { ascending: true });

        if (lessonsError) throw lessonsError;
        if (mounted) {
          setLessons(data || []);
          setError(null);
        }
      } catch (err: any) {
        console.error('Error loading lessons:', err);
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadLessons();

    // Subscribe to changes
    const subscription = supabase
      .channel(`lessons:${courseId}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'lessons',
          filter: `course_id=eq.${courseId}`
        },
        (payload) => {
          if (!mounted) return;

          // Handle different change types
          switch (payload.eventType) {
            case 'INSERT':
              setLessons(prev => [...prev, payload.new as Lesson].sort((a, b) => a.order_index - b.order_index));
              break;
            case 'UPDATE':
              setLessons(prev => prev.map(lesson => 
                lesson.id === payload.new.id ? payload.new as Lesson : lesson
              ).sort((a, b) => a.order_index - b.order_index));
              break;
            case 'DELETE':
              setLessons(prev => prev.filter(lesson => lesson.id !== payload.old.id));
              break;
          }
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [courseId, supabase]);

  return { lessons, loading, error };
}