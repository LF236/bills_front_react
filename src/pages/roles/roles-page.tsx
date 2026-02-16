import { useNavigate } from 'react-router-dom';
import { Button } from '../../features/common/components/button';
import { Heading } from '../../features/common/components/heading';
import RolsTable from '../../features/roles/components/RolsTable';
import DeleteRoleModal from '../../features/roles/components/modals/DeleteRoleModal';

const RolesPage = () => {
  const navigate = useNavigate();

  const handleOpenAddRol = () => {
    navigate('/roles/create');
  }

  return (
    <>
      <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
        <Heading>Roles</Heading>
        <Button
          className='-my-0.5 self-start sm:self-auto w-fit'
          onClick={ handleOpenAddRol }
        >
          Add Role
        </Button>
      </div>
      <RolsTable />
      <DeleteRoleModal />
    </>
  )
}

export default RolesPage;