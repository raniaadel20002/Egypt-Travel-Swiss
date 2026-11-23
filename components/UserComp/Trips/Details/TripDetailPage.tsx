"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiChevronRight, FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import { parseNumericIdFromSlug } from "@/shared/utils/slugify";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";
import { BackendLanguageCode } from "@/models/tripType";
import { TripApiItem } from "@/models/trip";
import { ServiceApiItem } from "@/models/service";
import { useTripByIdQuery } from "@/features/trips/useTrips";
import { useTripServicesQuery } from "@/features/services/useServiceImages";
import {
  useTripReviewsList,
  useTripReviewAverage,
} from "@/features/reviews/useTripReviews";
import { useLocale } from "@/shared/providers/LocaleProvider";
import {
  isDateAvailableForTrip,
  getNextAvailableDate,
  toLocalIsoDate,
} from "@/shared/utils/tripAvailability";

import TripGalleryCard from "./TripGalleryCard";
import TripOverviewCard from "./TripOverviewCard";
import TripHighlightsCard from "./TripHighlightsCard";
import TripPricingCard from "./TripPricingCard";
import TripInclusionsSection from "./TripInclusionsSection";
import TripServicesSelector from "./TripServicesSelector";
import TripBookingSidebar from "./TripBookingSidebar";
import TripReviewsSection from "./TripReviewsSection";

interface TripDetailPageProps {
  slug: string;
  locale: string;
}

function TripDetailSkeleton() {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-64" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="h-[460px] bg-slate-200 rounded-3xl" />
          <div className="h-56 bg-slate-200 rounded-3xl" />
          <div className="h-44 bg-slate-200 rounded-3xl" />
          <div className="h-32 bg-slate-200 rounded-3xl" />
        </div>
        <div className="lg:col-span-4">
          <div className="h-[520px] bg-slate-200 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

export const TripDetailPage: React.FC<TripDetailPageProps> = ({
  slug,
  locale,
}) => {
  const { dictionary } = useLocale();
  const dict = dictionary.tripDetails;
  const shouldReduce = useReducedMotion();
  const tripId = parseNumericIdFromSlug(slug);
  const backendLanguage = localeToBackendLanguage(locale);

  // Tomorrow's date formatted as default
  const defaultDateStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return toLocalIsoDate(d);
  }, []);

  const [leaveDate, setLeaveDate] = useState<string>(defaultDateStr);
  const [noAdult, setNoAdult] = useState<number>(1);
  const [noChild, setNoChild] = useState<number>(0);
  const [noInf, setNoInf] = useState<number>(0);
  const [selectedServices, setSelectedServices] = useState<ServiceApiItem[]>([]);

  const {
    data: trip,
    isLoading: isTripLoading,
    isError: isTripError,
  } = useTripByIdQuery(tripId, backendLanguage, Boolean(tripId));

  const { data: tripServices } = useTripServicesQuery(
    tripId,
    Boolean(tripId),
    backendLanguage
  );

  const { data: reviewsResponse, isLoading: isReviewsLoading } =
    useTripReviewsList(tripId ? { TripId: tripId } : undefined);

  const { data: averageData } = useTripReviewAverage(
    tripId,
    Boolean(tripId)
  );

  React.useEffect(() => {
    if (trip?.availableDays && trip.availableDays.length > 0) {
      setLeaveDate((curr) =>
        isDateAvailableForTrip(curr, trip.availableDays)
          ? curr
          : getNextAvailableDate(new Date(), trip.availableDays)
      );
    }
  }, [trip?.availableDays]);

  const reviews = reviewsResponse?.data || [];
  const averageRating = averageData?.data?.averageRate ?? 0;
  const totalReviews = averageData?.data?.totalReviews ?? reviews.length;

  const handleToggleService = (service: ServiceApiItem) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      }
      return [...prev, service];
    });
  };

  const handleRemoveService = (serviceId: number) => {
    setSelectedServices((prev) => prev.filter((s) => s.id !== serviceId));
  };

  if (isTripLoading) {
    return (
      <main className="min-h-screen bg-[#FBF8F3]">
        <TripDetailSkeleton />
      </main>
    );
  }

  if (isTripError || !trip) {
    return (
      <main className="min-h-screen bg-[#FBF8F3] flex flex-col items-center justify-center px-4 py-20 text-center font-[family-name:var(--font-lato)]">
        <FiAlertCircle className="text-5xl text-[#E8B34A] mb-4" />
        <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-[#013E51] mb-2">
          {dict.tripNotFound}
        </h2>
        <p className="text-sm text-slate-500 mb-6 max-w-sm">
          {dict.tripNotFoundDesc}
        </p>
        <Link
          href={`/${locale}/trips`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#013E51] text-white font-semibold text-sm hover:bg-[#E8B34A] hover:text-[#013E51] transition-colors"
        >
          <FiArrowLeft className="text-base" />
          <span>{dict.backToTrips}</span>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF8F3] pb-20 font-[family-name:var(--font-lato)]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-2 text-xs text-slate-500 mb-6"
        >
          <Link
            href={`/${locale}`}
            className="hover:text-[#E8B34A] transition-colors"
          >
            {dictionary.common.home}
          </Link>
          <FiChevronRight className="text-slate-400 text-xs shrink-0" />
          <Link
            href={`/${locale}/trips`}
            className="hover:text-[#E8B34A] transition-colors"
          >
            {dict.breadcrumbExperiences}
          </Link>
          {trip.tripTypeName && (
            <>
              <FiChevronRight className="text-slate-400 text-xs shrink-0" />
              <span className="text-slate-600 font-medium truncate max-w-[160px]">
                {trip.tripTypeName}
              </span>
            </>
          )}
          <FiChevronRight className="text-slate-400 text-xs shrink-0" />
          <span className="text-[#013E51] font-semibold truncate max-w-[240px]">
            {trip.name}
          </span>
        </nav>

        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Main Content */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-8 space-y-8"
          >
            {/* 1. Gallery with Lightbox & Badges */}
            <TripGalleryCard
              images={trip.images || []}
              tripName={trip.name}
              categoryLabel={trip.categoryName || trip.tripTypeName}
            />

            {/* 2. Overview Card */}
            <TripOverviewCard trip={trip} dict={dict} />

            {/* 3. Highlights Card */}
            <TripHighlightsCard
              highlights={trip.highlights || []}
              dict={dict}
            />

            {/* 4. Pricing Box */}
            <TripPricingCard
              adultPrice={trip.adultPrice}
              childPrice={trip.childPrice}
              infPrice={trip.infPrice}
              currencyName={trip.currencyName}
              categoryName={trip.categoryName}
              tripName={trip.name}
              dict={dict}
            />

            {/* 5. Inclusions / Exclusions & What to bring */}
            <TripInclusionsSection
              whatToBring={trip.whatToBring}
              includes={trip.includes}
              excludes={trip.excludes}
              dict={dict}
            />

            {/* 6. Optional Add-on Services */}
            <TripServicesSelector
              services={tripServices || []}
              selectedServiceIds={selectedServices.map((s) => s.id)}
              onToggleService={handleToggleService}
              dict={dict}
            />
          </motion.div>

          {/* Right Sticky Sidebar */}
          <motion.aside
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <TripBookingSidebar
              trip={trip}
              leaveDate={leaveDate}
              onDateChange={setLeaveDate}
              noAdult={noAdult}
              onAdultChange={setNoAdult}
              noChild={noChild}
              onChildChange={setNoChild}
              noInf={noInf}
              onInfChange={setNoInf}
              selectedServices={selectedServices}
              onRemoveService={handleRemoveService}
              locale={locale}
              dict={dict}
            />
          </motion.aside>
        </div>

        {/* Customer Reviews Section */}
        <TripReviewsSection
          tripId={trip.id}
          tripTitle={trip.name}
          averageRating={averageRating}
          totalReviews={totalReviews}
          reviews={reviews}
          isLoading={isReviewsLoading}
          dict={dict}
        />
      </div>
    </main>
  );
};

export default TripDetailPage;
