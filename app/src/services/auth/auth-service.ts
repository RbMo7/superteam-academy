/**
 * Authentication Service Abstraction
 *
 * Handles communication with backend for:
 * - Wallet linking/unlinking
 * - User profile operations
 * - Auth token verification
 *
 * NOTE: All backend calls are STUBBED for Phase 3.
 * Real implementation will be added when backend is ready.
 */

export interface LinkedWallet {
  address: string;
  label: string | null;
  isPrimary: boolean;
  linkedAt: Date;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  linkedWallets: LinkedWallet[];
  createdAt: Date;
}

export interface LinkWalletRequest {
  walletAddress: string;
  signature: string; // Signed message proving ownership
  message: string; // The message that was signed
}

export interface LinkWalletResponse {
  success: boolean;
  wallet: LinkedWallet;
}

class AuthService {
  // baseUrl will be used when backend is implemented
  // private baseUrl = env.NEXT_PUBLIC_API_URL ?? '/api';

  /**
   * Get linked wallets for the current user
   * STUBBED: Returns empty array until backend is implemented
   */
  async getLinkedWallets(_token: string): Promise<LinkedWallet[]> {
    // TODO: Implement when backend is ready
    // const response = await fetch(`${this.baseUrl}/user/wallets`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // return response.json();

    console.log('[AuthService] getLinkedWallets - STUBBED');
    return [];
  }

  /**
   * Link a wallet to the current user account
   * STUBBED: Simulates success until backend is implemented
   */
  async linkWallet(_token: string, walletAddress: string): Promise<LinkWalletResponse> {
    // TODO: Implement when backend is ready
    // 1. Generate nonce message
    // 2. Sign with wallet
    // 3. Send to backend for verification
    // 4. Backend verifies signature and links wallet

    console.log('[AuthService] linkWallet - STUBBED:', walletAddress);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      wallet: {
        address: walletAddress,
        label: null,
        isPrimary: true,
        linkedAt: new Date(),
      },
    };
  }

  /**
   * Unlink a wallet from the current user account
   * STUBBED: Simulates success until backend is implemented
   */
  async unlinkWallet(_token: string, walletAddress: string): Promise<void> {
    // TODO: Implement when backend is ready
    // const response = await fetch(`${this.baseUrl}/user/wallets/${walletAddress}`, {
    //   method: 'DELETE',
    //   headers: { Authorization: `Bearer ${token}` },
    // });

    console.log('[AuthService] unlinkWallet - STUBBED:', walletAddress);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  /**
   * Get user profile from backend
   * STUBBED: Returns null until backend is implemented
   */
  async getUserProfile(_token: string): Promise<UserProfile | null> {
    // TODO: Implement when backend is ready
    console.log('[AuthService] getUserProfile - STUBBED');
    return null;
  }

  /**
   * Verify a Clerk token with the backend
   * Used to ensure token is valid before sensitive operations
   * STUBBED: Always returns true until backend is implemented
   */
  async verifyToken(_token: string): Promise<boolean> {
    // TODO: Implement when backend is ready
    console.log('[AuthService] verifyToken - STUBBED');
    return true;
  }

  /**
   * Generate a nonce message for wallet signature verification
   * STUBBED: Returns static message until backend is implemented
   */
  async getSignatureNonce(_token: string): Promise<string> {
    // TODO: Implement when backend is ready
    // Backend should generate a unique nonce for each request

    const timestamp = Date.now();
    return `Sign this message to link your wallet to Superteam Academy.\n\nNonce: ${timestamp}\n\nThis signature does not trigger a blockchain transaction or cost any gas fees.`;
  }
}

// Export singleton instance
export const authService = new AuthService();
