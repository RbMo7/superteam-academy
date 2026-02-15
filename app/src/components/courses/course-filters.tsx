'use client';

import { useState, useCallback, type ChangeEvent } from 'react';
import { FiSearch, FiX, FiFilter } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Difficulty, Track } from '@/types/content';
import type { CourseFilters } from '@/services/courses';

const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const TRACKS: { value: Track; label: string }[] = [
  { value: 'core', label: 'Core' },
  { value: 'defi', label: 'DeFi' },
  { value: 'nft', label: 'NFTs' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'dao', label: 'DAOs' },
];

const SORT_OPTIONS: { value: CourseFilters['sortBy']; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'duration', label: 'Duration' },
];

interface CourseFiltersProps {
  filters: CourseFilters;
  onFiltersChange: (filters: CourseFilters) => void;
  className?: string;
}

/**
 * Course Filters - Search, difficulty, track, and sort controls.
 */
export function CourseFiltersUI({
  filters,
  onFiltersChange,
  className,
}: CourseFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const updateFilter = useCallback(
    <K extends keyof CourseFilters>(key: K, value: CourseFilters[K]) => {
      onFiltersChange({ ...filters, [key]: value });
    },
    [filters, onFiltersChange]
  );

  const toggleArrayFilter = useCallback(
    <T extends Difficulty | Track>(
      key: 'difficulty' | 'track',
      value: T,
      currentValues: T[] | undefined
    ) => {
      const current = currentValues ?? [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      updateFilter(key, updated.length > 0 ? (updated as Difficulty[] | Track[]) : undefined);
    },
    [updateFilter]
  );

  const clearFilters = useCallback(() => {
    onFiltersChange(filters.search ? { search: filters.search } : {});
  }, [filters.search, onFiltersChange]);

  const hasActiveFilters =
    (filters.difficulty && filters.difficulty.length > 0) ||
    (filters.track && filters.track.length > 0) ||
    filters.sortBy;

  const activeFilterCount =
    (filters.difficulty?.length ?? 0) +
    (filters.track?.length ?? 0) +
    (filters.sortBy ? 1 : 0);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search & Mobile Filter Toggle */}
      <div className="flex gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses..."
            value={filters.search ?? ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateFilter('search', e.target.value || undefined)
            }
            className="h-10 w-full rounded-lg border bg-background pl-10 pr-10 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {filters.search && (
            <button
              onClick={() => updateFilter('search', undefined)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <FiX className="size-4" />
            </button>
          )}
        </div>

        {/* Mobile Filter Button */}
        <Button
          variant="outline"
          size="default"
          className="flex gap-2 md:hidden"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <FiFilter className="size-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="default" className="ml-1 size-5 rounded-full p-0">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden flex-wrap items-center gap-3 md:flex">
        {/* Difficulty */}
        <FilterGroup label="Difficulty">
          {DIFFICULTIES.map((d) => (
            <FilterChip
              key={d.value}
              label={d.label}
              selected={filters.difficulty?.includes(d.value) ?? false}
              onClick={() => toggleArrayFilter('difficulty', d.value, filters.difficulty)}
            />
          ))}
        </FilterGroup>

        {/* Track */}
        <FilterGroup label="Track">
          {TRACKS.map((t) => (
            <FilterChip
              key={t.value}
              label={t.label}
              selected={filters.track?.includes(t.value) ?? false}
              onClick={() => toggleArrayFilter('track', t.value, filters.track)}
            />
          ))}
        </FilterGroup>

        {/* Sort */}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort:</span>
          <select
            value={filters.sortBy ?? ''}
            onChange={(e) =>
              updateFilter('sortBy', (e.target.value as CourseFilters['sortBy']) || undefined)
            }
            className="h-8 rounded-lg border bg-background px-2 text-sm outline-none focus:border-primary"
          >
            <option value="">Default</option>
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        )}
      </div>

      {/* Mobile Filters Panel */}
      {showMobileFilters && (
        <div className="space-y-4 rounded-xl border bg-card p-4 md:hidden">
          {/* Difficulty */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Difficulty</h4>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map((d) => (
                <FilterChip
                  key={d.value}
                  label={d.label}
                  selected={filters.difficulty?.includes(d.value) ?? false}
                  onClick={() => toggleArrayFilter('difficulty', d.value, filters.difficulty)}
                />
              ))}
            </div>
          </div>

          {/* Track */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Track</h4>
            <div className="flex flex-wrap gap-2">
              {TRACKS.map((t) => (
                <FilterChip
                  key={t.value}
                  label={t.label}
                  selected={filters.track?.includes(t.value) ?? false}
                  onClick={() => toggleArrayFilter('track', t.value, filters.track)}
                />
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Sort by</h4>
            <select
              value={filters.sortBy ?? ''}
              onChange={(e) =>
                updateFilter('sortBy', (e.target.value as CourseFilters['sortBy']) || undefined)
              }
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
            >
              <option value="">Default</option>
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters} className="flex-1">
                Clear
              </Button>
            )}
            <Button
              size="sm"
              onClick={() => setShowMobileFilters(false)}
              className="flex-1"
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{label}:</span>
      <div className="flex gap-1">{children}</div>
    </div>
  );
}

function FilterChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full px-3 py-1 text-sm font-medium transition-colors',
        selected
          ? 'bg-primary text-primary-foreground'
          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
      )}
    >
      {label}
    </button>
  );
}
