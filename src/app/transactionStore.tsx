import { type Transaction } from "@prisma/client";
import { create } from "zustand";

interface TransactionState {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  deleteTransaction: (id: number) => void;
  upsertTransaction: (transaction: Transaction) => void;
  transactionId: number;
  setTransactionId: (id: number) => void;
}

export const useTransactionStore = create<TransactionState>()((set) => ({
  transactions: [],
  setTransactions: (transactions) => set(() => ({ transactions })),
  upsertTransaction: (newTransaction) =>
    set((state) => {
      const exists = state.transactions.some((transaction) => transaction.id === newTransaction.id);
      if (exists) {
        return {
          transactions: state.transactions.map((transaction) =>
            transaction.id === newTransaction.id ? newTransaction : transaction
          ),
        };
      } else {
        return { transactions: [...state.transactions, newTransaction] };
      }
    }),
  deleteTransaction: (id) => set((state) => ({ transactions: state.transactions.filter((t) => t.id !== id) })),
  transactionId: 0,
  setTransactionId: (id: number) => set(() => ({ transactionId: id })),
}));
