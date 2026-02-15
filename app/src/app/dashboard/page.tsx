'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import {
  FiArrowRight,
  FiTrendingUp,
  FiBook,
  FiAward,
  FiRefreshCw,
  FiWifi,
  FiWifiOff,
} from 'react-icons/fi';

import { AppShell } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { LevelBadge } from '@/components/gamification';
import { CourseCard } from '@/components/courses';
import {
  AchievementGrid,
  AchievementSummary,
  StreakCalendar,
  StreakBadgeLarge,
  ActivityFeed,
} from '@/components/dashboard';
import { formatXp } from '@/lib/xp';
import { dashboardService, type DashboardData } from '@/services/dashboard';
import { useAuth } from '@/providers/auth-provider';

export default function DashboardPage() {
  const { user } = useUser();
  const { isWalletConnected, walletAddress } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setIsLoading(true);
    setError(null);

    try {
      const dashboardData = await dashboardService.getDashboardData();
      setData(dashboardData);
    } catch (err) {
      console.error('[Dashboard] Failed to load:', err);
      setError('Failed to load dashboard');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUseFreeze() {
    if (!data) return;

    const success = await dashboardService.useStreakFreeze();
    if (success) {
      loadDashboard();
    }
  }

  if (error) {
    return (
      <AppShell>
        <Container className="py-12">
          <div className="text-center space-y-4">
            <p className="text-destructive">{error}</p>
            <Button onClick={loadDashboard}>
              <FiRefreshCw className="mr-2 size-4" />
              Retry
            </Button>
          </div>
        </Container>
      </AppShell>
    );
  }

  return (
    <AppShell variant="full" showMobileNav>
      <Container className="py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {user?.firstName ?? 'Learner'}!
            </h1>
            <p className="text-muted-foreground">
              Track your progress and achievements
            </p>
          </div>
        </div>

        {isLoading ? (
          <DashboardSkeleton />
        ) : data ? (
          <>
            {/* XP & Level Hero */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* XP Card */}
              <Card className="lg:col-span-2 bg-gradient-to-br from-primary/5 via-background to-background">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    {/* Level & XP */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <LevelBadge level={data.level} size="lg" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {data.levelTitle}
                          </p>
                          <p className="text-3xl font-bold">
                            {formatXp(data.totalXp)} XP
                          </p>
                        </div>
                      </div>

                      {/* Progress to next level */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Level {data.level + 1}
                          </span>
                          <span className="font-medium">
                            {formatXp(data.xpToNextLevel)} XP to go
                          </span>
                        </div>
                        <Progress value={data.levelProgress} className="h-2" />
                      </div>
                    </div>

                    {/* Streak Badge */}
                    <StreakBadgeLarge days={data.streak.currentStreak} />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FiTrendingUp className="size-4" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Courses enrolled
                    </span>
                    <span className="font-medium">
                      {data.enrolledCourses.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Lessons completed
                    </span>
                    <span className="font-medium">
                      {data.enrolledCourses.reduce(
                        (sum, c) => sum + c.lessonsCompleted,
                        0
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Achievements earned
                    </span>
                    <span className="font-medium">
                      {data.achievements.filter((a) => a.earned).length}/
                      {data.achievements.length}
                    </span>
                  </div>

                  {/* Wallet Status */}
                  <div className="pt-2 border-t flex items-center gap-2">
                    {isWalletConnected ? (
                      <>
                        <FiWifi className="size-4 text-success" />
                        <span className="text-sm font-mono truncate max-w-[140px]">
                          {walletAddress}
                        </span>
                      </>
                    ) : (
                      <>
                        <FiWifiOff className="size-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Wallet not connected
                        </span>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left Column - Courses & Achievements */}
              <div className="lg:col-span-2 space-y-6">
                {/* Current Courses */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <FiBook className="size-4" />
                      Continue Learning
                    </h2>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/courses">
                        View all
                        <FiArrowRight className="ml-1 size-3" />
                      </Link>
                    </Button>
                  </div>

                  {data.enrolledCourses.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {data.enrolledCourses.map((course) => (
                        <CourseCard
                          key={course.slug}
                          course={course}
                          progress={course.progress}
                          lessonsCompleted={course.lessonsCompleted}
                        />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="py-8 text-center">
                        <p className="text-muted-foreground">
                          You haven&apos;t enrolled in any courses yet.
                        </p>
                        <Button className="mt-4" asChild>
                          <Link href="/courses">Browse Courses</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </section>

                {/* Achievements */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <FiAward className="size-4" />
                      Achievements
                    </h2>
                    <AchievementSummary achievements={data.achievements} />
                  </div>

                  <AchievementGrid
                    achievements={data.achievements}
                    showLocked={true}
                    columns={3}
                  />
                </section>

                {/* Recommended Courses */}
                {data.recommendedCourses.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">Recommended for You</h2>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/courses">
                          View all
                          <FiArrowRight className="ml-1 size-3" />
                        </Link>
                      </Button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {data.recommendedCourses.map((course) => (
                        <CourseCard key={course.slug} course={course} />
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Right Column - Streak & Activity */}
              <div className="space-y-6">
                {/* Streak Calendar */}
                <StreakCalendar
                  streak={data.streak}
                  onUseFreeze={handleUseFreeze}
                />

                {/* Activity Feed */}
                <ActivityFeed activities={data.recentActivity} />
              </div>
            </div>
          </>
        ) : null}
      </Container>
    </AppShell>
  );
}

/**
 * Dashboard loading skeleton
 */
function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Hero skeleton */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Skeleton className="size-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
            </div>
            <Skeleton className="h-2 w-full mt-6" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      </div>

      {/* Content skeleton */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-48 rounded-lg" />
            <Skeleton className="h-48 rounded-lg" />
          </div>
          <div className="grid gap-4 grid-cols-3">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-48 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
