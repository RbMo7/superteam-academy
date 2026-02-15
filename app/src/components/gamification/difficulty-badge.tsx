'use client';

import type { ComponentProps } from 'react';
import { FiZap } from 'react-icons/fi';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Difficulty } from '@/types/content';

type DifficultyBadgeProps = Omit<ComponentProps<typeof Badge>, 'variant'> & {
  difficulty: Difficulty;
  showIcon?: boolean;
};

const difficultyConfig: Record<
  Difficulty,
  { label: string; variant: 'beginner' | 'intermediate' | 'advanced' }
> = {
  beginner: { label: 'Beginner', variant: 'beginner' },
  intermediate: { label: 'Intermediate', variant: 'intermediate' },
  advanced: { label: 'Advanced', variant: 'advanced' },
};

export function DifficultyBadge({
  difficulty,
  showIcon = true,
  className,
  ...props
}: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];

  return (
    <Badge variant={config.variant} className={cn('gap-1', className)} {...props}>
      {showIcon && <FiZap className="size-3" />}
      {config.label}
    </Badge>
  );
}
