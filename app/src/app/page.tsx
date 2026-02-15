import type { ReactNode } from 'react';

import {
  FiActivity,
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiCheck,
  FiCode,
  FiCpu,
  FiLayers,
  FiShield,
  FiStar,
  FiZap,
} from 'react-icons/fi';

import { AppShell } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';

export default function HomePage() {
  return (
    <AppShell>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-20 md:py-28 lg:py-32">
        <Container size="xl" className="relative z-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <span className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
              <FiZap className="h-4 w-4" />
              The Future of Developer Education
            </span>

            <h1 className="text-foreground text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Master Solana.
              <br />
              <span className="text-primary">Prove It On-Chain.</span>
            </h1>

            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed md:text-xl">
              Earn verifiable credentials and soulbound XP as you progress through hands-on
              courses. Your skills, permanently recorded on Solana.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="xl" className="min-w-45 rounded-xl">
                Start Learning Free
                <FiArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="xl" className="min-w-45 rounded-xl">
                Explore Courses
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex flex-col items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="bg-muted border-background h-10 w-10 rounded-full border-2"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                Join <span className="text-foreground font-semibold">5,000+</span> developers
                already learning
              </p>
            </div>
          </div>
        </Container>

        {/* Subtle background gradient */}
        <div className="from-primary/5 via-background to-background pointer-events-none absolute inset-0 -z-10 bg-linear-to-b" />
      </section>

      {/* Trust/Stats Section */}
      <section className="w-full border-y bg-neutral-50/50 py-12 md:py-16 dark:bg-neutral-900/50">
        <Container size="lg">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-0 md:divide-x md:divide-border">
            <StatItem value="50+" label="Courses" />
            <StatItem value="10K+" label="Credentials Issued" />
            <StatItem value="5K+" label="Active Learners" />
            <StatItem value="95%" label="Completion Rate" />
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-20 md:py-32">
        <Container size="xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-primary mb-4 inline-block text-sm font-semibold uppercase tracking-wide">
              Why Superteam Academy
            </span>
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Built for developers who want to prove their skills on-chain
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Everything you need to become a verified Solana expert.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<FiShield className="h-6 w-6" />}
              title="Soulbound XP"
              description="Earn non-transferable XP tokens that represent your true learning progress. No shortcuts, no cheating."
            />
            <FeatureCard
              icon={<FiAward className="h-6 w-6" />}
              title="ZK Credentials"
              description="Verifiable credentials powered by zero-knowledge proofs that upgrade as you advance through tracks."
            />
            <FeatureCard
              icon={<FiActivity className="h-6 w-6" />}
              title="Streak Rewards"
              description="Build consistency with daily streaks and unlock special achievements that showcase your dedication."
            />
            <FeatureCard
              icon={<FiCode className="h-6 w-6" />}
              title="Hands-on Challenges"
              description="Code directly in Solana Playground with real program deployments and instant feedback."
            />
            <FeatureCard
              icon={<FiStar className="h-6 w-6" />}
              title="Creator Incentives"
              description="Course creators earn XP rewards when students complete their content successfully."
            />
            <FeatureCard
              icon={<FiBarChart2 className="h-6 w-6" />}
              title="Seasonal Leaderboards"
              description="Compete with learners worldwide and climb the XP leaderboard each season."
            />
          </div>
        </Container>
      </section>

      {/* Learning Paths Section */}
      <section className="w-full bg-muted/30 py-20 md:py-32">
        <Container size="xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-primary mb-4 inline-block text-sm font-semibold uppercase tracking-wide">
              Learning Paths
            </span>
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Choose your path to mastery
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Structured tracks designed to take you from beginner to expert.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <PathCard
              icon={<FiCpu className="h-8 w-8" />}
              title="Solana Fundamentals"
              description="Master the basics of Solana architecture, accounts, and transactions."
              courses={12}
              difficulty="Beginner"
            />
            <PathCard
              icon={<FiCode className="h-8 w-8" />}
              title="Anchor Development"
              description="Build secure and efficient programs using the Anchor framework."
              courses={15}
              difficulty="Intermediate"
            />
            <PathCard
              icon={<FiLayers className="h-8 w-8" />}
              title="Advanced DeFi"
              description="Create complex DeFi protocols including AMMs, lending, and vaults."
              courses={10}
              difficulty="Advanced"
            />
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="rounded-xl">
              View All Tracks
              <FiArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 md:py-32">
        <Container size="xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-primary mb-4 inline-block text-sm font-semibold uppercase tracking-wide">
              Testimonials
            </span>
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by developers worldwide
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="The on-chain credentials gave me instant credibility when applying for Web3 jobs. Recruiters love verifiable proof of skills."
              author="Alex Chen"
              role="Solana Developer"
            />
            <TestimonialCard
              quote="The streak system kept me motivated to learn every day. I went from zero to building my own DEX in 3 months."
              author="Maria Santos"
              role="DeFi Engineer"
            />
            <TestimonialCard
              quote="Finally, a learning platform that understands developers. The hands-on approach with real deployments is exactly what I needed."
              author="James Wilson"
              role="Smart Contract Auditor"
            />
          </div>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="w-full bg-primary/5 py-24 md:py-32">
        <Container size="md">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to start your Solana journey?
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Join thousands of developers earning verifiable credentials. Start learning for free
              today.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="xl" className="min-w-50 rounded-xl">
                Get Started Free
                <FiArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <FiCheck className="text-success h-4 w-4" />
                No credit card required
              </span>
              <span className="text-muted-foreground flex items-center gap-2">
                <FiCheck className="text-success h-4 w-4" />
                Start learning immediately
              </span>
              <span className="text-muted-foreground flex items-center gap-2">
                <FiCheck className="text-success h-4 w-4" />
                Cancel anytime
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer Spacer */}
      <div className="h-8" />
    </AppShell>
  );
}

function StatItem({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 px-8 text-center md:px-12">
      <span className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">{value}</span>
      <span className="text-muted-foreground text-sm">{label}</span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="group border-border/50 bg-card hover:border-primary/30 rounded-2xl border p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <CardContent className="p-0">
        <div className="bg-primary/10 text-primary mb-5 inline-flex rounded-xl p-3">{icon}</div>
        <h3 className="text-foreground mb-3 text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

function PathCard({
  icon,
  title,
  description,
  courses,
  difficulty,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  courses: number;
  difficulty: string;
}) {
  return (
    <Card className="group border-border/50 bg-card hover:border-primary/30 rounded-2xl border p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <CardContent className="p-0">
        <div className="text-primary mb-6">{icon}</div>
        <h3 className="text-foreground mb-3 text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground mb-8 leading-relaxed">{description}</p>
        <div className="flex items-center justify-between border-t pt-5">
          <span className="text-muted-foreground">{courses} courses</span>
          <span className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium">
            {difficulty}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) {
  return (
    <Card className="border-border/50 bg-card rounded-2xl border p-8 shadow-sm">
      <CardContent className="p-0">
        <p className="text-foreground mb-8 text-lg leading-relaxed">&ldquo;{quote}&rdquo;</p>
        <div className="flex items-center gap-4">
          <div className="bg-muted h-12 w-12 rounded-full" aria-hidden="true" />
          <div>
            <p className="text-foreground font-semibold">{author}</p>
            <p className="text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

