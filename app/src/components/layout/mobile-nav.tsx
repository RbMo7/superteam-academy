'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut } from '@clerk/nextjs';

import { FiBook, FiCompass, FiHome, FiTrendingUp, FiSettings } from 'react-icons/fi';

import { ROUTES } from '@/config';
import { cn } from '@/lib/utils';

interface MobileNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  authRequired?: boolean;
}

const mobileNavItems: MobileNavItem[] = [
  { label: 'Home', href: ROUTES.DASHBOARD, icon: <FiHome className="size-5" />, authRequired: true },
  { label: 'Explore', href: ROUTES.EXPLORE, icon: <FiCompass className="size-5" /> },
  { label: 'Courses', href: ROUTES.COURSES, icon: <FiBook className="size-5" />, authRequired: true },
  { label: 'Rank', href: ROUTES.LEADERBOARD, icon: <FiTrendingUp className="size-5" /> },
  { label: 'Settings', href: ROUTES.SETTINGS, icon: <FiSettings className="size-5" />, authRequired: true },
];

/**
 * Mobile Navigation Bar - Fixed bottom navigation for mobile.
 */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="flex items-center justify-around">
        {/* Authenticated items */}
        <SignedIn>
          {mobileNavItems.map((item) => (
            <MobileNavLink key={item.href} item={item} isActive={pathname === item.href} />
          ))}
        </SignedIn>

        {/* Public items */}
        <SignedOut>
          {mobileNavItems
            .filter((item) => !item.authRequired)
            .map((item) => (
              <MobileNavLink key={item.href} item={item} isActive={pathname === item.href} />
            ))}
        </SignedOut>
      </div>
    </nav>
  );
}

interface MobileNavLinkProps {
  item: MobileNavItem;
  isActive: boolean;
}

function MobileNavLink({ item, isActive }: MobileNavLinkProps) {
  return (
    <Link
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
}
