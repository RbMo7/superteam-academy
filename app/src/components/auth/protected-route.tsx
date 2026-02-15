'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth as useClerkAuth, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

import { useAuth } from '@/providers/auth-provider';

type ProtectedRouteProps = {
  children: ReactNode;
  /** Require wallet to be connected in addition to OAuth */
  requireWallet?: boolean;
  /** Custom fallback while loading */
  loadingFallback?: ReactNode;
  /** Where to redirect if wallet not connected */
  walletRedirect?: string;
};

/**
 * Protected Route Component
 *
 * Wraps content that requires authentication.
 * Uses Clerk's built-in RedirectToSignIn for OAuth.
 *
 * Options:
 * - requireWallet: Also require a connected Solana wallet
 * - loadingFallback: Custom loading UI
 * - walletRedirect: Where to send users if wallet required but not connected
 */
export function ProtectedRoute({
  children,
  requireWallet = false,
  loadingFallback,
  walletRedirect = '/connect-wallet',
}: ProtectedRouteProps) {
  const { isLoaded } = useClerkAuth();
  const { isWalletConnected } = useAuth();
  const router = useRouter();

  // Handle wallet requirement
  useEffect(() => {
    if (requireWallet && isLoaded && !isWalletConnected) {
      router.push(walletRedirect);
    }
  }, [requireWallet, isLoaded, isWalletConnected, router, walletRedirect]);

  // Loading state
  if (!isLoaded) {
    return loadingFallback ?? <ProtectedRouteLoading />;
  }

  // Check wallet requirement
  if (requireWallet && !isWalletConnected) {
    return loadingFallback ?? <ProtectedRouteLoading />;
  }

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

/**
 * Default loading state for protected routes
 */
function ProtectedRouteLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    </div>
  );
}

/**
 * Higher-order component version for pages
 */
export function withProtectedRoute<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<ProtectedRouteProps, 'children'>
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
