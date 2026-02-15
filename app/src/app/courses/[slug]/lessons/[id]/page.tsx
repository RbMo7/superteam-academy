import type { Metadata } from 'next';

import { LessonPageClient } from './lesson-page-client';
import { learningProgressService } from '@/services/learning';

interface LessonPageProps {
  params: Promise<{ slug: string; id: string }>;
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { slug, id } = await params;
  const lesson = await learningProgressService.getLesson(slug, id);

  if (!lesson) {
    return { title: 'Lesson Not Found' };
  }

  return {
    title: lesson.title,
    description: `Learn ${lesson.title} in this ${lesson.type} lesson.`,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug, id } = await params;

  return <LessonPageClient courseSlug={slug} lessonId={id} />;
}
