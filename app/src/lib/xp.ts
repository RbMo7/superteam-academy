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
