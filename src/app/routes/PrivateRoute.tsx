import { Navigate, Outlet } from "react-router-dom";
import { PrivateLayout } from "../../features/common/components/layout/PrivateLayout";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { GraphQLProvider } from "../GraphQLProvider";

export function PrivateRoute() {
	const { isAuthenticated, isLoading } = useAuth();

	if(isLoading) {
		return <div>Loading...</div>;
	}

	if(!isAuthenticated) {
		return <Navigate to ='/landing' replace />
	}

	return (
		<GraphQLProvider>
			<PrivateLayout>
				<Outlet />
			</PrivateLayout>
		</GraphQLProvider>
	);
}