import React from 'react'
import { useRolsStore } from '../../hooks/useRolsStore';
import { Dialog, DialogBody, DialogDescription, DialogTitle } from '../../../common/components/dialog';
import DeleteRolForm from '../forms/DeleteRolForm';

const DeleteRoleModal = () => {
  const { isOpenModalToDelete, setIsOpenModalToDelete, idRolToUpdateOrDelete, setIdRolToUpdateOrDelete } = useRolsStore();
  
  return (
    <Dialog open={isOpenModalToDelete} onClick={() => {}} onClose={() => {}}>
      <DialogTitle>
        Delete Role
      </DialogTitle>
      
      <DialogBody>
        <DeleteRolForm />
      </DialogBody>

    </Dialog>
  );
}

export default DeleteRoleModal;