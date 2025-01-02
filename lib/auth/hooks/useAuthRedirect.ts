"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './useAuth';

export function useAuthRedirect(redirectTo: string = '/dashboard') {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { returnUrl } = router.query;

  useEffect(() => {
    if (!isLoading && user) {
      router.push(returnUrl as string || redirectTo);
    }
  }, [user, isLoading, returnUrl, redirectTo, router]);

  return { user, isLoading };
}