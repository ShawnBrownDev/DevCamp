"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layout/Navbar";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { plan, billing } = router.query;

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      // Here you would typically process the payment
      // For demo purposes, we'll just redirect to success page
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      router.push(`/checkout/success?plan=${plan}&billing=${billing}`);
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="container max-w-md mx-auto px-4 py-16">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-bold">Complete your purchase</h1>
              <p className="text-muted-foreground">
                Enter your payment details to continue
              </p>
            </div>
            
            <CheckoutForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}