/**
 * Calculate level from XP using square root formula.
 * 0-99 XP → Level 0
 * 100-399 → Level 1
 * 400-899 → Level 2
 * etc.
 */
export function getLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100));
}

/**
 * Get XP required for a specific level.
 */
export function getXpForLevel(level: number): number {
  return level * level * 100;
}

/**
 * Get progress percentage to next level.
 */
export function getLevelProgress(xp: number): number {
  const currentLevel = getLevel(xp);
  const currentLevelXp = getXpForLevel(currentLevel);
  const nextLevelXp = getXpForLevel(currentLevel + 1);

  if (nextLevelXp === currentLevelXp) return 100;

  return Math.round(((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100);
}

/**
 * Get XP remaining to next level.
 */
export function getXpToNextLevel(xp: number): number {
  const currentLevel = getLevel(xp);
  const nextLevelXp = getXpForLevel(currentLevel + 1);
  return nextLevelXp - xp;
}

/**
 * Get level title based on level number
 */
export function getLevelTitle(level: number): string {
  const titles = [
    'Newcomer',    // 0
    'Apprentice',  // 1
    'Developer',   // 2
    'Builder',     // 3
    'Architect',   // 4
    'Expert',      // 5
    'Master',      // 6
    'Grandmaster', // 7
    'Legend',      // 8
    'Mythic',      // 9
    'Transcendent',// 10+
  ];

  const index = Math.min(Math.max(level, 0), titles.length - 1);
  return titles[index] ?? 'Unknown';
}

/**
 * Format XP with commas
 */
export function formatXp(xp: number): string {
  return xp.toLocaleString();
}

/**
 * Calculate streak multiplier
 * 1x for 0-6 days, 1.5x for 7-13 days, 2x for 14+ days
 */
export function getStreakMultiplier(streakDays: number): number {
  if (streakDays >= 14) return 2.0;
  if (streakDays >= 7) return 1.5;
  return 1.0;
}

/**
 * Calculate bonus XP from streak
 */
export function calculateStreakBonus(baseXp: number, streakDays: number): number {
  const multiplier = getStreakMultiplier(streakDays);
  return Math.floor(baseXp * multiplier) - baseXp;
}

/**
 * Format streak days for display
 */
export function formatStreak(days: number): string {
  if (days === 0) return 'No streak';
  if (days === 1) return '1 day';
  return `${days} days`;
}

/**
 * Check if streak is at risk (no activity today)
 */
export function isStreakAtRisk(lastActivityDate: Date): boolean {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastActivity = new Date(
    lastActivityDate.getFullYear(),
    lastActivityDate.getMonth(),
    lastActivityDate.getDate()
  );

  return today.getTime() !== lastActivity.getTime();
}

/**
 * Get days until streak freeze expires
 */
export function daysUntilFreezeExpires(freezeExpiresAt?: Date): number | null {
  if (!freezeExpiresAt) return null;

  const now = new Date();
  const diff = freezeExpiresAt.getTime() - now.getTime();

  if (diff <= 0) return 0;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

