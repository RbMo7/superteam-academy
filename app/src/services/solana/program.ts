/**
 * Solana Program Service
 *
 * Provides abstraction over the on-chain program.
 * Stub implementation until program is deployed.
 */

// Placeholder for @solana/web3.js types
export type PublicKeyLike = string;

export interface ProgramConfig {
  rpcUrl: string;
  programId: string;
}

// PDA derivation helpers (stubs)
export const PDA = {
  config: (): [PublicKeyLike, number] => {
    // Seeds: ["config"]
    return ['ConfigPDAPlaceholder', 255];
  },

  course: (courseId: string): [PublicKeyLike, number] => {
    // Seeds: ["course", courseId]
    return [`CoursePDA_${courseId}`, 255];
  },

  learner: (wallet: PublicKeyLike): [PublicKeyLike, number] => {
    // Seeds: ["learner", wallet]
    return [`LearnerPDA_${wallet}`, 255];
  },

  enrollment: (courseId: string, wallet: PublicKeyLike): [PublicKeyLike, number] => {
    // Seeds: ["enrollment", courseId, wallet]
    return [`EnrollmentPDA_${courseId}_${wallet}`, 255];
  },
};

// Service interface (to be implemented with Anchor)
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ISolanaService {
  // Will be implemented in Phase 3
}
