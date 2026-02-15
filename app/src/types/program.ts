// On-chain program types (will be generated from IDL)
// These are placeholder types until the program is built
import type { CourseContent } from './content';

// Placeholder for PublicKey until @solana/web3.js is installed in Phase 3
export type PublicKey = string;

// ============================================================================
// Account Types (matching SPEC.md)
// ============================================================================

export interface Config {
  authority: PublicKey;
  backendSigner: PublicKey;
  currentSeason: number;
  currentMint: PublicKey;
  seasonClosed: boolean;
  seasonStartedAt: number;
  maxDailyXp: number;
  maxAchievementXp: number;
  bump: number;
}

export interface Course {
  courseId: string;
  creator: PublicKey;
  authority: PublicKey;
  contentTxId: Uint8Array;
  version: number;
  contentType: number;
  lessonCount: number;
  challengeCount: number;
  difficulty: number;
  xpTotal: number;
  trackId: number;
  trackLevel: number;
  prerequisite: PublicKey | null;
  completionRewardXp: number;
  minCompletionsForReward: number;
  totalCompletions: number;
  totalEnrollments: number;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
  bump: number;
}

export interface LearnerProfile {
  authority: PublicKey;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: number;
  streakFreezes: number;
  achievementFlags: bigint[];
  xpEarnedToday: number;
  lastXpDay: number;
  referralCount: number;
  hasReferrer: boolean;
  bump: number;
}

export interface Enrollment {
  course: PublicKey;
  learner: PublicKey;
  lessonFlags: bigint[];
  enrolledVersion: number;
  enrolledAt: number;
  completedAt: number | null;
  bump: number;
}

export interface Credential {
  learner: PublicKey;
  trackId: number;
  currentLevel: number;
  coursesCompleted: number;
  totalXpEarned: number;
  firstEarned: number;
  lastUpdated: number;
  metadataHash: Uint8Array;
}

// ============================================================================
// Derived/Display Types
// ============================================================================

export interface CourseWithMeta extends Course {
  content?: CourseContent;
  enrollment?: Enrollment | null;
}

export interface LeaderboardEntry {
  rank: number;
  wallet: PublicKey;
  xp: number;
  level: number;
  displayName?: string;
  avatarUrl?: string;
}

export interface UserStats {
  totalXp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  coursesCompleted: number;
  achievementsUnlocked: number;
}

// Re-export content types
export type { CourseContent, LessonContent, ChallengeConfig, CourseMetadata } from './content';
