import React from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const RequirePersonRoute = () => {
  const { user, isLoading } = useAuth();
  
  if(isLoading) {
    return <div>Loading...</div>
  }

  if( user && !user.person ) {
    // return <Navigate to='/users/person/create' replace />
  }
  
  return (
    <Outlet />
  );
}

export default RequirePersonRoute;