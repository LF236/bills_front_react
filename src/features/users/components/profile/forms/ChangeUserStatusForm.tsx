import { Formik, Form as FormikForm } from 'formik';
import { Button } from '../../../../common/components/button';
import { Text } from '../../../../common/components/text';
import { useAlertStore } from '../../../../common/store/useAlertStore';
import { useUserStore } from '../../../hooks/useUsersStore';

const ChangeUserStatusForm = () => {
  const { selectedUser,closeUserStatusModal,setUserStatusOverride,userStatusOverride } = useUserStore();

  const addAlert = useAlertStore((state) => state.addAlert);

  const handleCancel = () => {
    closeUserStatusModal();
  };

  const handleSubmit = () => {
    if (!selectedUser) return;

    const currentStatus =
      userStatusOverride[selectedUser.id] ?? selectedUser.is_active;

    const newStatus = !currentStatus;

    setUserStatusOverride(selectedUser.id, newStatus);

    addAlert({
      title: 'User Status Updated',
      subtitle: `User is now ${newStatus ? 'active' : 'inactive'}.`,
      type: 'success',
      showButtonClose: false,
      isWithTimeToClose: true,
      timeToClose: 3000,
      id: crypto.randomUUID(),
    });

    closeUserStatusModal();
  };
  if (!selectedUser) return null;
  return (
    <Formik initialValues={{}} onSubmit={handleSubmit}>
      <FormikForm>
        <Text className='text-white text-sm'>
          Change user status {selectedUser.name}?
        </Text>

        <div className='flex justify-end gap-2 mt-4'>
          <Button
            type='button'
            className='mt-4 bg-red-600 t'
            onClick={handleCancel}
          >
            Cancel
          </Button>

          <Button type='submit' className='mt-4'>
            Confirm
          </Button>
        </div>
      </FormikForm>
    </Formik>
  );
};

export default ChangeUserStatusForm;
