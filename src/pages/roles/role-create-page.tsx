import React, { useEffect } from 'react';
import CreateRolForm from '../../features/roles/components/forms/CreateRolForm';
import { useGetAllPermissions } from '../../features/permissions/hooks/useGetAllPermissions';

const RoleCreatePage = () => {
  const { fetchAllPermissions, permissionsList } = useGetAllPermissions();
  
  useEffect(() => {
    fetchAllPermissions('', 0, 1000, false);
  }, []);

  if(permissionsList.length === 0) return <div>Loading permissions...</div>;

  return (
    <CreateRolForm
      permissionsList={ permissionsList }
    />
  );
}

export default RoleCreatePage;