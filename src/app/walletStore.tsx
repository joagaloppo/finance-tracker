import { type Transaction, type Wallet } from "@prisma/client";
import { create } from "zustand";

interface WalletState {
  wallets: Wallet[];
  walletId: number;
  transactions: Transaction[];
  setWallets: (wallets: Wallet[]) => void;
  setWalletId: (id: number) => void;
  setTransactions: (transactions: Transaction[]) => void;
}

export const useWalletStore = create<WalletState>()((set) => ({
  wallets: [],
  walletId: 0,
  transactions: [],
  setWallets: (wallets: Wallet[]) => set(() => ({ wallets })),
  setWalletId: (id: number) => set(() => ({ walletId: id })),
  setTransactions: (transactions: Transaction[]) => set(() => ({ transactions })),
}));
