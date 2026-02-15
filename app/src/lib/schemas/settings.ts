import { z } from 'zod';

/**
 * Profile settings schema
 */
export const profileSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be less than 50 characters'),
  bio: z
    .string()
    .max(500, 'Bio must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  website: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  twitter: z
    .string()
    .regex(/^@?[a-zA-Z0-9_]{1,15}$/, 'Invalid Twitter handle')
    .optional()
    .or(z.literal('')),
  github: z
    .string()
    .regex(/^[a-zA-Z0-9-]+$/, 'Invalid GitHub username')
    .optional()
    .or(z.literal('')),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

/**
 * Account settings schema
 */
export const accountSchema = z.object({
  email: z.string().email('Invalid email address'),
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
});

export type AccountFormData = z.infer<typeof accountSchema>;

/**
 * Preferences settings schema
 */
export const preferencesSchema = z.object({
  language: z.enum(['en', 'pt-BR', 'es']),
  timezone: z.string(),
  dateFormat: z.enum(['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']),
  compactMode: z.boolean(),
  showXpAnimations: z.boolean(),
  soundEffects: z.boolean(),
});

export type PreferencesFormData = z.infer<typeof preferencesSchema>;

/**
 * Privacy settings schema
 */
export const privacySchema = z.object({
  profileVisibility: z.enum(['public', 'friends', 'private']),
  showOnLeaderboard: z.boolean(),
  showProgress: z.boolean(),
  showCredentials: z.boolean(),
  shareActivity: z.boolean(),
  allowAnalytics: z.boolean(),
});

export type PrivacyFormData = z.infer<typeof privacySchema>;

/**
 * Language options
 */
export const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'pt-BR', label: 'Português (Brasil)' },
  { value: 'es', label: 'Español' },
] as const;

/**
 * Date format options
 */
export const DATE_FORMAT_OPTIONS = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)' },
] as const;

/**
 * Profile visibility options
 */
export const VISIBILITY_OPTIONS = [
  { value: 'public', label: 'Public', description: 'Anyone can see your profile' },
  { value: 'friends', label: 'Friends Only', description: 'Only people you follow' },
  { value: 'private', label: 'Private', description: 'Only you can see your profile' },
] as const;
