import { Navigate, Outlet } from "react-router-dom";
import { PrivateLayout } from "../../features/common/components/layout/PrivateLayout";
import { useAuth } from "../../features/auth/hooks/useAuth";

export function PrivateRoute() {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated) {
        return <Navigate to ='/landing' replace/>
    }

    return(
        <PrivateLayout>
            <Outlet />
        </PrivateLayout>
    );
}