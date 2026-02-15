'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import * as Sentry from '@sentry/nextjs';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { analytics } from '@/lib/analytics';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Fallback component to render on error */
  fallback?: ReactNode;
  /** Custom error handler */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Component name for error tracking */
  componentName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary - Catches JavaScript errors in child components
 *
 * Wraps components to prevent entire app crashes and provides
 * graceful error handling with Sentry reporting.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError, componentName } = this.props;

    // Report to Sentry
    Sentry.withScope((scope) => {
      scope.setTag('component', componentName ?? 'unknown');
      scope.setExtra('componentStack', errorInfo.componentStack);
      Sentry.captureException(error);
    });

    // Track in analytics
    analytics.track('error_occurred', {
      error_type: error.name,
      error_message: error.message,
      ...(componentName && { component: componentName }),
    });

    // Custom error handler
    onError?.(error, errorInfo);

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[ErrorBoundary]', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <ErrorFallback
          error={error}
          onReset={this.handleReset}
        />
      );
    }

    return children;
  }
}

interface ErrorFallbackProps {
  error: Error | null;
  onReset?: () => void;
}

/**
 * Default error fallback UI
 */
export function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-8">
      <Card className="max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <FiAlertTriangle className="size-5" />
            <CardTitle>Something went wrong</CardTitle>
          </div>
          <CardDescription>
            An unexpected error occurred. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === 'development' && error && (
            <div className="rounded-lg bg-muted p-3">
              <p className="font-mono text-sm text-destructive">
                {error.message}
              </p>
            </div>
          )}
          <div className="flex gap-2">
            {onReset && (
              <Button onClick={onReset} variant="outline">
                <FiRefreshCw className="mr-2 size-4" />
                Try Again
              </Button>
            )}
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * HOC to wrap components with error boundary
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary componentName={componentName}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}
