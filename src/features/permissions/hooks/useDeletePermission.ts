import { useMutation } from "@apollo/client/react"
import { DELETE_PERMISSION_MUTATION } from "../api/permissions.mutation"
import { GET_PERMISSIONS_QUERY } from "../api/permissions.queries"
import { useAlertStore } from "../../common/store/useAlertStore";
import { useEffect } from "react";

export const useDeletePermission = () => {
  const [mutation, { loading, error, data }] = useMutation(DELETE_PERMISSION_MUTATION, {
    refetchQueries: [GET_PERMISSIONS_QUERY]
  });
  const addAlert = useAlertStore(state => state.addAlert);

  const handleRemovePermission = (id: string) => {
    mutation({
      variables: {
        removePermissionId: id
      }
    });
  }

  useEffect(() => {
    if(error) {
      addAlert({
        title: 'Error Deleting Permission',
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
        title: 'Permission Deleted',
        subtitle: 'The permission has been deleted successfully.',
        type: 'success',
        showButtonClose: false,
        isWithTimeToClose: true,
        timeToClose: 3000,
        id: crypto.randomUUID(),
      });
    }
  }, [data]);

  return {
    handleRemovePermission,
    loading,
    error,
    data,
  }
}