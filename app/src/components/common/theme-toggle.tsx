'use client';

import { useTheme } from 'next-themes';

import { FiMoon, FiSun } from 'react-icons/fi';

import { Button } from '@/components/ui/button';

import { useMounted } from '@/hooks';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <FiSun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
    </Button>
  );
}
