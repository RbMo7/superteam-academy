import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your learning dashboard',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
