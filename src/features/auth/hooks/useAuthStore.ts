import { create } from 'zustand';
import { AuthService } from '../api/auth.service';
import type { SignInInterface } from '../types/auth.types';

interface AuthState {
    user: { name: string, email: string } | null;
    isAuthenticated: boolean;
    isLoading?: boolean;
    login: (userData: { email: string, password: string }) => Promise<boolean>;
    logout: () => void;
    validateToken: (token: string) => Promise<void>;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    register: (userData: SignInInterface) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
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

    logout: () =>
        set(() => ({
            user: null,
            isAuthenticated: false
        })),

    validateToken: async (token: string) => {

    },

    register: async (userData: SignInInterface) => {
        try {
            const response = await AuthService.signUp(userData);
            console.log(response);
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

    setIsAuthenticated: (isAuthenticated: boolean) => set(() => ({ isAuthenticated }))
}));