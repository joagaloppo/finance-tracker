import { type Transaction } from "@prisma/client";
import { create } from "zustand";

interface TransactionState {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  editTransaction: (id: number, updatedTransaction: Transaction) => void;
  deleteTransaction: (id: number) => void;
  transactionId: number;
  setTransactionId: (id: number) => void;
}

export const useTransactionStore = create<TransactionState>()((set) => ({
  transactions: [],
  setTransactions: (transactions) => set(() => ({ transactions })),
  addTransaction: (transaction) => set((state) => ({ transactions: [...state.transactions, transaction] })),
  editTransaction: (id, updatedTransaction) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) => (transaction.id === id ? updatedTransaction : transaction)),
    })),
  deleteTransaction: (id) => set((state) => ({ transactions: state.transactions.filter((t) => t.id !== id) })),
  transactionId: 0,
  setTransactionId: (id: number) => set(() => ({ transactionId: id })),
}));
