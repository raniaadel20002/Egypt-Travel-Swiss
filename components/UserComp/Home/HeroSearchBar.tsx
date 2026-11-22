"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  HeroSearchTab,
  useHeroSearch,
} from "@/features/home/useHeroSearch";
import {
  HeroAccommodationFields,
  HeroActivitiesFields,
} from "./HeroActivitiesAndHotelPanels";
import {
  HeroFlightsFields,
  HeroTransferFields,
} from "./HeroFlightsAndTransferPanels";

const TAB_IDS: HeroSearchTab[] = [
  "activities",
  "accommodation",
  "flights",
  "transfer",
];

export default function HeroSearchBar() {
  const shouldReduce = useReducedMotion();
  const {
    activeTab,
    setActiveTab,
    t,
    destinations,
    tripTypes,
    fromLocations,
    toLocations,
    activityDestId,
    setActivityDestId,
    activityTypeId,
    setActivityTypeId,
    activityCat,
    setActivityCat,
    activityKeyword,
    setActivityKeyword,
    hotelQuery,
    setHotelQuery,
    hotelRate,
    setHotelRate,
    hotelCheckIn,
    setHotelCheckIn,
    hotelGuests,
    setHotelGuests,
    flightFrom,
    setFlightFrom,
    flightTo,
    setFlightTo,
    flightDepDate,
    setFlightDepDate,
    flightPax,
    setFlightPax,
    transferFromId,
    setTransferFromId,
    transferToId,
    setTransferToId,
    transferDate,
    setTransferDate,
    transferAdults,
    setTransferAdults,
    handleSearch,
  } = useHeroSearch();

  const getSubmitText = () => {
    if (activeTab === "activities") return t.activities.submit;
    if (activeTab === "accommodation") return t.accommodation.submit;
    if (activeTab === "flights") return t.flights.submit;
    return t.transfer.submit;
  };

  return (
    <div className="w-full max-w-[1320px] mx-auto">
      {/* Category Tabs */}
      <div className="flex w-fit max-w-full items-center gap-1.5 sm:gap-2 overflow-x-auto bg-white rounded-[20px] sm:rounded-t-[24px] sm:rounded-b-none px-3 sm:px-4 pt-2 pb-0">
        {TAB_IDS.map((id) => {
          const isActive = activeTab === id;
          return (
            <motion.button
              key={id}
              type="button"
              whileTap={shouldReduce ? undefined : { scale: 0.96 }}
              onClick={() => setActiveTab(id)}
              className={`shrink-0 px-3.5 sm:px-5 h-[38px] sm:h-[42px] rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#013E51] text-white shadow-xs"
                  : "text-[#013E51] hover:text-[#E8B34A]"
              }`}
            >
              {t.tabs[id]}
            </motion.button>
          );
        })}
      </div>

      {/* Main Search Filter Form Card */}
      <div className="bg-white rounded-[24px] sm:rounded-b-[24px] sm:rounded-tr-[24px] sm:rounded-tl-none p-4 sm:p-[18px] shadow-[0px_16px_40px_0px_rgba(0,0,0,0.14)]">
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end"
        >
          {activeTab === "activities" && (
            <HeroActivitiesFields
              destId={activityDestId}
              onDestChange={setActivityDestId}
              typeId={activityTypeId}
              onTypeChange={setActivityTypeId}
              cat={activityCat}
              onCatChange={setActivityCat}
              keyword={activityKeyword}
              onKeywordChange={setActivityKeyword}
              destinations={destinations}
              tripTypes={tripTypes}
              t={t.activities}
            />
          )}

          {activeTab === "accommodation" && (
            <HeroAccommodationFields
              query={hotelQuery}
              onQueryChange={setHotelQuery}
              rate={hotelRate}
              onRateChange={setHotelRate}
              checkIn={hotelCheckIn}
              onCheckInChange={setHotelCheckIn}
              guests={hotelGuests}
              onGuestsChange={setHotelGuests}
              t={t.accommodation}
            />
          )}

          {activeTab === "flights" && (
            <HeroFlightsFields
              from={flightFrom}
              onFromChange={setFlightFrom}
              to={flightTo}
              onToChange={setFlightTo}
              depDate={flightDepDate}
              onDepDateChange={setFlightDepDate}
              pax={flightPax}
              onPaxChange={setFlightPax}
              t={t.flights}
            />
          )}

          {activeTab === "transfer" && (
            <HeroTransferFields
              fromId={transferFromId}
              onFromChange={setTransferFromId}
              toId={transferToId}
              onToChange={setTransferToId}
              date={transferDate}
              onDateChange={setTransferDate}
              adults={transferAdults}
              onAdultsChange={setTransferAdults}
              fromLocations={fromLocations}
              toLocations={toLocations}
              t={t.transfer}
            />
          )}

          {/* Submit Action Button */}
          <motion.button
            type="submit"
            whileHover={shouldReduce ? undefined : { scale: 1.02 }}
            whileTap={shouldReduce ? undefined : { scale: 0.98 }}
            className="w-full h-[52px] rounded-xl bg-[#E8B34A] hover:bg-[#d8a339] text-[#013E51] font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center justify-center cursor-pointer shadow-sm"
          >
            {getSubmitText()}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
