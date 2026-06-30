import { Dialog,DialogBody,DialogTitle } from '../../../../common/components/dialog';
import { useUserStore } from '../../../hooks/useUsersStore';
import ChangeUserStatusForm from '../forms/ChangeUserStatusForm';

const ChangeUserStatusModal = () => {
  const { isUserStatusModalOpen, selectedUser } = useUserStore();

  if (!selectedUser) return null;

  return (
    <Dialog open={isUserStatusModalOpen} onClick={() => {}} onClose={() => {}}>
      <DialogTitle>Change status</DialogTitle>
      <DialogBody>
        <ChangeUserStatusForm />
      </DialogBody>
    </Dialog>
  );
};
export default ChangeUserStatusModal;
