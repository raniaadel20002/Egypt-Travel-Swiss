"use client";

import { useLocale } from "@/shared/providers/LocaleProvider";

interface TransferNotesFormProps {
  notes: string;
  onNotesChange: (val: string) => void;
}

export default function TransferNotesForm({
  notes,
  onNotesChange,
}: TransferNotesFormProps) {
  const { dictionary: dict } = useLocale();
  const t = dict.transfers.notes;

  return (
    <div className="w-full bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] border border-[#013E51]/10">
      <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-gray-100">
        <span className="w-7 h-7 rounded-full bg-[#013E51] text-[#E8B34A] flex items-center justify-center font-mono text-xs font-bold">
          5
        </span>
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
          {t.heading}
        </h2>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
          {t.label}
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder={t.placeholder}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2] text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51] resize-none"
        />
      </div>
    </div>
  );
}
