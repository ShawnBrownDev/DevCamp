"use client";

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuthProvider } from '@/lib/auth'

interface AuthenticatedRouteProps {
  children: React.ReactNode;
}

export function AuthenticatedRoute({ children }: AuthenticatedRouteProps) {
  const router = useRouter();
  const { user, isLoading } = useAuthProvider();

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      if (!isLoading && !user && mounted) {
        try {
          await router.push(`/login?returnUrl=${encodeURIComponent(router.pathname)}`);
        } catch (error: any) {
          // Ignore navigation cancellation errors
          if (!error.cancelled) {
            console.error('Navigation error:', error);
          }
        }
      }
    }

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}