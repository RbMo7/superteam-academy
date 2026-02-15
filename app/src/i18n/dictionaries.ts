import type { Locale } from '@/types';

import en from './dictionaries/en.json';
import es from './dictionaries/es.json';
import ptBr from './dictionaries/pt-br.json';

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  'pt-br': ptBr,
  es,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export type { Locale };
