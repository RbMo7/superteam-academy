'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import {
  FiHome,
  FiCompass,
  FiBook,
  FiTrendingUp,
  FiSettings,
} from 'react-icons/fi';

import { ROUTES } from '@/config';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  authRequired?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: <FiHome className="size-5" />, authRequired: true },
  { label: 'Explore', href: ROUTES.EXPLORE, icon: <FiCompass className="size-5" /> },
  { label: 'Courses', href: ROUTES.COURSES, icon: <FiBook className="size-5" />, authRequired: true },
  { label: 'Leaderboard', href: ROUTES.LEADERBOARD, icon: <FiTrendingUp className="size-5" /> },
  { label: 'Settings', href: ROUTES.SETTINGS, icon: <FiSettings className="size-5" />, authRequired: true },
];

/**
 * Sidebar navigation with icon-only display that expands on hover
 */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <aside className="fixed left-0 top-0 z-[60] hidden h-screen w-16 flex-col border-r border-[#e5e5e5] bg-white md:flex hover:w-56 transition-all duration-200 group">
        {/* Logo */}
        <Link
          href={ROUTES.HOME}
          className="flex h-16 items-center justify-center border-b px-4"
        >
          <Image
            src="/ST-EMERAL-GREEN-HORIZONTAL.png"
            alt="Superteam Academy"
            width={160}
            height={32}
            className="h-8 w-auto object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            priority
          />
          <Image
            src="/ST-EMERALD-COMPRESSED.png"
            alt="Superteam Academy"
            width={40}
            height={40}
            className="absolute size-10 object-contain group-hover:opacity-0 transition-opacity duration-200"
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1 p-2">
          {/* Authenticated items */}
          <SignedIn>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isActive={pathname === item.href}
              />
            ))}
          </SignedIn>

          {/* Public items */}
          <SignedOut>
            {NAV_ITEMS.filter((item) => !item.authRequired).map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isActive={pathname === item.href}
              />
            ))}
          </SignedOut>
        </nav>

        {/* Solana Logo at bottom */}
        <div className="border-t bg-black p-4">
          <div className="flex items-center justify-center">
            <Image
              src="/solanaLogoMark.png"
              alt="Powered by Solana"
              width={24}
              height={24}
              className="size-6 group-hover:hidden"
            />
            <div className="hidden group-hover:flex items-center gap-2">
              <Image
                src="/solanaLogo.png"
                alt="Powered by Solana"
                width={100}
                height={24}
                className="h-5 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
}

function NavLink({ item, isActive }: NavLinkProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors',
            isActive
              ? 'bg-[#2f6b3f]/10 text-[#2f6b3f]'
              : 'text-[#57625a] hover:bg-[#f5f5f4] hover:text-[#1b231d]'
          )}
        >
          <span className="shrink-0">{item.icon}</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap text-sm font-medium">
            {item.label}
          </span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="group-hover:hidden">
        {item.label}
      </TooltipContent>
    </Tooltip>
  );
}
