import { create } from "zustand";
import { persist, devtools } from 'zustand/middleware';

interface AccountState {
  openModalChangeProfile: boolean;
  setOpenModalChangeProfile: (open: boolean) => void;
}


export const useAccountStore = create<AccountState>()(
  devtools(
    persist(
      (set) => ({
        openModalChangeProfile: false,
        setOpenModalChangeProfile: (open: boolean) => set({ openModalChangeProfile: open }),
      }), { name: 'account' })
  )
)
