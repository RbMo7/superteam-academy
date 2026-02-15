/**
 * Learning Progress Service Types
 *
 * Defines interfaces for tracking user learning progress,
 * lesson completion, and XP awards.
 */

/**
 * User's progress on a specific lesson
 */
export interface LessonProgress {
  lessonId: string;
  courseSlug: string;
  status: 'not-started' | 'in-progress' | 'completed';
  startedAt?: Date;
  completedAt?: Date;
  xpAwarded: number;
  /** For challenges: user's saved code */
  savedCode?: string;
  /** For challenges: test results */
  testResults?: TestResult[];
  /** Time spent in seconds */
  timeSpent: number;
}

/**
 * Test result for challenge lessons
 */
export interface TestResult {
  testId: string;
  name: string;
  passed: boolean;
  message?: string;
  executionTime?: number;
}

/**
 * User's overall progress on a course
 */
export interface CourseProgress {
  courseSlug: string;
  enrolledAt: Date;
  lessonsCompleted: number;
  totalLessons: number;
  progressPercent: number;
  totalXpEarned: number;
  lastAccessedAt: Date;
  completedAt?: Date;
}

/**
 * Full lesson content for lesson view
 */
export interface LessonDetail {
  id: string;
  courseSlug: string;
  title: string;
  type: 'video' | 'article' | 'challenge';
  order: number;
  duration: number;
  xpReward: number;
  /** Markdown content */
  content: string;
  /** Video URL for video lessons */
  videoUrl?: string;
  /** Challenge configuration */
  challenge?: ChallengeDetail;
  /** Hints for the lesson */
  hints?: string[];
  /** Solution explanation */
  solution?: string;
  /** Next lesson ID */
  nextLessonId?: string;
  /** Previous lesson ID */
  prevLessonId?: string;
}

/**
 * Challenge details for coding lessons
 */
export interface ChallengeDetail {
  /** Starter code template */
  starterCode: string;
  /** Test cases to run */
  testCases: TestCase[];
  /** Solana Playground project ID (optional) */
  playgroundProjectId?: string;
  /** Language/framework */
  language: 'rust' | 'typescript' | 'anchor';
}

/**
 * Test case for challenge validation
 */
export interface TestCase {
  id: string;
  name: string;
  description: string;
  /** Whether this test is visible to the user */
  visible: boolean;
  /** Expected output/behavior description */
  expected: string;
}

/**
 * Auto-save request payload
 */
export interface AutoSavePayload {
  lessonId: string;
  courseSlug: string;
  code: string;
  timestamp: Date;
}

/**
 * XP award event
 */
export interface XpAwardEvent {
  lessonId: string;
  courseSlug: string;
  amount: number;
  reason: 'lesson_complete' | 'challenge_complete' | 'bonus';
  awardedAt: Date;
}

/**
 * Learning Progress Service Interface
 */
export interface ILearningProgressService {
  /**
   * Get lesson details by ID
   */
  getLesson(courseSlug: string, lessonId: string): Promise<LessonDetail | null>;

  /**
   * Get user's progress on a specific lesson
   */
  getLessonProgress(
    courseSlug: string,
    lessonId: string
  ): Promise<LessonProgress | null>;

  /**
   * Get user's overall course progress
   */
  getCourseProgress(courseSlug: string): Promise<CourseProgress | null>;

  /**
   * Mark lesson as started
   */
  startLesson(courseSlug: string, lessonId: string): Promise<LessonProgress>;

  /**
   * Mark lesson as completed and award XP
   */
  completeLesson(
    courseSlug: string,
    lessonId: string
  ): Promise<{ progress: LessonProgress; xpAwarded: number }>;

  /**
   * Auto-save user's code (for challenges)
   */
  autoSaveCode(payload: AutoSavePayload): Promise<void>;

  /**
   * Load user's saved code for a challenge
   */
  loadSavedCode(courseSlug: string, lessonId: string): Promise<string | null>;

  /**
   * Run tests for a challenge (stub - returns mock results)
   */
  runTests(
    courseSlug: string,
    lessonId: string,
    code: string
  ): Promise<TestResult[]>;

  /**
   * Update time spent on lesson
   */
  updateTimeSpent(
    courseSlug: string,
    lessonId: string,
    seconds: number
  ): Promise<void>;
}
