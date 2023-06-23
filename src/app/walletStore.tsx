import { type Wallet } from "@prisma/client";
import { create } from "zustand";

interface WalletState {
  wallets: Wallet[];
  setWallets: (wallets: Wallet[]) => void;
  deleteWallet: (id: number) => void;
  upsertWallet: (wallet: Wallet) => void;
  walletId: number;
  balance: number;
  setWalletId: (id: number) => void;
  setBalance: (balance: number) => void;
}

export const useWalletStore = create<WalletState>()((set) => ({
  wallets: [],
  setWallets: (wallets: Wallet[]) => set(() => ({ wallets })),
  upsertWallet: (newWallet) =>
    set((state) => {
      const exists = state.wallets.some((wallet) => wallet.id === newWallet.id);
      if (exists) {
        return {
          wallets: state.wallets.map((wallet) => (wallet.id === newWallet.id ? newWallet : wallet)),
        };
      } else {
        return { wallets: [...state.wallets, newWallet] };
      }
    }),
  deleteWallet: (id: number) => set((state) => ({ wallets: state.wallets.filter((t) => t.id !== id) })),
  walletId: 0,
  balance: 0,
  setWalletId: (id: number) => set(() => ({ walletId: id })),
  setBalance: (balance: number) => set(() => ({ balance })),
}));
