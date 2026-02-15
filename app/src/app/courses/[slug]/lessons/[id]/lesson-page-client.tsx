'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FiArrowLeft,
  FiArrowRight,
  FiChevronLeft,
  FiBookOpen,
  FiPlayCircle,
  FiCode,
} from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { XpPill } from '@/components/gamification';
import {
  SplitPane,
  MarkdownContent,
  HintToggle,
  SolutionToggle,
  ChallengeInterface,
  LessonCompletion,
  AutoSaveIndicator,
  SolanaPlayground,
  SimpleCodeEditor,
  useAutoSave,
} from '@/components/lesson';
import {
  learningProgressService,
  type LessonDetail,
  type LessonProgress,
  type TestResult,
} from '@/services/learning';

interface LessonPageClientProps {
  courseSlug: string;
  lessonId: string;
}

/**
 * Lesson Page Client Component
 *
 * Renders the lesson view with split pane layout:
 * - Left: Content + hints/solution
 * - Right: Solana Playground (for challenges) or empty for articles
 */
export function LessonPageClient({ courseSlug, lessonId }: LessonPageClientProps) {
  const router = useRouter();

  // State
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string>('');
  const [testResults, setTestResults] = useState<TestResult[]>();
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Auto-save setup
  const autoSave = useAutoSave(
    useCallback(
      async (savedCode: string) => {
        await learningProgressService.autoSaveCode({
          courseSlug,
          lessonId,
          code: savedCode,
          timestamp: new Date(),
        });
      },
      [courseSlug, lessonId]
    )
  );

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load lesson data
  useEffect(() => {
    async function loadLesson() {
      setIsLoading(true);
      setError(null);

      try {
        const [lessonData, progressData, savedCode] = await Promise.all([
          learningProgressService.getLesson(courseSlug, lessonId),
          learningProgressService.getLessonProgress(courseSlug, lessonId),
          learningProgressService.loadSavedCode(courseSlug, lessonId),
        ]);

        if (!lessonData) {
          setError('Lesson not found');
          return;
        }

        setLesson(lessonData);
        setProgress(progressData);

        // Set initial code (saved or starter)
        if (lessonData.challenge) {
          setCode(savedCode ?? lessonData.challenge.starterCode);
        }

        // Mark lesson as started
        if (!progressData || progressData.status === 'not-started') {
          await learningProgressService.startLesson(courseSlug, lessonId);
        }
      } catch (err) {
        console.error('[LessonPage] Failed to load lesson:', err);
        setError('Failed to load lesson');
      } finally {
        setIsLoading(false);
      }
    }

    loadLesson();
  }, [courseSlug, lessonId]);

  // Handle code change with auto-save
  const handleCodeChange = useCallback(
    (newCode: string) => {
      setCode(newCode);
      autoSave.debouncedSave(newCode);
    },
    [autoSave]
  );

  // Run tests
  const handleRunTests = async () => {
    if (!lesson?.challenge) return;

    setIsRunningTests(true);
    try {
      const results = await learningProgressService.runTests(
        courseSlug,
        lessonId,
        code
      );
      setTestResults(results);
    } catch (err) {
      console.error('[LessonPage] Failed to run tests:', err);
    } finally {
      setIsRunningTests(false);
    }
  };

  // Complete lesson
  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      const { progress: newProgress, xpAwarded } =
        await learningProgressService.completeLesson(courseSlug, lessonId);
      setProgress(newProgress);

      if (xpAwarded > 0) {
        // TODO: Show XP toast notification
        console.warn(`[LessonPage] Awarded ${xpAwarded} XP`);
      }

      // Navigate to next lesson if available
      if (lesson?.nextLessonId) {
        setTimeout(() => {
          router.push(`/courses/${courseSlug}/lessons/${lesson.nextLessonId}`);
        }, 1000);
      }
    } catch (err) {
      console.error('[LessonPage] Failed to complete lesson:', err);
    } finally {
      setIsCompleting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return <LessonLoadingSkeleton />;
  }

  // Error state
  if (error || !lesson) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive">{error ?? 'Lesson not found'}</p>
          <Button variant="outline" asChild>
            <Link href={`/courses/${courseSlug}`}>Back to Course</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isCompleted = progress?.status === 'completed';
  const isChallenge = lesson.type === 'challenge' && lesson.challenge;

  // Content Panel
  const contentPanel = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="size-8">
              <Link href={`/courses/${courseSlug}`}>
                <FiChevronLeft className="size-4" />
              </Link>
            </Button>
            <div>
              <p className="text-xs text-muted-foreground">
                Lesson {lesson.order}
              </p>
              <h1 className="text-lg font-semibold">{lesson.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LessonTypeBadge type={lesson.type} />
            <XpPill amount={lesson.xpReward} size="sm" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Main content */}
          <MarkdownContent content={lesson.content} />

          {/* Hints */}
          {lesson.hints && lesson.hints.length > 0 && (
            <HintToggle hints={lesson.hints} />
          )}

          {/* Solution (for challenges) */}
          {lesson.solution && <SolutionToggle solution={lesson.solution} />}

          {/* Challenge interface (mobile only - desktop shows in right pane) */}
          {isChallenge && isMobile && (
            <ChallengeInterface
              challenge={lesson.challenge!}
              {...(testResults && { testResults })}
              isRunning={isRunningTests}
              onRunTests={handleRunTests}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 border-t bg-background/95 backdrop-blur px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Navigation */}
          <div className="flex items-center gap-2">
            {lesson.prevLessonId ? (
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href={`/courses/${courseSlug}/lessons/${lesson.prevLessonId}`}
                >
                  <FiArrowLeft className="mr-1 size-3" />
                  Previous
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </div>

          {/* Completion / Auto-save */}
          <div className="flex items-center gap-4">
            {isChallenge && (
              <AutoSaveIndicator
                status={autoSave.status}
                {...(autoSave.lastSaved && { lastSaved: autoSave.lastSaved })}
              />
            )}
            <LessonCompletion
              isCompleted={isCompleted}
              xpReward={lesson.xpReward}
              onComplete={handleComplete}
              isLoading={isCompleting}
            />
          </div>

          {/* Next */}
          <div className="flex items-center gap-2">
            {lesson.nextLessonId && (
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href={`/courses/${courseSlug}/lessons/${lesson.nextLessonId}`}
                >
                  Next
                  <FiArrowRight className="ml-1 size-3" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Code Panel (for challenges)
  const codePanel = isChallenge ? (
    <div className="flex h-full flex-col">
      {/* Playground */}
      <div className="flex-1 min-h-0">
        {lesson.challenge!.playgroundProjectId ? (
          <SolanaPlayground
            projectId={lesson.challenge!.playgroundProjectId}
            language={lesson.challenge!.language}
            onCodeChange={handleCodeChange}
            className="h-full"
          />
        ) : (
          <SimpleCodeEditor
            code={code}
            onChange={handleCodeChange}
            language={lesson.challenge!.language}
            className="h-full"
          />
        )}
      </div>

      {/* Test interface */}
      <div className="border-t p-4">
        <ChallengeInterface
          challenge={lesson.challenge!}
          {...(testResults && { testResults })}
          isRunning={isRunningTests}
          onRunTests={handleRunTests}
        />
      </div>
    </div>
  ) : (
    // Empty panel for non-challenge lessons
    <div className="flex h-full items-center justify-center bg-muted/30 p-8">
      <div className="text-center space-y-2">
        <FiBookOpen className="mx-auto size-12 text-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">
          This is a reading lesson.
          <br />
          Read the content on the left and mark it complete when done.
        </p>
      </div>
    </div>
  );

  // Mobile: stacked layout
  if (isMobile) {
    return (
      <div className="flex h-screen flex-col">
        {contentPanel}
        {isChallenge && (
          <div className="h-[50vh] border-t">{codePanel}</div>
        )}
      </div>
    );
  }

  // Desktop: split pane
  return (
    <div className="h-screen">
      <SplitPane
        left={contentPanel}
        right={codePanel}
        defaultSplit={isChallenge ? 45 : 100}
        minSize={300}
      />
    </div>
  );
}

/**
 * Lesson type badge
 */
function LessonTypeBadge({ type }: { type: 'video' | 'article' | 'challenge' }) {
  const icons = {
    video: FiPlayCircle,
    article: FiBookOpen,
    challenge: FiCode,
  };
  const Icon = icons[type];

  return (
    <Badge variant="secondary" className="gap-1">
      <Icon className="size-3" />
      {type}
    </Badge>
  );
}

/**
 * Loading skeleton
 */
function LessonLoadingSkeleton() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 space-y-4 p-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-64 w-full animate-pulse rounded bg-muted" />
      </div>
      <div className="w-1/2 border-l bg-muted/30" />
    </div>
  );
}
