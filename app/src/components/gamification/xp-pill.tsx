import { type VariantProps, cva } from 'class-variance-authority';
import { FiZap } from 'react-icons/fi';

import { cn } from '@/lib/utils';

const xpPillVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-xp/15 text-xp-foreground',
        solid: 'bg-xp text-white',
        ghost: 'text-xp-foreground',
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

interface XpPillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof xpPillVariants> {
  /** XP amount to display */
  amount: number;
  /** Show icon */
  showIcon?: boolean;
  /** Format as compact number (e.g., 1.2K) */
  compact?: boolean;
}

/**
 * XP Pill - Displays XP amount with gold styling.
 * Used in course cards, profile stats, leaderboard.
 */
export function XpPill({
  amount,
  variant = 'default',
  size = 'md',
  showIcon = true,
  compact = false,
  className,
  ...props
}: XpPillProps) {
  const formattedAmount = compact
    ? new Intl.NumberFormat('en', { notation: 'compact' }).format(amount)
    : new Intl.NumberFormat().format(amount);

  return (
    <span className={cn(xpPillVariants({ variant, size }), className)} {...props}>
      {showIcon && <FiZap className="size-3.5" />}
      <span>{formattedAmount}</span>
      <span className="font-medium opacity-80">XP</span>
    </span>
  );
}

export { xpPillVariants };
