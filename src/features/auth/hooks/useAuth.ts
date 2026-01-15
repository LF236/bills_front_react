import { useEffect } from "react";
import { useAuthStore } from "./useAuthStore"
import { useNavigate } from "react-router-dom";

export function useAuth() {
    const navigate = useNavigate();
    const user = useAuthStore(state => state.user);
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const login = useAuthStore(state => state.login);
    const logout = useAuthStore(state => state.logout);
    const register = useAuthStore(state => state.register);
    const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
    const setMe = useAuthStore(state => state.setMe);
    const cleanMe = useAuthStore(state => state.cleanMe);
    const setIsAuthLoading = useAuthStore(state => state.setIsAuthLoading);
    const isLoading = useAuthStore(state => state.isLoading);

    useEffect(() => {
        setIsAuthLoading(true);
        // TODO: Add logic to validate token expiration
        const token = localStorage.getItem('x-access-token');
        // TODO: Validate token expiration
        if(token) {
            setIsAuthenticated(true);
            // navigate('/home');
        }
        setIsAuthLoading(false);
    }, [useNavigate, setIsAuthenticated]);

    return {
        user,
        isAuthenticated,
        login,
        logout,
        register,
        setMe,
        cleanMe,
        isLoading
    }
}