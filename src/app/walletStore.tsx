import { type Currency, type Transaction, type Wallet } from "@prisma/client";
import { create } from "zustand";

interface WalletState {
  wallets: Wallet[];
  setWallets: (wallets: Wallet[]) => void;
  addWallet: (wallet: Wallet) => void;
  removeWallet: (wallet: Wallet) => void;

  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (transaction: Transaction) => void;

  walletId: number;
  setWalletId: (id: number) => void;

  transactionId: number;
  setTransactionId: (id: number) => void;
}

export const useWalletStore = create<WalletState>()((set) => ({
  wallets: [],
  setWallets: (wallets: Wallet[]) => set(() => ({ wallets })),
  addWallet: (wallet: Wallet) => set((state) => ({ wallets: [...state.wallets, wallet] })),
  removeWallet: (wallet: Wallet) =>
    set((state) => ({
      wallets: state.wallets.filter((w) => w.id !== wallet.id),
    })),

  transactions: [],
  setTransactions: (transactions: Transaction[]) => set(() => ({ transactions })),
  addTransaction: (transaction: Transaction) =>
    set((state) => ({ transactions: [...state.transactions, transaction] })),
  removeTransaction: (transaction: Transaction) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== transaction.id),
    })),

  walletId: 0,
  setWalletId: (id: number) => set(() => ({ walletId: id })),

  transactionId: 0,
  setTransactionId: (id: number) => set(() => ({ transactionId: id })),
}));
