import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const levelBadgeVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-bold',
  {
    variants: {
      variant: {
        default: 'bg-primary/15 text-primary',
        solid: 'bg-primary text-primary-foreground',
      },
      size: {
        sm: 'size-6 text-xs',
        md: 'size-8 text-sm',
        lg: 'size-10 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface LevelBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof levelBadgeVariants> {
  /** Level number */
  level: number;
}

/**
 * Level Badge - Displays user level with primary color styling.
 */
export function LevelBadge({
  level,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: LevelBadgeProps) {
  return (
    <div className={cn(levelBadgeVariants({ variant, size }), className)} {...props}>
      {level}
    </div>
  );
}

export { levelBadgeVariants };
