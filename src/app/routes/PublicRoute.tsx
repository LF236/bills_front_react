import { Navigate, Outlet } from "react-router-dom";
import { PublicLayout } from "../../features/common/components/layout/PublicLayout";
import { useAuth } from "../../features/auth/hooks/useAuth";

export function PublicRoute() {
	const isAuthenticated = useAuth().isAuthenticated;
	const isAuthLoading = useAuth().isLoading;
	
	if(isAuthLoading) {
		return <div>Loading...</div>;
	}

	if (isAuthenticated) {
		return <Navigate to='/home' replace />
	}

	return (
		<PublicLayout>
			<Outlet />
		</PublicLayout>
	);
}