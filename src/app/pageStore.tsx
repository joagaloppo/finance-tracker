import { create } from "zustand";

interface PageState {
  count: number;
  setCount: (count: number) => void;

  page: number;
  setPage: (page: number) => void;
}

export const usePageStore = create<PageState>()((set) => ({
  count: 0,
  setCount: (count) => set({ count }),

  page: 1,
  setPage: (page) => set({ page }),
}));
