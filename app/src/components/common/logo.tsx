import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  /** Use horizontal Superteam logo variant */
  variant?: 'icon' | 'horizontal';
}

const sizeClasses = {
  sm: { icon: 'h-6 w-6', horizontal: 'h-6' },
  md: { icon: 'h-8 w-8', horizontal: 'h-8' },
  lg: { icon: 'h-10 w-10', horizontal: 'h-10' },
};

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-xl',
};

export function Logo({ size = 'md', showText = true, variant = 'icon', className }: LogoProps) {
  const heightPx = size === 'sm' ? 24 : size === 'md' ? 32 : 40;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {variant === 'horizontal' ? (
        <Image
          src="/ST-EMERAL-GREEN-HORIZONTAL.png"
          alt="Superteam Academy"
          width={heightPx * 4}
          height={heightPx}
          className={cn('object-contain', sizeClasses[size].horizontal)}
          priority
        />
      ) : (
        <>
          <div
            className={cn(
              'bg-primary text-primary-foreground flex items-center justify-center rounded-lg font-bold',
              sizeClasses[size].icon
            )}
          >
            SA
          </div>
          {showText && (
            <span className={cn('font-semibold', textSizeClasses[size])}>
              Superteam Academy
            </span>
          )}
        </>
      )}
    </div>
  );
}
