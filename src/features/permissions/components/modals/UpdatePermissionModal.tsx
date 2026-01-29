import { useEffect } from "react";
import { Dialog, DialogBody, DialogDescription, DialogTitle } from "../../../common/components/dialog";
import { usePermissionStore } from "../../hooks/usePermissionStore";
import UpdatePermissionForm from "./forms/UpdatePermissionForm";
import { useGetPermissionById } from "../../hooks/useGetPermissionById";

const UpdatePermissionModal = () => {
  const { isUpdatePermissionModalOpen, 
    closeUpdatePermissionModal, 
    openUpdatePermissionModal, 
    idPermissionToUpdateOrDelete,
    setPermissionToUpdateOrDelete
  } = usePermissionStore();
  const { getPermission, loading, error } = useGetPermissionById();
  const { permissionToUpdateOrDelete } = usePermissionStore();

  useEffect(() => {
    if(!idPermissionToUpdateOrDelete) {
      setPermissionToUpdateOrDelete(null);
      return;
    }
    getPermission();
  }, [idPermissionToUpdateOrDelete]);
  
  return (
    <Dialog open={isUpdatePermissionModalOpen} onClick={() => {}} onClose={() => {}}>
      <DialogTitle>
        Update Permission
      </DialogTitle>

      <DialogDescription>
        Here will be the form to update an existing permission.
      </DialogDescription>

      <DialogBody>
        {loading && <p>Loading permission data...</p>}
        {error && <p>Error loading permission data.</p>}
        {!loading && !error && permissionToUpdateOrDelete && (
          <UpdatePermissionForm
            id={idPermissionToUpdateOrDelete!}
          />
        )}
      </DialogBody>
    </Dialog>
  );
}

export default UpdatePermissionModal;