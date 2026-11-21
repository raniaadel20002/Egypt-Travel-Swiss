import Image from "next/image";
import { FiEye, FiEdit2, FiTrash2, FiLayers, FiImage } from "react-icons/fi";
import { BlogApiItem } from "@/models/blog";
import { resolveBlogImageUrl, truncateText } from "./blogHelpers";

interface BlogsTableProps {
  blogs: BlogApiItem[];
  isLoading: boolean;
  onViewDetails: (item: BlogApiItem) => void;
  onEdit: (item: BlogApiItem) => void;
  onDelete: (item: BlogApiItem) => void;
}

export default function BlogsTable({
  blogs,
  isLoading,
  onViewDetails,
  onEdit,
  onDelete,
}: BlogsTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-[#013E51]/10 p-6 space-y-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] font-[family-name:var(--font-lato)]">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#013E51]/10 p-12 text-center shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] font-[family-name:var(--font-lato)]">
        <p className="text-gray-500 font-semibold text-sm">
          No articles or travel blogs found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#013E51]/10 overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] font-[family-name:var(--font-lato)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-[#F8F9FA] border-b border-gray-200 text-[#013E51] font-bold uppercase text-[11px] tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Article</th>
              <th className="py-3.5 px-4">Content Excerpt</th>
              <th className="py-3.5 px-4">Sections</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {blogs.map((blog) => {
              const coverUrl = resolveBlogImageUrl(blog.imageUrl);
              const sectionsCount = blog.blogSections?.length || 0;

              return (
                <tr
                  key={blog.id}
                  className="hover:bg-[#F8F9FA]/60 transition-colors"
                >
                  {/* Article Thumb & Title */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200 flex items-center justify-center">
                        {coverUrl ? (
                          <Image
                            src={coverUrl}
                            alt={blog.title}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        ) : (
                          <FiImage className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="space-y-0.5 max-w-[240px]">
                        <span className="font-mono text-[10px] text-gray-400 font-bold block">
                          #{blog.id}
                        </span>
                        <h4 className="font-bold text-[#013E51] text-xs sm:text-sm line-clamp-1">
                          {blog.title}
                        </h4>
                      </div>
                    </div>
                  </td>

                  {/* Content Excerpt */}
                  <td className="py-3.5 px-4">
                    <p className="text-xs text-gray-600 line-clamp-2 max-w-md">
                      {truncateText(blog.content, 140) || "-"}
                    </p>
                  </td>

                  {/* Sections Badge */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border bg-purple-50 text-purple-700 border-purple-200">
                      <FiLayers className="w-3.5 h-3.5 text-purple-600" />
                      <span>{sectionsCount} {sectionsCount === 1 ? "Section" : "Sections"}</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onViewDetails(blog)}
                        title="View Details"
                        className="p-1.5 rounded-lg border border-gray-200 text-[#013E51] hover:bg-[#013E51] hover:text-white transition-colors cursor-pointer"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit(blog)}
                        title="Edit Article"
                        className="p-1.5 rounded-lg border border-gray-200 text-amber-700 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(blog)}
                        title="Delete Article"
                        className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                      >
                        <FiTrash2 className="w-4 h-4" />
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
