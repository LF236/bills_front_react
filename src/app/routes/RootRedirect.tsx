import { Navigate } from "react-router-dom";

export function RootRedirect() {
    // TODO: Create autenticate hook

    const isAuthenticated = true;

    if(isAuthenticated) {
        return <Navigate to ='/home' replace/>
    } else {
        return <Navigate to ='/landing' replace/>
    }

}