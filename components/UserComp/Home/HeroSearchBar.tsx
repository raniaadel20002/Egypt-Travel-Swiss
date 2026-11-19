
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

const TABS = [
  { id: "activities", label: "Activities & Tours" },
  { id: "accommodation", label: "Accommodation" },
  { id: "flights", label: "Flights" },
  { id: "transfer", label: "Transfer" },
];

const DESTINATIONS = [
  "Hurghada",
  "Luxor",
  "Cairo & Giza",
  "Aswan",
  "Sharm El Sheikh",
  "Alexandria",
];

const ACTIVITIES = [
  "All Activities",
  "Sea & Snorkeling",
  "Desert Safari",
  "Historical & Cultural",
  "Diving Courses",
  "Nile Cruises",
];

const GUEST_OPTIONS = [
  "1 Adult",
  "2 Adults",
  "2 Adults, 1 Child",
  "Family (4+ Guests)",
];

export default function HeroSearchBar() {
  const router = useRouter();
  const { locale } = useLocale();

  const [activeTab, setActiveTab] = useState("activities");
  const [destination, setDestination] = useState("Hurghada");
  const [activity, setActivity] = useState("All Activities");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2 Adults");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function toggleDropdown(name: string) {
    setOpenDropdown((current) => current === name ? null : name);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (destination) params.set("destination", destination);
    if (activity && activity !== "All Activities") {
      params.set("activity", activity);
    }
    if (date) params.set("date", date);

    router.push(`/${locale}/trips?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-[1320px] mx-auto">
      {/* Category Tabs */}
      <div className="flex w-fit max-w-full items-center gap-1.5 sm:gap-4 overflow-x-auto bg-white rounded-[20px] sm:rounded-t-[24px] sm:rounded-b-none px-3 sm:px-4 pt-2 pb-0">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-3.5 sm:px-5 h-[38px] sm:h-[42px] rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#013E51] text-white"
                  : "text-[#013E51] hover:text-[#E8B34A]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Search Card */}
      <div className="bg-white rounded-[24px] sm:rounded-b-[24px] sm:rounded-tr-[24px] sm:rounded-tl-none p-4 sm:p-[18px] shadow-[0px_16px_40px_0px_rgba(0,0,0,0.14)]">

        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-center"
        >
          {/* Destination */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("destination")}
              className="w-full h-[60px] px-5 rounded-[16px] border-[0.6px] border-[#888888] flex flex-col justify-center text-left hover:border-[#013E51] transition-colors"
            >
              <span className="text-xs font-normal text-[#888888]">
                Destination
              </span>
              <span className="flex items-center justify-between text-[15px] font-semibold text-[#013E51]">
                {destination}
                <FiChevronDown className="w-4 h-4 shrink-0" />
              </span>
            </button>

            {openDropdown === "destination" && (
              <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-xl border border-[#888888]/30 shadow-lg py-1 z-30 max-h-48 overflow-y-auto">
                {DESTINATIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      setDestination(d);
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-[#013E51] hover:bg-[#F7EDE1]/50 transition-colors"
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Activity */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("activity")}
              className="w-full h-[60px] px-5 rounded-[16px] border border-[0.6px] border-[#888888] flex flex-col justify-center text-left hover:border-[#013E51] transition-colors"
            >
              <span className="text-xs font-normal text-[#888888]">
                Activity
              </span>
              <span className="flex items-center justify-between text-[15px] font-semibold text-[#013E51]">
                {activity}
                <FiChevronDown className="w-4 h-4 shrink-0" />
              </span>
            </button>

            {openDropdown === "activity" && (
              <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-xl border border-[#888888]/30 shadow-lg py-1 z-30 max-h-48 overflow-y-auto">
                {ACTIVITIES.map((act) => (
                  <button
                    key={act}
                    type="button"
                    onClick={() => {
                      setActivity(act);
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-[#013E51] hover:bg-[#F7EDE1]/50 transition-colors"
                  >
                    {act}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date */}
          <div className="relative">
            <label className="relative w-full h-[60px] px-5 rounded-[16px] border border-[0.6px] border-[#888888] flex flex-col justify-center text-left cursor-pointer hover:border-[#013E51] transition-colors">
              <span className="text-xs font-normal text-[#888888]">
                Date
              </span>

              <span className="flex items-center justify-between text-[15px] font-semibold text-[#013E51]">
                {date || "Choose Date"}
                <FiChevronDown className="w-4 h-4 shrink-0" />
              </span>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Choose Date"
              />
            </label>
          </div>

          {/* Guests */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("guests")}
              className="w-full h-[60px] px-5 rounded-[16px] border border-[0.6px] border-[#888888] flex flex-col justify-center text-left hover:border-[#013E51] transition-colors"
            >
              <span className="text-xs font-normal text-[#888888]">
                Guests
              </span>
              <span className="flex items-center justify-between text-[15px] font-semibold text-[#013E51]">
                {guests}
                <FiChevronDown className="w-4 h-4 shrink-0" />
              </span>
            </button>

            {openDropdown === "guests" && (
              <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-xl border border-[#888888]/30 shadow-lg py-1 z-30 max-h-48 overflow-y-auto">
                {GUEST_OPTIONS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setGuests(g);
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-[#013E51] hover:bg-[#F7EDE1]/50 transition-colors"
                  >
                    {g}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full h-[60px] rounded-[16px] bg-[#E8B34A] hover:bg-[#d8a339] text-[#013E51] font-bold text-base transition-colors flex items-center justify-center cursor-pointer"
          >
            Search Tours
          </button>
        </form>
      </div>
    </div>
  );
}
