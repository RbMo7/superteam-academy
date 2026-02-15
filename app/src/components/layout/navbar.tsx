'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FiBook, FiCompass, FiHome, FiTrendingUp } from 'react-icons/fi';

import { ROUTES } from '@/config';
import { cn } from '@/lib/utils';

import { AuthButtons } from '@/components/auth';
import { Logo } from '@/components/common';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { Container } from '@/components/ui/container';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: <FiHome className="size-4" /> },
  { label: 'Explore', href: ROUTES.EXPLORE, icon: <FiCompass className="size-4" /> },
  { label: 'Courses', href: ROUTES.COURSES, icon: <FiBook className="size-4" /> },
  { label: 'Leaderboard', href: ROUTES.LEADERBOARD, icon: <FiTrendingUp className="size-4" /> },
];

interface NavbarProps {
  /** Show full navigation (authenticated) or minimal (public) */
  variant?: 'full' | 'minimal';
}

/**
 * Navbar - Main navigation header component.
 */
export function Navbar({ variant = 'minimal' }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <Logo size="md" showText className="hidden sm:flex" />
            <Logo size="md" showText={false} className="sm:hidden" />
          </Link>

          {/* Desktop Navigation */}
          {variant === 'full' && (
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Minimal Navigation (public) */}
          {variant === 'minimal' && (
            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href={ROUTES.EXPLORE}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Explore
              </Link>
              <Link
                href={ROUTES.LEADERBOARD}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Leaderboard
              </Link>
            </nav>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <AuthButtons />
          </div>
        </div>
      </Container>
    </header>
  );
}
