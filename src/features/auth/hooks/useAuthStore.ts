import { create } from 'zustand';
import { AuthService } from '../api/auth.service';
import type { SignInInterface } from '../types/auth.types';
import type { Me } from '../domain/me.model';

interface AuthState {
    user: Me | null;
    isAuthenticated: boolean;
    isLoading?: boolean;
    login: (userData: { email: string, password: string }) => Promise<boolean>;
    logout: () => void;
    validateToken: (token: string) => Promise<void>;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    register: (userData: SignInInterface) => Promise<boolean>;
    setMe: (user: Me) => void;
    cleanMe: () => void;
    setIsAuthLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: async (userData: { email: string, password: string }) => {
        set({ isLoading: true });
        try {
            const request = AuthService.login(userData.email, userData.password);
            const response = await request;
            if(response.data) {
                localStorage.setItem('x-access-token', response.data.token);
                return true;
            } else {
                throw new Error('Invalid response from server - Please contact support');
            }
        } catch (error) {
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    logout: () => {
        localStorage.removeItem('x-access-token');
        set({
            user: null,
            isAuthenticated: false
        })
    },

    validateToken: async (token: string) => {

    },

    setMe(user: Me) {
        set({ user });
    },

    cleanMe() {
        set({ user: null });
    },

    register: async (userData: SignInInterface) => {
        try {
            const response = await AuthService.signUp(userData);
            if(response.data) {
                return true;
            } else {
                throw new Error('Invalid response from server - Please contact support');
            }
        } catch (error) {
            throw error;
        } finally {

        }
    },

    setIsAuthenticated: (isAuthenticated: boolean) => set(() => ({ isAuthenticated })),

    setIsAuthLoading: (isLoading: boolean) => set(() => ({ isLoading }))
}));