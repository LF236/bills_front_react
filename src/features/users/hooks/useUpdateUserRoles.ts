import { useMutation } from '@apollo/client/react';
import { UPDATE_USER_ROLES_MUTATION } from '../api/users.mutations';
import { GET_USER_QUERY } from '../api/users.queries';
import { useAlertStore } from '../../common/store/useAlertStore';
import type { UpdateUserRolesInterface } from '../types/user-gql-types';
import { useEffect } from 'react';
import { useUserStore } from './useUsersStore';

export const useUpdateUserRoles = () => {
  const addAlert = useAlertStore(state => state.addAlert);
  const { infoUser } = useUserStore();

  const [mutation, { loading, error, data: dataMutation }] = useMutation(UPDATE_USER_ROLES_MUTATION, {
    refetchQueries: [GET_USER_QUERY],
    onCompleted: () => {
      addAlert({
        title: 'User Roles Updated',
        subtitle: 'The user has roles updated',
        type: 'success',
        showButtonClose: false,
        isWithTimeToClose: true,
        timeToClose: 3000,
        id: crypto.randomUUID()
      });
    },
    onError: (err) => {
      addAlert({
        title: 'Error Updating User Roles',
        subtitle: err.message,
        type: 'error',
        showButtonClose: true,
        isWithTimeToClose: true,
        timeToClose: 3000,
        id: crypto.randomUUID(),
      });
    }
  });

  const handleUpdateUserRoles = (data: UpdateUserRolesInterface) => {
    return mutation({
      variables: {
        updateUserRolesInput: data
      }
    })
  }

  useEffect(() => {
    infoUser.setLoadingStatus(loading);
  }, [loading]);

  return {
    handleUpdateUserRoles,
    loading,
    error,
    dataMutation
  }
}