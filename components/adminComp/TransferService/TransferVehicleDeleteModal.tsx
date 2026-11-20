import ConfirmDeleteDialog from "@/components/adminComp/Common/ConfirmDeleteDialog";
import { VehicleTypeTransferApiItem } from "@/models/transferService";

interface TransferVehicleDeleteModalProps {
  isOpen: boolean;
  item: VehicleTypeTransferApiItem | null;
  isPending: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
}

export default function TransferVehicleDeleteModal({
  isOpen,
  item,
  isPending,
  onConfirm,
  onClose,
}: TransferVehicleDeleteModalProps) {
  return (
    <ConfirmDeleteDialog
      isOpen={isOpen}
      title="Delete Vehicle Type"
      description={
        item
          ? `Are you sure you want to delete the vehicle "${item.name}"? Any route prices associated with this vehicle will be affected.`
          : undefined
      }
      isPending={isPending}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
}
