import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

export function RootRedirect() {
    const isAuthenticated = useAuth().isAuthenticated;

    if(isAuthenticated) {
        return <Navigate to ='/home' replace/>
    } else {
        return <Navigate to ='/landing' replace/>
    }

}