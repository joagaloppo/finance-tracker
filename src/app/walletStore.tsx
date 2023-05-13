import { create } from "zustand";

interface WalletState {
  walletId: number;
  setWalletId: (id: number) => void;
}

export const useWalletStore = create<WalletState>()((set) => ({
  walletId: 0,
  setWalletId: (id: number) => set(() => ({ walletId: id })),
}));
