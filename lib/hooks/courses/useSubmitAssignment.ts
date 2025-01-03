"use client";

import { useState } from 'react';
import { useAuthProvider } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export function useSubmitAssignment() {
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthProvider();

  const submitAssignment = async (assignmentId: string, content: string) => {
    if (!user) {
      throw new Error('Must be logged in to submit assignments');
    }

    try {
      setError(null);

      const { error: submitError } = await supabase
        .from('submissions')
        .upsert({
          assignment_id: assignmentId,
          user_id: user.id,
          content,
          submitted_at: new Date().toISOString()
        });

      if (submitError) throw submitError;
    } catch (err: any) {
      console.error('Error submitting assignment:', err);
      setError(err.message);
      throw err;
    }
  };

  return { submitAssignment, error };
}