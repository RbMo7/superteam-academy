'use client';

import * as React from 'react';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const progressVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-primary/20',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const indicatorVariants = cva(
  'h-full w-full flex-1 rounded-full transition-all duration-300 ease-out',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        xp: 'bg-gradient-to-r from-xp/80 to-xp',
        streak: 'bg-gradient-to-r from-streak/80 to-streak',
        success: 'bg-gradient-to-r from-success/80 to-success',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof indicatorVariants> {
  /** Show percentage label */
  showLabel?: boolean;
  /** Label position */
  labelPosition?: 'inside' | 'right';
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value,
      size = 'md',
      variant = 'default',
      showLabel = false,
      labelPosition = 'right',
      ...props
    },
    ref
  ) => {
    const percentage = value ?? 0;

    return (
      <div className="flex items-center gap-2">
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(progressVariants({ size }), className)}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(indicatorVariants({ variant }))}
            style={{ transform: `translateX(-${100 - percentage}%)` }}
          />
        </ProgressPrimitive.Root>
        {showLabel && labelPosition === 'right' && (
          <span className="min-w-[3ch] text-right text-xs font-medium text-muted-foreground">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, progressVariants, indicatorVariants };
