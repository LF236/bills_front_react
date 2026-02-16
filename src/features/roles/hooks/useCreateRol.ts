import { useMutation } from "@apollo/client/react";
import { useAlertStore } from "../../common/store/useAlertStore"
import { CREATE_ROL_MUTATION } from "../api/rols.mutation";
import type { CreateRolInterface } from "../types/rols-gql-types";
import { useEffect } from "react";

export const useCreateRol = () => {
  const [ mutation, { loading, error, data } ] = useMutation(CREATE_ROL_MUTATION, {
    refetchQueries: ['GetRols']
  });
  const addAlert = useAlertStore((state) => state.addAlert);


  const handleCreateRol = (data: CreateRolInterface) => {
    mutation({
      variables: {
        createRolInput: data
      }
    });
  }

  useEffect(() => {
    if(error) {
      addAlert({
        title: 'Error Creating Rol',
        subtitle: error.message,
        type: 'error',
        showButtonClose: true,
        isWithTimeToClose: true,
        timeToClose: 3000,
        id: crypto.randomUUID(),
      });
    }
  }, [ error ])

  useEffect(() => {
    if(data) {
      addAlert({
        title: 'Rol Created',
        subtitle: 'The rol has been created successfully.',
        type: 'success',
        showButtonClose: false,
        isWithTimeToClose: true,
        timeToClose: 3000,
        id: crypto.randomUUID(),
      });
    }
  }, [data]);

  return {
    handleCreateRol,
    loading,
    error,
    data
  }
}