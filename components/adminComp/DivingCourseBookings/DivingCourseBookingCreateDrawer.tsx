import { useState } from "react";
import { FiX, FiPlus } from "react-icons/fi";
import { toast } from "sonner";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import { useDivingCoursesQuery } from "@/features/divingCourses/useDivingCourses";
import { useCreateDivingCourseBookingMutation } from "@/features/divingCourses/useDivingCourseBookings";
import {
  CreateDivingCourseBookingItemPayload,
  CreateDivingCourseBookingPayload,
} from "@/models/divingCourseBooking";
import {
  getTomorrowDateString,
  formatPriceEur,
} from "./divingCourseBookingHelpers";
import DivingCourseBookingCustomerFields from "./DivingCourseBookingCustomerFields";
import DivingCourseBookingItemRow, {
  CourseItemFormState,
} from "./DivingCourseBookingItemRow";

interface DivingCourseBookingCreateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DivingCourseBookingCreateDrawer({
  isOpen,
  onClose,
}: DivingCourseBookingCreateDrawerProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [roomNo, setRoomNo] = useState("");

  const tomorrowStr = getTomorrowDateString();
  const [items, setItems] = useState<CourseItemFormState[]>([
    {
      divingCourseId: "",
      bookingDate: tomorrowStr,
      numberOfParticipants: 1,
    },
  ]);

  const { data: coursesRes } = useDivingCoursesQuery({ pageSize: 100 });
  const courses = coursesRes?.data || [];
  const createMutation = useCreateDivingCourseBookingMutation();

  useModalDismiss({ isOpen, onClose });

  if (!isOpen) return null;

  const handleAddItem = () => {
    if (courses.length > 0 && items.length >= courses.length) {
      toast.error("All available diving courses have already been added.");
      return;
    }
    const alreadySelected = new Set(items.map((it) => it.divingCourseId));
    const nextAvailable = courses.find((c) => !alreadySelected.has(c.id));
    setItems((prev) => [
      ...prev,
      {
        divingCourseId: nextAvailable ? nextAvailable.id : "",
        bookingDate: tomorrowStr,
        numberOfParticipants: 1,
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) {
      toast.error("At least one course item is required.");
      return;
    }
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: keyof CourseItemFormState,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const estimatedTotal = items.reduce((sum, item) => {
    const course = courses.find((c) => c.id === item.divingCourseId);
    const unitPrice = course?.price || 0;
    return sum + unitPrice * (item.numberOfParticipants || 1);
  }, 0);
  const estimatedDeposit = estimatedTotal * 0.5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      toast.error("Please fill in customer name, email, and phone number.");
      return;
    }
    if (!hotelName.trim() || !roomNo.trim()) {
      toast.error("Hotel name and room number are required.");
      return;
    }

    const validItems: CreateDivingCourseBookingItemPayload[] = [];
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (!it.divingCourseId) {
        toast.error(`Please select a course for item #${i + 1}.`);
        return;
      }
      if (!it.bookingDate || it.bookingDate < tomorrowStr) {
        toast.error(`Course #${i + 1} booking date must be tomorrow onwards.`);
        return;
      }
      validItems.push({
        divingCourseId: it.divingCourseId,
        bookingDate: new Date(it.bookingDate).toISOString(),
        numberOfParticipants: Math.max(1, Number(it.numberOfParticipants) || 1),
      });
    }

    const courseIds = validItems.map((it) => it.divingCourseId);
    const uniqueCourseIds = new Set(courseIds);
    if (uniqueCourseIds.size !== courseIds.length) {
      toast.error(
        "Each course can only be selected once per booking. Please select different courses or increase the number of participants."
      );
      return;
    }

    try {
      const payload: CreateDivingCourseBookingPayload = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.replace(/\s+/g, "").trim(),
        hotelName: hotelName.trim(),
        roomNo: roomNo.trim(),
        items: validItems,
      };

      await createMutation.mutateAsync(payload);
      toast.success("Diving course booking created successfully.");
      onClose();
    } catch {
      toast.error("Failed to create booking. Please check the inputs.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-[family-name:var(--font-lato)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 bg-[#013E51] text-white flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#E8B34A] font-bold block">
                Reservations
              </span>
              <h2 className="text-lg font-bold">New Diving Course Booking</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto p-6 space-y-5"
          >
            {/* Customer Information */}
            <DivingCourseBookingCustomerFields
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              hotelName={hotelName}
              setHotelName={setHotelName}
              roomNo={roomNo}
              setRoomNo={setRoomNo}
            />

            {/* Course Items */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
                  Course Items ({items.length})
                </h3>
                <button
                  type="button"
                  disabled={courses.length > 0 && items.length >= courses.length}
                  onClick={handleAddItem}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#013E51] hover:underline cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FiPlus className="w-3.5 h-3.5 text-[#E8B34A]" />
                  <span>Add Course</span>
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item, idx) => (
                  <DivingCourseBookingItemRow
                    key={idx}
                    index={idx}
                    item={item}
                    courses={courses}
                    selectedCourseIds={items.map((it) => it.divingCourseId)}
                    tomorrowStr={tomorrowStr}
                    canRemove={items.length > 1}
                    onRemove={handleRemoveItem}
                    onChange={handleItemChange}
                  />
                ))}
              </div>
            </div>

            {/* Estimated Financial Preview */}
            <div className="bg-[#F8F9FA] p-4 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 block">
                  Estimated Total (EUR)
                </span>
                <span className="text-lg font-extrabold text-[#013E51] block">
                  {formatPriceEur(estimatedTotal)}
                </span>
                <span className="text-[11px] text-gray-500">
                  50% Deposit: {formatPriceEur(estimatedDeposit)}
                </span>
              </div>
              <span className="text-2xl font-black text-[#E8B34A] leading-none">
                &euro;
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createMutation.isPending}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#024f67] text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-60 shadow-xs"
              >
                <FiPlus className="w-4 h-4 text-[#E8B34A]" />
                <span>
                  {createMutation.isPending ? "Creating..." : "Create Booking"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
