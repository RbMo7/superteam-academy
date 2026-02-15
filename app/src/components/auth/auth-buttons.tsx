'use client';

import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { FiCreditCard } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';

/**
 * Auth Buttons for Navbar
 * Shows sign in/up for signed out users
 * Shows UserButton + wallet connect for signed in users
 */
export function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button size="sm">Get Started</Button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <WalletConnectButton />
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'size-8',
            },
          }}
          afterSignOutUrl="/"
        />
      </SignedIn>
    </div>
  );
}

/**
 * Wallet Connect Button
 * Shows connect button or truncated address
 */
function WalletConnectButton() {
  const { isWalletConnected, walletAddress } = useAuth();
  const { setVisible } = useWalletModal();

  if (isWalletConnected && walletAddress) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5 font-mono text-xs"
        onClick={() => setVisible(true)}
      >
        <FiCreditCard className="size-3.5" />
        {truncateAddress(walletAddress)}
      </Button>
    );
  }

  return (
    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setVisible(true)}>
      <FiCreditCard className="size-3.5" />
      Connect Wallet
    </Button>
  );
}

/**
 * Truncate wallet address for display
 */
function truncateAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}
