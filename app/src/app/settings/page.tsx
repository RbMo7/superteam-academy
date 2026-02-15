'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { FiUser, FiSettings, FiSliders, FiShield } from 'react-icons/fi';

import { AppShell } from '@/components/layout';
import { Container } from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ProfileTab,
  AccountTab,
  PreferencesTab,
  PrivacyTab,
  WalletDisplay,
} from '@/components/settings';
import type {
  ProfileFormData,
  AccountFormData,
  PreferencesFormData,
  PrivacyFormData,
} from '@/lib/schemas/settings';

const TABS = [
  { id: 'profile', label: 'Profile', icon: FiUser },
  { id: 'account', label: 'Account', icon: FiSettings },
  { id: 'preferences', label: 'Preferences', icon: FiSliders },
  { id: 'privacy', label: 'Privacy', icon: FiShield },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function SettingsPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  // Mock connected accounts (would come from backend)
  const connectedAccounts = [
    {
      provider: 'google' as const,
      email: user?.emailAddresses[0]?.emailAddress ?? '',
      connected: true,
    },
  ];

  // Save handlers (would integrate with backend)
  async function handleSaveProfile(data: ProfileFormData) {
    console.log('[Settings] Saving profile:', data);
    // TODO: Implement API call
  }

  async function handleSaveAccount(data: AccountFormData) {
    console.log('[Settings] Saving account:', data);
    // TODO: Implement API call
  }

  async function handleSavePreferences(data: PreferencesFormData) {
    console.log('[Settings] Saving preferences:', data);
    // TODO: Implement API call
  }

  async function handleSavePrivacy(data: PrivacyFormData) {
    console.log('[Settings] Saving privacy:', data);
    // TODO: Implement API call
  }

  async function handleConnectAccount(provider: string) {
    console.log('[Settings] Connect account:', provider);
    // TODO: Implement OAuth connection
  }

  async function handleDisconnectAccount(provider: string) {
    console.log('[Settings] Disconnect account:', provider);
    // TODO: Implement OAuth disconnection
  }

  return (
    <AppShell variant="full" showMobileNav>
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main content */}
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as TabId)}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-4">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2"
                >
                  <tab.icon className="size-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <ProfileTab
                initialData={{
                  displayName: user?.fullName ?? '',
                  bio: '',
                  website: '',
                  twitter: '',
                  github: '',
                }}
                onSave={handleSaveProfile}
              />
            </TabsContent>

            <TabsContent value="account" className="mt-6">
              <AccountTab
                email={user?.emailAddresses[0]?.emailAddress ?? ''}
                connectedAccounts={connectedAccounts}
                onSave={handleSaveAccount}
                onConnectAccount={handleConnectAccount}
                onDisconnectAccount={handleDisconnectAccount}
              />
            </TabsContent>

            <TabsContent value="preferences" className="mt-6">
              <PreferencesTab
                initialData={{
                  language: 'en',
                  theme: 'system',
                  dateFormat: 'MM/DD/YYYY',
                  compactMode: false,
                  showXpAnimations: true,
                  soundEffects: false,
                }}
                onSave={handleSavePreferences}
              />
            </TabsContent>

            <TabsContent value="privacy" className="mt-6">
              <PrivacyTab
                initialData={{
                  profileVisibility: 'public',
                  showOnLeaderboard: true,
                  showProgress: true,
                  showCredentials: true,
                  shareActivity: true,
                  allowAnalytics: true,
                }}
                onSave={handleSavePrivacy}
              />
            </TabsContent>
          </Tabs>

          {/* Sidebar */}
          <div className="space-y-6">
            <WalletDisplay />
          </div>
        </div>
      </Container>
    </AppShell>
  );
}
