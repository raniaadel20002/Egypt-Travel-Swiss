import ConfirmDeleteDialog from "@/components/adminComp/Common/ConfirmDeleteDialog";
import {
  TransferLocationItem,
  TransferLocationType,
} from "@/models/transferLocation";

interface TransferLocationDeleteModalProps {
  isOpen: boolean;
  item: TransferLocationItem | null;
  type: TransferLocationType;
  isPending: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
}

export default function TransferLocationDeleteModal({
  isOpen,
  item,
  type,
  isPending,
  onConfirm,
  onClose,
}: TransferLocationDeleteModalProps) {
  const typeLabel = type === "from" ? "pick-up location" : "drop-off location";

  return (
    <ConfirmDeleteDialog
      isOpen={isOpen}
      title="Delete Transfer Location"
      description={
        item
          ? `Are you sure you want to delete the ${typeLabel} "${item.name}"? This action cannot be undone.`
          : undefined
      }
      isPending={isPending}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
}
