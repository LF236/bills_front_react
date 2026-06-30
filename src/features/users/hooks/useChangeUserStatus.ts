import { useState } from 'react';
import { useAlertStore } from '../../common/store/useAlertStore';

export const useChangeUserStatus = () => {
  const [loading, setLoading] = useState(false);
  const addAlert = useAlertStore((state) => state.addAlert);

  const handleChangeUserStatus = async (userId: string, isActive: boolean) => {
    try {
      setLoading(true);

      // TODO:
      //Reempalzar cuando el backend exponga updateUser/changeUserStatus.

      await new Promise((resolve) => setTimeout(resolve, 500));

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
    } catch (error) {
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
    } finally {
      setLoading(false);
    }
  };

  return {
    handleChangeUserStatus,
    loading,
  };
};
