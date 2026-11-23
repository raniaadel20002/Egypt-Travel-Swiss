"use client";

import React from "react";

const AIRPLANE_PATH =
  "M165.833 183.031L146.333 94.1979L184.25 56.2812C200.5 40.0312 205.917 18.3646 200.5 7.53125C189.667 2.11458 168 7.53125 151.75 23.7812L113.833 61.6979L25 42.1979C19.5833 41.1146 15.25 43.2812 13.0833 47.6146L9.83333 53.0312C7.66667 58.4479 8.75 63.8646 13.0833 67.1146L70.5 105.031L48.8333 137.531H16.3333L5.5 148.365L38 170.031L59.6667 202.531L70.5 191.698V159.198L103 137.531L140.917 194.948C144.167 199.281 149.583 200.365 155 198.198L160.417 196.031C164.75 192.781 166.917 188.448 165.833 183.031Z";

interface FlightsBannerWatermarkProps {
  className?: string;
}

export function FlightsBannerWatermark({
  className = " -right-16 sm:-right-6 lg:right-2",
}: FlightsBannerWatermarkProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute top-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] rounded-full border border-white/15 flex items-center justify-center ${className}`}
    >
      <div className="w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] rounded-full border border-white/20 flex items-center justify-center">
        <svg
          viewBox="0 0 209 209"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[125px] h-[125px] sm:w-[155px] sm:h-[155px]"
        >
          <path
            d={AIRPLANE_PATH}
            stroke="white"
            strokeOpacity="0.22"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export function FlightsPillPlaneIcon({
  className = "w-3.5 h-3.5 shrink-0",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 209 209"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d={AIRPLANE_PATH}
        stroke="#E8B34A"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
