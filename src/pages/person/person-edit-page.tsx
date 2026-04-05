import React from 'react';
import CreatePersonForm from '../../features/person/components/forms/CreatePersonForm';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const PersonEditPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if(user?.person) {
    navigate('/home');  
  }

  return (
    <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
      <CreatePersonForm />
    </div>
  );
}

export default PersonEditPage