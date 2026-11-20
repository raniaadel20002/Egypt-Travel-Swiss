import ConfirmDeleteDialog from "@/components/adminComp/Common/ConfirmDeleteDialog";
import { TransferVehiclePriceApiItem } from "@/models/transferService";

interface TransferPriceDeleteModalProps {
  isOpen: boolean;
  item: TransferVehiclePriceApiItem | null;
  isPending: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
}

export default function TransferPriceDeleteModal({
  isOpen,
  item,
  isPending,
  onConfirm,
  onClose,
}: TransferPriceDeleteModalProps) {
  return (
    <ConfirmDeleteDialog
      isOpen={isOpen}
      title="Delete Route Price"
      description={
        item
          ? `Are you sure you want to delete the price for "${item.fromLocation || "Pick-up"} to ${item.toLocation || "Drop-off"}" with ${item.vehicleName || "Vehicle"} (€${item.priceUsd})?`
          : undefined
      }
      isPending={isPending}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
}
