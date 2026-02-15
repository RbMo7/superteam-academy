'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiSave, FiUser, FiGlobe, FiTwitter, FiGithub } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { profileSchema, type ProfileFormData } from '@/lib/schemas/settings';
import { cn } from '@/lib/utils';

interface ProfileTabProps {
  initialData?: Partial<ProfileFormData>;
  onSave?: (data: ProfileFormData) => Promise<void>;
}

/**
 * Profile settings tab - Display name, bio, social links
 */
export function ProfileTab({ initialData, onSave }: ProfileTabProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: initialData?.displayName ?? '',
      bio: initialData?.bio ?? '',
      website: initialData?.website ?? '',
      twitter: initialData?.twitter ?? '',
      github: initialData?.github ?? '',
    },
  });

  async function onSubmit(data: ProfileFormData) {
    if (onSave) {
      await onSave(data);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiUser className="size-5" />
            Basic Information
          </CardTitle>
          <CardDescription>
            Your public profile information visible to other learners
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Display Name */}
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              placeholder="Your name"
              {...register('displayName')}
              className={cn(errors.displayName && 'border-destructive')}
            />
            {errors.displayName && (
              <p className="text-sm text-destructive">{errors.displayName.message}</p>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              placeholder="Tell us about yourself..."
              rows={3}
              {...register('bio')}
              className={cn(
                'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                errors.bio && 'border-destructive'
              )}
            />
            {errors.bio && (
              <p className="text-sm text-destructive">{errors.bio.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiGlobe className="size-5" />
            Social Links
          </CardTitle>
          <CardDescription>
            Connect your social profiles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <div className="relative">
              <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="website"
                type="url"
                placeholder="https://yoursite.com"
                className={cn('pl-10', errors.website && 'border-destructive')}
                {...register('website')}
              />
            </div>
            {errors.website && (
              <p className="text-sm text-destructive">{errors.website.message}</p>
            )}
          </div>

          {/* Twitter */}
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <div className="relative">
              <FiTwitter className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="twitter"
                placeholder="@username"
                className={cn('pl-10', errors.twitter && 'border-destructive')}
                {...register('twitter')}
              />
            </div>
            {errors.twitter && (
              <p className="text-sm text-destructive">{errors.twitter.message}</p>
            )}
          </div>

          {/* GitHub */}
          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <div className="relative">
              <FiGithub className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="github"
                placeholder="username"
                className={cn('pl-10', errors.github && 'border-destructive')}
                {...register('github')}
              />
            </div>
            {errors.github && (
              <p className="text-sm text-destructive">{errors.github.message}</p>
            )}
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
