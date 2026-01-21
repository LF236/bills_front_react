import { Button } from "../../features/common/components/button";
import { Heading } from "../../features/common/components/heading";
import PermissionsTable from "../../features/permissions/components/PermissionsTable";

const PermissionPage = () => {
  return (
    <>
      <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
        <Heading>Permissions</Heading>
        <Button className="-my-0.5 self-start sm:self-aut w-fit">Add Permission</Button>
      </div>

      <PermissionsTable />
    </>
  )
}

export default PermissionPage;