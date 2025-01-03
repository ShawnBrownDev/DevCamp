import { NextRouter } from 'next/router';
import { supabase } from '../supabase'


interface CheckoutFlowParams {
  plan: string;
  isYearly: boolean;
  router: NextRouter;
}

export async function handleCheckoutFlow({ plan, isYearly, router }: CheckoutFlowParams) {
  if (!supabase) {
    throw new Error('Supabase connection not available')
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    throw error
  }

  const query = {
    plan,
    billing: isYearly ? 'yearly' : 'monthly',
  }

  if (!session) {
    // If not authenticated, redirect to signup
    router.push({
      pathname: '/signup',
      query: {
        ...query,
        returnUrl: '/checkout',
      },
    })
    return
  }

  // If authenticated, proceed to checkout
  router.push({
    pathname: '/checkout',
    query,
  })
}