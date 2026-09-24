import React from 'react';
import UserDetailtContainer from '../../features/users/components/edit/UserDetailtContainer';
import { useParams } from 'react-router-dom';

const UsersEditPage = () => {
  const {id} = useParams();

  if(!id) return <>Not available</>
  return (
    <>
      <UserDetailtContainer id={id}/>
    </>
  )
}

export default UsersEditPage;