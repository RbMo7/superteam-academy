'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiSave, FiEye, FiShield, FiActivity } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  privacySchema,
  type PrivacyFormData,
  VISIBILITY_OPTIONS,
} from '@/lib/schemas/settings';

interface PrivacyTabProps {
  initialData?: Partial<PrivacyFormData>;
  onSave?: (data: PrivacyFormData) => Promise<void>;
}

/**
 * Privacy settings tab - Visibility, sharing, data preferences
 */
export function PrivacyTab({ initialData, onSave }: PrivacyTabProps) {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<PrivacyFormData>({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      profileVisibility: initialData?.profileVisibility ?? 'public',
      showOnLeaderboard: initialData?.showOnLeaderboard ?? true,
      showProgress: initialData?.showProgress ?? true,
      showCredentials: initialData?.showCredentials ?? true,
      shareActivity: initialData?.shareActivity ?? true,
      allowAnalytics: initialData?.allowAnalytics ?? true,
    },
  });

  const profileVisibility = watch('profileVisibility');
  const showOnLeaderboard = watch('showOnLeaderboard');
  const showProgress = watch('showProgress');
  const showCredentials = watch('showCredentials');
  const shareActivity = watch('shareActivity');
  const allowAnalytics = watch('allowAnalytics');

  async function onSubmit(data: PrivacyFormData) {
    if (onSave) {
      await onSave(data);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Profile Visibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiEye className="size-5" />
            Profile Visibility
          </CardTitle>
          <CardDescription>
            Control who can see your profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Visibility */}
          <div className="space-y-2">
            <Label htmlFor="profileVisibility">Who can see your profile</Label>
            <Select
              value={profileVisibility}
              onValueChange={(value) =>
                setValue('profileVisibility', value as PrivacyFormData['profileVisibility'], {
                  shouldDirty: true,
                })
              }
            >
              <SelectTrigger id="profileVisibility">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                {VISIBILITY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex flex-col">
                      <span>{option.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Show on Leaderboard */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="showOnLeaderboard">Show on Leaderboard</Label>
              <p className="text-sm text-muted-foreground">
                Appear in public leaderboard rankings
              </p>
            </div>
            <Switch
              id="showOnLeaderboard"
              checked={showOnLeaderboard}
              onCheckedChange={(checked) =>
                setValue('showOnLeaderboard', checked, { shouldDirty: true })
              }
            />
          </div>

          <Separator />

          {/* Show Progress */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="showProgress">Show Progress</Label>
              <p className="text-sm text-muted-foreground">
                Display your course progress on your profile
              </p>
            </div>
            <Switch
              id="showProgress"
              checked={showProgress}
              onCheckedChange={(checked) => setValue('showProgress', checked, { shouldDirty: true })}
            />
          </div>

          <Separator />

          {/* Show Credentials */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="showCredentials">Show Credentials</Label>
              <p className="text-sm text-muted-foreground">
                Display your earned credentials publicly
              </p>
            </div>
            <Switch
              id="showCredentials"
              checked={showCredentials}
              onCheckedChange={(checked) =>
                setValue('showCredentials', checked, { shouldDirty: true })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Activity & Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiActivity className="size-5" />
            Activity & Data
          </CardTitle>
          <CardDescription>
            Control how your activity is shared and collected
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Share Activity */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="shareActivity">Share Activity</Label>
              <p className="text-sm text-muted-foreground">
                Show your recent activity in the community feed
              </p>
            </div>
            <Switch
              id="shareActivity"
              checked={shareActivity}
              onCheckedChange={(checked) =>
                setValue('shareActivity', checked, { shouldDirty: true })
              }
            />
          </div>

          <Separator />

          {/* Analytics */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allowAnalytics">Allow Analytics</Label>
              <p className="text-sm text-muted-foreground">
                Help us improve by allowing anonymous usage data collection
              </p>
            </div>
            <Switch
              id="allowAnalytics"
              checked={allowAnalytics}
              onCheckedChange={(checked) =>
                setValue('allowAnalytics', checked, { shouldDirty: true })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiShield className="size-5" />
            Your Data
          </CardTitle>
          <CardDescription>
            Download or delete your personal data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Export Data</p>
              <p className="text-sm text-muted-foreground">
                Download a copy of all your data
              </p>
            </div>
            <Button variant="outline" size="sm">
              Export
            </Button>
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
  );
}
