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
  FiTerminal,
  FiZap,
} from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AppShell, Footer } from '@/components/layout';

// Brand colors
const COLORS = {
  cream: '#f7eacb',
  forest: '#2f6b3f',
  emerald: '#008c4c',
  dark: '#1b231d',
};

export default function HomePage() {
  return (
    <AppShell showFooter={false}>
      {/* Hero Section - Cream background */}
      <section 
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: COLORS.cream }}
      >
        {/* Grid background */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(to right, ${COLORS.forest}10 1px, transparent 1px), linear-gradient(to bottom, ${COLORS.forest}10 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Decorative blobs */}
        <div 
          className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${COLORS.emerald}33` }}
        />
        <div 
          className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${COLORS.forest}33` }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 md:py-32 lg:px-12 lg:py-40">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* Badge */}
            <span 
              className="mb-8 inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
              style={{ 
                backgroundColor: COLORS.forest, 
                borderColor: COLORS.forest,
                boxShadow: `0 10px 15px -3px ${COLORS.forest}4D`
              }}
            >
              <FiZap className="h-4 w-4" />
              The Future of Developer Education
            </span>

            {/* Headline */}
            <h1 
              className="text-5xl leading-[1.1] font-bold tracking-tight sm:text-6xl md:text-7xl"
              style={{ color: COLORS.dark }}
            >
              Master Solana.
              <br />
              <span 
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(to right, ${COLORS.forest}, ${COLORS.emerald})` }}
              >
                Prove It On-Chain.
              </span>
            </h1>

            {/* Subheadline */}
            <p 
              className="mt-8 max-w-2xl text-lg leading-relaxed md:text-xl"
              style={{ color: `${COLORS.dark}B3` }}
            >
              Earn verifiable credentials and soulbound XP as you progress through hands-on courses.
              Your skills, permanently recorded on Solana.
            </p>

            {/* CTAs */}
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Button
                size="xl"
                className="min-w-48 rounded-xl text-white shadow-lg hover:shadow-xl"
                style={{ 
                  backgroundColor: COLORS.emerald,
                  boxShadow: `0 10px 15px -3px ${COLORS.emerald}66`
                }}
              >
                Start Learning Free
                <FiArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="min-w-48 rounded-xl border-2 bg-white hover:text-white"
                style={{ 
                  borderColor: COLORS.forest,
                  color: COLORS.forest,
                }}
              >
                Explore Courses
              </Button>
            </div>

            {/* Social proof avatars */}
            <div className="mt-16 flex flex-col items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-12 w-12 rounded-full border-[3px] shadow-md"
                    style={{ 
                      borderColor: COLORS.cream,
                      backgroundImage: `linear-gradient(to bottom right, ${COLORS.forest}, ${COLORS.emerald})`
                    }}
                    aria-hidden="true"
                  />
                ))}
                <div 
                  className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] text-sm font-bold text-white shadow-md"
                  style={{ borderColor: COLORS.cream, backgroundColor: COLORS.dark }}
                >
                  +5K
                </div>
              </div>
              <p style={{ color: `${COLORS.dark}B3` }}>
                Join <span className="font-bold" style={{ color: COLORS.forest }}>5,000+</span> developers already learning
              </p>
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div
          className="absolute right-0 bottom-0 left-0 h-16"
          style={{ 
            backgroundColor: COLORS.forest,
            clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' 
          }}
        />
      </section>

      {/* Stats Section - Forest Green */}
      <section 
        className="w-full py-20 md:py-24"
        style={{ backgroundColor: COLORS.forest }}
      >
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            <StatItem value="50+" label="Courses" />
            <StatItem value="10K+" label="Credentials Issued" />
            <StatItem value="5K+" label="Active Learners" />
            <StatItem value="95%" label="Completion Rate" />
          </div>
        </div>
      </section>

      {/* Features Section - White with green accents */}
      <section className="relative w-full bg-white py-24 md:py-32">
        {/* Decorative corners */}
        <div
          className="absolute left-0 top-0 h-32 w-32"
          style={{ 
            backgroundColor: `${COLORS.emerald}1A`,
            clipPath: 'polygon(0 0, 100% 0, 0 100%)' 
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-32 w-32"
          style={{ 
            backgroundColor: `${COLORS.forest}1A`,
            clipPath: 'polygon(100% 100%, 100% 0, 0 100%)' 
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Section header */}
          <div className="mx-auto max-w-3xl text-center">
            <span 
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white"
              style={{ backgroundColor: COLORS.emerald }}
            >
              <FiStar className="h-4 w-4" />
              Why Superteam Academy
            </span>
            <h2 
              className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
              style={{ color: COLORS.dark }}
            >
              Built for developers who want to{' '}
              <span style={{ color: COLORS.forest }}>prove their skills</span> on-chain
            </h2>
            <p 
              className="mt-6 text-lg"
              style={{ color: `${COLORS.dark}B3` }}
            >
              Everything you need to become a verified Solana expert.
            </p>
          </div>

          {/* Features grid */}
          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>

      {/* Learning Paths Section - Cream background */}
      <section 
        className="relative w-full py-24 md:py-32"
        style={{ backgroundColor: COLORS.cream }}
      >
        {/* Dots background */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: `radial-gradient(${COLORS.forest}26 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Side accent bars */}
        <div 
          className="absolute left-0 top-24 h-48 w-2"
          style={{ backgroundColor: COLORS.emerald }}
        />
        <div 
          className="absolute bottom-24 right-0 h-48 w-2"
          style={{ backgroundColor: COLORS.forest }}
        />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Section header */}
          <div className="mx-auto max-w-3xl text-center">
            <span 
              className="mb-4 inline-flex items-center gap-2 rounded-full border-2 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wider shadow-sm"
              style={{ borderColor: COLORS.forest, color: COLORS.forest }}
            >
              <FiLayers className="h-4 w-4" />
              Learning Paths
            </span>
            <h2 
              className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
              style={{ color: COLORS.dark }}
            >
              Choose your path to{' '}
              <span style={{ color: COLORS.emerald }}>mastery</span>
            </h2>
            <p 
              className="mt-6 text-lg"
              style={{ color: `${COLORS.dark}B3` }}
            >
              Structured tracks designed to take you from beginner to expert.
            </p>
          </div>

          {/* Paths grid */}
          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <PathCard
              icon={<FiCpu className="h-8 w-8" />}
              title="Solana Fundamentals"
              description="Master the basics of Solana architecture, accounts, and transactions."
              courses={12}
              difficulty="Beginner"
              color="emerald"
            />
            <PathCard
              icon={<FiTerminal className="h-8 w-8" />}
              title="Anchor Development"
              description="Build secure and efficient programs using the Anchor framework."
              courses={15}
              difficulty="Intermediate"
              color="forest"
            />
            <PathCard
              icon={<FiLayers className="h-8 w-8" />}
              title="Advanced DeFi"
              description="Create complex DeFi protocols including AMMs, lending, and vaults."
              courses={10}
              difficulty="Advanced"
              color="dark"
            />
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Button
              size="lg"
              className="rounded-xl text-white shadow-lg"
              style={{ 
                backgroundColor: COLORS.forest,
                boxShadow: `0 10px 15px -3px ${COLORS.forest}4D`
              }}
            >
              View All Tracks
              <FiArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Dark with emerald accents */}
      <section 
        className="relative w-full overflow-hidden py-24 md:py-32"
        style={{ backgroundColor: COLORS.dark }}
      >
        {/* Decorative gradient orbs */}
        <div 
          className="pointer-events-none absolute -left-48 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: `${COLORS.emerald}33` }}
        />
        <div 
          className="pointer-events-none absolute -right-48 top-1/3 h-96 w-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${COLORS.forest}4D` }}
        />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Section header */}
          <div className="mx-auto max-w-3xl text-center">
            <span 
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white"
              style={{ backgroundColor: COLORS.emerald }}
            >
              <FiAward className="h-4 w-4" />
              Testimonials
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Trusted by developers{' '}
              <span style={{ color: COLORS.emerald }}>worldwide</span>
            </h2>
          </div>

          {/* Testimonials grid */}
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
        </div>
      </section>

      {/* CTA Section - Emerald gradient */}
      <section 
        className="relative w-full overflow-hidden py-24 md:py-32"
        style={{ backgroundImage: `linear-gradient(to bottom right, ${COLORS.emerald}, ${COLORS.forest})` }}
      >
        {/* Grid background */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full border-8 border-white/20" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full border-8 border-white/20" />

        <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to start your Solana journey?
          </h2>
          <p className="mt-6 text-lg text-white/80">
            Join thousands of developers earning verifiable credentials. Start learning for free today.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="xl"
              className="min-w-56 rounded-xl shadow-xl"
              style={{ 
                backgroundColor: 'white',
                color: COLORS.forest,
                boxShadow: `0 20px 25px -5px ${COLORS.dark}33`
              }}
            >
              Get Started Free
              <FiArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="min-w-56 rounded-xl border-2 border-white text-white hover:bg-white/10"
            >
              View All Courses
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <span className="flex items-center gap-2 text-white">
              <FiCheck className="h-5 w-5" style={{ color: COLORS.cream }} />
              No credit card required
            </span>
            <span className="flex items-center gap-2 text-white">
              <FiCheck className="h-5 w-5" style={{ color: COLORS.cream }} />
              Start learning immediately
            </span>
            <span className="flex items-center gap-2 text-white">
              <FiCheck className="h-5 w-5" style={{ color: COLORS.cream }} />
              Cancel anytime
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </AppShell>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span 
        className="text-4xl font-bold md:text-5xl"
        style={{ color: COLORS.cream }}
      >
        {value}
      </span>
      <span className="text-sm font-medium uppercase tracking-wider text-white/70">
        {label}
      </span>
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
    <Card 
      className="group relative overflow-hidden rounded-2xl border-2 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      style={{ borderColor: `${COLORS.forest}33` }}
    >
      {/* Top accent bar */}
      <div 
        className="absolute left-0 right-0 top-0 h-1"
        style={{ backgroundImage: `linear-gradient(to right, ${COLORS.forest}, ${COLORS.emerald})` }}
      />
      <CardContent className="p-0">
        <div 
          className="mb-6 inline-flex rounded-xl p-4 text-white shadow-md"
          style={{ 
            backgroundColor: COLORS.forest,
            boxShadow: `0 4px 6px -1px ${COLORS.forest}4D`
          }}
        >
          {icon}
        </div>
        <h3 
          className="mb-3 text-xl font-bold"
          style={{ color: COLORS.dark }}
        >
          {title}
        </h3>
        <p 
          className="leading-relaxed"
          style={{ color: `${COLORS.dark}B3` }}
        >
          {description}
        </p>
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
  color,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  courses: number;
  difficulty: string;
  color: 'emerald' | 'forest' | 'dark';
}) {
  const colorMap = {
    emerald: COLORS.emerald,
    forest: COLORS.forest,
    dark: COLORS.dark,
  };

  const bgColor = colorMap[color];

  return (
    <Card 
      className="group relative overflow-hidden rounded-2xl border-2 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      style={{ borderColor: bgColor }}
    >
      <CardContent className="p-0">
        <div 
          className="mb-6 inline-flex rounded-xl p-4 text-white shadow-md"
          style={{ backgroundColor: bgColor }}
        >
          {icon}
        </div>
        <h3 
          className="mb-3 text-xl font-bold"
          style={{ color: COLORS.dark }}
        >
          {title}
        </h3>
        <p 
          className="mb-8 leading-relaxed"
          style={{ color: `${COLORS.dark}B3` }}
        >
          {description}
        </p>
        <div 
          className="flex items-center justify-between border-t-2 pt-6"
          style={{ borderColor: `${COLORS.dark}1A` }}
        >
          <span style={{ color: `${COLORS.dark}B3` }} className="font-medium">
            {courses} courses
          </span>
          <span 
            className="rounded-full px-4 py-1.5 text-sm font-bold text-white"
            style={{ backgroundColor: bgColor }}
          >
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
    <Card 
      className="group relative overflow-hidden rounded-2xl border border-white/20 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    >
      {/* Quote mark */}
      <div 
        className="absolute -right-4 -top-4 text-8xl font-serif"
        style={{ color: `${COLORS.emerald}33` }}
      >
        &ldquo;
      </div>
      <CardContent className="relative p-0">
        <p className="mb-8 text-lg leading-relaxed text-white/90">
          &ldquo;{quote}&rdquo;
        </p>
        <div className="flex items-center gap-4">
          <div 
            className="h-12 w-12 rounded-full shadow-lg"
            style={{ backgroundImage: `linear-gradient(to bottom right, ${COLORS.emerald}, ${COLORS.forest})` }}
            aria-hidden="true" 
          />
          <div>
            <p className="font-bold text-white">{author}</p>
            <p 
              className="text-sm font-medium"
              style={{ color: COLORS.emerald }}
            >
              {role}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
