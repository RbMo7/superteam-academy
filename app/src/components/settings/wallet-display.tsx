'use client';

import Image from 'next/image';
import { FiCopy, FiExternalLink, FiCheck } from 'react-icons/fi';
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/providers/auth-provider';
import { cn } from '@/lib/utils';

interface WalletDisplayProps {
  className?: string;
}

/**
 * Wallet display component - Shows connected wallet address and actions
 */
export function WalletDisplay({ className }: WalletDisplayProps) {
  const { isWalletConnected, walletAddress } = useAuth();
  const { wallet, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);

  const walletName = wallet?.adapter.name ?? 'Unknown Wallet';

  async function handleCopy() {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleExplorer() {
    if (walletAddress) {
      window.open(`https://explorer.solana.com/address/${walletAddress}`, '_blank');
    }
  }

  function handleConnect() {
    setVisible(true);
  }

  function handleDisconnect() {
    disconnect();
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image
            src="/solanaLogoMark.png"
            alt="Solana"
            width={20}
            height={20}
            className="size-5"
          />
          Solana Wallet
        </CardTitle>
        <CardDescription>
          Connect your wallet to earn on-chain XP and credentials
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isWalletConnected && walletAddress ? (
          <div className="space-y-4">
            {/* Connected Wallet */}
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Image
                  src="/solanaLogoMark.png"
                  alt="Solana"
                  width={24}
                  height={24}
                  className="size-6"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{walletName}</p>
                <p className="text-sm text-muted-foreground font-mono truncate">
                  {walletAddress}
                </p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="size-8"
                >
                  {copied ? (
                    <FiCheck className="size-4 text-success" />
                  ) : (
                    <FiCopy className="size-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleExplorer}
                  className="size-8"
                >
                  <FiExternalLink className="size-4" />
                </Button>
              </div>
            </div>

            {/* Disconnect */}
            <Button variant="outline" onClick={handleDisconnect} className="w-full">
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect your Solana wallet to:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                Earn on-chain XP tokens
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                Receive verifiable credentials
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                Join on-chain leaderboards
              </li>
            </ul>
            <Button onClick={handleConnect} className="w-full">
              <Image
                src="/solanaLogoMark.png"
                alt="Solana"
                width={16}
                height={16}
                className="mr-2 size-4"
              />
              Connect Wallet
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
