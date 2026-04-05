import { useEffect, useState } from "react";
import { useAuthStore } from "./useAuthStore"
import { useNavigate } from "react-router-dom";
import { useGetMe } from "./useGetMe";
import type { Me } from "../domain/me.model";

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
    const [ token, setToken ] = useState<string | null>(null);
    const { getMe, data, loading, error, called } = useGetMe();
    const [ isReloadingMe, setIsReloadingMe ] = useState(false); 

    const isPersonExists = (): boolean => {
        const { person } = user as Me;
        return !!person;
    }

    useEffect(() => {
        setIsAuthLoading(true);
        // TODO: Add logic to validate token expiration
        const token = localStorage.getItem('x-access-token');
        // TODO: Validate token expiration
        if(token) {
            setToken(token);
        } else {
            setToken(null);
        }
        setIsAuthLoading(false);
    }, [useNavigate, setIsAuthenticated]);

    useEffect(() => {
        if(token) {
            setIsAuthLoading(true);
            getMe(token);
            setIsAuthLoading(false);
        }
    }, [token]);

    const handleReloadMe = () => {
        if(token) {
            setIsAuthLoading(true);
            setIsReloadingMe(true);
            getMe(token);
            setIsAuthLoading(false);
        }
    }

    useEffect(() => {
        if(loading) return;
        if(data && called) {
            const me = data.me;
            setMe(me);
            setIsAuthenticated(true);
            if(isReloadingMe) {
                setIsReloadingMe(false);
                navigate('/home');
            }
        } else if(error && called) {
            setIsAuthenticated(false);
            cleanMe();
            localStorage.removeItem('x-access-token');
        }
    }, [ data, error, loading, called ]);

    return {
        user,
        isAuthenticated,
        login,
        logout,
        register,
        setMe,
        cleanMe,
        isLoading,
        isPersonExists,
        handleReloadMe
    }
}