'use client';

import type { ReactNode } from 'react';
import { ClerkProvider as BaseClerkProvider } from '@clerk/nextjs';

type ClerkProviderProps = {
  children: ReactNode;
};

/**
 * Clerk Provider with theme integration.
 * Syncs Clerk's appearance with the app's dark/light mode.
 */
export function ClerkProvider({ children }: ClerkProviderProps) {
  return (
    <BaseClerkProvider
      appearance={{
        variables: {
          colorPrimary: 'hsl(221.2 83.2% 53.3%)', // primary blue
          borderRadius: '0.75rem',
        },
        elements: {
          formButtonPrimary:
            'bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm',
          card: 'shadow-lg rounded-2xl',
          formFieldInput: 'rounded-lg',
        },
      }}
      afterSignOutUrl="/"
    >
      {children}
    </BaseClerkProvider>
  );
}
