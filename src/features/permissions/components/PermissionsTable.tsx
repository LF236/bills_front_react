import PaginationComponent from '../../common/components/pagination/PaginationComponent';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../common/components/table';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { useGetPermissions } from '../hooks/useGetPermissions';
import { useEffect, useState } from 'react';
import { usePermissionStore } from '../hooks/usePermissionStore';
import { formatDate } from '../../../shared/utils/data';
import { Input } from '../../common/components/input';
import { Button } from '../../common/components/button';

const PermissionsTable = () => {
  const { permissionsList, loading, error, total, getPermissions } = useGetPermissions();
  const { search, offset, limit, nextPage, previousPage, setLimit, 
    moveByPagination, setSearch, reset, setUpdateOrDeletePermissionId, 
    openUpdatePermissionModal, openDeletePermissionModal
  } = usePermissionStore();
  
  const [localSearch, setLocalSearch] = useState('');
  useEffect(() => {
    getPermissions();
  }, [offset, limit, search]);

  const onClickResetButton = () => {
    setLocalSearch('');
    reset();
  }

  const handleOpenModalUpdate = (id: string) => {
    setUpdateOrDeletePermissionId(id);
    openUpdatePermissionModal();
  }

  const handleOpenModalDelete = (id: string) => {
    openDeletePermissionModal();
    setUpdateOrDeletePermissionId(id);
  }

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error: {error ? 'Error loading permissions' : ''}</p>;

  return (
    <>
      <div className='mt-8 w-full flex items-center gap-4 sm:w-1/2'>
        <Input 
          className='w-full'
          type='text'
          placeholder='Search permissions... Click to search'
          value={localSearch}
          onChange={(e) => setLocalSearch(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if(e.currentTarget.value.trim() === '') {
                setSearch('');
              } else {
                setSearch(e.currentTarget.value);
              }
            }
          }}
        />

        <Button onClick={onClickResetButton}>Reset</Button>
      </div>
      <Table className='mt-2 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]'>
        <TableHead>
          <TableRow className='select-none'>
            <TableHeader>ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Created At</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>

        <TableBody>
          { permissionsList.map(( permission => (
            <TableRow key={permission.id}>
              <TableCell>{ `${permission.id}`.split('-').at(0) }</TableCell>
              <TableCell className='max-w-[150px] truncate'>
                { permission.name }
              </TableCell>

              <TableCell className='text-zinc-500 max-w-[100px] truncate'>{ permission.description }</TableCell>
              <TableCell>{ formatDate(permission.created_at) }</TableCell>
              <TableCell>
                { permission.is_active ? 'Active' : 'Inactive' }
              </TableCell>

              <TableCell>
                <PencilSquareIcon 
                  className='inline h-5 w-5 cursor-pointer text-blue-500 hover:text-blue-600 mr-4' 
                  aria-label='Edit Permission' 
                  onClick={() => handleOpenModalUpdate(permission.id)}
                />
                <XCircleIcon 
                  className='inline h-5 w-5 cursor-pointer text-red-500 hover:text-red-600' 
                  aria-label='Delete Permission' 
                  onClick={() => handleOpenModalDelete(permission.id)}
                />
              </TableCell>
            </TableRow>
          ) )) }
        </TableBody>
      </Table>

      <PaginationComponent 
        offset={offset} 
        limit={limit} 
        total={total}
        next={nextPage || (() => {})}
        previous={previousPage || (() => {})}
        setLimit={setLimit}
        showPaginationList={true}
        moveByPagination={moveByPagination}
      />
    </>
  );
}

export default PermissionsTable;