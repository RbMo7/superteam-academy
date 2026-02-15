import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const leaderboardRankVariants = cva(
  'inline-flex items-center justify-center font-bold transition-all',
  {
    variants: {
      rank: {
        1: 'bg-gradient-to-br from-yellow-400 to-amber-500 text-amber-900',
        2: 'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-700',
        3: 'bg-gradient-to-br from-orange-300 to-orange-400 text-orange-800',
        default: 'bg-muted text-muted-foreground',
      },
      size: {
        sm: 'size-6 text-xs rounded-lg',
        md: 'size-8 text-sm rounded-xl',
        lg: 'size-12 text-lg rounded-2xl',
        xl: 'size-16 text-2xl rounded-2xl',
      },
    },
    defaultVariants: {
      rank: 'default',
      size: 'md',
    },
  }
);

interface LeaderboardRankProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rank position (1-indexed) */
  position: number;
  /** Size variant */
  size?: VariantProps<typeof leaderboardRankVariants>['size'];
}

/**
 * Leaderboard Rank Badge - Displays rank position with podium styling for top 3.
 */
export function LeaderboardRank({
  position,
  size = 'md',
  className,
  ...props
}: LeaderboardRankProps) {
  // Determine rank variant: 1, 2, 3, or default
  const rankVariant = position >= 1 && position <= 3 ? position : 'default';

  // Format display - add # for ranks > 3
  const displayRank = position <= 3 ? position : `#${position}`;

  return (
    <div
      className={cn(
        leaderboardRankVariants({
          rank: rankVariant as 1 | 2 | 3 | 'default',
          size,
        }),
        position <= 3 && 'shadow-md',
        className
      )}
      {...props}
    >
      {displayRank}
    </div>
  );
}

export { leaderboardRankVariants };
