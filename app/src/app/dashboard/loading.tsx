import { AppShell } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { DashboardSkeleton } from '@/components/common/loading-skeletons';

/**
 * Dashboard loading state
 */
export default function DashboardLoading() {
  return (
    <AppShell variant="full" showMobileNav>
      <Container className="py-8">
        <DashboardSkeleton />
      </Container>
    </AppShell>
  );
}
