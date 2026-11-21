import { FiBookOpen, FiImage, FiLayers, FiFileText } from "react-icons/fi";

export interface BlogsMetrics {
  totalBlogs: number;
  withCoverImage: number;
  totalSections: number;
  avgSectionsPerBlog: number;
}

interface BlogsMetricsGridProps {
  metrics: BlogsMetrics;
}

export default function BlogsMetricsGrid({ metrics }: BlogsMetricsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 font-[family-name:var(--font-lato)]">
      {/* Total Blogs */}
      <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center shrink-0">
          <FiBookOpen className="w-5 h-5 text-[#E8B34A]" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Total Articles
          </span>
          <span className="text-xl font-extrabold text-[#013E51]">
            {metrics.totalBlogs}
          </span>
        </div>
      </div>

      {/* With Cover Image */}
      <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
          <FiImage className="w-5 h-5 text-sky-600" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            With Cover Image
          </span>
          <span className="text-xl font-extrabold text-sky-700">
            {metrics.withCoverImage}
          </span>
        </div>
      </div>

      {/* Total Sections */}
      <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
          <FiLayers className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Total Sections
          </span>
          <span className="text-xl font-extrabold text-purple-700">
            {metrics.totalSections}
          </span>
        </div>
      </div>

      {/* Avg Sections / Blog */}
      <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
          <FiFileText className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Avg Sections / Blog
          </span>
          <span className="text-xl font-extrabold text-emerald-700">
            {metrics.avgSectionsPerBlog.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
