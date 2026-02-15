'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import Link from 'next/link';
import { FiAlertTriangle, FiHome, FiRefreshCw } from 'react-icons/fi';

import { AppShell } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ROUTES } from '@/config';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error Page - Handles errors within the app layout
 */
export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Report to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <AppShell showFooter={false}>
      <Container className="py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-destructive/10 p-4">
              <FiAlertTriangle className="size-12 text-destructive" />
            </div>
          </div>

          <h1 className="mb-2 text-2xl font-bold">Something went wrong</h1>
          <p className="mb-6 text-muted-foreground">
            We encountered an unexpected error. Please try again.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 rounded-lg bg-muted p-4 text-left">
              <p className="font-mono text-sm text-destructive">
                {error.message}
              </p>
              {error.digest && (
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-center gap-4">
            <Button onClick={reset} variant="outline">
              <FiRefreshCw className="mr-2 size-4" />
              Try Again
            </Button>
            <Button asChild>
              <Link href={ROUTES.HOME}>
                <FiHome className="mr-2 size-4" />
                Go Home
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </AppShell>
  );
}
