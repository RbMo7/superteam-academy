'use client';

import { FiLock, FiCheck } from 'react-icons/fi';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Achievement } from '@/services/dashboard';

interface AchievementCardProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Achievement Card - Displays a single achievement
 */
export function AchievementCard({
  achievement,
  size = 'md',
  className,
}: AchievementCardProps) {
  const { earned, progress, requirement } = achievement;
  const hasProgress = progress !== undefined && requirement !== undefined;
  const progressPercent = hasProgress
    ? Math.min(100, (progress / requirement) * 100)
    : 0;

  const sizes = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
  };

  const iconSizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className={cn(
              'relative overflow-hidden transition-all',
              earned
                ? 'bg-gradient-to-br from-xp/10 via-background to-background border-xp/30'
                : 'bg-muted/30 border-muted',
              !earned && 'opacity-60 hover:opacity-80',
              className
            )}
          >
            <CardContent className={cn(sizes[size], 'space-y-2')}>
              {/* Icon */}
              <div className="flex items-start justify-between">
                <span className={cn(iconSizes[size], !earned && 'grayscale')}>
                  {achievement.icon}
                </span>
                {earned ? (
                  <Badge variant="success" className="text-xs">
                    <FiCheck className="mr-1 size-3" />
                    Earned
                  </Badge>
                ) : (
                  <FiLock className="size-4 text-muted-foreground" />
                )}
              </div>

              {/* Name */}
              <h4 className="font-medium text-sm leading-tight">
                {achievement.name}
              </h4>

              {/* Progress bar (for incomplete achievements) */}
              {!earned && hasProgress && (
                <div className="space-y-1">
                  <Progress value={progressPercent} className="h-1.5" />
                  <p className="text-xs text-muted-foreground">
                    {progress}/{requirement}
                  </p>
                </div>
              )}

              {/* Earned date */}
              {earned && achievement.earnedAt && size !== 'sm' && (
                <p className="text-xs text-muted-foreground">
                  {formatDate(achievement.earnedAt)}
                </p>
              )}
            </CardContent>

            {/* XP Badge */}
            <div className="absolute top-2 right-2">
              <span className="text-xs font-medium text-xp">
                +{achievement.xpReward} XP
              </span>
            </div>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <p className="font-medium">{achievement.name}</p>
          <p className="text-sm text-muted-foreground">
            {achievement.description}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface AchievementGridProps {
  achievements: Achievement[];
  showLocked?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
}

/**
 * Achievement Grid - Displays multiple achievements
 */
export function AchievementGrid({
  achievements,
  showLocked = true,
  columns = 3,
  className,
}: AchievementGridProps) {
  const filtered = showLocked
    ? achievements
    : achievements.filter((a) => a.earned);

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  };

  // Sort: earned first (by date desc), then by progress desc
  const sorted = [...filtered].sort((a, b) => {
    if (a.earned && !b.earned) return -1;
    if (!a.earned && b.earned) return 1;
    if (a.earned && b.earned) {
      return (
        (b.earnedAt?.getTime() ?? 0) - (a.earnedAt?.getTime() ?? 0)
      );
    }
    return (b.progress ?? 0) - (a.progress ?? 0);
  });

  return (
    <div className={cn('grid gap-4', gridCols[columns], className)}>
      {sorted.map((achievement) => (
        <AchievementCard
          key={achievement.id}
          achievement={achievement}
          size="md"
        />
      ))}
    </div>
  );
}

interface AchievementSummaryProps {
  achievements: Achievement[];
  className?: string;
}

/**
 * Achievement Summary - Shows earned/total count
 */
export function AchievementSummary({
  achievements,
  className,
}: AchievementSummaryProps) {
  const earned = achievements.filter((a) => a.earned).length;
  const total = achievements.length;
  const earnedXp = achievements
    .filter((a) => a.earned)
    .reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="flex items-center gap-2">
        <span className="text-2xl">🏆</span>
        <div>
          <p className="text-sm font-medium">
            {earned}/{total} Achievements
          </p>
          <p className="text-xs text-muted-foreground">
            {earnedXp.toLocaleString()} XP earned
          </p>
        </div>
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
