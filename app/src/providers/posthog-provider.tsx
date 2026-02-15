'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

interface PostHogProviderProps {
  children: React.ReactNode;
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthogClient = usePostHog();

  useEffect(() => {
    if (pathname && posthogClient) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + '?' + searchParams.toString();
      }
      posthogClient.capture('$pageview', { $current_url: url });
    }
  }, [pathname, searchParams, posthogClient]);

  return null;
}

/**
 * PostHog Analytics Provider
 *
 * Provides PostHog analytics with automatic page view tracking.
 * Only initializes if NEXT_PUBLIC_POSTHOG_KEY is set.
 */
export function PostHogProvider({ children }: PostHogProviderProps) {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';

  useEffect(() => {
    if (posthogKey && typeof window !== 'undefined') {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        person_profiles: 'identified_only',
        capture_pageview: false, // We handle this manually
        capture_pageleave: true,
        autocapture: true,
        persistence: 'localStorage+cookie',
        loaded: () => {
          if (process.env.NODE_ENV === 'development') {
            console.log('[PostHog] Initialized');
          }
        },
      });
    }
  }, [posthogKey, posthogHost]);

  if (!posthogKey) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}

export { usePostHog };
