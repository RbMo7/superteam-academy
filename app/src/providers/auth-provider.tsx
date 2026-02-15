'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useUser, useAuth as useClerkAuth, useClerk } from '@clerk/nextjs';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import type { PublicKey } from '@solana/web3.js';

import { authService, type LinkedWallet } from '@/services/auth/auth-service';

/**
 * Combined authentication state from Clerk + Wallet Adapter
 */
interface AuthState {
  // Clerk state
  isSignedIn: boolean;
  isLoaded: boolean;
  userId: string | null;
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;

  // Wallet state
  isWalletConnected: boolean;
  walletPublicKey: PublicKey | null;
  walletAddress: string | null;

  // Linked wallets (from backend - stubbed)
  linkedWallets: LinkedWallet[];
  isLinkingWallet: boolean;

  // Combined status
  isFullyAuthenticated: boolean; // OAuth + Wallet connected
}

interface AuthContextValue extends AuthState {
  // Actions
  signOut: () => Promise<void>;
  linkWallet: () => Promise<void>;
  unlinkWallet: (address: string) => Promise<void>;
  refreshLinkedWallets: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

/**
 * Auth Provider - Combines Clerk OAuth and Solana Wallet Adapter
 *
 * This provider merges two auth systems:
 * 1. Clerk: OAuth identity (Google, GitHub)
 * 2. Wallet Adapter: Solana wallet connection (Phantom, Solflare)
 *
 * The `isFullyAuthenticated` flag indicates when both are active,
 * enabling on-chain operations linked to a verified identity.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const { user, isLoaded: isClerkLoaded, isSignedIn } = useUser();
  const { signOut: clerkSignOut } = useClerk();
  const { getToken } = useClerkAuth();
  const { publicKey, connected, disconnect } = useWallet();
  const { connection: _connection } = useConnection();

  // Linked wallets state (will be fetched from backend)
  const [linkedWallets, setLinkedWallets] = useState<LinkedWallet[]>([]);
  const [isLinkingWallet, setIsLinkingWallet] = useState(false);

  // Derive auth state
  const authState = useMemo<AuthState>(() => {
    const walletAddress = publicKey?.toBase58() ?? null;

    return {
      // Clerk
      isSignedIn: isSignedIn ?? false,
      isLoaded: isClerkLoaded,
      userId: user?.id ?? null,
      email: user?.primaryEmailAddress?.emailAddress ?? null,
      displayName: user?.fullName ?? user?.username ?? null,
      avatarUrl: user?.imageUrl ?? null,

      // Wallet
      isWalletConnected: connected,
      walletPublicKey: publicKey ?? null,
      walletAddress,

      // Linked wallets
      linkedWallets,
      isLinkingWallet,

      // Combined
      isFullyAuthenticated: (isSignedIn ?? false) && connected,
    };
  }, [
    isSignedIn,
    isClerkLoaded,
    user,
    connected,
    publicKey,
    linkedWallets,
    isLinkingWallet,
  ]);

  // Fetch linked wallets when user signs in
  const refreshLinkedWallets = useCallback(async () => {
    if (!isSignedIn || !user?.id) {
      setLinkedWallets([]);
      return;
    }

    try {
      const token = await getToken();
      if (!token) return;

      const wallets = await authService.getLinkedWallets(token);
      setLinkedWallets(wallets);
    } catch (error) {
      console.error('Failed to fetch linked wallets:', error);
    }
  }, [isSignedIn, user?.id, getToken]);

  // Fetch wallets on sign in
  useEffect(() => {
    if (isSignedIn) {
      void refreshLinkedWallets();
    }
  }, [isSignedIn, refreshLinkedWallets]);

  // Link currently connected wallet to user account
  const linkWallet = useCallback(async () => {
    if (!isSignedIn || !publicKey || !connected) {
      throw new Error('Must be signed in with wallet connected to link');
    }

    setIsLinkingWallet(true);

    try {
      const token = await getToken();
      if (!token) throw new Error('No auth token');

      // In production, this would sign a message and verify on backend
      await authService.linkWallet(token, publicKey.toBase58());
      await refreshLinkedWallets();
    } finally {
      setIsLinkingWallet(false);
    }
  }, [isSignedIn, publicKey, connected, getToken, refreshLinkedWallets]);

  // Unlink a wallet from user account
  const unlinkWallet = useCallback(
    async (address: string) => {
      if (!isSignedIn) {
        throw new Error('Must be signed in to unlink wallet');
      }

      const token = await getToken();
      if (!token) throw new Error('No auth token');

      await authService.unlinkWallet(token, address);
      await refreshLinkedWallets();
    },
    [isSignedIn, getToken, refreshLinkedWallets]
  );

  // Sign out from both Clerk and disconnect wallet
  const signOut = useCallback(async () => {
    await disconnect();
    await clerkSignOut();
  }, [disconnect, clerkSignOut]);

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      ...authState,
      signOut,
      linkWallet,
      unlinkWallet,
      refreshLinkedWallets,
    }),
    [authState, signOut, linkWallet, unlinkWallet, refreshLinkedWallets]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access combined auth state and actions
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
