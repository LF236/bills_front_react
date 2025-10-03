import { Outlet } from "react-router-dom";
import { PublicLayout } from "../../features/common/components/layout/PublicLayout";

export function PublicRoute() {
    const isAuthenticated = false;
    
    return(
        <PublicLayout>
            <Outlet />
        </PublicLayout>
    );
}