import React from 'react';
import { Dialog, DialogBody, DialogDescription, DialogTitle } from '../../../../common/components/dialog';
import ChangeProfileAvatarForm from '../forms/ChangeProfileAvatarForm';
import { useAccountStore } from '../../../../person/hooks/useAccountStore';

const ChangeProfileAvatarModal = () => {
  const { openModalChangeProfile, setOpenModalChangeProfile } = useAccountStore(state => state);

  const handleCloseModal = () => {
    setOpenModalChangeProfile(false);
  }  

  return (
    <Dialog open={openModalChangeProfile} onClick={() => {}} onClose={handleCloseModal} size='lg'>
      <DialogTitle>Change Profile Picture</DialogTitle>

      <DialogDescription>
        Here will be the form to change the profile picture.
      </DialogDescription>

      <DialogBody>
        <ChangeProfileAvatarForm />
      </DialogBody>
    </Dialog>
  );
}

export default ChangeProfileAvatarModal;