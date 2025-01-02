"use client";

import { useState, useEffect } from 'react';
import { useSupabase } from '@/lib/supabase/hooks';
import { useAuth } from '@/lib/auth';

interface Submission {
  id: string;
  content: string;
  score?: number;
  feedback?: string;
  submitted_at: string;
  graded_at?: string;
}

export function useSubmission(lessonId: string) {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabase();
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;

    async function loadSubmission() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: submissionError } = await supabase
          .from('submissions')
          .select('*')
          .eq('lesson_id', lessonId)
          .eq('user_id', user.id)
          .maybeSingle(); // Use maybeSingle instead of single to handle no results gracefully

        if (submissionError) throw submissionError;

        if (mounted) {
          setSubmission(data);
          setError(null);
        }
      } catch (err: any) {
        console.error('Error loading submission:', err);
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadSubmission();

    // Subscribe to changes
    const subscription = supabase
      .channel(`submissions:${lessonId}:${user?.id}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'submissions',
          filter: `lesson_id=eq.${lessonId} AND user_id=eq.${user?.id}`
        },
        (payload) => {
          if (!mounted) return;
          
          if (payload.eventType === 'DELETE') {
            setSubmission(null);
          } else {
            setSubmission(payload.new as Submission);
          }
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [lessonId, user, supabase]);

  return { submission, loading, error };
}