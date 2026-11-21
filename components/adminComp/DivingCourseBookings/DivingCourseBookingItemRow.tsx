import { FiTrash2 } from "react-icons/fi";
import { DivingCourseApiItem } from "@/models/divingCourse";
import { formatPriceEur } from "./divingCourseBookingHelpers";

export interface CourseItemFormState {
  divingCourseId: string;
  bookingDate: string;
  numberOfParticipants: number;
}

interface DivingCourseBookingItemRowProps {
  index: number;
  item: CourseItemFormState;
  courses: DivingCourseApiItem[];
  selectedCourseIds: string[];
  tomorrowStr: string;
  canRemove: boolean;
  onRemove: (index: number) => void;
  onChange: (
    index: number,
    field: keyof CourseItemFormState,
    value: string | number
  ) => void;
}

export default function DivingCourseBookingItemRow({
  index,
  item,
  courses,
  selectedCourseIds,
  tomorrowStr,
  canRemove,
  onRemove,
  onChange,
}: DivingCourseBookingItemRowProps) {
  const selectedCourse = courses.find((c) => c.id === item.divingCourseId);

  const isSelectedElsewhere = (courseId: string) => {
    return (
      courseId !== item.divingCourseId && selectedCourseIds.includes(courseId)
    );
  };

  return (
    <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/70 space-y-3 relative font-[family-name:var(--font-lato)]">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-gray-500 uppercase">
          Item #{index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">
          Select Course *
        </label>
        <select
          required
          value={item.divingCourseId}
          onChange={(e) => onChange(index, "divingCourseId", e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer"
        >
          <option value="">Choose a diving course...</option>
          {courses.map((course) => {
            const isTaken = isSelectedElsewhere(course.id);
            return (
              <option
                key={course.id}
                value={course.id}
                disabled={isTaken}
                className={isTaken ? "text-gray-400 bg-gray-100" : ""}
              >
                {course.name} ({formatPriceEur(course.price)})
                {isTaken ? " - (Already selected)" : ""}
              </option>
            );
          })}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Booking Date *
          </label>
          <input
            type="date"
            required
            min={tomorrowStr}
            value={item.bookingDate}
            onChange={(e) => onChange(index, "bookingDate", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Participants *
          </label>
          <input
            type="number"
            min={1}
            required
            value={item.numberOfParticipants}
            onChange={(e) =>
              onChange(
                index,
                "numberOfParticipants",
                Math.max(1, Number(e.target.value) || 1)
              )
            }
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] bg-white"
          />
        </div>
      </div>

      {selectedCourse && (
        <div className="pt-1 text-[11px] text-gray-500 flex justify-between">
          <span>Subtotal:</span>
          <span className="font-bold text-[#013E51]">
            {formatPriceEur(selectedCourse.price * item.numberOfParticipants)}
          </span>
        </div>
      )}
    </div>
  );
}
