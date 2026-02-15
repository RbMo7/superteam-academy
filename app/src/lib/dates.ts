/**
 * Get current UTC day as timestamp (midnight UTC).
 */
export function getUtcDay(date: Date = new Date()): number {
  const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  return Math.floor(utcDate.getTime() / 1000);
}

/**
 * Check if two timestamps are on the same UTC day.
 */
export function isSameUtcDay(timestamp1: number, timestamp2: number): boolean {
  const date1 = new Date(timestamp1 * 1000);
  const date2 = new Date(timestamp2 * 1000);

  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate()
  );
}

/**
 * Check if two timestamps are consecutive UTC days.
 */
export function isConsecutiveUtcDay(olderTimestamp: number, newerTimestamp: number): boolean {
  const olderDay = getUtcDay(new Date(olderTimestamp * 1000));
  const newerDay = getUtcDay(new Date(newerTimestamp * 1000));

  return newerDay - olderDay === 86400; // 24 hours in seconds
}

/**
 * Format relative time (e.g., "2 hours ago").
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;

  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;

  return new Date(timestamp * 1000).toLocaleDateString();
}
