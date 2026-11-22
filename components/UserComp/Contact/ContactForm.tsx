"use client";

import { useState } from "react";
import { FiArrowRight, FiChevronDown, FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";
import { useLocale } from "@/shared/providers/LocaleProvider";

const CONTACT_WHATSAPP_NUMBER = "201004829104";

export default function ContactForm() {
  const { dictionary: dict } = useLocale();
  const f = dict.contact.form;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subjectIndex: 0,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error(f.errorRequired);
      return;
    }

    setIsSubmitting(true);

    const selectedSubject = f.subjects[formData.subjectIndex] || "General Inquiry";

    const textLines = [
      "*New Contact Inquiry - Egypt Travel Swiss*",
      "",
      `*Name:* ${formData.fullName.trim()}`,
      `*Email:* ${formData.email.trim()}`,
      `*Phone:* ${formData.phone.trim() || "Not provided"}`,
      `*Subject:* ${selectedSubject}`,
      "",
      "*Message:*",
      formData.message.trim(),
    ];

    const encodedText = encodeURIComponent(textLines.join("\n"));
    const whatsappUrl = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodedText}`;

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }

    setIsSubmitting(false);
    setIsSent(true);
    toast.success(f.successMessage);

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subjectIndex: 0,
      message: "",
    });

    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <div className="bg-white rounded-[24px] p-7 sm:p-9 lg:p-10 border-[1px] border-[#E8B34A] flex flex-col justify-between">
      <div>
        <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#013E51] tracking-tight leading-tight mb-6">
          {f.heading}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5"
            >
              {f.fullName}
            </label>
            <input
              id="fullName"
              type="text"
              required
              placeholder="Nadia Mansour"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full px-4 py-3 sm:py-3.5 rounded-[14px] bg-[#F7F7F7] border border-gray-200/90 text-sm font-[family-name:var(--font-lato)] text-[#013E51] placeholder:text-[#013E51]/40 focus:border-[#013E51] focus:bg-white focus:ring-1 focus:ring-[#013E51] outline-hidden transition-all"
            />
          </div>

          {/* Email & Phone Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5"
              >
                {f.email}
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="nadia@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 sm:py-3.5 rounded-[14px] bg-[#F7F7F7] border border-gray-200/90 text-sm font-[family-name:var(--font-lato)] text-[#013E51] placeholder:text-[#013E51]/40 focus:border-[#013E51] focus:bg-white focus:ring-1 focus:ring-[#013E51] outline-hidden transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5"
              >
                {f.phoneWhatsApp}
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+20 100 000 0000"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 sm:py-3.5 rounded-[14px] bg-[#F7F7F7] border border-gray-200/90 text-sm font-[family-name:var(--font-lato)] text-[#013E51] placeholder:text-[#013E51]/40 focus:border-[#013E51] focus:bg-white focus:ring-1 focus:ring-[#013E51] outline-hidden transition-all"
              />
            </div>
          </div>

          {/* Subject Dropdown */}
          <div>
            <label
              htmlFor="subject"
              className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5"
            >
              {f.subject}
            </label>
            <div className="relative">
              <select
                id="subject"
                value={formData.subjectIndex}
                onChange={(e) =>
                  setFormData({ ...formData, subjectIndex: Number(e.target.value) })
                }
                className="w-full px-4 py-3 sm:py-3.5 pr-10 rounded-[14px] bg-[#F7F7F7] border border-gray-200/90 text-sm font-[family-name:var(--font-lato)] text-[#013E51] focus:border-[#013E51] focus:bg-white focus:ring-1 focus:ring-[#013E51] outline-hidden appearance-none cursor-pointer transition-all"
              >
                {f.subjects.map((opt, i) => (
                  <option key={i} value={i}>
                    {opt}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#013E51]/70 pointer-events-none" />
            </div>
          </div>

          {/* Message Area */}
          <div>
            <label
              htmlFor="message"
              className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold text-[#013E51] mb-1.5"
            >
              {f.message}
            </label>
            <textarea
              id="message"
              rows={4}
              required
              placeholder={f.messagePlaceholder}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3 sm:py-3.5 rounded-[14px] bg-[#F7F7F7] border border-gray-200/90 text-sm font-[family-name:var(--font-lato)] text-[#013E51] placeholder:text-[#013E51]/40 focus:border-[#013E51] focus:bg-white focus:ring-1 focus:ring-[#013E51] outline-hidden transition-all resize-y min-h-[110px]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-3 py-3.5 sm:py-4 px-8 rounded-full bg-[#013E51] text-white font-[family-name:var(--font-lato)] font-bold text-sm sm:text-base hover:bg-[#024f68] transition-all duration-300 flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md disabled:opacity-70 cursor-pointer"
          >
            {isSent ? (
              <>
                <FiCheck className="w-4 h-4 text-[#25D366]" />
                <span>{f.sent}</span>
              </>
            ) : (
              <>
                <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
                <span>{isSubmitting ? f.sending : f.send}</span>
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
