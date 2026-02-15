'use client';

import { useState } from 'react';
import { FiLoader } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';

interface EnrollButtonProps {
  courseSlug: string;
  courseName: string;
  /** User is already enrolled */
  isEnrolled?: boolean;
  /** XP reward for completing */
  xpReward?: number;
  className?: string;
}

/**
 * Enroll Button - Handles course enrollment (stubbed).
 */
export function EnrollButton({
  courseSlug,
  courseName: _courseName,
  isEnrolled = false,
  xpReward,
  className,
}: EnrollButtonProps) {
  const { isSignedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(isEnrolled);

  const handleEnroll = async () => {
    if (!isSignedIn) {
      // TODO: Open sign-in modal
      console.warn('[EnrollButton] User not signed in');
      return;
    }

    setIsLoading(true);

    // Simulate enrollment API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: Call actual enrollment service
    console.warn('[EnrollButton] Enrollment stubbed for:', courseSlug);

    setEnrolled(true);
    setIsLoading(false);
  };

  const handleContinue = () => {
    // Navigate to first lesson
    window.location.href = `/courses/${courseSlug}/learn`;
  };

  if (enrolled) {
    return (
      <Button
        size="lg"
        className={cn('gap-2', className)}
        onClick={handleContinue}
      >
        Continue Learning
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      className={cn('gap-2', className)}
      onClick={handleEnroll}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <FiLoader className="size-4 animate-spin" />
          Enrolling...
        </>
      ) : (
        <>
          Enroll Now
          {xpReward && (
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
              +{xpReward} XP
            </span>
          )}
        </>
      )}
    </Button>
  );
}
