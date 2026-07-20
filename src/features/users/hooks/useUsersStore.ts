import { create } from 'zustand';
import type { User } from '../domain/user.model';

interface UsersStore {
  search: string;
  offset: number;
  limit: number;

  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;

  isUserStatusModalOpen: boolean;
  openUserStatusModal: () => void;
  closeUserStatusModal: () => void;

  setSearch: (search: string) => void;
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
  reset: () => void;
  nextPage: () => void;
  previousPage: () => void;
  moveByPagination: (pageNumber: number) => void;
}

export const useUserStore = create<UsersStore>((set) => ({
  search: '',
  offset: 0,
  limit: 10,
  selectedUser: null,

  setSelectedUser: (user: User | null) => set({ selectedUser: user }),

  isUserStatusModalOpen: false,

  openUserStatusModal: () =>
    set((state) => ({
      isUserStatusModalOpen: !state.isUserStatusModalOpen,
    })),

  closeUserStatusModal: () =>
    set({
      isUserStatusModalOpen: false,
      selectedUser: null,
    }),

  setSearch: (search: string) => set({ search }),
  setOffset: (offset: number) => set({ offset }),
  setLimit: (limit: number) => set({ limit }),

  nextPage: () => set((state) => ({ offset: state.offset + 
state.limit })),
  previousPage: () => set((state) => ({ offset: 
Math.max(state.offset - state.limit, 0) })),
  moveByPagination: (pageNumber: number) => set((state) => ({ 
offset: pageNumber * state.limit })),
  reset: () => set({ search: '', offset: 0, limit: 10 }),
}));
