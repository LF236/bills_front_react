import { Dialog, DialogBody, DialogDescription, DialogTitle } from "../../../common/components/dialog";
import { usePermissionStore } from "../../hooks/usePermissionStore";
import AddPermissionForm from "./forms/AddPermissionForm";

const AddPermissionModal = () => {
  const { isOpenModalAddPermission, closeModalAddPermission } = usePermissionStore();
  return (
    <Dialog open={isOpenModalAddPermission} onClick={() => {}} onClose={() => {}}>
      <DialogTitle>
        Add Permission
      </DialogTitle>

      <DialogDescription>
        Here will be the form to add a new permission.
      </DialogDescription>

      <DialogBody>
        <AddPermissionForm />
      </DialogBody>
    </Dialog>
  );
}

export default AddPermissionModal;