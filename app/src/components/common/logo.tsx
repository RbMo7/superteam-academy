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


export function Logo({ size = 'md', variant = 'icon', className }: LogoProps) {
  const heightPx = size === 'sm' ? 24 : size === 'md' ? 45 : 40;

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
         <Image
          src="/ST-EMERALD-GREEN-VERTICAL.png"
          alt="Superteam Academy"
          width={120}
          height={120}
          priority
        />
        </>
      )}
    </div>
  );
}
