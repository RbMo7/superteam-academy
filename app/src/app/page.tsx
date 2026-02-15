import { FiAward, FiBook, FiTrendingUp } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <span className="text-primary-foreground text-sm font-bold">SA</span>
            </div>
            <span className="text-lg font-semibold">Superteam Academy</span>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="/explore"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Explore
            </a>
            <a
              href="/leaderboard"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Leaderboard
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container flex flex-col items-center gap-8 py-24 text-center md:py-32">
          <div className="flex max-w-3xl flex-col items-center gap-4">
            <span className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium">
              Learn. Build. Earn.
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Master Solana Development
            </h1>

            <p className="text-muted-foreground max-w-2xl text-lg text-balance md:text-xl">
              Earn verifiable credentials and XP as you progress through hands-on courses. Your
              skills, on-chain.
            </p>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="min-w-[160px]">
                Start Learning
              </Button>
              <Button variant="outline" size="lg" className="min-w-[160px]">
                Browse Courses
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="from-primary/5 to-primary/10 border-none bg-gradient-to-br">
              <CardContent className="flex flex-col items-center gap-2 p-6">
                <FiBook className="text-primary h-8 w-8" />
                <span className="text-3xl font-bold">50+</span>
                <span className="text-muted-foreground text-sm">Courses</span>
              </CardContent>
            </Card>

            <Card className="border-none bg-gradient-to-br from-amber-500/5 to-amber-500/10">
              <CardContent className="flex flex-col items-center gap-2 p-6">
                <FiAward className="h-8 w-8 text-amber-500" />
                <span className="text-3xl font-bold">10K+</span>
                <span className="text-muted-foreground text-sm">Credentials Issued</span>
              </CardContent>
            </Card>

            <Card className="border-none bg-gradient-to-br from-orange-500/5 to-orange-500/10">
              <CardContent className="flex flex-col items-center gap-2 p-6">
                <FiTrendingUp className="h-8 w-8 text-orange-500" />
                <span className="text-3xl font-bold">5K+</span>
                <span className="text-muted-foreground text-sm">Active Learners</span>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted/30 border-t py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Why Superteam Academy?</h2>
              <p className="text-muted-foreground mt-4">
                Built for developers who want to prove their skills on-chain.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title="Soulbound XP"
                description="Earn non-transferable XP tokens that represent your true learning progress."
                icon="🎯"
              />
              <FeatureCard
                title="ZK Credentials"
                description="Verifiable credentials that upgrade as you advance through learning tracks."
                icon="🏆"
              />
              <FeatureCard
                title="Streak Rewards"
                description="Build consistency with daily streaks and unlock special achievements."
                icon="🔥"
              />
              <FeatureCard
                title="Hands-on Challenges"
                description="Code directly in Solana Playground with real program deployments."
                icon="💻"
              />
              <FeatureCard
                title="Creator Incentives"
                description="Course creators earn XP when students complete their courses."
                icon="✨"
              />
              <FeatureCard
                title="Seasonal Leaderboards"
                description="Compete with other learners and climb the XP leaderboard each season."
                icon="📊"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="bg-primary flex h-6 w-6 items-center justify-center rounded">
              <span className="text-primary-foreground text-xs font-bold">SA</span>
            </div>
            <span className="text-sm font-medium">Superteam Academy</span>
          </div>

          <p className="text-muted-foreground text-center text-sm">
            Built with ❤️ by Superteam. Powered by Solana.
          </p>

          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
              Discord
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <Card className="card-shadow border-none">
      <CardContent className="p-6">
        <div className="mb-4 text-3xl">{icon}</div>
        <h3 className="mb-2 font-semibold">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
