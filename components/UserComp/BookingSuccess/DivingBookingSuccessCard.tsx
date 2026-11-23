"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TbScubaDiving } from "react-icons/tb";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaUser, FaPhone, FaEnvelope, FaHotel, FaMoneyBillWave } from "react-icons/fa";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface DivingCourseItem {
  courseName: string;
  bookingDate: string;
  numberOfParticipants: number;
  unitPrice: number;
  totalPrice: number;
}

interface DivingBookingSuccessCardProps {
  id?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  roomNo?: string;
  hotelName?: string;
  items?: DivingCourseItem[];
  totalPrice?: number | string;
  depositAmount?: number | string;
  remainingAmount?: number | string;
  currency?: string;
  status?: string;
  paymentStatus?: string;
  captureId?: string;
}

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function DivingBookingSuccessCard({
  id = "",
  fullName = "",
  email = "",
  phone = "",
  roomNo = "",
  hotelName = "",
  items = [],
  totalPrice = 0,
  depositAmount = 0,
  remainingAmount = 0,
  currency = "EUR",
  status = "Pending",
  paymentStatus = "Pending",
  captureId,
}: DivingBookingSuccessCardProps) {
  const { dictionary: dict } = useLocale();
  const shouldReduce = useReducedMotion();
  const t = dict.bookingSuccess.diving;

  const firstCourse = items[0];
  const totalParticipants = items.reduce((sum, item) => sum + item.numberOfParticipants, 0);

  const numTotalPrice = Number(totalPrice) || 0;
  const numDeposit =
    Number(depositAmount) > 0 && Number(depositAmount) < numTotalPrice
      ? Number(depositAmount)
      : numTotalPrice * 0.5;
  const numRemaining =
    Number(remainingAmount) > 0 && Number(remainingAmount) <= numTotalPrice
      ? Number(remainingAmount)
      : Math.max(0, numTotalPrice - numDeposit);

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: 0.15, ease: BRAND_EASE }}
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#013E51]/10 space-y-6"
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="w-12 h-12 rounded-2xl bg-[#013E51] text-[#E8B34A] flex items-center justify-center shrink-0 shadow-xs">
          <TbScubaDiving className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider block">
            {t.eyebrow}
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
            {t.confirmationTitle}
          </h2>
        </div>
      </div>

      {/* Courses List */}
      {items.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-[#013E51] uppercase tracking-wider">
            {t.coursesBooked}
          </h3>
          {items.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl bg-[#F7EDE1]/40 border border-[#E8B34A]/30 space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-[family-name:var(--font-cormorant)] text-lg font-bold text-[#013E51]">
                    {item.courseName}
                  </h4>
                  <div className="flex items-center gap-4 mt-2 text-xs text-[#013E51]/70">
                    <div className="flex items-center gap-1.5">
                      <FaCalendarAlt className="w-3.5 h-3.5 text-[#E8B34A]" />
                      <span>{new Date(item.bookingDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaUsers className="w-3.5 h-3.5 text-[#E8B34A]" />
                      <span>
                        {item.numberOfParticipants} {item.numberOfParticipants === 1 ? t.participant : t.participants}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-[#888888]">{t.coursePrice}</p>
                  <p className="font-bold text-lg text-[#013E51]">
                    {item.totalPrice.toFixed(2)} {currency}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Customer Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fullName && (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-2">
              <FaUser className="w-3.5 h-3.5 text-[#E8B34A]" />
              <span className="text-[10px] font-bold text-gray-500 uppercase">
                {t.customerName}
              </span>
            </div>
            <span className="font-bold text-sm text-[#013E51] block truncate">
              {fullName}
            </span>
          </div>
        )}

        {phone && (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-2">
              <FaPhone className="w-3.5 h-3.5 text-[#E8B34A]" />
              <span className="text-[10px] font-bold text-gray-500 uppercase">
                {t.phone}
              </span>
            </div>
            <span className="font-bold text-sm text-[#013E51] block truncate">
              {phone}
            </span>
          </div>
        )}

        {email && (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-2">
              <FaEnvelope className="w-3.5 h-3.5 text-[#E8B34A]" />
              <span className="text-[10px] font-bold text-gray-500 uppercase">
                {t.email}
              </span>
            </div>
            <span className="font-bold text-sm text-[#013E51] block truncate">
              {email}
            </span>
          </div>
        )}

        {hotelName && (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-2">
              <FaHotel className="w-3.5 h-3.5 text-[#E8B34A]" />
              <span className="text-[10px] font-bold text-gray-500 uppercase">
                {t.hotel}
              </span>
            </div>
            <span className="font-bold text-sm text-[#013E51] block">
              {hotelName}
              {roomNo && <span className="text-xs text-[#888888]"> - {t.room} {roomNo}</span>}
            </span>
          </div>
        )}
      </div>

      {/* Pricing Summary */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#013E51] to-[#025a75] text-white space-y-2.5">
        <div className="flex items-center gap-2 mb-3">
          <FaMoneyBillWave className="w-4 h-4 text-[#E8B34A]" />
          <span className="text-sm font-bold uppercase tracking-wider">{t.paymentSummary}</span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-white/80">{t.totalPrice || "Total Course Value"}:</span>
            <span className="font-bold">{numTotalPrice.toFixed(2)} {currency}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-white/80">50% Deposit Paid:</span>
            <span className="font-bold text-[#E8B34A]">{numDeposit.toFixed(2)} {currency}</span>
          </div>
          
          <div className="flex justify-between pt-2 border-t border-white/20">
            <span className="text-white/90 font-semibold">50% Due on Arrival:</span>
            <span className="font-bold text-lg">{numRemaining.toFixed(2)} {currency}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/20">
          <div>
            <span className="text-xs text-white/70 block">{t.bookingStatus}</span>
            <span className="text-sm font-bold">{status}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-white/70 block">{t.paymentStatus}</span>
            <span className="text-sm font-bold">{paymentStatus}</span>
          </div>
        </div>

        {captureId && (
          <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs text-white/80">
            <span>Transaction ID</span>
            <span className="font-mono font-semibold text-[#E8B34A]">
              {captureId}
            </span>
          </div>
        )}
      </div>

      {/* Note */}
      <div className="p-4 rounded-2xl bg-[#F7EDE1]/40 border border-[#E8B34A]/30">
        <p className="text-xs text-gray-600 leading-relaxed">
          {t.note}
        </p>
      </div>
    </motion.div>
  );
}
