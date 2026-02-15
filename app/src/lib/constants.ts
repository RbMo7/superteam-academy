export const APP_NAME = 'Superteam Academy';
export const APP_DESCRIPTION = 'Learn Solana development and earn verifiable credentials on-chain.';

// Solana
export const PROGRAM_ID = 'AcadPROGRAMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Placeholder

// XP
export const MAX_DAILY_XP = 1000;
export const MAX_ACHIEVEMENT_XP = 500;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const LEADERBOARD_PAGE_SIZE = 50;

// Cache times (ms)
export const CACHE_STALE_TIME = 30_000; // 30 seconds
export const CACHE_GC_TIME = 300_000; // 5 minutes

// Difficulty labels
export const DIFFICULTY_LABELS = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
} as const;

export type DifficultyLevel = keyof typeof DIFFICULTY_LABELS;
