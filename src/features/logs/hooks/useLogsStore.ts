import { create } from "zustand";

interface LogsStore {
  search: string;
  action: string;
  module: string;
  offset: number;
  limit: number;

  setSearch: (search: string) => void;
  setAction: (action: string) => void;
  setModule: (module: string) => void;
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;

  reset: () => void;
  nextPage: () => void;
  previousPage: () => void;
  moveByPagination: (pageNumber: number) => void;
}

export const useLogsStore = create<LogsStore>((set) => ({
    search: '',
    action: '',
    module: '',
    offset: 0, 
    limit: 10,

    setSearch: (search : string) => set({search, offset:0}),
    setAction: (action : string) => set({action , offset:0}),
    setModule: (module : string) => set({module, offset:0}),
    setOffset: (offset:number) => set ({offset}),
    setLimit: (limit : number) => set ({limit}), 
    nextPage : () => set((state) => ({offset: state.offset + state.limit,})),
    previousPage : ()=> set((state) => ({offset: Math.max(state.offset - state.limit, 0),})),
    moveByPagination: (pageNumber : number) => set((state) => ({offset: pageNumber * state.limit,})),

    reset: () => set({search: '',action: '',module: '',offset: 0 ,limit: 10,}),
}));