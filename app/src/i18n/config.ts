import type { Locale } from '@/types';

export const i18nConfig = {
  locales: ['en', 'pt-br', 'es'] as const,
  defaultLocale: 'en' as const,
  localeNames: {
    en: 'English',
    'pt-br': 'Português (Brasil)',
    es: 'Español',
  },
} as const;

export type SupportedLocale = Locale;

export function isValidLocale(locale: string): locale is SupportedLocale {
  return i18nConfig.locales.includes(locale as SupportedLocale);
}

export function getLocaleName(locale: SupportedLocale): string {
  return i18nConfig.localeNames[locale];
}
