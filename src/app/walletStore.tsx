import { create } from "zustand";

interface WalletState {
  walletId: string;
  setWalletId: (id: string) => void;
}

export const useWalletStore = create<WalletState>()((set) => ({
  walletId: "",
  setWalletId: (id: string) => set(() => ({ walletId: id })),
}));
