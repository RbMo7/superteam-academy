import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Locale } from '@/types';

interface UserPreferencesState {
  locale: Locale;
  sidebarCollapsed: boolean;

  // Actions
  setLocale: (locale: Locale) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useUserStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      locale: 'en',
      sidebarCollapsed: false,

      setLocale: (locale) => set({ locale }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
    }),
    {
      name: 'user-preferences',
      partialize: (state) => ({
        locale: state.locale,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
