import { type Transaction, type Wallet } from "@prisma/client";
import { create } from "zustand";

interface WalletState {
  wallets: Wallet[];
  setWallets: (wallets: Wallet[]) => void;
  addWallet: (wallet: Wallet) => void;

  walletId: number;
  setWalletId: (id: number) => void;

  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
}

export const useWalletStore = create<WalletState>()((set) => ({
  wallets: [],
  setWallets: (wallets: Wallet[]) => set(() => ({ wallets })),
  addWallet: (wallet: Wallet) => set((state) => ({ wallets: [...state.wallets, wallet] })),

  walletId: 0,
  setWalletId: (id: number) => set(() => ({ walletId: id })),

  transactions: [],
  setTransactions: (transactions: Transaction[]) => set(() => ({ transactions })),
}));
