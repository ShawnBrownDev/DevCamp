import { type NextRouter } from 'next/router';

export async function handleAuthRedirect(
  router: NextRouter, 
  isAuthenticated: boolean,
  returnUrl?: string
) {
  try {
    if (isAuthenticated) {
      await router.push(returnUrl || '/dashboard');
    } else {
      await router.push('/login');
    }
  } catch (error: any) {
    // Ignore cancelled navigation errors
    if (error?.cancelled) return;
    console.error('Navigation error:', error);
  }
}