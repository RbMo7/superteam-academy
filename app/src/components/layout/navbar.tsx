'use client';

import Link from 'next/link';

import { ROUTES } from '@/config';

import { AuthButtons } from '@/components/auth';
import { Logo } from '@/components/common';
import { Container } from '@/components/ui/container';

interface NavbarProps {
  /** Show full navigation (authenticated) or minimal (public) */
  variant?: 'full' | 'minimal';
}

/**
 * Navbar - Top navigation header component (minimal header, main nav is sidebar).
 */
export function Navbar(_props: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo - visible on mobile only */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2 md:hidden">
            <Logo size="md" showText className="hidden sm:flex" />
            <Logo size="md" showText={false} className="sm:hidden" />
          </Link>

          {/* Desktop - just a spacer */}
          <div className="hidden md:block" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <AuthButtons />
          </div>
        </div>
      </Container>
    </header>
  );
}
