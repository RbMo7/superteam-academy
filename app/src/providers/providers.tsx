'use client';

import type { ReactNode } from 'react';

import { WalletProvider } from './wallet-provider';
import { AuthProvider } from './auth-provider';
import { AnalyticsProvider } from './analytics-provider';
import { PostHogProvider } from './posthog-provider';

type ProvidersProps = {
  children: ReactNode;
};

/**
 * Client-side providers wrapper.
 * Includes WalletProvider, AuthProvider, and analytics providers.
 *
 * Note: ClerkProvider and ThemeProvider are in layout.tsx
 * since they can be server-rendered.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <PostHogProvider>
      <AnalyticsProvider>
        <WalletProvider>
          <AuthProvider>{children}</AuthProvider>
        </WalletProvider>
      </AnalyticsProvider>
    </PostHogProvider>
  );
}
