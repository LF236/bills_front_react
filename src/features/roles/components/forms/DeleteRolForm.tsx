import React, { useEffect, useState } from 'react';
import { useRolsStore } from '../../hooks/useRolsStore';
import { Formik, Form as ForkmikForm } from 'formik';
import { Button } from '../../../common/components/button';
import { Text } from '../../../common/components/text';
import { useDeleteRol } from '../../hooks/useDeleteRol';

const DeleteRolForm = () => {
  const { setIdRolToUpdateOrDelete, setIsOpenModalToDelete, idRolToUpdateOrDelete, setRolToUpdateOrDelete, rolToUpdateOrDelete } = useRolsStore();
  const [localBlocking, setLocalBlocking] = useState(false);
  const { handleDeleteRol, data, loading, error }  = useDeleteRol();
  
  const handleClose = () => {
    setIsOpenModalToDelete(false);
    setIdRolToUpdateOrDelete(null);
    setRolToUpdateOrDelete(null);
  }

  const handleSubmit = () => {
    if(!idRolToUpdateOrDelete) return;
    handleDeleteRol(idRolToUpdateOrDelete);
  }

  useEffect(() => {
    if(error) {
      setLocalBlocking(true);
      setTimeout(() => {
        setLocalBlocking(false);
      }, 3000);
    } else if(data) {
      setLocalBlocking(false);
      handleClose();
    }
  }, [loading, error, data]);

  return (
    <Formik
      initialValues={{
        name: rolToUpdateOrDelete?.name || ''
      }}
      onSubmit={handleSubmit}  
    >
      <ForkmikForm>
        <Text>
          Are you sure you want to delete the role "{rolToUpdateOrDelete?.name}"?
        </Text>

        <Text>
          This action cannot be undone.  
        </Text>

        <div className='flex justify-end gap-2 mt-4'>
          <Button
            className='mt-4 bg-red-600'
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            type='submit'
            className='mt-4'
            disabled={localBlocking}
          >
            Delete Role
          </Button>
        </div>
      </ForkmikForm>

    </Formik>
  );
}

export default DeleteRolForm;