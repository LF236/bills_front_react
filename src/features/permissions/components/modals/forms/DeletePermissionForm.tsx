import { Formik, Form as FormikForm } from "formik";
import { usePermissionStore } from "../../../hooks/usePermissionStore";
import { Button } from "../../../../common/components/button";
import { Heading, Subheading } from "../../../../common/components/heading";
import { Strong, Text } from "../../../../common/components/text";
import { useDeletePermission } from "../../../hooks/useDeletePermission";
import { useEffect, useState } from "react";

const DeletePermissionForm = () => {
  const { permissionToUpdateOrDelete, idPermissionToUpdateOrDelete, closeDeletePermissionModal } = usePermissionStore();
  const { handleRemovePermission, loading, error, data } = useDeletePermission();
  const [localBlocking, setLocalBlocking] = useState(false);

  const handleCancel = () => {
    closeDeletePermissionModal();
  }

  const handleSubmit = () => {
    if(!idPermissionToUpdateOrDelete) return;
    handleRemovePermission(idPermissionToUpdateOrDelete);
  }

  useEffect(() => {
    if(error) {
      setLocalBlocking(true);
      setTimeout(() => {
        setLocalBlocking(false);
      }, 3000);
    } else if(data) {
      setLocalBlocking(false);
      closeDeletePermissionModal();
    }
  }, [loading, error])

  return (
    <Formik
      initialValues={{
        name: permissionToUpdateOrDelete?.name || '',
      }}
      onSubmit={handleSubmit}
    >
      {({}) => (
        <FormikForm>
          <Text>
            Are you sure you want to delete the permission "{permissionToUpdateOrDelete?.name}"?
          </Text>

          <Text>
            This action cannot be undone.  
          </Text>


          <div className='flex justify-end gap-2 mt-4'>
            <Button className='mt-4 bg-red-600' onClick={ handleCancel }>
              Cancel
            </Button>

            <Button 
              type='submit' 
              className='mt-4'
              disabled={loading || localBlocking}
            >
              Delete Permission
            </Button>
          </div>
        </FormikForm>
      )}

    </Formik>
  );
}

export default DeletePermissionForm;