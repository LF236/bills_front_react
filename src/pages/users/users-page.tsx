import React from 'react';
import { Heading } from '../../features/common/components/heading';
import { Button } from '../../features/common/components/button';
import UsersTable from '../../features/users/components/UsersTable';

const UsersPage = () => {
  return (
    <>
      <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
        <Heading>Users Management</Heading>
        <Button className='-my-0.5 self-start sm:self-auto w-fit'>
          Add Manual User
        </Button>
      </div>

      <UsersTable />
    </>
  );
}

export default UsersPage;