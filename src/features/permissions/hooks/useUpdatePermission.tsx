import { useMutation } from "@apollo/client/react"
import { UPDATE_PERMISSION_MUTATION } from "../api/permissions.mutation"
import type { UpdatePermissionInterface } from "../types/permissions-gpl-types";
import { useAlertStore } from "../../common/store/useAlertStore";
import { useEffect } from "react";
import { GET_PERMISSIONS_QUERY } from "../api/permissions.queries";


export const useUpdatePermission = () => {
  const [mutation, { loading, error, data }] = useMutation(UPDATE_PERMISSION_MUTATION, {
    refetchQueries: [GET_PERMISSIONS_QUERY]
  });
  const addAlert = useAlertStore(state => state.addAlert);

  const handleUpdatePermission = (data: UpdatePermissionInterface) => {
    delete data.ids_roles;
    mutation({
      variables: { updatePermissionInput: data }
    })
  }

  useEffect(() => {
    if(error) {
      addAlert({
        title: 'Error Updating Permission',
        subtitle: error.message,
        type: 'error',
        showButtonClose: true,
        isWithTimeToClose: true,
        timeToClose: 3000,
        id: crypto.randomUUID(),
      });
    }
  }, [error]);
  
  useEffect(() => {
    if(data) {
      addAlert({
        title: 'Permission Updated',
        subtitle: 'The permission has been updated successfully.',
        type: 'success',
        showButtonClose: false,
        isWithTimeToClose: true,
        timeToClose: 3000,
        id: crypto.randomUUID(),
      });
    }
  }, [data]);

  return {
    handleUpdatePermission,
    loading,
    error,
    data,
  }
}