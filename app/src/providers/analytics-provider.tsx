'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

/**
 * Analytics Provider
 *
 * Initializes GA4 and provides unified analytics tracking.
 * Automatically tracks page views on route changes.
 */
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  // Initialize analytics on mount
  useEffect(() => {
    analytics.init({
      ...(gaId && { gaId }),
      ...(posthogKey && { posthogKey }),
      ...(posthogHost && { posthogHost }),
    });
  }, [gaId, posthogKey, posthogHost]);

  // Track page views on route change (for GA4)
  useEffect(() => {
    if (gaId && typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', gaId, {
        page_path: pathname,
      });
    }
  }, [pathname, gaId]);

  return (
    <>
      {/* GA4 Script */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
      {children}
    </>
  );
}
