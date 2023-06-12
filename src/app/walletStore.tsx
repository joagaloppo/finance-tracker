import { type Wallet } from "@prisma/client";
import { create } from "zustand";

interface WalletState {
  wallets: Wallet[];
  setWallets: (wallets: Wallet[]) => void;
  addWallet: (wallet: Wallet) => void;
  removeWallet: (wallet: Wallet) => void;

  walletId: number;
  setWalletId: (id: number) => void;
}

export const useWalletStore = create<WalletState>()((set) => ({
  wallets: [],
  setWallets: (wallets: Wallet[]) => set(() => ({ wallets })),
  addWallet: (wallet: Wallet) => set((state) => ({ wallets: [...state.wallets, wallet] })),
  removeWallet: (wallet: Wallet) =>
    set((state) => ({
      wallets: state.wallets.filter((w) => w.id !== wallet.id),
    })),
  walletId: 0,
  setWalletId: (id: number) => set(() => ({ walletId: id })),
}));
