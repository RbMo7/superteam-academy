import { cn } from '@/lib/utils';

import { Footer } from './footer';
import { MobileNav } from './mobile-nav';
import { Navbar } from './navbar';

interface AppShellProps {
  children: React.ReactNode;
  /** Show full navigation (authenticated) or minimal (public) */
  variant?: 'full' | 'minimal';
  /** Show footer */
  showFooter?: boolean;
  /** Show mobile navigation */
  showMobileNav?: boolean;
  /** Additional class for main content */
  className?: string;
}

/**
 * App Shell - Main layout wrapper with Navbar, Footer, and MobileNav.
 */
export function AppShell({
  children,
  variant = 'minimal',
  showFooter = true,
  showMobileNav = false,
  className,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar variant={variant} />

      <main
        className={cn(
          'flex-1',
          // Add bottom padding for mobile nav
          showMobileNav && 'pb-16 md:pb-0',
          className
        )}
      >
        {children}
      </main>

      {showFooter && <Footer />}
      {showMobileNav && <MobileNav />}
    </div>
  );
}
