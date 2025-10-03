import { create } from 'zustand';
import { AuthService } from '../api/auth.service';

interface AuthState {
    user: { name: string, email: string } | null;
    isAuthenticated: boolean;
    isLoading?: boolean;
    login: (userData: { email: string, password: string }) => Promise<boolean>;
    logout: () => void;
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
}));