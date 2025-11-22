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

    useEffect(() => {
        const token = localStorage.getItem('x-access-token');
        if(token) {
            setIsAuthenticated(true);
            navigate('/home');
        }
    }, [useNavigate]);

    return {
        user,
        isAuthenticated,
        login,
        logout,
        register
    }
}