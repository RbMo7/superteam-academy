import { cn } from '@/lib/utils';

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title: string;
  /** Optional description */
  description?: string;
  /** Optional count badge */
  count?: number;
  /** Action element (button, link) */
  action?: React.ReactNode;
  /** Alignment */
  align?: 'left' | 'center';
}

/**
 * Section Header - Consistent header for content sections.
 * Used for course listings, leaderboard sections, etc.
 */
export function SectionHeader({
  title,
  description,
  count,
  action,
  align = 'left',
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between',
        align === 'center' && 'text-center sm:flex-col',
        className
      )}
      {...props}
    >
      <div className={cn('space-y-1', align === 'center' && 'mx-auto')}>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
          {count !== undefined && (
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-muted px-2 text-xs font-medium text-muted-foreground">
              {count}
            </span>
          )}
        </div>
        {description && <p className="text-sm text-muted-foreground sm:text-base">{description}</p>}
      </div>
      {action && <div className="mt-2 shrink-0 sm:mt-0">{action}</div>}
    </div>
  );
}
