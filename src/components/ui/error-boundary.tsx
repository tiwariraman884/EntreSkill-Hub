"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center" role="alert">
          <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center mb-6">
            <AlertTriangle className="size-8 text-danger" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold font-heading text-foreground mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mb-6">
            An unexpected error occurred. You can try reloading this section or return to the home page.
          </p>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={this.handleRetry}
              className="gap-2"
            >
              <RefreshCw className="size-4" />
              Try Again
            </Button>
            <Link href="/">
              <Button variant="default" className="gap-2">
                <Home className="size-4" />
                Go Home
              </Button>
            </Link>
          </div>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details className="mt-6 w-full max-w-lg text-left">
              <summary className="text-xs text-muted-foreground cursor-pointer font-medium mb-2">
                Error Details
              </summary>
              <pre className="text-xs text-danger bg-muted/50 p-4 rounded-xl overflow-auto max-h-48">
                {this.state.error.message}
                {"\n"}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, "children">
): React.FC<P> {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name || "Component"})`;
  return WrappedComponent;
}
