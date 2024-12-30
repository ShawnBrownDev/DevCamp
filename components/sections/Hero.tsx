"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Hero() {
  const { user } = useAuth();

  return (
    <section className="px-4 py-20 md:py-32 max-w-7xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Launch Your Career With Our
        <span className="text-primary block">Coding BootCamp</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Join our intensive program and learn modern web development from industry experts. Get hands-on experience with real-world projects and career guidance.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href={user ? "/dashboard" : "/signup"}>
          <Button size="lg" className="gap-2">
            {user ? "Go to Dashboard" : "Start Learning"} <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}