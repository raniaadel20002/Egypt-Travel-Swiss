"use client";

import { ROADMAP_STEPS } from "./divingCoursesData";

export default function CertificationProgression() {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16">
          <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.25em] text-[#888888] uppercase block mb-3">
            Your Underwater Roadmap
          </span>

          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <span
              aria-hidden="true"
              className="h-px w-12 sm:w-24 bg-[#E8B34A]"
            />
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-normal text-[#013E51]">
              Certification Progression
            </h2>
            <span
              aria-hidden="true"
              className="h-px w-12 sm:w-24 bg-[#E8B34A]"
            />
          </div>
        </div>

        {/* 4-Step Progression Grid */}
        <div className="relative">
          {/* Desktop Connecting Line behind circles */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-[1.5px] bg-[#013E51]/20 -z-0"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-6 relative z-10">
            {ROADMAP_STEPS.map((step) => {
              const isGold = step.badgeColor === "gold";

              return (
                <div
                  key={step.step}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Number Circle */}
                  <div
                    className={`w-14 h-14 rounded-[10px] flex items-center justify-center font-bold text-lg shadow-md transition-transform duration-300 group-hover:scale-110 ${
                      isGold
                        ? "bg-[#E8B34A] text-white"
                        : "bg-[#013E51] text-white"
                    }`}
                  >
                    {step.step}
                  </div>

                  {/* Depth & Details */}
                  <span className="font-[family-name:var(--font-lato)] text-[11px] font-bold tracking-wider text-[#013E51] uppercase mt-5 sm:mt-6 mb-2">
                    {step.depth} • {step.details}
                  </span>

                  {/* Step Title */}
                  <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-bold text-[#013E51] mb-2">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51] leading-relaxed max-w-[260px]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
