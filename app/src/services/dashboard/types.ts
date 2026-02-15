/**
 * Dashboard Service Types
 *
 * Defines interfaces for dashboard data.
 */

import type { CourseSummary } from '@/services/courses';

/**
 * Achievement definition
 */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'social' | 'special';
  xpReward: number;
  /** Whether user has earned this achievement */
  earned: boolean;
  /** When the achievement was earned */
  earnedAt?: Date;
  /** Progress toward achievement (0-100) */
  progress?: number;
  /** Requirement for progress-based achievements */
  requirement?: number;
}

/**
 * Activity event for feed
 */
export interface ActivityEvent {
  id: string;
  type: 'lesson_complete' | 'course_complete' | 'achievement' | 'streak' | 'xp_earned';
  title: string;
  description?: string;
  xpAmount?: number;
  courseSlug?: string;
  lessonId?: string;
  achievementId?: string;
  timestamp: Date;
}

/**
 * Streak data for calendar
 */
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  /** Whether user has completed activity today */
  activeToday: boolean;
  /** Last activity timestamp */
  lastActivityAt: Date;
  /** Number of streak freezes available */
  freezesAvailable: number;
  /** Active freeze expiration */
  freezeExpiresAt?: Date;
  /** Activity history (date -> XP earned) */
  activityHistory: Record<string, number>;
}

/**
 * Enrolled course with progress
 */
export interface EnrolledCourse extends CourseSummary {
  progress: number;
  lessonsCompleted: number;
  lastAccessedAt: Date;
  enrolledAt: Date;
}

/**
 * User dashboard data
 */
export interface DashboardData {
  /** Total XP */
  totalXp: number;
  /** Current level */
  level: number;
  /** Level progress percentage */
  levelProgress: number;
  /** XP to next level */
  xpToNextLevel: number;
  /** Level title */
  levelTitle: string;
  /** Streak data */
  streak: StreakData;
  /** Earned and available achievements */
  achievements: Achievement[];
  /** Currently enrolled courses */
  enrolledCourses: EnrolledCourse[];
  /** Recent activity */
  recentActivity: ActivityEvent[];
  /** Recommended courses */
  recommendedCourses: CourseSummary[];
}

/**
 * Dashboard Service Interface
 */
export interface IDashboardService {
  /**
   * Get full dashboard data
   */
  getDashboardData(): Promise<DashboardData>;

  /**
   * Get user's XP balance
   */
  getXpBalance(): Promise<number>;

  /**
   * Get streak data
   */
  getStreakData(): Promise<StreakData>;

  /**
   * Get achievements
   */
  getAchievements(): Promise<Achievement[]>;

  /**
   * Get enrolled courses
   */
  getEnrolledCourses(): Promise<EnrolledCourse[]>;

  /**
   * Get recent activity
   */
  getRecentActivity(limit?: number): Promise<ActivityEvent[]>;

  /**
   * Get recommended courses
   */
  getRecommendedCourses(limit?: number): Promise<CourseSummary[]>;

  /**
   * Use a streak freeze
   */
  useStreakFreeze(): Promise<boolean>;
}
