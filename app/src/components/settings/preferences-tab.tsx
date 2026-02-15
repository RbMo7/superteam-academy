'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';
import { FiSave, FiGlobe, FiMonitor, FiSun, FiMoon, FiSettings } from 'react-icons/fi';

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
  preferencesSchema,
  type PreferencesFormData,
  LANGUAGE_OPTIONS,
  THEME_OPTIONS,
  DATE_FORMAT_OPTIONS,
} from '@/lib/schemas/settings';
import { cn } from '@/lib/utils';

interface PreferencesTabProps {
  initialData?: Partial<PreferencesFormData>;
  onSave?: (data: PreferencesFormData) => Promise<void>;
}

/**
 * Preferences settings tab - Language, theme, display preferences
 */
export function PreferencesTab({ initialData, onSave }: PreferencesTabProps) {
  const { theme, setTheme } = useTheme();

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      language: initialData?.language ?? 'en',
      theme: (theme as PreferencesFormData['theme']) ?? 'system',
      timezone: initialData?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
      dateFormat: initialData?.dateFormat ?? 'MM/DD/YYYY',
      compactMode: initialData?.compactMode ?? false,
      showXpAnimations: initialData?.showXpAnimations ?? true,
      soundEffects: initialData?.soundEffects ?? false,
    },
  });

  const language = watch('language');
  const currentTheme = watch('theme');
  const dateFormat = watch('dateFormat');
  const compactMode = watch('compactMode');
  const showXpAnimations = watch('showXpAnimations');
  const soundEffects = watch('soundEffects');

  async function onSubmit(data: PreferencesFormData) {
    if (onSave) {
      await onSave(data);
    }
  }

  function handleThemeChange(value: string) {
    setValue('theme', value as PreferencesFormData['theme'], { shouldDirty: true });
    setTheme(value);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiGlobe className="size-5" />
            Language & Region
          </CardTitle>
          <CardDescription>
            Set your preferred language and regional settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Language */}
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={language}
              onValueChange={(value) =>
                setValue('language', value as PreferencesFormData['language'], { shouldDirty: true })
              }
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Format */}
          <div className="space-y-2">
            <Label htmlFor="dateFormat">Date Format</Label>
            <Select
              value={dateFormat}
              onValueChange={(value) =>
                setValue('dateFormat', value as PreferencesFormData['dateFormat'], { shouldDirty: true })
              }
            >
              <SelectTrigger id="dateFormat">
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent>
                {DATE_FORMAT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiMonitor className="size-5" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize how the app looks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Theme */}
          <div className="space-y-2">
            <Label>Theme</Label>
            <div className="grid grid-cols-3 gap-2">
              {THEME_OPTIONS.map((option) => {
                const Icon =
                  option.value === 'light'
                    ? FiSun
                    : option.value === 'dark'
                      ? FiMoon
                      : FiMonitor;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleThemeChange(option.value)}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors',
                      currentTheme === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted'
                    )}
                  >
                    <Icon className="size-5" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Compact Mode */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="compactMode">Compact Mode</Label>
              <p className="text-sm text-muted-foreground">
                Use a more condensed layout with less spacing
              </p>
            </div>
            <Switch
              id="compactMode"
              checked={compactMode}
              onCheckedChange={(checked) => setValue('compactMode', checked, { shouldDirty: true })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiSettings className="size-5" />
            Experience
          </CardTitle>
          <CardDescription>
            Customize your learning experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* XP Animations */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="showXpAnimations">XP Animations</Label>
              <p className="text-sm text-muted-foreground">
                Show animations when earning XP
              </p>
            </div>
            <Switch
              id="showXpAnimations"
              checked={showXpAnimations}
              onCheckedChange={(checked) =>
                setValue('showXpAnimations', checked, { shouldDirty: true })
              }
            />
          </div>

          <Separator />

          {/* Sound Effects */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="soundEffects">Sound Effects</Label>
              <p className="text-sm text-muted-foreground">
                Play sounds for achievements and milestones
              </p>
            </div>
            <Switch
              id="soundEffects"
              checked={soundEffects}
              onCheckedChange={(checked) => setValue('soundEffects', checked, { shouldDirty: true })}
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
  );
}
