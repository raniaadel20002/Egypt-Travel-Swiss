"use client";

import { useMemo, useState } from "react";
import { FiGlobe, FiPlus, FiSearch } from "react-icons/fi";
import {
  useCountryTransfersQuery,
  useDeleteCountryTransferMutation,
} from "@/features/transfers/useCountryTransfers";
import { CountryTransferItem } from "@/models/countryTransfer";
import { extractErrorMessage } from "@/shared/utils/errorHandler";
import CountryTransfersTable from "./CountryTransfersTable";
import CountryTransferFormDrawer from "./CountryTransferFormDrawer";
import CountryTransferDeleteModal from "./CountryTransferDeleteModal";

interface CountryTransfersSectionProps {
  isFormOpen?: boolean;
  onOpenCreate?: () => void;
  onCloseForm?: () => void;
}

export default function CountryTransfersSection({
  isFormOpen = false,
  onOpenCreate,
  onCloseForm,
}: CountryTransfersSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [internalDrawer, setInternalDrawer] = useState<{
    isOpen: boolean;
    item: CountryTransferItem | null;
  }>({
    isOpen: false,
    item: null,
  });

  const [deletingItem, setDeletingItem] =
    useState<CountryTransferItem | null>(null);

  const countriesQuery = useCountryTransfersQuery();
  const deleteMutation = useDeleteCountryTransferMutation();

  const countries = countriesQuery.data || [];

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return countries;
    const q = searchQuery.toLowerCase().trim();
    return countries.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.code?.toLowerCase().includes(q) ||
        String(c.id).includes(q)
    );
  }, [countries, searchQuery]);

  const handleCreate = () => {
    if (onOpenCreate) {
      onOpenCreate();
    } else {
      setInternalDrawer({ isOpen: true, item: null });
    }
  };

  const handleEdit = (item: CountryTransferItem) => {
    setInternalDrawer({ isOpen: true, item });
  };

  const handleCloseDrawer = () => {
    if (onCloseForm) onCloseForm();
    setInternalDrawer({ isOpen: false, item: null });
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    await deleteMutation.mutateAsync(deletingItem.id);
    setDeletingItem(null);
  };

  const drawerOpen = isFormOpen || internalDrawer.isOpen;

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search country title, code, or ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
          <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-xs font-semibold text-[#013E51] bg-[#FAF7F2] px-3.5 py-1.5 rounded-xl border border-[#013E51]/10 flex items-center gap-2">
            <FiGlobe className="w-3.5 h-3.5 text-[#E8B34A]" />
            <span>
              Total Countries: <strong className="font-bold">{countries.length}</strong>
            </span>
          </div>

          {/* <button
            type="button"
            onClick={handleCreate}
            className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
          >
            <FiPlus className="w-4 h-4 text-[#E8B34A]" />
            <span>Add Country</span>
          </button> */}
        </div>
      </div>

      {countriesQuery.isError && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-xs font-semibold text-red-700">
          {extractErrorMessage(
            countriesQuery.error,
            "Failed to load country transfers from server."
          )}
        </div>
      )}

      <CountryTransfersTable
        items={filteredItems}
        isLoading={countriesQuery.isLoading}
        onEdit={handleEdit}
        onDelete={setDeletingItem}
      />

      <CountryTransferFormDrawer
        isOpen={drawerOpen}
        item={internalDrawer.item}
        onClose={handleCloseDrawer}
      />

      <CountryTransferDeleteModal
        isOpen={Boolean(deletingItem)}
        item={deletingItem}
        isLoading={deleteMutation.isPending}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
