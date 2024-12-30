import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { plan, billing } = router.query;

  useEffect(() => {
    if (router.isReady && (!plan || !billing)) {
      router.push('/pricing');
    }
  }, [plan, billing, router.isReady, router]);

  if (!router.isReady || !plan || !billing) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="container max-w-md mx-auto px-4 py-16 text-center">
          <div className="mb-8 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Thank you for your purchase!</h1>
          <p className="text-muted-foreground mb-8">
            You now have access to all {plan} plan features with {billing} billing.
          </p>
          <Button onClick={() => router.push('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}