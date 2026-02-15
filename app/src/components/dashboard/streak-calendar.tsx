'use client';

import { useMemo } from 'react';
import { FiZap, FiShield } from 'react-icons/fi';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { getStreakMultiplier, formatStreak } from '@/lib/xp';
import type { StreakData } from '@/services/dashboard';

interface StreakCalendarProps {
  streak: StreakData;
  onUseFreeze?: () => void;
  className?: string;
}

/**
 * Streak Calendar - Shows activity heatmap and streak info
 */
export function StreakCalendar({
  streak,
  onUseFreeze,
  className,
}: StreakCalendarProps) {
  const { currentStreak, longestStreak, activeToday, freezesAvailable } = streak;
  const multiplier = getStreakMultiplier(currentStreak);

  // Generate last 35 days for calendar
  const calendarDays = useMemo(() => generateCalendarDays(streak.activityHistory), [
    streak.activityHistory,
  ]);

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <FiZap className="size-4 text-streak" />
            Learning Streak
          </CardTitle>
          {multiplier > 1 && (
            <Badge variant="xp" className="text-xs">
              {multiplier}x XP
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Streak Stats */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-streak">
                {currentStreak}
              </span>
              <span className="text-sm text-muted-foreground">
                {currentStreak === 1 ? 'day' : 'days'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Longest: {formatStreak(longestStreak)}
            </p>
          </div>

          {/* Today indicator */}
          <div
            className={cn(
              'flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium',
              activeToday
                ? 'bg-success/10 text-success'
                : 'bg-warning/10 text-warning'
            )}
          >
            {activeToday ? '✓ Active today' : '⚡ Keep it going!'}
          </div>
        </div>

        {/* Streak Freeze */}
        {freezesAvailable > 0 && (
          <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2">
              <FiShield className="size-4 text-primary" />
              <div>
                <p className="text-sm font-medium">
                  {freezesAvailable} Streak Freeze{freezesAvailable > 1 ? 's' : ''}
                </p>
                <p className="text-xs text-muted-foreground">
                  Protect your streak for a day
                </p>
              </div>
            </div>
            {onUseFreeze && !activeToday && (
              <Button variant="outline" size="sm" onClick={onUseFreeze}>
                Use Freeze
              </Button>
            )}
          </div>
        )}

        {/* Activity Calendar */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            Last 5 weeks
          </p>
          <ActivityCalendar days={calendarDays} />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="size-3 rounded-sm bg-muted" />
            <div className="size-3 rounded-sm bg-streak/25" />
            <div className="size-3 rounded-sm bg-streak/50" />
            <div className="size-3 rounded-sm bg-streak/75" />
            <div className="size-3 rounded-sm bg-streak" />
          </div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}

interface CalendarDay {
  date: string;
  xp: number;
  isToday: boolean;
  isFuture: boolean;
}

interface ActivityCalendarProps {
  days: CalendarDay[];
}

/**
 * Activity Calendar - GitHub-style heatmap
 */
function ActivityCalendar({ days }: ActivityCalendarProps) {
  // Group days by week
  const weeks = useMemo(() => {
    const result: CalendarDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      result.push(days.slice(i, i + 7));
    }
    return result;
  }, [days]);

  return (
    <TooltipProvider>
      <div className="flex gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day) => (
              <Tooltip key={day.date}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      'size-4 rounded-sm transition-colors',
                      day.isFuture && 'bg-transparent',
                      !day.isFuture && getActivityColor(day.xp),
                      day.isToday && 'ring-1 ring-primary ring-offset-1 ring-offset-background'
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="font-medium">{formatCalendarDate(day.date)}</p>
                  {day.xp > 0 ? (
                    <p className="text-sm text-muted-foreground">
                      {day.xp.toLocaleString()} XP earned
                    </p>
                  ) : !day.isFuture ? (
                    <p className="text-sm text-muted-foreground">No activity</p>
                  ) : null}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}

/**
 * Generate calendar days from activity history
 */
function generateCalendarDays(activityHistory: Record<string, number>): CalendarDay[] {
  const days: CalendarDay[] = [];
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  // Start from 34 days ago to get 5 weeks
  for (let i = 34; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0] ?? '';

    days.push({
      date: dateStr,
      xp: dateStr ? (activityHistory[dateStr] ?? 0) : 0,
      isToday: dateStr === todayStr,
      isFuture: i < 0,
    });
  }

  return days;
}

/**
 * Get color class based on XP amount
 */
function getActivityColor(xp: number): string {
  if (xp === 0) return 'bg-muted';
  if (xp < 50) return 'bg-streak/25';
  if (xp < 100) return 'bg-streak/50';
  if (xp < 200) return 'bg-streak/75';
  return 'bg-streak';
}

/**
 * Format date for tooltip
 */
function formatCalendarDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00'); // Add time to avoid timezone issues
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

interface StreakBadgeLargeProps {
  days: number;
  className?: string;
}

/**
 * Large streak badge for dashboard hero
 */
export function StreakBadgeLarge({ days, className }: StreakBadgeLargeProps) {
  const multiplier = getStreakMultiplier(days);

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-xl bg-gradient-to-r from-streak/20 to-streak/5 px-4 py-3',
        className
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-streak/20">
        <FiZap className="size-6 text-streak" />
      </div>
      <div>
        <p className="text-2xl font-bold text-streak">{days} Day Streak</p>
        <p className="text-sm text-muted-foreground">
          {multiplier > 1 ? `${multiplier}x XP multiplier` : 'Keep learning!'}
        </p>
      </div>
    </div>
  );
}
