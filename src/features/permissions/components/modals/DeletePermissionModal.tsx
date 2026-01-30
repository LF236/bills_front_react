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

      <DialogDescription>
        Here will be the form to delete an existing permission.
      </DialogDescription>

      <DialogBody>
        <DeletePermissionForm
        />
      </DialogBody>

    </Dialog>
  );
}

export default DeletePermissionModal;