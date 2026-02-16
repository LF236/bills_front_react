import { use, useEffect } from "react";
import { useGetAllPermissions } from "../../features/permissions/hooks/useGetAllPermissions";
import UpdateRolForm from "../../features/roles/components/forms/UpdateRolForm";
import { useParams } from 'react-router-dom';
import { useRolsStore } from "../../features/roles/hooks/useRolsStore";
import { useGetOneRol } from "../../features/roles/hooks/useGetOneRol";

const RoleUpdatePage = () => {
  const { setIdRolToUpdateOrDelete, setRolToUpdateOrDelete, idRolToUpdateOrDelete, rolToUpdateOrDelete } = useRolsStore();
  const { fetchAllPermissions, permissionsList } = useGetAllPermissions();
  const { fetchRolById, rolData, loading, error } = useGetOneRol();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if(id) {
      setIdRolToUpdateOrDelete(id);
    } else {
      setIdRolToUpdateOrDelete(null);
    }
  }, [id]);

  useEffect(() => {
    if(idRolToUpdateOrDelete) {
      fetchRolById();
    }
  }, [idRolToUpdateOrDelete]);  

  useEffect(() => {
    fetchAllPermissions('', 0, 1000, false);
  }, []);

  useEffect(() => {
    if(rolData) setRolToUpdateOrDelete(rolData);
  }, [rolData]);

  if(loading) return <p>Loading role data...</p>;
  if(error) return <p>Error loading role data.</p>;
  if(!rolData) return <p>No role data found.</p>;
  if(!rolToUpdateOrDelete) return <div>Loading role information...</div>;
  if(permissionsList.length === 0) return <div>Loading permissions...</div>;

  return (
    <UpdateRolForm 
      permissionsList={permissionsList}
      rolToUpdateOrDelete={rolToUpdateOrDelete}
    />
  );
}

export default RoleUpdatePage;