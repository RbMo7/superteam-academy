import { create } from 'zustand';

interface UIState {
  // Modal states
  isWalletModalOpen: boolean;
  isSearchOpen: boolean;

  // Actions
  openWalletModal: () => void;
  closeWalletModal: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isWalletModalOpen: false,
  isSearchOpen: false,

  openWalletModal: () => set({ isWalletModalOpen: true }),
  closeWalletModal: () => set({ isWalletModalOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  closeSearch: () => set({ isSearchOpen: false }),
}));
