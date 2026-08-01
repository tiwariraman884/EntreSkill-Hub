"use client";

import * as Sentry from "@sentry/nextjs";

export default function SentryErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>}>
      {children}
    </Sentry.ErrorBoundary>
  );
}
