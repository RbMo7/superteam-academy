import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Locale, Theme } from '@/types';

interface UserPreferencesState {
  locale: Locale;
  theme: Theme;
  sidebarCollapsed: boolean;

  // Actions
  setLocale: (locale: Locale) => void;
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useUserStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      locale: 'en',
      theme: 'system',
      sidebarCollapsed: false,

      setLocale: (locale) => set({ locale }),
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
    }),
    {
      name: 'user-preferences',
      partialize: (state) => ({
        locale: state.locale,
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
