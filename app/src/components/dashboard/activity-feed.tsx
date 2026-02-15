'use client';

import Link from 'next/link';
import {
  FiBookOpen,
  FiAward,
  FiZap,
  FiCheckCircle,
  FiTrendingUp,
} from 'react-icons/fi';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ActivityEvent } from '@/services/dashboard';

interface ActivityFeedProps {
  activities: ActivityEvent[];
  className?: string;
}

/**
 * Activity Feed - Shows recent learning activity
 */
export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No activity yet. Start learning to see your progress!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface ActivityItemProps {
  activity: ActivityEvent;
}

/**
 * Individual activity item
 */
function ActivityItem({ activity }: ActivityItemProps) {
  const { type, title, description, xpAmount, timestamp } = activity;

  const icon = getActivityIcon(type);
  const iconColor = getActivityIconColor(type);
  const href = getActivityHref(activity);

  const content = (
    <div className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors">
      {/* Icon */}
      <div
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-full',
          iconColor
        )}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-tight">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          {formatRelativeTime(timestamp)}
        </p>
      </div>

      {/* XP Badge */}
      {xpAmount && xpAmount > 0 && (
        <Badge variant="xp" className="shrink-0">
          +{xpAmount} XP
        </Badge>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

/**
 * Get icon for activity type
 */
function getActivityIcon(type: ActivityEvent['type']) {
  switch (type) {
    case 'lesson_complete':
      return <FiCheckCircle className="size-4" />;
    case 'course_complete':
      return <FiBookOpen className="size-4" />;
    case 'achievement':
      return <FiAward className="size-4" />;
    case 'streak':
      return <FiZap className="size-4" />;
    case 'xp_earned':
      return <FiTrendingUp className="size-4" />;
    default:
      return <FiCheckCircle className="size-4" />;
  }
}

/**
 * Get icon background color for activity type
 */
function getActivityIconColor(type: ActivityEvent['type']): string {
  switch (type) {
    case 'lesson_complete':
      return 'bg-success/10 text-success';
    case 'course_complete':
      return 'bg-primary/10 text-primary';
    case 'achievement':
      return 'bg-xp/10 text-xp';
    case 'streak':
      return 'bg-streak/10 text-streak';
    case 'xp_earned':
      return 'bg-xp/10 text-xp';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

/**
 * Get link href for activity
 */
function getActivityHref(activity: ActivityEvent): string | null {
  if (activity.courseSlug && activity.lessonId) {
    return `/courses/${activity.courseSlug}/lessons/${activity.lessonId}`;
  }
  if (activity.courseSlug) {
    return `/courses/${activity.courseSlug}`;
  }
  return null;
}

/**
 * Format relative time
 */
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

interface ActivityTimelineProps {
  activities: ActivityEvent[];
  className?: string;
}

/**
 * Activity Timeline - Alternative vertical timeline view
 */
export function ActivityTimeline({ activities, className }: ActivityTimelineProps) {
  if (activities.length === 0) return null;

  return (
    <div className={cn('relative space-y-4 pl-6', className)}>
      {/* Timeline line */}
      <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />

      {activities.map((activity) => (
        <div key={activity.id} className="relative">
          {/* Timeline dot */}
          <div
            className={cn(
              'absolute -left-6 top-1 size-4 rounded-full border-2 border-background',
              getActivityIconColor(activity.type)
            )}
          />

          {/* Content */}
          <div className="space-y-1">
            <p className="text-sm font-medium">{activity.title}</p>
            {activity.description && (
              <p className="text-xs text-muted-foreground">
                {activity.description}
              </p>
            )}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{formatRelativeTime(activity.timestamp)}</span>
              {activity.xpAmount && activity.xpAmount > 0 && (
                <Badge variant="xp" className="text-xs">
                  +{activity.xpAmount} XP
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
