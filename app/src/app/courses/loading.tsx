import { AppShell } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { CourseGridSkeleton } from '@/components/common/loading-skeletons';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Courses loading state
 */
export default function CoursesLoading() {
  return (
    <AppShell variant="full" showMobileNav>
      <Container className="py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-36" />
        </div>

        {/* Course Grid */}
        <CourseGridSkeleton count={6} />
      </Container>
    </AppShell>
  );
}
