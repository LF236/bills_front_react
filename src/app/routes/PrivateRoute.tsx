import { Outlet } from "react-router-dom";
import { PrivateLayout } from "../../features/common/components/layout/PrivateLayout";

export function PrivateRoute() {
    const isAuthenticated = true;

    return(
        <PrivateLayout>
            <Outlet />
        </PrivateLayout>
    );
}