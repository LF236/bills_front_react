import React from 'react'
import ProfileContainer from '../../features/users/components/profile/ProfileContainer';
import ChangeProfileAvatarModal from '../../features/users/components/profile/modals/ChangeProfileAvatarModal';

export const AccountPage = () => {
  return (
    <>
      <ProfileContainer />
      <ChangeProfileAvatarModal />
    </>
  )
}

export default AccountPage;