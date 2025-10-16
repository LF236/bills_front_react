import { Navigate, Outlet } from "react-router-dom";
import { PublicLayout } from "../../features/common/components/layout/PublicLayout";
import { useAuth } from "../../features/auth/hooks/useAuth";

export function PublicRoute() {
    const isAuthenticated = useAuth().isAuthenticated;
    
    if(isAuthenticated) {
        return <Navigate to ='/home' replace/>
    }
    
    return(
        <PublicLayout>
            <Outlet />
        </PublicLayout>
    );
}