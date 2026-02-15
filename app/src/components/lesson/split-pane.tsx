'use client';

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
  type MouseEvent,
  type TouchEvent,
} from 'react';
import { cn } from '@/lib/utils';

interface SplitPaneProps {
  /** Left/top panel content */
  left: ReactNode;
  /** Right/bottom panel content */
  right: ReactNode;
  /** Initial split position (0-100) */
  defaultSplit?: number;
  /** Minimum panel size in pixels */
  minSize?: number;
  /** Force stacked layout (mobile) */
  stacked?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Resizable Split Pane Component
 *
 * Desktop: Horizontal split with draggable divider
 * Mobile: Vertical stack
 */
export function SplitPane({
  left,
  right,
  defaultSplit = 50,
  minSize = 200,
  stacked = false,
  className,
}: SplitPaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splitPercent, setSplitPercent] = useState(defaultSplit);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const containerWidth = rect.width;

      // Calculate percentage, respecting min size
      const minPercent = (minSize / containerWidth) * 100;
      const maxPercent = 100 - minPercent;

      let newPercent = (x / containerWidth) * 100;
      newPercent = Math.max(minPercent, Math.min(maxPercent, newPercent));

      setSplitPercent(newPercent);
    },
    [isDragging, minSize]
  );

  const handleTouchMove = useCallback(
    (e: globalThis.TouchEvent) => {
      if (!isDragging || !containerRef.current || !e.touches[0]) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const containerWidth = rect.width;

      const minPercent = (minSize / containerWidth) * 100;
      const maxPercent = 100 - minPercent;

      let newPercent = (x / containerWidth) * 100;
      newPercent = Math.max(minPercent, Math.min(maxPercent, newPercent));

      setSplitPercent(newPercent);
    },
    [isDragging, minSize]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add/remove global listeners when dragging
  useEffect(() => {
    if (!isDragging) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp]);

  // Stacked layout for mobile
  if (stacked) {
    return (
      <div className={cn('flex flex-col', className)}>
        <div className="flex-1 min-h-0 overflow-auto">{left}</div>
        <div className="flex-1 min-h-0 overflow-auto border-t">{right}</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex h-full',
        isDragging && 'cursor-col-resize select-none',
        className
      )}
    >
      {/* Left Panel */}
      <div
        className="h-full overflow-auto"
        style={{ width: `${splitPercent}%` }}
      >
        {left}
      </div>

      {/* Resize Handle */}
      <div
        className={cn(
          'group relative z-10 flex w-1 cursor-col-resize items-center justify-center',
          'bg-border hover:bg-primary/50 transition-colors',
          isDragging && 'bg-primary'
        )}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Drag indicator */}
        <div
          className={cn(
            'absolute h-8 w-4 rounded-full bg-border',
            'flex items-center justify-center',
            'group-hover:bg-primary/50 transition-colors',
            isDragging && 'bg-primary'
          )}
        >
          <div className="flex gap-0.5">
            <div className="h-4 w-0.5 rounded-full bg-muted-foreground/50" />
            <div className="h-4 w-0.5 rounded-full bg-muted-foreground/50" />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div
        className="h-full overflow-auto"
        style={{ width: `${100 - splitPercent}%` }}
      >
        {right}
      </div>
    </div>
  );
}

/**
 * Hook to detect if we should use stacked layout
 */
export function useStackedLayout(breakpoint: number = 768): boolean {
  const [isStacked, setIsStacked] = useState(false);

  // Check on mount and window resize
  if (typeof window !== 'undefined') {
    // Initial check
    if (!isStacked && window.innerWidth < breakpoint) {
      setIsStacked(true);
    }

    // Note: In production, add resize listener with useEffect
  }

  return isStacked;
}
