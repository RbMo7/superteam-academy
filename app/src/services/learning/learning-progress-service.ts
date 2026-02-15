/**
 * Learning Progress Service Implementation
 *
 * Mock implementation for development. Will be replaced with
 * on-chain data fetching and backend integration.
 */

import type {
  ILearningProgressService,
  LessonDetail,
  LessonProgress,
  CourseProgress,
  AutoSavePayload,
  TestResult,
} from './types';
import { getMockLesson, getMockCourseLessons } from './mock-data';

/**
 * In-memory storage for development
 */
const progressStore = new Map<string, LessonProgress>();
const codeStore = new Map<string, string>();
const courseProgressStore = new Map<string, CourseProgress>();

function makeProgressKey(courseSlug: string, lessonId: string): string {
  return `${courseSlug}:${lessonId}`;
}

/**
 * Mock Learning Progress Service
 */
class MockLearningProgressService implements ILearningProgressService {
  async getLesson(
    courseSlug: string,
    lessonId: string
  ): Promise<LessonDetail | null> {
    // Simulate network delay
    await this.delay(100);
    return getMockLesson(courseSlug, lessonId);
  }

  async getLessonProgress(
    courseSlug: string,
    lessonId: string
  ): Promise<LessonProgress | null> {
    await this.delay(50);
    const key = makeProgressKey(courseSlug, lessonId);
    return progressStore.get(key) ?? null;
  }

  async getCourseProgress(courseSlug: string): Promise<CourseProgress | null> {
    await this.delay(50);
    return courseProgressStore.get(courseSlug) ?? null;
  }

  async startLesson(
    courseSlug: string,
    lessonId: string
  ): Promise<LessonProgress> {
    await this.delay(100);
    const key = makeProgressKey(courseSlug, lessonId);

    const existing = progressStore.get(key);
    if (existing) {
      return existing;
    }

    const progress: LessonProgress = {
      lessonId,
      courseSlug,
      status: 'in-progress',
      startedAt: new Date(),
      xpAwarded: 0,
      timeSpent: 0,
    };

    progressStore.set(key, progress);
    this.updateCourseProgress(courseSlug);

    return progress;
  }

  async completeLesson(
    courseSlug: string,
    lessonId: string
  ): Promise<{ progress: LessonProgress; xpAwarded: number }> {
    await this.delay(200);

    const lesson = getMockLesson(courseSlug, lessonId);
    if (!lesson) {
      throw new Error(`Lesson not found: ${lessonId}`);
    }

    const key = makeProgressKey(courseSlug, lessonId);
    const existing = progressStore.get(key);

    // Don't double-award XP
    if (existing?.status === 'completed') {
      return { progress: existing, xpAwarded: 0 };
    }

    const progress: LessonProgress = {
      lessonId,
      courseSlug,
      status: 'completed',
      startedAt: existing?.startedAt ?? new Date(),
      completedAt: new Date(),
      xpAwarded: lesson.xpReward,
      timeSpent: existing?.timeSpent ?? 0,
      ...(existing?.savedCode && { savedCode: existing.savedCode }),
      ...(existing?.testResults && { testResults: existing.testResults }),
    };

    progressStore.set(key, progress);
    this.updateCourseProgress(courseSlug);

    // Log XP award (stub for actual XP minting)
    console.warn(
      `[MockLearningProgressService] XP awarded: ${lesson.xpReward} for ${lessonId}`
    );

    return { progress, xpAwarded: lesson.xpReward };
  }

  async autoSaveCode(payload: AutoSavePayload): Promise<void> {
    await this.delay(50);
    const key = makeProgressKey(payload.courseSlug, payload.lessonId);
    codeStore.set(key, payload.code);

    // Update progress with saved code
    const progress = progressStore.get(key);
    if (progress) {
      progress.savedCode = payload.code;
      progressStore.set(key, progress);
    }

    console.warn(
      `[MockLearningProgressService] Auto-saved code for ${payload.lessonId}`
    );
  }

  async loadSavedCode(
    courseSlug: string,
    lessonId: string
  ): Promise<string | null> {
    await this.delay(50);
    const key = makeProgressKey(courseSlug, lessonId);
    return codeStore.get(key) ?? null;
  }

  async runTests(
    courseSlug: string,
    lessonId: string,
    _code: string
  ): Promise<TestResult[]> {
    await this.delay(500); // Simulate test execution

    const lesson = getMockLesson(courseSlug, lessonId);
    if (!lesson?.challenge) {
      return [];
    }

    // Mock test results - in production this would actually run the tests
    const results: TestResult[] = lesson.challenge.testCases.map((tc) => {
      const passed = Math.random() > 0.3; // 70% pass rate for demo
      const base = {
        testId: tc.id,
        name: tc.name,
        passed,
        executionTime: Math.floor(Math.random() * 100) + 10,
      };
      // Only add message if test failed
      if (!passed) {
        return { ...base, message: 'Assertion failed' };
      }
      return base;
    });

    // Store results in progress
    const key = makeProgressKey(courseSlug, lessonId);
    const progress = progressStore.get(key);
    if (progress) {
      progress.testResults = results;
      progressStore.set(key, progress);
    }

    return results;
  }

  async updateTimeSpent(
    courseSlug: string,
    lessonId: string,
    seconds: number
  ): Promise<void> {
    const key = makeProgressKey(courseSlug, lessonId);
    const progress = progressStore.get(key);
    if (progress) {
      progress.timeSpent = seconds;
      progressStore.set(key, progress);
    }
  }

  /**
   * Update overall course progress based on lesson completions
   */
  private updateCourseProgress(courseSlug: string): void {
    const lessons = getMockCourseLessons(courseSlug);
    if (lessons.length === 0) return;

    let completedCount = 0;
    let totalXp = 0;
    let lastAccessed = new Date(0);

    for (const lesson of lessons) {
      const key = makeProgressKey(courseSlug, lesson.id);
      const progress = progressStore.get(key);

      if (progress?.status === 'completed') {
        completedCount++;
        totalXp += progress.xpAwarded;
      }

      const accessTime = progress?.startedAt ?? progress?.completedAt;
      if (accessTime && accessTime > lastAccessed) {
        lastAccessed = accessTime;
      }
    }

    const existing = courseProgressStore.get(courseSlug);
    const isComplete = completedCount === lessons.length;
    const courseProgress: CourseProgress = {
      courseSlug,
      enrolledAt: existing?.enrolledAt ?? new Date(),
      lessonsCompleted: completedCount,
      totalLessons: lessons.length,
      progressPercent: Math.round((completedCount / lessons.length) * 100),
      totalXpEarned: totalXp,
      lastAccessedAt: lastAccessed > new Date(0) ? lastAccessed : new Date(),
      ...(isComplete && { completedAt: new Date() }),
    };

    courseProgressStore.set(courseSlug, courseProgress);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Singleton instance
 */
export const learningProgressService: ILearningProgressService =
  new MockLearningProgressService();
