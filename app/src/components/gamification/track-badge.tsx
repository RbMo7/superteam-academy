'use client';

import type { ComponentProps } from 'react';
import {
  FiBox,
  FiCodesandbox,
  FiCpu,
  FiHexagon,
  FiUsers,
} from 'react-icons/fi';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Track } from '@/types/content';

type TrackBadgeProps = Omit<ComponentProps<typeof Badge>, 'variant'> & {
  track: Track;
  showIcon?: boolean;
};

const trackConfig: Record<
  Track,
  {
    label: string;
    variant: 'track-core' | 'track-defi' | 'track-nft' | 'track-gaming' | 'track-dao';
    icon: typeof FiBox;
  }
> = {
  core: { label: 'Core', variant: 'track-core', icon: FiCpu },
  defi: { label: 'DeFi', variant: 'track-defi', icon: FiCodesandbox },
  nft: { label: 'NFTs', variant: 'track-nft', icon: FiHexagon },
  gaming: { label: 'Gaming', variant: 'track-gaming', icon: FiBox },
  dao: { label: 'DAOs', variant: 'track-dao', icon: FiUsers },
};

export function TrackBadge({ track, showIcon = true, className, ...props }: TrackBadgeProps) {
  const config = trackConfig[track];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={cn('gap-1', className)} {...props}>
      {showIcon && <Icon className="size-3" />}
      {config.label}
    </Badge>
  );
}
