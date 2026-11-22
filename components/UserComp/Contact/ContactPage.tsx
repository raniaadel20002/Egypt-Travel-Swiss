"use client";

import ContactHero from "./ContactHero";
import ContactInfoCards from "./ContactInfoCards";
import ContactForm from "./ContactForm";
import ContactLocationMap from "./ContactLocationMap";
import FadeUp from "@/components/UserComp/Common/FadeUp";

export default function ContactPage() {
  return (
    <div className="w-full bg-[#F7EDE1] min-h-screen">
      {/* 1. Hero Section (Dark Teal) — no animation, visible on load */}
      <ContactHero />

      {/* 2. Main Body Container (Cream #F7EDE1) */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14 space-y-6 sm:space-y-8">
        {/* 4 Contact Method Cards */}
        <FadeUp delay={0}>
          <ContactInfoCards />
        </FadeUp>

        {/* 2-Column Section: Send a Message Form + Hurghada Marina Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 items-stretch">
          <FadeUp delay={0.06}>
            <ContactForm />
          </FadeUp>
          <FadeUp delay={0.14}>
            <ContactLocationMap />
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
