import Navbar from "@/components/layout/Navbar";
import { PricingCards } from "@/components/pricing/PricingCards";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="px-4 py-20 md:py-32 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
            Choose the perfect plan for your coding journey. All plans include access to our Discord community.
          </p>
          <PricingCards />
        </div>
      </main>
    </div>
  );
}