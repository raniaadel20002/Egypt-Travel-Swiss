"use client";

import AboutHero from "./AboutHero";
import AboutWhoWeAre from "./AboutWhoWeAre";
import AboutMission from "./AboutMission";
import AboutWhatWeOffer from "./AboutWhatWeOffer";
import AboutVision from "./AboutVision";
import FadeUp from "@/components/UserComp/Common/FadeUp";

export default function AboutPage() {
  return (
    <div className="w-full bg-[#F7EDE1] min-h-screen">
      {/* 1. Hero Section (Dark Teal) — no animation, visible on load */}
      <AboutHero />

      {/* 2. Main Body Container (Cream #F7EDE1) */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14 space-y-6 sm:space-y-8">
        {/* Who We Are Card */}
        <FadeUp delay={0}>
          <AboutWhoWeAre />
        </FadeUp>

        {/* Our Mission + Beach Scene */}
        <FadeUp delay={0.08}>
          <AboutMission />
        </FadeUp>

        {/* What We Offer (6 Core Pillars) */}
        <FadeUp delay={0.06}>
          <AboutWhatWeOffer />
        </FadeUp>

        {/* Our Vision + Airplane Window View */}
        <FadeUp delay={0.08}>
          <AboutVision />
        </FadeUp>
      </div>
    </div>
  );
}
