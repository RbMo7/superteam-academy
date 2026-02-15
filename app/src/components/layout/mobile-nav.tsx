'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FiBook, FiCompass, FiHome, FiTrendingUp, FiUser } from 'react-icons/fi';

import { ROUTES } from '@/config';
import { cn } from '@/lib/utils';

interface MobileNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const mobileNavItems: MobileNavItem[] = [
  { label: 'Home', href: ROUTES.DASHBOARD, icon: <FiHome className="size-5" /> },
  { label: 'Explore', href: ROUTES.EXPLORE, icon: <FiCompass className="size-5" /> },
  { label: 'Courses', href: ROUTES.COURSES, icon: <FiBook className="size-5" /> },
  { label: 'Rank', href: ROUTES.LEADERBOARD, icon: <FiTrendingUp className="size-5" /> },
  { label: 'Profile', href: ROUTES.PROFILE, icon: <FiUser className="size-5" /> },
];

/**
 * Mobile Navigation Bar - Fixed bottom navigation for mobile.
 */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="flex items-center justify-around">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <span
                className={cn(
                  'rounded-lg p-1 transition-colors',
                  isActive && 'bg-primary/10'
                )}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
