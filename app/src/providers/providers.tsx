'use client';

import type { ReactNode } from 'react';

import { WalletProvider } from './wallet-provider';
import { AuthProvider } from './auth-provider';

type ProvidersProps = {
  children: ReactNode;
};

/**
 * Client-side providers wrapper.
 * Includes WalletProvider and AuthProvider.
 *
 * Note: ClerkProvider and ThemeProvider are in layout.tsx
 * since they can be server-rendered.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <WalletProvider>
      <AuthProvider>{children}</AuthProvider>
    </WalletProvider>
  );
}
