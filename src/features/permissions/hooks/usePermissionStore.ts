import { create } from "zustand";
import type { Permission } from "../domain/permission.model";

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
  // 
  idPermissionToUpdateOrDelete: string | null;
  permissionToUpdateOrDelete: Permission | null;
  setPermissionToUpdateOrDelete: (permission: Permission | null) => void;
  setUpdateOrDeletePermissionId: (id: string) => void;
  clearUpdateOrDeletePermissionId: () => void;
  // Update Permission
  isUpdatePermissionModalOpen: boolean;
  openUpdatePermissionModal: () => void;
  closeUpdatePermissionModal: () => void;
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
  idPermissionToUpdateOrDelete: null,
  setUpdateOrDeletePermissionId: (id: string) => set({ idPermissionToUpdateOrDelete: id }),
  clearUpdateOrDeletePermissionId: () => set({ idPermissionToUpdateOrDelete: null }),
  closeModalAddPermission: () => set({ isOpenModalAddPermission: false }),
  isUpdatePermissionModalOpen: false,
  openUpdatePermissionModal: () => set((state) => ({ isUpdatePermissionModalOpen: !state.isUpdatePermissionModalOpen })),
  // 
  closeUpdatePermissionModal: () => set({ isUpdatePermissionModalOpen: false, permissionToUpdateOrDelete: null, idPermissionToUpdateOrDelete: null }),
  permissionToUpdateOrDelete: null,
  setPermissionToUpdateOrDelete: (permission: Permission | null) => set({ permissionToUpdateOrDelete: permission }),
  
}));