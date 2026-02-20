import React, { useEffect, useState } from 'react';
import { Input } from '../../common/components/input';
import { useUserStore } from '../hooks/useUsersStore';
import { Button } from '../../common/components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../common/components/table';
import PaginationComponent from '../../common/components/pagination/PaginationComponent';
import { useGetUsers } from '../hooks/useGetUsers';
import type { User } from '../domain/user.model';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/16/solid';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
  const {search, setSearch, reset, nextPage, 
    offset, limit, previousPage, setLimit, moveByPagination} = useUserStore();
  const [localSearch, setLocalSearch] = useState('');
  const {getUsers, loading, error, userList, total} = useGetUsers();
  const navigate = useNavigate();

  const handleReset = () => {
    setLocalSearch('');
    reset();
  }

  const handleOpenEditUser = (id: string) => {
    navigate(`/users/${id}`);
  }

  useEffect(() => {
    getUsers();
  }, [search, offset, limit]);

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error ? 'Error loading users' : ''}</p>;

  return (
    <>
      <div className='mt-8 w-full flex items-center gap-4 sm:w-1/2'>
        <Input
          className='w-full'
          type='text'
          placeholder='Search users... Enter to search'
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === 'Enter') {
              if(e.currentTarget.value.trim() === '') {
                setSearch('');
              } else {
                setSearch(e.currentTarget.value);
              }
            }
          }}
        />

        <Button onClick={handleReset}>Reset</Button>
      </div>

      <Table className='mt-2 [--gutter:--spacing(8)] lg:[--gutter:--spacing(10)]'>
          <TableHead>
            <TableRow className='select-none'>
              <TableHeader>ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Active</TableHeader>
              <TableHeader>Roles</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            { userList.map((user : User) => (
              <TableRow key={user.id}>
                <TableCell>{`${user.id}`.split('-')[0]}</TableCell>
                <TableCell>
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.is_active ? 'Yes' : 'No'}</TableCell>
                <TableCell>{user.roles.map(role => role.name).join(', ')}</TableCell>
                <TableCell>
                  <PencilSquareIcon 
                    className='inline w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-600 mr-4' 
                    onClick={() => handleOpenEditUser(user.id)}
                  />

                  <XCircleIcon
                    className='inline w-5 h-5 text-red-500 cursor-pointer' 
                    // onClick={() => handleChangeIfRolToUpdateOrDelete(rol.id, rol)}
                  />
              
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
      </Table>

      <PaginationComponent
        offset={offset}
        limit={limit}
        next={nextPage || (() => {})}
        previous={previousPage || (() => {})}
        setLimit={setLimit}
        moveByPagination={moveByPagination}
        total={total}
      />
    </>
  );
}

export default UsersTable;