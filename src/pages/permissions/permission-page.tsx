import { Button } from "../../features/common/components/button";
import { Heading } from "../../features/common/components/heading";
import AddPermissionModal from "../../features/permissions/components/modals/AddPermissionModal";
import DeletePermissionModal from "../../features/permissions/components/modals/DeletePermissionModal";
import UpdatePermissionModal from "../../features/permissions/components/modals/UpdatePermissionModal";
import PermissionsTable from "../../features/permissions/components/PermissionsTable";
import { usePermissionStore } from "../../features/permissions/hooks/usePermissionStore";

const PermissionPage = () => {
  const {openModalAddPermission} = usePermissionStore();
  return (
    <>
      <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
        <Heading>Permissions</Heading>
        <Button className="-my-0.5 self-start sm:self-auto w-fit" onClick={openModalAddPermission}>
          Add Permission
        </Button>
      </div>

      <PermissionsTable />

      <AddPermissionModal />
      <UpdatePermissionModal />
      <DeletePermissionModal />
    </>
  )
}

export default PermissionPage;