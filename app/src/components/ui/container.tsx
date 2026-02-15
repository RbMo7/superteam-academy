import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Center the container */
  centered?: boolean;
  /** Add horizontal padding */
  padded?: boolean;
}

const sizeClasses = {
  sm: 'max-w-screen-sm', // 640px
  md: 'max-w-screen-md', // 768px
  lg: 'max-w-screen-lg', // 1024px
  xl: 'max-w-screen-xl', // 1280px
  full: 'max-w-full',
} as const;

/**
 * Container component for consistent layout width and padding.
 */
export function Container({
  size = 'xl',
  centered = true,
  padded = true,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full',
        sizeClasses[size],
        centered && 'mx-auto',
        padded && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
