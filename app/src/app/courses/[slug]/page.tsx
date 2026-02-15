import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  FiClock,
  FiUsers,
  FiStar,
  FiBookOpen,
  FiCheckCircle,
  FiPlayCircle,
  FiFileText,
  FiCode,
  FiChevronRight,
  FiAward,
} from 'react-icons/fi';

import { AppShell } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DifficultyBadge, TrackBadge, XpPill } from '@/components/gamification';
import { EnrollButton, CourseCard } from '@/components/courses';
import { courseService, type CourseDetail, type CourseSummary } from '@/services/courses';

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getCourse(slug: string): Promise<CourseDetail | null> {
  return courseService.getCourseBySlug(slug);
}

async function getRelatedCourses(slug: string): Promise<CourseSummary[]> {
  return courseService.getRelatedCourses(slug, 3);
}

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return { title: 'Course Not Found' };
  }

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      type: 'article',
    },
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const [course, relatedCourses] = await Promise.all([
    getCourse(slug),
    getRelatedCourses(slug),
  ]);

  if (!course) {
    notFound();
  }

  const totalXp = course.lessons.reduce((sum, l) => sum + l.xpReward, 0);

  return (
    <AppShell variant="minimal" showFooter>
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-br from-primary/5 via-background to-background">
        <Container className="py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Course Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <TrackBadge track={course.track} />
                <DifficultyBadge difficulty={course.difficulty} />
                {course.featured && (
                  <Badge variant="xp">Featured</Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-muted-foreground">{course.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-1.5">
                  <FiClock className="size-4 text-muted-foreground" />
                  <span>{formatDuration(course.duration)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiBookOpen className="size-4 text-muted-foreground" />
                  <span>{course.lessonCount} lessons</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiUsers className="size-4 text-muted-foreground" />
                  <span>{course.enrolledCount.toLocaleString()} enrolled</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiStar className="size-4 text-xp" />
                  <span>{course.rating.toFixed(1)} rating</span>
                </div>
              </div>

              {/* Creator */}
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarImage src={course.creatorAvatar} alt={course.creatorName} />
                  <AvatarFallback>
                    {course.creatorName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Created by {course.creatorName}</p>
                  <p className="text-xs text-muted-foreground">
                    Last updated {formatDate(course.publishedAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:row-span-2">
              <Card className="sticky top-24 shadow-lg">
                <CardContent className="p-6 space-y-6">
                  {/* XP Reward */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">XP Earned</span>
                    <XpPill amount={totalXp} size="lg" />
                  </div>

                  {/* Enroll Button */}
                  <EnrollButton
                    courseSlug={course.slug}
                    courseName={course.title}
                    xpReward={totalXp}
                    className="w-full"
                  />

                  {/* What's included */}
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-medium">This course includes:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <FiPlayCircle className="size-4" />
                        {countLessons(course.lessons, 'video')} video lessons
                      </li>
                      <li className="flex items-center gap-2">
                        <FiFileText className="size-4" />
                        {countLessons(course.lessons, 'article')} articles
                      </li>
                      <li className="flex items-center gap-2">
                        <FiCode className="size-4" />
                        {countLessons(course.lessons, 'challenge')} coding challenges
                      </li>
                      <li className="flex items-center gap-2">
                        <FiAward className="size-4" />
                        Completion credential
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Course Content */}
      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section>
              <h2 className="mb-4 text-xl font-semibold">About this course</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {course.longDescription.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Learning Objectives */}
            <section>
              <h2 className="mb-4 text-xl font-semibold">What you&apos;ll learn</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {course.learningObjectives.map((objective, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FiCheckCircle className="mt-1 size-4 shrink-0 text-success" />
                    <span className="text-muted-foreground">{objective}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Prerequisites */}
            {course.prerequisites.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-semibold">Prerequisites</h2>
                <ul className="space-y-2">
                  {course.prerequisites.map((prereq, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <FiChevronRight className="size-4" />
                      {prereq}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Curriculum */}
            <section>
              <h2 className="mb-4 text-xl font-semibold">Curriculum</h2>
              <Card>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    {course.lessons.map((lesson, i) => (
                      <li
                        key={lesson.id}
                        className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                      >
                        {/* Lesson number */}
                        <span className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                          {i + 1}
                        </span>

                        {/* Lesson info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{lesson.title}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              {getLessonIcon(lesson.type)}
                              {lesson.type}
                            </span>
                            <span>{lesson.duration} min</span>
                          </div>
                        </div>

                        {/* XP */}
                        <XpPill amount={lesson.xpReward} size="sm" variant="ghost" />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Creator Bio */}
            <section>
              <h2 className="mb-4 text-xl font-semibold">About the creator</h2>
              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <Avatar className="size-16">
                    <AvatarImage src={course.creatorAvatar} alt={course.creatorName} />
                    <AvatarFallback className="text-lg">
                      {course.creatorName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{course.creatorName}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{course.creatorBio}</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar - Tags */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-xl font-semibold">Related courses</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCourses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </AppShell>
  );
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours} hours`;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function countLessons(
  lessons: { type: 'video' | 'article' | 'challenge' }[],
  type: 'video' | 'article' | 'challenge'
): number {
  return lessons.filter((l) => l.type === type).length;
}

function getLessonIcon(type: 'video' | 'article' | 'challenge') {
  switch (type) {
    case 'video':
      return <FiPlayCircle className="size-3" />;
    case 'article':
      return <FiFileText className="size-3" />;
    case 'challenge':
      return <FiCode className="size-3" />;
  }
}
