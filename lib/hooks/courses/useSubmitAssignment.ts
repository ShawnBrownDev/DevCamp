"use client";

import { useAuthProvider } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';


export function useSubmitAssignment() {
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthProvider();

  const submitAssignment = async (lessonId: string, content: string) => {
    if (!user) {
      throw new Error('Must be logged in to submit assignments');
    }

    try {
      setError(null);

      const { error: submitError } = await supabase
        .from('submissions')
        .upsert({
          lesson_id: lessonId,
          user_id: user.id,
          content,
          submitted_at: new Date().toISOString(),
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