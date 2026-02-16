import { useEffect, useState } from 'react';
import { useRolsStore } from '../hooks/useRolsStore';
import { useGetRols } from '../hooks/useGetRols';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../common/components/table';
import { formatDate } from '../../../shared/utils/data';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/16/solid';
import { Input } from '../../common/components/input';
import { Button } from '../../common/components/button';
import PaginationComponent from '../../common/components/pagination/PaginationComponent';
import { useNavigate } from 'react-router-dom';
import type { Rol } from '../domain/rol.model';

const RolsTable = () => {
  const { search, offset, limit, reset, setSearch, nextPage, previousPage, setLimit, moveByPagination, setIdRolToUpdateOrDelete, setIsOpenModalToDelete, setRolToUpdateOrDelete } = useRolsStore();
  const { rolsList, loading, error, getRols, total } = useGetRols();
  const [ localSearch, setLocalSearch ] = useState('');
  const navigate = useNavigate();

  const handleReset = () => {
    setLocalSearch('');
    reset();
  }

  const handleUpdateRole = (id: string) => {
    navigate(`/roles/${id}`);
  }

  const handleChangeIfRolToUpdateOrDelete = (id: string | null, rol: Rol | null) => {
    if(id) {
      setIsOpenModalToDelete(true);
      setIdRolToUpdateOrDelete(id);
      setRolToUpdateOrDelete(rol);
    } else {
      setIsOpenModalToDelete(false);
      setIdRolToUpdateOrDelete(null);
      setRolToUpdateOrDelete(null);
    }
  }

  useEffect(() => {
    getRols();
  }, [ search, offset, limit ])

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error ? 'Error loading rols' : ''}</p>;

  return (
    <>
      <div className='mt-8 w-full flex items-center gap-4 sm:w-1/2'>
        <Input
          className='w-full'
          type='text'
          placeholder='Search roles... Enter to search'
          value={ localSearch }
          onChange={(e) => setLocalSearch(e.target.value) }
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

        <Button onClick={ handleReset }>Reset</Button>
      </div>

      <Table className='mt-2 [--gutter:--spacing(8)] lg:[--gutter:--spacing(10)]'>
        <TableHead>
          <TableRow className='select-none'>
            <TableHeader>ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Active</TableHeader>
            <TableHeader>Created At</TableHeader>
            <TableHeader>Permissions</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>

        <TableBody>
          { rolsList.map((rol) => (
            <TableRow key={rol.id}>
              <TableCell>{ `${rol.id}`.split('-').at(0) }</TableCell>
              <TableCell className='max-w-[100px] truncate'>
                { rol.name }
              </TableCell>
              <TableCell className='max-w-[150px] truncate'>
                { rol.description }
              </TableCell>
              <TableCell>{ rol.is_active ? 'Yes' : 'No' }</TableCell>
              <TableCell>
                { formatDate(rol.created_at || '') }
              </TableCell>
              <TableCell>
                { rol.permissions.length }
              </TableCell>
              
              <TableCell>
                <PencilSquareIcon 
                  className='inline w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-600 mr-4' 
                  onClick={() => handleUpdateRole(rol.id)}
                />

                <XCircleIcon
                  className='inline w-5 h-5 text-red-500 cursor-pointer' 
                  onClick={() => handleChangeIfRolToUpdateOrDelete(rol.id, rol)}
                />
              </TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>

      <PaginationComponent
        offset={ offset }
        limit={ limit }
        total={ total }
        next={ nextPage || (() => {}) }
        previous={ previousPage || (() => {}) }
        setLimit={ setLimit }
        showPaginationList={ true }
        moveByPagination={ moveByPagination }
      />
    </>
  );
}

export default RolsTable