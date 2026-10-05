import React, { useEffect } from 'react';
import UserDetailtContainer from '../../features/users/components/edit/UserDetailtContainer';
import { useParams } from 'react-router-dom';
import { useGetAllRols } from '../../features/roles/hooks/useGetAllRol';
import { useUserStore } from '../../features/users/hooks/useUsersStore';
import { OverlayLoader } from '../../features/common/components/loaders/OverlayLoader';

const UsersEditPage = () => {
  const { infoUser } = useUserStore();
  const {id} = useParams();

  const {getAllRols} = useGetAllRols();

  useEffect(() => {
    getAllRols();
  }, [id]);


  if(!id) return <>Not available</>
  return (
    <div className='relative'>
      <OverlayLoader show={infoUser.loading} />
      <UserDetailtContainer id={id}/>
    </div>
  )
}

export default UsersEditPage;