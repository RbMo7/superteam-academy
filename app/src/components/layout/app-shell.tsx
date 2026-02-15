import { cn } from '@/lib/utils';

import { Footer } from './footer';
import { MobileNav } from './mobile-nav';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

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
 * App Shell - Main layout wrapper with Sidebar, Navbar, Footer, and MobileNav.
 */
export function AppShell({
  children,
  variant = 'minimal',
  showFooter = true,
  showMobileNav = false,
  className,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar - desktop only */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex min-w-0 w-full flex-1 flex-col md:pl-16">
        <Navbar variant={variant} />

        <main
          className={cn(
            'flex-1 w-full min-w-0',
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
    </div>
  );
}
