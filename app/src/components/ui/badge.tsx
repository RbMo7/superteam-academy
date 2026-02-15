import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        ghost: '[a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 [a&]:hover:underline',
        // Gamification variants
        xp: 'bg-xp/15 text-xp border-xp/20',
        streak: 'bg-streak/15 text-streak border-streak/20',
        success: 'bg-success/15 text-success border-success/20',
        // Difficulty variants
        beginner: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        intermediate:
          'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20',
        advanced: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/20',
        // Track variants
        'track-core': 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20',
        'track-defi': 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/20',
        'track-nft':
          'bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20',
        'track-gaming': 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
        'track-dao': 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
