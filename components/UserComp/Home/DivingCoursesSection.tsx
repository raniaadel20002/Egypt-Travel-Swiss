"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface DivingCourseItem {
  id: string;
  title: string;
  level: string;
  duration: string;
  price: string;
  image: string;
  href: string;
}

const DIVING_COURSES: DivingCourseItem[] = [
  {
    id: "discover-scuba",
    title: "Discover Scuba Diving",
    level: "Beginner",
    duration: "1 day",
    price: "From $55",
    image: "/home/DivingCourses/f9ac485c9b51592a41c4e5df356b680e572f38b4.jpg",
    href: "/trips?category=diving&course=discover-scuba",
  },
  {
    id: "padi-open-water",
    title: "PADI Open Water Diver",
    level: "Beginner",
    duration: "3–4 days",
    price: "From $390",
    image: "/home/DivingCourses/e715a186a1ca02953412c259f4475f7f89d5b7f6.jpg",
    href: "/trips?category=diving&course=padi-open-water",
  },
  {
    id: "advanced-open-water",
    title: "Advanced Open Water",
    level: "Intermediate",
    duration: "2 days",
    price: "From $330",
    image: "/home/DivingCourses/dfc6b17a4bf77886765b45cb670f0e28ea86f6be.jpg",
    href: "/trips?category=diving&course=advanced-open-water",
  },
];

export default function DivingCoursesSection() {
  const { locale } = useLocale();

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[#F7EDE1]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Large Rounded Hero Banner */}
        <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl min-h-[520px] lg:min-h-[580px] flex items-center">
          {/* Panoramic Scuba Diving Background Image */}
          <Image
            src="/home/DivingCourses/Gemini_Generated_Image_fdmthjfdmthjfdmt 1.png"
            alt="Diving in the Red Sea"
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover object-center"
          />

          {/* Deep Ocean Gradient Overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#012735]/90 via-[#013547]/85 to-[#013547]/95 lg:bg-gradient-to-r lg:from-[#012735]/95 lg:via-[#013547]/85 lg:to-[#013547]/30"
          />

          {/* Content Grid */}
          <div className="relative z-10 w-full p-6 sm:p-10 lg:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-16">
            {/* Left Content Column */}
            <div className="w-full lg:max-w-xl">
              {/* Category Badge with Icon */}
              <div className="inline-flex items-center gap-3 mb-4 sm:mb-5">
                <Image
                  src="/home/DivingCourses/Group.svg"
                  alt=""
                  width={34}
                  height={34}
                  className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                />
                <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.2em] text-[#E8B34A] uppercase">
                  Diving Courses
                </span>
              </div>

              {/* Banner Heading */}
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[54px] font-bold text-white tracking-wide leading-[1.1] mb-4 sm:mb-5">
                Learn to Dive in the Red Sea
              </h2>

              {/* Subtitle Description */}
              <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base lg:text-lg text-white/85 font-normal leading-relaxed max-w-md mb-8 sm:mb-10">
                Take your skills to the next level with certified instructors,
                top locations and international standards.
              </p>

              {/* CTA Explore Button */}
              <Link
                href={`/${locale}/trips?category=diving`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-[#E8B34A] hover:bg-[#d99f33] text-[#013E51] font-[family-name:var(--font-lato)] font-semibold text-sm sm:text-base shadow-lg transition-all duration-300 hover:scale-[1.02] text-center"
              >
                <span>Explore Diving Courses</span>
                <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>

            {/* Right Column: 3 Course Cards */}
            <div className="w-full lg:max-w-md flex flex-col gap-4 sm:gap-4.5">
              {DIVING_COURSES.map((course) => (
                <Link
                  key={course.id}
                  href={`/${locale}${course.href}`}
                  className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-[20px] sm:rounded-[26px] bg-[#013E51]/80 hover:bg-[#013E51]/95 backdrop-blur-md border border-white/10 hover:border-white/20 shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-3">
                    {/* Thumbnail Image */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-[16px] sm:rounded-[20px] overflow-hidden shrink-0 shadow-md">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Course Text Details */}
                    <div className="min-w-0">
                      <h3 className="font-[family-name:var(--font-cormorant)] text-lg sm:text-2xl font-bold text-white tracking-wide leading-tight truncate">
                        {course.title}
                      </h3>
                      <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-white/80 font-normal mt-0.5 mb-1 truncate">
                        {course.level} • {course.duration}
                      </p>
                      <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base font-bold text-[#E8B34A]">
                        {course.price}
                      </p>
                    </div>
                  </div>

                  {/* Right: Golden Arrow Button */}
                  <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E8B34A] flex items-center justify-center text-[#FFFFFF] shadow-md transition-transform duration-300 group-hover:translate-x-1">
                    <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
