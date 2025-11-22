import { create } from "zustand";

interface Loding {
  isLoading: boolean;
  title: string;
  subtitle: string;
  type: 'fullscreen' | 'inline';
};

interface LoadingState {
  loading: Loding | null;
  setLoading: (loading: Omit<Loding, 'isLoading'>) => void;
  clearLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  loading: null,
  setLoading: (loading) =>
    set(() => ({
      loading: { isLoading: true, ...loading },
    })),
  clearLoading: () =>
    set(() => ({
      loading: null,
    })),
}));