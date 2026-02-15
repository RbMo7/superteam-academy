/**
 * Course Service Types
 *
 * Defines the interface for course data fetching.
 * Currently backed by mock data, will be replaced with CMS integration.
 */

import type { Difficulty, Track } from '@/types/content';

/**
 * Course summary for grid/list views
 */
export interface CourseSummary {
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  difficulty: Difficulty;
  track: Track;
  lessonCount: number;
  duration: number; // total minutes
  xpReward: number;
  creatorName: string;
  creatorAvatar: string;
  enrolledCount: number;
  rating: number;
  tags: string[];
  publishedAt: Date;
  featured: boolean;
}

/**
 * Full course details for detail page
 */
export interface CourseDetail extends CourseSummary {
  longDescription: string;
  lessons: LessonSummary[];
  prerequisites: string[];
  learningObjectives: string[];
  creatorBio: string;
}

/**
 * Lesson summary for course detail page
 */
export interface LessonSummary {
  id: string;
  title: string;
  type: 'video' | 'article' | 'challenge';
  duration: number;
  xpReward: number;
  order: number;
}

/**
 * Course filter options
 */
export interface CourseFilters {
  difficulty?: Difficulty[];
  track?: Track[];
  search?: string;
  tags?: string[];
  sortBy?: 'newest' | 'popular' | 'rating' | 'duration';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated course response
 */
export interface CourseListResponse {
  courses: CourseSummary[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * Course Service Interface
 * Abstraction layer for course data fetching.
 */
export interface ICourseService {
  /**
   * Get paginated list of courses with optional filters
   */
  getCourses(
    filters?: CourseFilters,
    page?: number,
    pageSize?: number
  ): Promise<CourseListResponse>;

  /**
   * Get featured courses for homepage
   */
  getFeaturedCourses(limit?: number): Promise<CourseSummary[]>;

  /**
   * Get course by slug
   */
  getCourseBySlug(slug: string): Promise<CourseDetail | null>;

  /**
   * Search courses by query
   */
  searchCourses(query: string, limit?: number): Promise<CourseSummary[]>;

  /**
   * Get courses by track
   */
  getCoursesByTrack(track: Track, limit?: number): Promise<CourseSummary[]>;

  /**
   * Get related courses
   */
  getRelatedCourses(courseSlug: string, limit?: number): Promise<CourseSummary[]>;

  /**
   * Get all available tags
   */
  getAllTags(): Promise<string[]>;
}
