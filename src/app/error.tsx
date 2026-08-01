"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import * as Sentry from "@sentry/nextjs";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] p-4 text-center">
      <div className="flex items-center justify-center size-20 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 mb-8">
        <AlertTriangle className="size-10" />
      </div>
      <h1 className="text-3xl font-bold font-heading mb-4">
        Something went wrong!
      </h1>
      <p className="text-muted-foreground max-w-md mb-8">
        We apologize for the inconvenience. An unexpected error has occurred and has been reported to our engineering team.
      </p>
      <div className="flex items-center gap-4">
        <Button onClick={() => reset()} variant="default">
          Try again
        </Button>
        <Link href="/">
          <Button variant="outline">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
