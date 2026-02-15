'use client';

import Link from 'next/link';
import { FiClock, FiUsers, FiStar } from 'react-icons/fi';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DifficultyBadge, TrackBadge, XpPill } from '@/components/gamification';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { CourseSummary } from '@/services/courses';

interface CourseCardProps {
  course: CourseSummary;
  /** User's progress (0-100) if enrolled, undefined if not enrolled */
  progress?: number;
  /** Number of lessons completed */
  lessonsCompleted?: number;
  className?: string;
}

/**
 * Course Card - Displays course summary with gamified styling.
 */
export function CourseCard({
  course,
  progress,
  lessonsCompleted,
  className,
}: CourseCardProps) {
  const isEnrolled = progress !== undefined;

  return (
    <Link href={`/courses/${course.slug}`}>
      <Card
        className={cn(
          'card-shadow group h-full overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg',
          className
        )}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
          {/* Placeholder gradient since we don't have real images */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl opacity-30">📚</span>
          </div>

          {/* Featured badge */}
          {course.featured && (
            <div className="absolute left-3 top-3">
              <span className="rounded-full bg-xp px-2 py-0.5 text-xs font-semibold text-white">
                Featured
              </span>
            </div>
          )}

          {/* Track badge */}
          <div className="absolute right-3 top-3">
            <TrackBadge track={course.track} showIcon={false} />
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col gap-3 p-4">
          {/* Title & Description */}
          <div className="flex-1">
            <h3 className="line-clamp-2 font-semibold group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {course.description}
            </p>
          </div>

          {/* Difficulty & XP */}
          <div className="flex items-center justify-between">
            <DifficultyBadge difficulty={course.difficulty} />
            <XpPill amount={course.xpReward} size="sm" />
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <FiClock className="size-3.5" />
              {formatDuration(course.duration)}
            </span>
            <span className="flex items-center gap-1">
              <FiUsers className="size-3.5" />
              {formatNumber(course.enrolledCount)}
            </span>
            <span className="flex items-center gap-1">
              <FiStar className="size-3.5 text-xp" />
              {course.rating.toFixed(1)}
            </span>
          </div>

          {/* Progress bar (if enrolled) */}
          {isEnrolled && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {lessonsCompleted ?? 0} / {course.lessonCount} lessons
                </span>
                <span className="font-medium text-primary">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} variant="xp" size="sm" />
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t px-4 py-3">
          {/* Creator info */}
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={course.creatorAvatar} alt={course.creatorName} />
              <AvatarFallback className="text-xs">
                {course.creatorName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{course.creatorName}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
}
