import { CheckoutFlowParams } from './types';
import { ROUTES } from '@/lib/navigation/routes';

export function createCheckoutQuery(params: CheckoutFlowParams) {
  return {
    plan: params.plan.toLowerCase(),
    billing: params.isYearly ? 'yearly' : 'monthly',
    ...(params.returnUrl ? { returnUrl: params.returnUrl } : {})
  };
}

export function getCheckoutRedirectPath(isAuthenticated: boolean, params: CheckoutFlowParams) {
  const query = createCheckoutQuery(params);
  
  return {
    pathname: isAuthenticated ? ROUTES.CHECKOUT : ROUTES.SIGNUP,
    query
  };
}