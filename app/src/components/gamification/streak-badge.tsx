import { type VariantProps, cva } from 'class-variance-authority';
import { FiZap } from 'react-icons/fi';

import { cn } from '@/lib/utils';

const streakBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-streak/15 text-streak',
        solid: 'bg-streak text-white',
        ghost: 'text-streak',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface StreakBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof streakBadgeVariants> {
  /** Number of days in streak */
  days: number;
  /** Show icon */
  showIcon?: boolean;
  /** Show "day" label */
  showLabel?: boolean;
}

/**
 * Streak Badge - Displays current streak with fire styling.
 */
export function StreakBadge({
  days,
  variant = 'default',
  size = 'md',
  showIcon = true,
  showLabel = true,
  className,
  ...props
}: StreakBadgeProps) {
  return (
    <span className={cn(streakBadgeVariants({ variant, size }), className)} {...props}>
      {showIcon && <FiZap className="size-3" />}
      <span>{days}</span>
      {showLabel && <span className="font-medium opacity-80">day{days !== 1 ? 's' : ''}</span>}
    </span>
  );
}

export { streakBadgeVariants };
