import { useMutation } from '@apollo/client/react';
import { useAlertStore } from '../../common/store/useAlertStore';
import { DELETE_ROL_MUTATION } from '../api/rols.mutation';
import { useEffect } from 'react';
import { GET_ROLS_QUERY } from '../api/rols.queries';

export const useDeleteRol = () => {
  const [mutation, { data, loading, error }] = useMutation(DELETE_ROL_MUTATION, {
    refetchQueries: [GET_ROLS_QUERY]
  });
  const addAlert = useAlertStore((state) => state.addAlert);

  const handleDeleteRol = (id: string) => {
    mutation({
      variables: {
        id: id
      }
    });
  }

  useEffect(() => {
    if(error) {
      addAlert({
        title: 'Error Deleting Rol',
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
        title: 'Rol Deleted',
        subtitle: 'The rol has been deleted successfully.',
        type: 'success',
        showButtonClose: false,
        isWithTimeToClose: true,
        timeToClose: 3000,
        id: crypto.randomUUID(),
      });
    }
  }, [data]);

  return {
    handleDeleteRol,
    loading,
    error,
    data,
  }
}