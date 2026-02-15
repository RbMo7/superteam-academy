export const ROUTES = {
  // Public
  HOME: '/',
  EXPLORE: '/explore',

  // Auth required
  DASHBOARD: '/dashboard',
  COURSES: '/courses',
  COURSE: (courseId: string) => `/courses/${courseId}` as const,
  LESSON: (courseId: string, lessonId: string) => `/learn/${courseId}/${lessonId}` as const,
  PROFILE: '/profile',
  LEADERBOARD: '/leaderboard',
  CREDENTIALS: '/credentials',
  SETTINGS: '/settings',
} as const;
