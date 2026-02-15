/**
 * Wallet Linking Abstraction Layer
 *
 * Handles the cryptographic signing flow for linking a Solana wallet
 * to a Clerk-authenticated user account.
 *
 * Flow:
 * 1. Get nonce from backend
 * 2. Sign nonce with wallet
 * 3. Send signature to backend for verification
 * 4. Backend verifies and links wallet to user
 *
 * NOTE: Signing functionality is STUBBED for Phase 3.
 */

import type { MessageSignerWalletAdapter } from '@solana/wallet-adapter-base';
import nacl from 'tweetnacl';
import bs58 from 'bs58';

import { authService } from './auth-service';

export interface WalletLinkingResult {
  success: boolean;
  error?: string;
  walletAddress?: string;
}

export interface SignMessageResult {
  signature: string;
  message: string;
  publicKey: string;
}

class WalletLinking {
  /**
   * Sign a message with the connected wallet
   * Returns base58-encoded signature
   */
  async signMessage(
    wallet: MessageSignerWalletAdapter,
    message: string
  ): Promise<SignMessageResult> {
    if (!wallet.publicKey) {
      throw new Error('Wallet not connected');
    }

    if (!wallet.signMessage) {
      throw new Error('Wallet does not support message signing');
    }

    const messageBytes = new TextEncoder().encode(message);
    const signatureBytes = await wallet.signMessage(messageBytes);

    return {
      signature: bs58.encode(signatureBytes),
      message,
      publicKey: wallet.publicKey.toBase58(),
    };
  }

  /**
   * Verify a signature locally (for testing/debugging)
   * In production, this verification happens on the backend
   */
  verifySignature(
    message: string,
    signature: string,
    publicKey: string
  ): boolean {
    try {
      const messageBytes = new TextEncoder().encode(message);
      const signatureBytes = bs58.decode(signature);
      const publicKeyBytes = bs58.decode(publicKey);

      return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
    } catch {
      return false;
    }
  }

  /**
   * Full wallet linking flow
   * 1. Get nonce from backend
   * 2. Sign with wallet
   * 3. Verify and link on backend
   */
  async linkWallet(
    wallet: MessageSignerWalletAdapter,
    authToken: string
  ): Promise<WalletLinkingResult> {
    if (!wallet.publicKey) {
      return { success: false, error: 'Wallet not connected' };
    }

    if (!wallet.signMessage) {
      return { success: false, error: 'Wallet does not support message signing' };
    }

    try {
      // 1. Get nonce from backend
      const nonce = await authService.getSignatureNonce(authToken);

      // 2. Sign the nonce message
      const { signature, message, publicKey } = await this.signMessage(wallet, nonce);

      // 3. Verify locally (optional, for debugging)
      const isValid = this.verifySignature(message, signature, publicKey);
      if (!isValid) {
        console.warn('Local signature verification failed');
      }

      // 4. Send to backend for linking
      // In production, backend would verify the signature
      const result = await authService.linkWallet(authToken, publicKey);

      if (result.success) {
        return { success: true, walletAddress: publicKey };
      }

      return { success: false, error: 'Backend rejected wallet linking' };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: message };
    }
  }

  /**
   * Generate a human-readable linking message
   */
  generateMessage(nonce: string, appName = 'Superteam Academy'): string {
    return [
      `Sign this message to link your wallet to ${appName}.`,
      '',
      `Nonce: ${nonce}`,
      '',
      'This signature does not trigger a blockchain transaction or cost any gas fees.',
    ].join('\n');
  }
}

// Export singleton
export const walletLinking = new WalletLinking();
