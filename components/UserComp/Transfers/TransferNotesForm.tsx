"use client";

interface TransferNotesFormProps {
  notes: string;
  onNotesChange: (val: string) => void;
}

export default function TransferNotesForm({
  notes,
  onNotesChange,
}: TransferNotesFormProps) {
  return (
    <div className="w-full bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] border border-[#013E51]/10">
      <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] pb-4 mb-5 border-b border-gray-100">
        Notes &amp; Special Requests
      </h2>

      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
          Notes
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Flight number (for delay tracking), hotel name or room number, child booster seats, special baggage..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51] resize-none"
        />
      </div>
    </div>
  );
}
