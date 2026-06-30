import React from "react";
import { Link } from "react-router-dom";
import { FileText, Calendar, ArrowUpRight } from "lucide-react";
import { UpdatePost } from "../types";
import { getUpdateSlug } from "../utils/updateSlugs";

interface UpdatePostCardProps {
  post: UpdatePost;
  key?: string | number;
}

export default function UpdatePostCard({ post }: UpdatePostCardProps) {
  const slug = getUpdateSlug(post);

  return (
    <Link
      to={`/updates/${slug}`}
      className="bg-white border border-zinc-200 rounded-xl p-6 hover:shadow-md hover:border-zinc-300 transition-all duration-150 flex flex-col justify-between cursor-pointer group"
      id={`update-card-${post.id}`}
    >
      <div className="space-y-3">
        <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono">
          <span className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.date}</span>
          </span>
          <span className="bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded border border-zinc-200">
            {post.category}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="font-sans font-bold text-base text-zinc-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3">
            {post.summary}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-100 mt-4 flex justify-between items-center text-xs">
        {(() => {
          const words = post.content.split(/\s+/).filter(Boolean).length;
          const minRead = Math.max(1, Math.ceil(words / 200));
          return (
            <span className="text-zinc-400 font-mono text-[10px]">
              {minRead} min read
            </span>
          );
        })()}
        <span className="text-indigo-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1">
          <span>Read Full Update</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
