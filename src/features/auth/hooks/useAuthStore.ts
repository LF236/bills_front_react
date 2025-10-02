import { create } from 'zustand';

interface AuthState {
    user: { name: string, email: string } | null;
    isAuthenticated: boolean;
    login: (userData: { name: string, email: string }) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    login: (userData: { name: string, email: string }) => 
        set(() => ({
            user: userData,
            isAuthenticated: true
        })),
    logout: () => 
        set(() => ({
            user: null,
            isAuthenticated: false
        })),
}));