'use client';

import { useUser } from '@clerk/nextjs';
import { FiAward, FiBook, FiZap } from 'react-icons/fi';

import { AppShell } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/ui/section-header';
import { Progress } from '@/components/ui/progress';
import { XpPill, StreakBadge, LevelBadge } from '@/components/gamification';
import { useAuth } from '@/providers/auth-provider';

export default function DashboardPage() {
  const { user } = useUser();
  const { isWalletConnected, walletAddress } = useAuth();

  return (
    <AppShell variant="full" showMobileNav>
      <Container className="py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.firstName ?? 'Learner'}!</h1>
            <p className="text-muted-foreground">Continue your learning journey</p>
          </div>

          <div className="flex items-center gap-3">
            <LevelBadge level={5} size="lg" />
            <XpPill amount={2450} size="lg" />
            <StreakBadge days={7} size="lg" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total XP"
            value="2,450"
            icon={<FiZap className="size-5 text-xp" />}
            trend="+150 this week"
          />
          <StatCard
            title="Courses Completed"
            value="3"
            icon={<FiBook className="size-5 text-primary" />}
            trend="2 in progress"
          />
          <StatCard
            title="Current Streak"
            value="7 days"
            icon={<FiZap className="size-5 text-streak" />}
            trend="Best: 14 days"
          />
          <StatCard
            title="Credentials"
            value="2"
            icon={<FiAward className="size-5 text-success" />}
            trend="1 upgradable"
          />
        </div>

        {/* Wallet Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Wallet Connection</CardTitle>
          </CardHeader>
          <CardContent>
            {isWalletConnected ? (
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-success" />
                <span className="font-mono text-sm">{walletAddress}</span>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Connect your wallet to earn on-chain XP and credentials
              </p>
            )}
          </CardContent>
        </Card>

        {/* Continue Learning */}
        <SectionHeader
          title="Continue Learning"
          description="Pick up where you left off"
          className="mb-4"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CourseProgressCard
            title="Solana Program Basics"
            progress={65}
            lessonsCompleted={7}
            totalLessons={12}
          />
          <CourseProgressCard
            title="Token-2022 Extensions"
            progress={30}
            lessonsCompleted={3}
            totalLessons={10}
          />
        </div>
      </Container>
    </AppShell>
  );
}

function StatCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-muted-foreground text-xs">{trend}</p>
          </div>
          <div className="bg-muted rounded-full p-3">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function CourseProgressCard({
  title,
  progress,
  lessonsCompleted,
  totalLessons,
}: {
  title: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
}) {
  return (
    <Card className="card-shadow">
      <CardContent className="pt-6">
        <h3 className="mb-2 font-semibold">{title}</h3>
        <Progress value={progress} variant="xp" className="mb-2" />
        <p className="text-muted-foreground text-sm">
          {lessonsCompleted} of {totalLessons} lessons completed
        </p>
      </CardContent>
    </Card>
  );
}
