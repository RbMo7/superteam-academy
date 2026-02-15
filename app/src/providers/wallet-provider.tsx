'use client';

import { type ReactNode, useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// Import wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

import { env } from '@/config/env';

type WalletProviderProps = {
  children: ReactNode;
};

/**
 * Solana Wallet Provider
 * Configures wallet adapters for Phantom and Solflare.
 * Uses RPC URL from environment or falls back to cluster default.
 */
export function WalletProvider({ children }: WalletProviderProps) {
  // Get RPC endpoint from env or use public devnet
  const endpoint = useMemo(() => {
    if (env.NEXT_PUBLIC_SOLANA_RPC_URL) {
      return env.NEXT_PUBLIC_SOLANA_RPC_URL;
    }
    return clusterApiUrl(env.NEXT_PUBLIC_SOLANA_NETWORK ?? 'devnet');
  }, []);

  // Configure supported wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}
