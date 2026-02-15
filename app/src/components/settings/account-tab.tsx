'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiSave, FiMail, FiBell, FiLink, FiTrash2 } from 'react-icons/fi';
import { SiGoogle, SiGithub, SiDiscord } from 'react-icons/si';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { accountSchema, type AccountFormData } from '@/lib/schemas/settings';
import { cn } from '@/lib/utils';

interface ConnectedAccount {
  provider: 'google' | 'github' | 'discord';
  email: string;
  connected: boolean;
}

interface AccountTabProps {
  email?: string;
  connectedAccounts?: ConnectedAccount[];
  onSave?: (data: AccountFormData) => Promise<void>;
  onConnectAccount?: (provider: string) => Promise<void>;
  onDisconnectAccount?: (provider: string) => Promise<void>;
}

const PROVIDER_ICONS = {
  google: SiGoogle,
  github: SiGithub,
  discord: SiDiscord,
};

const PROVIDER_NAMES = {
  google: 'Google',
  github: 'GitHub',
  discord: 'Discord',
};

/**
 * Account settings tab - Email, notifications, connected accounts
 */
export function AccountTab({
  email = '',
  connectedAccounts = [],
  onSave,
  onConnectAccount,
  onDisconnectAccount,
}: AccountTabProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      email,
      emailNotifications: true,
      marketingEmails: false,
    },
  });

  const emailNotifications = watch('emailNotifications');
  const marketingEmails = watch('marketingEmails');

  async function onSubmit(data: AccountFormData) {
    if (onSave) {
      await onSave(data);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiMail className="size-5" />
              Email Settings
            </CardTitle>
            <CardDescription>
              Manage your email address and communication preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className={cn(errors.email && 'border-destructive')}
                disabled
              />
              <p className="text-sm text-muted-foreground">
                Email is managed by your OAuth provider
              </p>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiBell className="size-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Choose what emails you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about your progress, streaks, and achievements
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={emailNotifications}
                onCheckedChange={(checked) => setValue('emailNotifications', checked, { shouldDirty: true })}
              />
            </div>

            <Separator />

            {/* Marketing Emails */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketingEmails">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">
                  Receive news about new courses, features, and events
                </p>
              </div>
              <Switch
                id="marketingEmails"
                checked={marketingEmails}
                onCheckedChange={(checked) => setValue('marketingEmails', checked, { shouldDirty: true })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || !isDirty}>
            <FiSave className="mr-2 size-4" />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>

      {/* Connected Accounts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiLink className="size-5" />
            Connected Accounts
          </CardTitle>
          <CardDescription>
            Manage your connected OAuth providers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(['google', 'github', 'discord'] as const).map((provider) => {
            const account = connectedAccounts.find((a) => a.provider === provider);
            const Icon = PROVIDER_ICONS[provider];
            const name = PROVIDER_NAMES[provider];

            return (
              <div key={provider} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium">{name}</p>
                    {account?.connected ? (
                      <p className="text-sm text-muted-foreground">{account.email}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    )}
                  </div>
                </div>
                {account?.connected ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDisconnectAccount?.(provider)}
                  >
                    <FiTrash2 className="mr-2 size-4" />
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onConnectAccount?.(provider)}
                  >
                    Connect
                  </Button>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions that affect your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
