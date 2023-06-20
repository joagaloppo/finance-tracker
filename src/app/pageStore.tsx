import { create } from "zustand";

interface PageState {
  count: number;
  page: number;
  setCount: (count: number) => void;
  setPage: (page: number) => void;
}

export const usePageStore = create<PageState>()((set) => ({
  count: 0,
  page: 1,
  setCount: (count) => set({ count }),
  setPage: (page) => set({ page }),
}));
