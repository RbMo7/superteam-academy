/**
 * Course Service Implementation
 *
 * Mock implementation using static data.
 * Will be replaced with real CMS integration.
 */

import { MOCK_COURSES, getCourseSummaries, getAllTags as getMockTags } from './mock-data';
import type {
  ICourseService,
  CourseFilters,
  CourseListResponse,
  CourseSummary,
  CourseDetail,
} from './types';
import type { Track } from '@/types/content';

class MockCourseService implements ICourseService {
  private delay(ms = 100): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getCourses(
    filters?: CourseFilters,
    page = 1,
    pageSize = 12
  ): Promise<CourseListResponse> {
    await this.delay();

    let courses = getCourseSummaries();

    // Apply filters
    if (filters) {
      // Difficulty filter
      if (filters.difficulty && filters.difficulty.length > 0) {
        courses = courses.filter((c) => filters.difficulty!.includes(c.difficulty));
      }

      // Track filter
      if (filters.track && filters.track.length > 0) {
        courses = courses.filter((c) => filters.track!.includes(c.track));
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        courses = courses.filter(
          (c) =>
            c.title.toLowerCase().includes(searchLower) ||
            c.description.toLowerCase().includes(searchLower) ||
            c.tags.some((t) => t.toLowerCase().includes(searchLower))
        );
      }

      // Tags filter
      if (filters.tags && filters.tags.length > 0) {
        courses = courses.filter((c) => filters.tags!.some((t) => c.tags.includes(t)));
      }

      // Sorting
      if (filters.sortBy) {
        const order = filters.sortOrder === 'asc' ? 1 : -1;
        courses = [...courses].sort((a, b) => {
          switch (filters.sortBy) {
            case 'newest':
              return order * (b.publishedAt.getTime() - a.publishedAt.getTime());
            case 'popular':
              return order * (b.enrolledCount - a.enrolledCount);
            case 'rating':
              return order * (b.rating - a.rating);
            case 'duration':
              return order * (a.duration - b.duration);
            default:
              return 0;
          }
        });
      }
    }

    // Pagination
    const total = courses.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedCourses = courses.slice(startIndex, startIndex + pageSize);

    return {
      courses: paginatedCourses,
      total,
      page,
      pageSize,
      hasMore: startIndex + pageSize < total,
    };
  }

  async getFeaturedCourses(limit = 3): Promise<CourseSummary[]> {
    await this.delay();
    return getCourseSummaries()
      .filter((c) => c.featured)
      .slice(0, limit);
  }

  async getCourseBySlug(slug: string): Promise<CourseDetail | null> {
    await this.delay(150);
    return MOCK_COURSES.find((c) => c.slug === slug) ?? null;
  }

  async searchCourses(query: string, limit = 5): Promise<CourseSummary[]> {
    await this.delay(50);
    const queryLower = query.toLowerCase();
    return getCourseSummaries()
      .filter(
        (c) =>
          c.title.toLowerCase().includes(queryLower) ||
          c.description.toLowerCase().includes(queryLower) ||
          c.tags.some((t) => t.toLowerCase().includes(queryLower))
      )
      .slice(0, limit);
  }

  async getCoursesByTrack(track: Track, limit = 6): Promise<CourseSummary[]> {
    await this.delay();
    return getCourseSummaries()
      .filter((c) => c.track === track)
      .slice(0, limit);
  }

  async getRelatedCourses(courseSlug: string, limit = 3): Promise<CourseSummary[]> {
    await this.delay();
    const course = MOCK_COURSES.find((c) => c.slug === courseSlug);
    if (!course) return [];

    return getCourseSummaries()
      .filter((c) => c.slug !== courseSlug)
      .filter((c) => c.track === course.track || c.tags.some((t) => course.tags.includes(t)))
      .slice(0, limit);
  }

  async getAllTags(): Promise<string[]> {
    await this.delay(50);
    return getMockTags();
  }
}

// Export singleton instance
export const courseService: ICourseService = new MockCourseService();
