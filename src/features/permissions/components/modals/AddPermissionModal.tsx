import { Dialog, DialogBody, DialogDescription, DialogTitle } from "../../../common/components/dialog";
import { FieldGroup, Label, Field } from "../../../common/components/fieldset";
import { usePermissionStore } from "../../hooks/usePermissionStore";
import { Input } from "@headlessui/react";
import AddPermissionForm from "./AddPermissionForm";

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