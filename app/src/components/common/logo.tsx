import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
};

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-xl',
};

export function Logo({ size = 'md', showText = true, className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn(
          'bg-primary text-primary-foreground flex items-center justify-center rounded-lg font-bold',
          sizeClasses[size]
        )}
      >
        SA
      </div>
      {showText && (
        <span className={cn('font-semibold', textSizeClasses[size])}>Superteam Academy</span>
      )}
    </div>
  );
}
