import { useMutation } from '@apollo/client/react';
import { CREATE_PERMISSION_MUTATION } from '../api/permissions.mutation';
import type { CreatePermissionInterface } from '../types/permissions-gpl-types';
import { useEffect } from 'react';
import { useAlertStore } from '../../common/store/useAlertStore';

export const useCreatePermission = () => {
  const [mutation, { loading, error, data }] = useMutation(CREATE_PERMISSION_MUTATION);
  const addAlert = useAlertStore(state => state.addAlert);
  

  const handleCreatePermission = (createPermissionInput: CreatePermissionInterface) => {
    mutation({ variables: { createPermissionInput: createPermissionInput } });
  }

  useEffect(() => {
    if(error) {
      addAlert({
        title: 'Error Creating Permission',
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
        title: 'Permission Created',
        subtitle: 'The permission has been created successfully.',
        type: 'success',
        showButtonClose: false,
        isWithTimeToClose: true,
        timeToClose: 3000,
        id: crypto.randomUUID(),
      });
    }
  }, [data]);

  return {
    handleCreatePermission,
    loading,
    error,
    data,
  }
}