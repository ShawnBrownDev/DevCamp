"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { AdminSubmission } from '@/lib/types/admin';

const SUBMISSIONS_QUERY = `
  id,
  content,
  score,
  feedback,
  submitted_at,
  graded_at,
  user:users!user_id (
    id,
    username,
    first_name,
    last_name
  ),
  assignment:assignments!assignment_id (
    id,
    title,
    course_id
  )
`;

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<AdminSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadSubmissions() {
      try {
        setLoading(true);
        const { data, error: submissionsError } = await supabase
          .from('submissions')
          .select(SUBMISSIONS_QUERY)
          .order('submitted_at', { ascending: false });

        if (submissionsError) throw submissionsError;
        if (mounted) {
          setSubmissions(data || []);
          setError(null);
        }
      } catch (err: any) {
        console.error('Error loading submissions:', err);
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadSubmissions();

    // Subscribe to changes
    const subscription = supabase
      .channel('submissions_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'submissions' },
        () => {
          if (!mounted) return;
          loadSubmissions(); // Reload all submissions to get fresh data with relations
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const gradeSubmission = async (
    submissionId: string,
    score: number,
    feedback: string
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.rpc('grade_submission', {
        submission_id: submissionId,
        score,
        feedback,
        grader_id: user.id
      });

      if (error) throw error;

      // Submission will be updated via realtime subscription
    } catch (err: any) {
      console.error('Error grading submission:', err);
      throw err;
    }
  };

  return { submissions, loading, error, gradeSubmission };
}