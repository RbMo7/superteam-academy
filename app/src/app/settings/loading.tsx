import { AppShell } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { SettingsSkeleton } from '@/components/common/loading-skeletons';

/**
 * Settings loading state
 */
export default function SettingsLoading() {
  return (
    <AppShell variant="full" showMobileNav>
      <Container className="py-8">
        <SettingsSkeleton />
      </Container>
    </AppShell>
  );
}
