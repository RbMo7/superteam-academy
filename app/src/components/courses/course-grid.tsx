'use client';

import { CourseCard } from './course-card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { CourseSummary } from '@/services/courses';

interface CourseGridProps {
  courses: CourseSummary[];
  /** User's progress for each course (keyed by slug) */
  progress?: Record<string, { progress: number; lessonsCompleted: number }>;
  /** Loading state */
  isLoading?: boolean;
  /** Number of skeleton cards to show when loading */
  skeletonCount?: number;
  /** Empty state message */
  emptyMessage?: string;
  className?: string;
}

/**
 * Course Grid - Responsive grid of course cards.
 */
export function CourseGrid({
  courses,
  progress,
  isLoading,
  skeletonCount = 6,
  emptyMessage = 'No courses found',
  className,
}: CourseGridProps) {
  if (isLoading) {
    return (
      <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <span className="text-4xl">📭</span>
        <p className="mt-4 text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {courses.map((course) => {
        const courseProgress = progress?.[course.slug];
        const cardProps = {
          course,
          ...(courseProgress?.progress !== undefined && { progress: courseProgress.progress }),
          ...(courseProgress?.lessonsCompleted !== undefined && {
            lessonsCompleted: courseProgress.lessonsCompleted,
          }),
        };
        return <CourseCard key={course.slug} {...cardProps} />;
      })}
    </div>
  );
}

/**
 * Course Card Skeleton for loading states
 */
function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      {/* Thumbnail */}
      <Skeleton className="aspect-video w-full" />

      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-5 w-3/4" />
        {/* Description */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />

        {/* Badges */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t px-4 py-3">
        <div className="flex items-center gap-2">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}
