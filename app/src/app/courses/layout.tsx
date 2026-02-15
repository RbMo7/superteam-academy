import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Explore Solana development courses and start learning',
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
