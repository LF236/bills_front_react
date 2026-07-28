import { Formik, Form as FormikForm } from 'formik';
import { Button } from '../../../../common/components/button';
import { Text } from '../../../../common/components/text';
import { useUserStore } from '../../../hooks/useUsersStore';
import { useChangeUserStatus } from '../../../hooks/useChangeUserStatus';

const ChangeUserStatusForm = () => {
  const { selectedUser,closeUserStatusModal} = useUserStore();
  const { handleChangeUserStatus ,loading} = useChangeUserStatus();
  

  const handleCancel = () => {
    closeUserStatusModal();
  };

  const handleSubmit = async() => {
    if (!selectedUser) return;



    const newStatus = !selectedUser.is_active;

    const success = await handleChangeUserStatus(
      selectedUser.id,
      newStatus
    );
    if(success){
    closeUserStatusModal();
    }
  };
  if (!selectedUser) return null;
  return (
    <Formik initialValues={{}} onSubmit={handleSubmit}>
      <FormikForm>
        <Text className='text-white text-sm'>
          {selectedUser.is_active
          ?`Are you sure you want to deactivate ${selectedUser.name} ?` 
          : `Are you sure you want to activate ${selectedUser.name} ?`
          }
        </Text>

        <div className='flex justify-end gap-2 mt-4'>
          <Button
            type='button'
            className='mt-4 bg-red-600 t'
            onClick={handleCancel}
          >
            Cancel
          </Button>

          <Button type='submit' className='mt-4' disabled= {loading}>
            {loading ? 'saving' : 'confirm'}
          </Button>
        </div>
      </FormikForm>
    </Formik>
  );
};

export default ChangeUserStatusForm;
