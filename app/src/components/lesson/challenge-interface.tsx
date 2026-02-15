'use client';

import { useState, useCallback } from 'react';
import {
  FiPlay,
  FiCheck,
  FiX,
  FiLoader,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiCode,
} from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { TestCase, TestResult, ChallengeDetail } from '@/services/learning';

interface ChallengeInterfaceProps {
  challenge: ChallengeDetail;
  testResults?: TestResult[];
  isRunning?: boolean;
  onRunTests: () => void;
  className?: string;
}

/**
 * Challenge Interface - Shows test cases and run button
 */
export function ChallengeInterface({
  challenge,
  testResults,
  isRunning = false,
  onRunTests,
  className,
}: ChallengeInterfaceProps) {
  const passedCount = testResults?.filter((r) => r.passed).length ?? 0;
  const totalTests = challenge.testCases.length;
  const allPassed = testResults && passedCount === totalTests;

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiCode className="size-4" />
            <CardTitle className="text-sm font-medium">Challenge</CardTitle>
          </div>
          <Badge variant={allPassed ? 'success' : 'secondary'}>
            {challenge.language}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Test Cases */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Test Cases
          </h4>
          <div className="space-y-2">
            {challenge.testCases
              .filter((tc) => tc.visible)
              .map((testCase) => {
                const result = testResults?.find((r) => r.testId === testCase.id);
                return (
                  <TestCaseItem
                    key={testCase.id}
                    testCase={testCase}
                    {...(result && { result })}
                  />
                );
              })}
          </div>
        </div>

        {/* Results Summary */}
        {testResults && (
          <div
            className={cn(
              'flex items-center justify-between p-3 rounded-lg',
              allPassed ? 'bg-success/10' : 'bg-muted'
            )}
          >
            <div className="flex items-center gap-2">
              {allPassed ? (
                <FiCheckCircle className="size-4 text-success" />
              ) : (
                <FiXCircle className="size-4 text-destructive" />
              )}
              <span className="text-sm font-medium">
                {passedCount}/{totalTests} tests passed
              </span>
            </div>
            {testResults[0]?.executionTime && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <FiClock className="size-3" />
                {testResults.reduce((sum, r) => sum + (r.executionTime ?? 0), 0)}ms
              </div>
            )}
          </div>
        )}

        {/* Run Button */}
        <Button
          onClick={onRunTests}
          disabled={isRunning}
          className="w-full"
          variant={allPassed ? 'success' : 'default'}
        >
          {isRunning ? (
            <>
              <FiLoader className="mr-2 size-4 animate-spin" />
              Running Tests...
            </>
          ) : (
            <>
              <FiPlay className="mr-2 size-4" />
              Run Tests
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

interface TestCaseItemProps {
  testCase: TestCase;
  result?: TestResult;
}

/**
 * Individual test case display
 */
function TestCaseItem({ testCase, result }: TestCaseItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        'rounded-lg border p-3 transition-colors',
        result?.passed === true && 'border-success/50 bg-success/5',
        result?.passed === false && 'border-destructive/50 bg-destructive/5',
        !result && 'border-muted'
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          {result ? (
            result.passed ? (
              <FiCheck className="size-4 text-success" />
            ) : (
              <FiX className="size-4 text-destructive" />
            )
          ) : (
            <div className="size-4 rounded-full border-2 border-muted-foreground/30" />
          )}
          <span className="text-sm font-medium">{testCase.name}</span>
        </div>
        {result?.executionTime && (
          <span className="text-xs text-muted-foreground">
            {result.executionTime}ms
          </span>
        )}
      </button>

      {expanded && (
        <div className="mt-2 pl-6 text-sm text-muted-foreground">
          <p>{testCase.description}</p>
          <p className="mt-1 font-mono text-xs">
            Expected: {testCase.expected}
          </p>
          {result?.message && (
            <p className="mt-1 text-destructive">{result.message}</p>
          )}
        </div>
      )}
    </div>
  );
}

interface LessonCompletionProps {
  isCompleted: boolean;
  xpReward: number;
  onComplete: () => void;
  isLoading?: boolean;
  className?: string;
}

/**
 * Lesson completion button with XP display
 */
export function LessonCompletion({
  isCompleted,
  xpReward,
  onComplete,
  isLoading = false,
  className,
}: LessonCompletionProps) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Button
        onClick={onComplete}
        disabled={isCompleted || isLoading}
        variant={isCompleted ? 'success' : 'default'}
        size="lg"
        className="flex-1"
      >
        {isLoading ? (
          <>
            <FiLoader className="mr-2 size-4 animate-spin" />
            Completing...
          </>
        ) : isCompleted ? (
          <>
            <FiCheckCircle className="mr-2 size-4" />
            Completed
          </>
        ) : (
          <>
            <FiCheck className="mr-2 size-4" />
            Mark Complete
          </>
        )}
      </Button>
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-muted-foreground">Reward:</span>
        <Badge variant="xp" className="text-base">
          +{xpReward} XP
        </Badge>
      </div>
    </div>
  );
}

interface AutoSaveIndicatorProps {
  status: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved?: Date;
}

/**
 * Auto-save status indicator
 */
export function AutoSaveIndicator({ status, lastSaved }: AutoSaveIndicatorProps) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {status === 'saving' && (
        <>
          <FiLoader className="size-3 animate-spin" />
          <span>Saving...</span>
        </>
      )}
      {status === 'saved' && lastSaved && (
        <>
          <FiCheck className="size-3 text-success" />
          <span>
            Saved{' '}
            {lastSaved.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </>
      )}
      {status === 'error' && (
        <>
          <FiX className="size-3 text-destructive" />
          <span>Failed to save</span>
        </>
      )}
    </div>
  );
}

/**
 * Hook for managing auto-save with debounce
 */
export function useAutoSave(
  saveFunction: (code: string) => Promise<void>,
  debounceMs: number = 2000
) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<Date>();

  const save = useCallback(
    async (code: string) => {
      setStatus('saving');
      try {
        await saveFunction(code);
        setStatus('saved');
        setLastSaved(new Date());
      } catch {
        setStatus('error');
      }
    },
    [saveFunction]
  );

  // Debounced save (simplified - in production use lodash/debounce or usehooks-ts)
  const debouncedSave = useCallback(
    (code: string) => {
      const timeout = setTimeout(() => save(code), debounceMs);
      return () => clearTimeout(timeout);
    },
    [save, debounceMs]
  );

  return { status, lastSaved, save, debouncedSave };
}
