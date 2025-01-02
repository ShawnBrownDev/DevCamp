"use client";

import { AlertCircle, Timer } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { AUTH_ERRORS } from "@/lib/auth/errors";

interface RateLimitAlertProps {
  onComplete: () => void;
}

export function RateLimitAlert({ onComplete }: RateLimitAlertProps) {
  const [timeLeft, setTimeLeft] = useState(AUTH_ERRORS.RATE_LIMIT.retryAfterSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(current => current - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  return (
    <Alert variant="warning" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center gap-2">
        {AUTH_ERRORS.RATE_LIMIT.message}
        <span className="flex items-center gap-1 text-sm">
          <Timer className="h-3 w-3" />
          {timeLeft}s
        </span>
      </AlertDescription>
    </Alert>
  );
}