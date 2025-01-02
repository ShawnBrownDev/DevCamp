"use client";

import { useState, useEffect } from 'react';
import { useSupabase } from '@/lib/supabase/hooks';
import type { AdminSubmission } from '@/lib/types/admin';

const SUBMISSIONS_QUERY = `
  *,
  user:users (
    id,
    username,
    first_name,
    last_name
  ),
  assignment:assignments (
    id,
    title,
    course_id
  )
`;

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<AdminSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabase();

  useEffect(() => {
    async function loadSubmissions() {
      try {
        setLoading(true);
        const { data, error: submissionsError } = await supabase
          .from('submissions')
          .select(SUBMISSIONS_QUERY)
          .order('submitted_at', { ascending: false });

        if (submissionsError) throw submissionsError;
        setSubmissions(data || []);
      } catch (err: any) {
        console.error('Error loading submissions:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadSubmissions();
  }, [supabase]);

  const gradeSubmission = async (
    submissionId: string, 
    score: number, 
    feedback: string
  ) => {
    try {
      const { error } = await supabase
        .from('submissions')
        .update({ 
          score,
          feedback,
          graded_at: new Date().toISOString()
        })
        .eq('id', submissionId);

      if (error) throw error;

      // Update local state
      setSubmissions(prev => 
        prev.map(sub => 
          sub.id === submissionId 
            ? { 
                ...sub, 
                score, 
                feedback, 
                graded_at: new Date().toISOString() 
              } 
            : sub
        )
      );
    } catch (err: any) {
      console.error('Error grading submission:', err);
      throw err;
    }
  };

  return { submissions, loading, error, gradeSubmission };
}