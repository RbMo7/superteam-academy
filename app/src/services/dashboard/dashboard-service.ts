/**
 * Dashboard Service Implementation
 *
 * Mock implementation for development.
 */

import type {
  IDashboardService,
  DashboardData,
  StreakData,
  Achievement,
  EnrolledCourse,
  ActivityEvent,
} from './types';
import type { CourseSummary } from '@/services/courses';
import { courseService } from '@/services/courses';
import {
  getLevel,
  getLevelProgress,
  getXpToNextLevel,
  getLevelTitle,
} from '@/lib/xp';
import {
  MOCK_ACHIEVEMENTS,
  MOCK_STREAK_DATA,
  MOCK_ACTIVITY,
  MOCK_ENROLLED_COURSES,
} from './mock-data';

/**
 * In-memory state for development
 */
let mockXpBalance = 1250;
let mockStreakData = { ...MOCK_STREAK_DATA };

/**
 * Mock Dashboard Service
 */
class MockDashboardService implements IDashboardService {
  async getDashboardData(): Promise<DashboardData> {
    await this.delay(150);

    const totalXp = mockXpBalance;
    const level = getLevel(totalXp);
    const levelProgress = getLevelProgress(totalXp);
    const xpToNextLevel = getXpToNextLevel(totalXp);
    const levelTitle = getLevelTitle(level);

    const [achievements, enrolledCourses, recentActivity, recommendedCourses] =
      await Promise.all([
        this.getAchievements(),
        this.getEnrolledCourses(),
        this.getRecentActivity(10),
        this.getRecommendedCourses(3),
      ]);

    return {
      totalXp,
      level,
      levelProgress,
      xpToNextLevel,
      levelTitle,
      streak: mockStreakData,
      achievements,
      enrolledCourses,
      recentActivity,
      recommendedCourses,
    };
  }

  async getXpBalance(): Promise<number> {
    await this.delay(50);
    return mockXpBalance;
  }

  async getStreakData(): Promise<StreakData> {
    await this.delay(50);
    return { ...mockStreakData };
  }

  async getAchievements(): Promise<Achievement[]> {
    await this.delay(100);
    return [...MOCK_ACHIEVEMENTS];
  }

  async getEnrolledCourses(): Promise<EnrolledCourse[]> {
    await this.delay(100);
    return [...MOCK_ENROLLED_COURSES];
  }

  async getRecentActivity(limit: number = 10): Promise<ActivityEvent[]> {
    await this.delay(50);
    return MOCK_ACTIVITY.slice(0, limit);
  }

  async getRecommendedCourses(limit: number = 3): Promise<CourseSummary[]> {
    await this.delay(100);
    // Get featured courses that user isn't enrolled in
    const featured = await courseService.getFeaturedCourses(limit + 2);
    const enrolledSlugs = new Set(MOCK_ENROLLED_COURSES.map((c) => c.slug));

    return featured
      .filter((course) => !enrolledSlugs.has(course.slug))
      .slice(0, limit);
  }

  async useStreakFreeze(): Promise<boolean> {
    await this.delay(200);

    if (mockStreakData.freezesAvailable <= 0) {
      return false;
    }

    mockStreakData = {
      ...mockStreakData,
      freezesAvailable: mockStreakData.freezesAvailable - 1,
      freezeExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    };

    console.warn('[MockDashboardService] Streak freeze used');
    return true;
  }

  /**
   * Helper to add XP (for testing)
   */
  addXp(amount: number): void {
    mockXpBalance += amount;
    console.warn(`[MockDashboardService] Added ${amount} XP. Total: ${mockXpBalance}`);
  }

  /**
   * Helper to update streak (for testing)
   */
  updateStreak(days: number): void {
    mockStreakData = {
      ...mockStreakData,
      currentStreak: days,
      longestStreak: Math.max(mockStreakData.longestStreak, days),
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Singleton instance
 */
export const dashboardService = new MockDashboardService();
