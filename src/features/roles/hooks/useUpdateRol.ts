import { useMutation } from "@apollo/client/react"
import { UPDATE_ROL_MUTATION } from "../api/rols.mutation"
import { useAlertStore } from "../../common/store/useAlertStore";
import type { UpdateRolInterface } from "../types/rols-gql-types";
import { useEffect } from "react";
import { GET_ROLS_QUERY } from "../api/rols.queries";

export const useUpdateRol = () => {
  const [mutation, { loading, error, data }] = useMutation(UPDATE_ROL_MUTATION, {
    refetchQueries: [GET_ROLS_QUERY]
  });

  const addAlert = useAlertStore(state => state.addAlert);

  const handleUpdateRol = (data: UpdateRolInterface) => {
    mutation({
      variables: {
        updateRol: data
      }
    });
  }

  useEffect(() => {
    if(error) {
      addAlert({
        title: 'Error Updating Rol',
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
        title: 'Rol Updated',
        subtitle: 'The rol has been updated successfully.',
        type: 'success',
        showButtonClose: false,
        isWithTimeToClose: true,
        timeToClose: 3000,
        id: crypto.randomUUID(),
      });
    }
  }, [data]);

  return {
    handleUpdateRol,
    loading,
    error,
    data,
  }

}