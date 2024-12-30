export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PRICING: '/pricing',
  CHECKOUT: '/checkout',
  DASHBOARD: '/dashboard',
} as const;

export function createAuthRedirectUrl(returnUrl?: string, params?: Record<string, string>) {
  const query = new URLSearchParams(params);
  if (returnUrl) {
    query.set('returnUrl', returnUrl);
  }
  
  const queryString = query.toString();
  return `${ROUTES.SIGNUP}${queryString ? `?${queryString}` : ''}`;
}