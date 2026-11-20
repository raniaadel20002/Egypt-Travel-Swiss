import { FiCalendar, FiCompass, FiMail, FiMapPin, FiStar, FiTag, FiTrash2 } from "react-icons/fi";
import { TripReviewItem } from "@/models/review";

interface TripReviewCardProps {
  item: TripReviewItem;
  isDeleting: boolean;
  onDelete: (item: TripReviewItem) => void;
}

export default function TripReviewCard({
  item,
  isDeleting,
  onDelete,
}: TripReviewCardProps) {
  const formattedDate = item.createdAt
    ? new Date(item.createdAt).toLocaleDateString()
    : "";

  return (
    <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-[#FAF7F2]/60 transition-colors">
      <div className="flex-1 min-w-0">
        {/* Header row: ID, Name, Stars */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[10px] font-bold text-[#888888] bg-[#013E51]/5 px-2 py-0.5 rounded-md">
            #{item.id}
          </span>
          <h3 className="font-[family-name:var(--font-cormorant)] text-lg sm:text-xl font-bold text-[#013E51]">
            {item.firstName} {item.lastName}
          </h3>
          <div className="flex items-center gap-0.5 ml-1">
            {Array.from({ length: 5 }).map((_, s) => (
              <FiStar
                key={s}
                className={`w-3.5 h-3.5 ${
                  s < item.rate
                    ? "fill-[#E8B34A] text-[#E8B34A]"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Comment */}
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/80 leading-relaxed mb-3">
          {item.comment}
        </p>

        {/* Trip Association Info Card */}
        <div className="bg-[#FAF7F2] rounded-xl p-3 border border-[#013E51]/10 mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
          {item.tripName && (
            <span className="flex items-center gap-1.5 font-bold text-[#013E51]">
              <FiCompass className="w-3.5 h-3.5 text-[#E8B34A]" />
              <span>{item.tripName}</span>
            </span>
          )}
          {item.destination && (
            <span className="flex items-center gap-1 text-[#013E51]/70">
              <FiMapPin className="w-3 h-3 text-[#013E51]/50" />
              <span>{item.destination}</span>
            </span>
          )}
          {item.tripTypeName && (
            <span className="flex items-center gap-1 text-[#013E51]/70">
              <FiTag className="w-3 h-3 text-[#013E51]/50" />
              <span>{item.tripTypeName}</span>
            </span>
          )}
          {(item.adultPrice > 0 || item.currencyName) && (
            <span className="text-[11px] font-semibold text-[#888888]">
              Adult: {item.adultPrice} {item.currencyName || ""} | Child: {item.childPrice} {item.currencyName || ""}
            </span>
          )}
          {item.markerID && (
            <span className="text-[10px] text-[#888888] font-mono">
              Marker: {item.markerID}
            </span>
          )}
        </div>

        {/* Reviewer Meta (Email & Date only, NO phone number) */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#888888] font-[family-name:var(--font-lato)]">
          {item.email && (
            <span className="flex items-center gap-1">
              <FiMail className="w-3 h-3 text-[#013E51]/50" />
              <span>{item.email}</span>
            </span>
          )}
          {formattedDate && (
            <span className="flex items-center gap-1">
              <FiCalendar className="w-3 h-3 text-[#013E51]/50" />
              <span>{formattedDate}</span>
            </span>
          )}
        </div>
      </div>

      {/* Delete Action */}
      <button
        type="button"
        onClick={() => onDelete(item)}
        aria-label={`Delete review from ${item.firstName}`}
        disabled={isDeleting}
        className="p-2 rounded-xl text-[#888888] hover:bg-red-50 hover:text-red-600 transition cursor-pointer shrink-0 disabled:opacity-50"
      >
        <FiTrash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
