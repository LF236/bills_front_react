import React from 'react';
import CreatePersonForm from '../../features/person/components/forms/CreatePersonForm';

const PersonEditPage = () => {
  return (
    <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
      <CreatePersonForm />
    </div>
  );
}

export default PersonEditPage