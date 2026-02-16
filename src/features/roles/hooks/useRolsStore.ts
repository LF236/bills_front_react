import { create } from 'zustand';
import type { Rol } from '../domain/rol.model';

interface RolsStore {
  search: string;
  offset: number;
  limit: number;
  setSearch: (search: string) => void;
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
  reset: () => void;
  nextPage: () => void;
  previousPage: () => void;
  moveByPagination: (pageNumber: number) => void;
  idRolToUpdateOrDelete: string | null;
  rolToUpdateOrDelete: Rol | null;
  setIdRolToUpdateOrDelete: (id: string | null) => void;
  setRolToUpdateOrDelete: (rol: Rol | null) => void;
  isOpenModalToDelete: boolean;
  setIsOpenModalToDelete: (isOpen: boolean) => void;
}

export const useRolsStore = create<RolsStore>((set) => ({
  search: '',
  offset: 0,
  limit: 10,
  setSearch: (search: string) => set({ search }),
  setOffset: (offset: number) => set({ offset }),
  setLimit: (limit: number) => set({ limit }),
  reset: () => set({ search: '', offset: 0, limit: 10 }),
  nextPage: () => set((state) => ({ offset: state.offset + state.limit})),
  previousPage: () => set((state) => ({ offset: Math.max(state.offset - state.limit, 0)})),
  moveByPagination: (pageNumber: number) => set((state) => ({ offset: pageNumber * state.limit})),
  //
  idRolToUpdateOrDelete: null,
  rolToUpdateOrDelete: null,
  setIdRolToUpdateOrDelete: (id: string | null) => set(() => ({ idRolToUpdateOrDelete: id })),
  setRolToUpdateOrDelete: (rol: Rol | null) => set(() => ({ rolToUpdateOrDelete: rol })),
  isOpenModalToDelete: false,
  setIsOpenModalToDelete: (isOpen: boolean) => set(() => ({ isOpenModalToDelete: isOpen })),
}));