import { Dialog, DialogBody, DialogDescription, DialogTitle } from "../../../common/components/dialog";
import { usePermissionStore } from "../../hooks/usePermissionStore";
import DeletePermissionForm from "./forms/DeletePermissionForm";

const DeletePermissionModal = () => {
  const { isDeletePermissionModalOpen, permissionToUpdateOrDelete } = usePermissionStore();

  if(!permissionToUpdateOrDelete) return;
  return (
    <Dialog open={isDeletePermissionModalOpen} onClick={() => {}} onClose={() => {}}>
      <DialogTitle>
        Delete Permission
      </DialogTitle>
      
      <DialogBody>
        <DeletePermissionForm
        />
      </DialogBody>

    </Dialog>
  );
}

export default DeletePermissionModal;