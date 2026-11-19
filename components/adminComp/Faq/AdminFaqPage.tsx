"use client";

import { useState } from "react";
import { FiHelpCircle, FiPlus, FiSearch, FiCheck } from "react-icons/fi";
import { toast } from "sonner";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";

export default function AdminFaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setQuestion("");
    setAnswer("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("FAQ API integration is pending.");
    handleCloseDrawer();
  };

  return (
    <AdminShell
      eyebrow="Help & Support"
      title="FAQ & Traveler Questions"
      subtitle="Create and organize common visitor inquiries regarding payments, cancellations, and travel tips."
      action={
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-5 py-2.5 rounded-xl font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>Add Question</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search existing questions or answers..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
            <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Empty State Card */}
        <div className="bg-white rounded-[24px] sm:rounded-[28px] p-10 sm:p-16 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center mb-4">
            <FiHelpCircle className="w-8 h-8 text-[#013E51]" />
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
            No FAQ Items Configured
          </h2>
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-md mt-2 mb-6">
            Help prospective tourists find immediate answers to questions about booking, visas, pickup locations, and excursions.
          </p>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center gap-2 bg-[#FAF7F2] hover:bg-[#013E51] text-[#013E51] hover:text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer border border-[#013E51]/10"
          >
            <FiPlus className="w-4 h-4" />
            <span>Create First Question</span>
          </button>
        </div>

        <AdminDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          eyebrow="Help & Support"
          title="Add Question"
          subtitle="Create a frequently asked question and traveler guidance answer."
          footer={
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="faq-drawer-form"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
              >
                <FiCheck className="w-4 h-4 text-[#E8B34A]" />
                <span>Save Question</span>
              </button>
            </div>
          }
        >
          <form id="faq-drawer-form" onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
                Question *
              </label>
              <input
                type="text"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. What is your free cancellation policy?"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
                Answer *
              </label>
              <textarea
                rows={5}
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Provide a clear and helpful answer for travelers..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
            </div>
          </form>
        </AdminDrawer>
      </div>
    </AdminShell>
  );
}
