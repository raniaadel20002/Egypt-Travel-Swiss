"use client";

import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiPackage, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { HotelApiItem, HotelRatePlanApiItem } from "@/models/hotel";
import {
  useDeleteRatePlanMutation,
  useRatePlansQuery,
} from "@/features/hotels/useRatePlans";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import HotelRatePlanFormDrawer from "./HotelRatePlanFormDrawer";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

interface HotelRatePlansDrawerProps {
  isOpen: boolean;
  hotel: HotelApiItem | null;
  onClose: () => void;
}

export default function HotelRatePlansDrawer({
  isOpen,
  hotel,
  onClose,
}: HotelRatePlansDrawerProps) {
  const [formState, setFormState] = useState<{
    isOpen: boolean;
    ratePlanId: number | null;
  }>({
    isOpen: false,
    ratePlanId: null,
  });

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const ratePlansQuery = useRatePlansQuery(
    hotel ? { HotelId: hotel.id } : undefined,
    isOpen && Boolean(hotel)
  );

  const deleteMutation = useDeleteRatePlanMutation();

  const plans = ratePlansQuery.data || hotel?.ratePlans || [];

  const handleCreate = () => {
    setFormState({ isOpen: true, ratePlanId: null });
  };

  const handleEdit = (plan: HotelRatePlanApiItem) => {
    setFormState({ isOpen: true, ratePlanId: plan.id });
  };

  const handleDelete = async (plan: HotelRatePlanApiItem) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete rate plan "${plan.name}"?`
    );
    if (!confirmed) return;

    setDeletingId(plan.id);
    try {
      await deleteMutation.mutateAsync(plan.id);
      toast.success("Rate plan deleted successfully.");
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to delete rate plan."));
    } finally {
      setDeletingId(null);
    }
  };

  if (!hotel) return null;

  return (
    <>
      <AdminDrawer
        isOpen={isOpen}
        onClose={onClose}
        eyebrow="Hotel Packages & Inclusions"
        title={`Rate Plans: ${hotel.name}`}
        subtitle="Manage available room packages, board types, and meal plan offerings for this resort."
        widthClassName="max-w-lg sm:max-w-xl"
      >
        <div className="space-y-6 pb-6">
          {/* Top Action Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold text-[#013E51]">
                Total Plans: {plans.length}
              </span>
              <p className="text-[11px] text-[#888888]">
                Guests choose from these plans during room selection.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCreate}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#013E51] text-white text-xs font-bold hover:bg-[#025670] transition shadow-xs cursor-pointer"
            >
              <FiPlus className="w-3.5 h-3.5 text-[#E8B34A]" />
              <span>Add Plan</span>
            </button>
          </div>

          {/* Loading State */}
          {ratePlansQuery.isLoading && (
            <div className="p-8 text-center space-y-2">
              <FiLoader className="w-6 h-6 text-[#013E51] animate-spin mx-auto" />
              <p className="text-xs text-[#013E51] font-semibold">
                Loading rate plans...
              </p>
            </div>
          )}

          {/* Empty State */}
          {!ratePlansQuery.isLoading && plans.length === 0 && (
            <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <FiPackage className="w-8 h-8 text-[#E8B34A] mx-auto" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-[#013E51]">
                  No Rate Plans Configured
                </h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Add board options such as Bed &amp; Breakfast, Half Board, or
                  All-Inclusive so guests can book specific packages.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCreate}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#013E51] text-white text-xs font-bold hover:bg-[#025670] transition shadow-xs cursor-pointer"
              >
                <FiPlus className="w-3.5 h-3.5 text-[#E8B34A]" />
                <span>Create First Rate Plan</span>
              </button>
            </div>
          )}

          {/* Rate Plans List */}
          {!ratePlansQuery.isLoading && plans.length > 0 && (
            <div className="space-y-3">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#013E51]/30 transition shadow-xs space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#013E51]/10 text-[#013E51] font-mono text-[10px] font-bold uppercase">
                          #{plan.id}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-[#013E51]">
                          {plan.name}
                        </h4>
                      </div>
                      {plan.description && (
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                          {plan.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleEdit(plan)}
                        title="Edit Rate Plan"
                        className="p-2 rounded-lg text-gray-600 hover:text-[#013E51] hover:bg-gray-100 transition cursor-pointer"
                      >
                        <FiEdit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(plan)}
                        disabled={deletingId === plan.id}
                        title="Delete Rate Plan"
                        className="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition cursor-pointer disabled:opacity-50"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminDrawer>

      {/* Form Drawer (Create / Edit) */}
      <HotelRatePlanFormDrawer
        isOpen={formState.isOpen}
        hotelId={hotel.id}
        hotelName={hotel.name}
        ratePlanId={formState.ratePlanId}
        onClose={() => setFormState({ isOpen: false, ratePlanId: null })}
        onSuccess={() => setFormState({ isOpen: false, ratePlanId: null })}
      />
    </>
  );
}
