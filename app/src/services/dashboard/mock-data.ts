/**
 * Mock Dashboard Data
 *
 * Static mock data for dashboard during development.
 */

import type { Achievement, ActivityEvent, StreakData, EnrolledCourse } from './types';

/**
 * Mock achievements
 */
export const MOCK_ACHIEVEMENTS: Achievement[] = [
  // Learning achievements
  {
    id: 'first-lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    category: 'learning',
    xpReward: 50,
    earned: true,
    earnedAt: new Date('2026-02-10'),
  },
  {
    id: 'first-course',
    name: 'Course Graduate',
    description: 'Complete your first course',
    icon: '🎓',
    category: 'learning',
    xpReward: 200,
    earned: false,
    progress: 60,
    requirement: 100,
  },
  {
    id: 'challenge-master',
    name: 'Challenge Master',
    description: 'Complete 10 coding challenges',
    icon: '💻',
    category: 'learning',
    xpReward: 300,
    earned: false,
    progress: 3,
    requirement: 10,
  },
  {
    id: 'speed-learner',
    name: 'Speed Learner',
    description: 'Complete 5 lessons in one day',
    icon: '⚡',
    category: 'learning',
    xpReward: 150,
    earned: true,
    earnedAt: new Date('2026-02-12'),
  },
  // Streak achievements
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    category: 'streak',
    xpReward: 100,
    earned: true,
    earnedAt: new Date('2026-02-08'),
  },
  {
    id: 'streak-14',
    name: 'Fortnight Fighter',
    description: 'Maintain a 14-day streak',
    icon: '🔥',
    category: 'streak',
    xpReward: 250,
    earned: false,
    progress: 12,
    requirement: 14,
  },
  {
    id: 'streak-30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: '🏆',
    category: 'streak',
    xpReward: 500,
    earned: false,
    progress: 12,
    requirement: 30,
  },
  // Social achievements
  {
    id: 'first-referral',
    name: 'Community Builder',
    description: 'Refer a friend who completes a lesson',
    icon: '👥',
    category: 'social',
    xpReward: 100,
    earned: false,
  },
  // Special achievements
  {
    id: 'early-adopter',
    name: 'Early Adopter',
    description: 'Join during the beta period',
    icon: '🌟',
    category: 'special',
    xpReward: 500,
    earned: true,
    earnedAt: new Date('2026-02-01'),
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Complete a lesson between midnight and 5am',
    icon: '🦉',
    category: 'special',
    xpReward: 50,
    earned: false,
  },
];

/**
 * Generate activity history for the last 30 days
 */
function generateActivityHistory(): Record<string, number> {
  const history: Record<string, number> = {};
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    // Random activity (some days have no activity)
    if (dateStr && (Math.random() > 0.3 || i < 12)) {
      history[dateStr] = Math.floor(Math.random() * 300) + 50;
    }
  }

  return history;
}

/**
 * Mock streak data
 */
export const MOCK_STREAK_DATA: StreakData = {
  currentStreak: 12,
  longestStreak: 15,
  activeToday: true,
  lastActivityAt: new Date(),
  freezesAvailable: 2,
  activityHistory: generateActivityHistory(),
};

/**
 * Mock recent activity
 */
export const MOCK_ACTIVITY: ActivityEvent[] = [
  {
    id: 'act-1',
    type: 'lesson_complete',
    title: 'Completed "Understanding Solana Accounts"',
    xpAmount: 75,
    courseSlug: 'solana-fundamentals',
    lessonId: 'understanding-accounts',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
  },
  {
    id: 'act-2',
    type: 'xp_earned',
    title: 'Streak Bonus',
    description: '12-day streak multiplier applied',
    xpAmount: 38,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 'act-3',
    type: 'lesson_complete',
    title: 'Completed "Introduction to Solana"',
    xpAmount: 50,
    courseSlug: 'solana-fundamentals',
    lessonId: 'intro-to-solana',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: 'act-4',
    type: 'achievement',
    title: 'Earned "Speed Learner"',
    description: 'Complete 5 lessons in one day',
    xpAmount: 150,
    achievementId: 'speed-learner',
    timestamp: new Date('2026-02-12T15:30:00'),
  },
  {
    id: 'act-5',
    type: 'streak',
    title: 'Streak Extended',
    description: 'You re on a 12-day streak!',
    timestamp: new Date('2026-02-15T08:00:00'),
  },
  {
    id: 'act-6',
    type: 'course_complete',
    title: 'Started "Solana Fundamentals"',
    courseSlug: 'solana-fundamentals',
    timestamp: new Date('2026-02-10T10:00:00'),
  },
];

/**
 * Mock enrolled courses
 */
export const MOCK_ENROLLED_COURSES: EnrolledCourse[] = [
  {
    slug: 'solana-fundamentals',
    title: 'Solana Fundamentals',
    description: 'Master the core concepts of Solana blockchain development.',
    thumbnailUrl: '/images/courses/solana-fundamentals.jpg',
    difficulty: 'beginner',
    track: 'core',
    lessonCount: 12,
    duration: 180,
    xpReward: 1200,
    creatorName: 'Solana Foundation',
    creatorAvatar: '/images/avatars/solana-foundation.png',
    enrolledCount: 5420,
    rating: 4.8,
    tags: ['solana', 'blockchain', 'web3'],
    publishedAt: new Date('2025-06-15'),
    featured: true,
    // Enrolled-specific fields
    progress: 25,
    lessonsCompleted: 3,
    lastAccessedAt: new Date(Date.now() - 1000 * 60 * 30),
    enrolledAt: new Date('2026-02-10'),
  },
  {
    slug: 'anchor-development-bootcamp',
    title: 'Anchor Development Bootcamp',
    description: 'Build production-ready Solana programs with Anchor framework.',
    thumbnailUrl: '/images/courses/anchor-bootcamp.jpg',
    difficulty: 'intermediate',
    track: 'core',
    lessonCount: 20,
    duration: 480,
    xpReward: 2500,
    creatorName: 'Coral',
    creatorAvatar: '/images/avatars/coral.png',
    enrolledCount: 3100,
    rating: 4.9,
    tags: ['anchor', 'rust', 'smart-contracts'],
    publishedAt: new Date('2025-08-20'),
    featured: true,
    // Enrolled-specific fields
    progress: 10,
    lessonsCompleted: 2,
    lastAccessedAt: new Date('2026-02-13'),
    enrolledAt: new Date('2026-02-11'),
  },
];
