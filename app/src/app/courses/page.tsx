'use client';

import { useState, useEffect, useCallback } from 'react';

import { AppShell } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/ui/section-header';
import { CourseGrid, CourseFiltersUI } from '@/components/courses';
import { courseService, type CourseFilters, type CourseSummary } from '@/services/courses';

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [filters, setFilters] = useState<CourseFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const loadCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await courseService.getCourses(filters);
      setCourses(response.courses);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    void loadCourses();
  }, [loadCourses]);

  return (
    <AppShell variant="minimal" showFooter>
      <Container className="py-8">
        {/* Header */}
        <SectionHeader
          title="Explore Courses"
          description={`${total} courses available to help you master Solana development`}
          className="mb-8"
        />

        {/* Filters */}
        <CourseFiltersUI
          filters={filters}
          onFiltersChange={setFilters}
          className="mb-8"
        />

        {/* Course Grid */}
        <CourseGrid
          courses={courses}
          isLoading={isLoading}
          skeletonCount={6}
          emptyMessage={
            filters.search
              ? `No courses found for "${filters.search}"`
              : 'No courses match your filters'
          }
        />
      </Container>
    </AppShell>
  );
}
