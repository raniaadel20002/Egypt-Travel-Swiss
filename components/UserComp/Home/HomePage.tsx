"use client";

import HeroSection from "./HeroSection";
import CategoriesSection from "./CategoriesSection";
import BestTripsSection from "./BestTripsSection";
import TopDestinationsSection from "./TopDestinationsSection";
import DivingCoursesSection from "./DivingCoursesSection";
import AccommodationSection from "./AccommodationSection";
import FlightBookingInquirySection from "./FlightBookingInquirySection";
import TransfersSection from "./TransfersSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import BlogSection from "./BlogSection";
import FaqSection from "./FaqSection";
import ReviewsSection from "./ReviewsSection";

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <CategoriesSection />
      <BestTripsSection />
      <TopDestinationsSection />
      <DivingCoursesSection />
      <AccommodationSection />
      <FlightBookingInquirySection />
      <TransfersSection />
      <WhyChooseUsSection />
      <BlogSection />
      <FaqSection />
      <ReviewsSection />
    </div>
  );
}
