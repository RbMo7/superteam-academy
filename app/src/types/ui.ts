// Common UI types

export type Locale = 'en' | 'pt-br' | 'es';

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  disabled?: boolean;
  external?: boolean;
}

export interface BreadcrumbItem {
  title: string;
  href?: string;
}
