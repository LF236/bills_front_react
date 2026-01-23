import { create } from "zustand";

interface PermissionStore {
  search: string;
  offset: number;
  limit: number;
  setSearch: (search: string) => void;
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
  nextPage?: () => void;
  previousPage?: () => void;
  moveByPagination: (pageNumber: number) => void;
  reset: () => void;
  isOpenModalAddPermission: boolean;
  openModalAddPermission: () => void;
  closeModalAddPermission: () => void;
}

export const usePermissionStore = create<PermissionStore>((set) => ({
  search: '',
  offset: 0,
  limit: 10,
  isOpenModalAddPermission: false,
  setSearch: (search: string) => set({ search }),
  setOffset: (offset: number) => set({ offset }),
  setLimit: (limit: number) => set({ limit }),
  nextPage: () => set((state) => ({ offset: state.offset + state.limit })),
  previousPage: () => set((state) => ({ offset: Math.max(state.offset - state.limit, 0) })),
  moveByPagination: (pageNumber: number) => set((state) => ({ offset: pageNumber * state.limit })),
  reset: () => set({ search: '', offset: 0, limit: 10 }),
  openModalAddPermission: () => set((state) => ({ isOpenModalAddPermission: !state.isOpenModalAddPermission })),
  closeModalAddPermission: () => set({ isOpenModalAddPermission: false })
}));