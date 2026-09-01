import { useAlertStore } from '../../common/store/useAlertStore';
import { useMutation } from '@apollo/client/react';
import { TOGGLE_USER_STATUS_MUTATION } from '../api/users.mutations';

export const useChangeUserStatus = () => {
  const addAlert = useAlertStore((state) => state.addAlert);
  const [toggleUserStatus ,{loading}] = useMutation(TOGGLE_USER_STATUS_MUTATION);

  const handleChangeUserStatus = async (userId: string, isActive: boolean) => {
    try {

      await toggleUserStatus ({
        variables: {
          input:{
            id:userId,
            status: isActive,
          },
        },
      });

      addAlert({
        title: 'User Status Updated',
        subtitle: `User is now ${isActive ? 'active' : 'inactive'}.`,
        type: 'success',
        showButtonClose: false,
        isWithTimeToClose: true,
        timeToClose: 3000,
        id: crypto.randomUUID(),
      });

      return true;
    } catch {
      addAlert({
        title: 'Error Updating User',
        subtitle: 'An error occurred while updating the user status.',
        type: 'error',
        showButtonClose: true,
        isWithTimeToClose: true,
        timeToClose: 3000,
        id: crypto.randomUUID(),
      });

      return false;
    }
  };

  return {
    handleChangeUserStatus,
    loading,
  };
};
