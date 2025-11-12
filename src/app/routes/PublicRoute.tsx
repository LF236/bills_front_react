import { Navigate, Outlet } from "react-router-dom";
import { PublicLayout } from "../../features/common/components/layout/PublicLayout";
import { useAuth } from "../../features/auth/hooks/useAuth";

export function PublicRoute() {
	const isAuthenticated = useAuth().isAuthenticated;
	console.log('PublicRoute - isAuthenticated:', isAuthenticated);
	
	if (isAuthenticated) {
		console.log('SI');
		return <Navigate to='/home' replace />
	}

	return (
		<PublicLayout>
			<Outlet />
		</PublicLayout>
	);
}