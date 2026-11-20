"use client";

import Image from "next/image";
import {
  FiEdit2,
  FiImage,
  FiLayers,
  FiMessageSquare,
  FiTrash2,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { DivingCourseApiItem } from "@/models/divingCourse";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface DivingCoursesTableProps {
  courses: DivingCourseApiItem[];
  isLoading: boolean;
  onEdit: (course: DivingCourseApiItem) => void;
  onDelete: (course: DivingCourseApiItem) => void;
  onOpenImages: (course: DivingCourseApiItem) => void;
  onOpenFacilities: (course: DivingCourseApiItem) => void;
  onOpenReviews: (course: DivingCourseApiItem) => void;
}

export default function DivingCoursesTable({
  courses,
  isLoading,
  onEdit,
  onDelete,
  onOpenImages,
  onOpenFacilities,
  onOpenReviews,
}: DivingCoursesTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-[#013E51]/10 overflow-hidden shadow-xs">
        <div className="p-8 text-center text-xs text-gray-400 font-medium">
          Loading diving courses...
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#013E51]/10 p-12 text-center shadow-xs">
        <p className="text-sm font-bold text-[#013E51] mb-1">
          No Diving Courses Found
        </p>
        <p className="text-xs text-gray-500">
          Click &quot;New Course&quot; above to create your first diving course.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#013E51]/10 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-[#FAF7F2]/60 text-[#013E51] font-bold text-[11px] uppercase tracking-wider">
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Rating & Reviews</th>
              <th className="py-3 px-4">Facilities</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((course) => {
              const coverImg = course.images?.[0];
              const rawCover = coverImg?.imageUrl || coverImg?.url || "";
              const fullCover = rawCover ? resolveApiImageUrl(rawCover) : null;
              const facilitiesCount = course.facilities?.length || 0;
              const photosCount = course.images?.length || 0;

              return (
                <tr
                  key={course.id}
                  className="hover:bg-[#FAF7F2]/30 transition group"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        onClick={() => onOpenImages(course)}
                        title="Manage photos"
                        className="relative w-24 h-16 sm:w-28 sm:h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200 cursor-pointer hover:ring-2 hover:ring-[#013E51]/30 transition group/img shadow-2xs"
                      >
                        {fullCover ? (
                          <Image
                            src={fullCover}
                            alt={course.name}
                            fill
                            className="object-cover group-hover/img:scale-105 transition duration-300"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-1 bg-gray-50">
                            <FiImage className="w-5 h-5 text-gray-300" />
                            <span className="text-[10px] text-gray-400">No photo</span>
                          </div>
                        )}
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-xs">
                          <FiImage className="w-2.5 h-2.5 text-[#E8B34A]" />
                          <span>{photosCount}</span>
                        </span>
                      </div>
                      <div className="min-w-0 max-w-xs sm:max-w-sm">
                        <div className="font-bold text-[#013E51] truncate text-xs sm:text-sm">
                          {course.name}
                        </div>
                        <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">
                          {course.description || "No description"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-[#013E51] whitespace-nowrap">
                    ${Number(course.price || 0).toLocaleString()} {course.currency || "USD"}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onOpenReviews(course)}
                      title="View & moderate reviews"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#FAF7F2] border border-[#013E51]/10 hover:border-[#013E51]/30 transition cursor-pointer"
                    >
                      <FaStar className="w-3 h-3 text-[#E8B34A]" />
                      <span className="text-xs font-bold text-[#013E51]">
                        {Number(course.rating || 0).toFixed(1)}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">
                        ({course.reviewsCount || 0})
                      </span>
                    </button>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onOpenFacilities(course)}
                      title="Reorder facilities"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#013E51]/5 text-[#013E51] border border-[#013E51]/15 hover:bg-[#013E51]/10 transition cursor-pointer"
                    >
                      <span>{facilitiesCount} Facilities</span>
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onOpenImages(course)}
                        title="Manage photos"
                        className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-[#013E51] hover:bg-gray-50 transition cursor-pointer"
                      >
                        <FiImage className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenReviews(course)}
                        title="Manage reviews"
                        className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-[#013E51] hover:bg-gray-50 transition cursor-pointer"
                      >
                        <FiMessageSquare className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenFacilities(course)}
                        title="Reorder facilities"
                        className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-[#013E51] hover:bg-gray-50 transition cursor-pointer"
                      >
                        <FiLayers className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit(course)}
                        title="Edit course"
                        className="p-1.5 rounded-lg border border-gray-200 bg-white text-[#013E51] hover:bg-gray-50 transition cursor-pointer"
                      >
                        <FiEdit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(course)}
                        title="Delete course"
                        className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
