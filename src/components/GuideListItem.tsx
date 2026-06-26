import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, CornerDownRight } from "lucide-react";
import { GuideTopic } from "../types";

interface GuideListItemProps {
  guide: GuideTopic;
  isActive: boolean;
  key?: string | number;
}

export default function GuideListItem({ guide, isActive }: GuideListItemProps) {
  return (
    <Link
      to={`/guides/${guide.id}`}
      className={`p-3 rounded-lg border text-xs transition-all flex items-start space-x-2 cursor-pointer ${
        isActive
          ? "bg-indigo-50 border-indigo-200 ring-1 ring-indigo-500"
          : "bg-white border-zinc-200 hover:bg-zinc-50/50"
      }`}
      id={`guide-item-${guide.id}`}
    >
      <BookOpen className={`w-4 h-4 shrink-0 mt-0.5 ${isActive ? "text-indigo-600 font-bold" : "text-zinc-400"}`} />
      <div className="space-y-0.5">
        <div className={`font-semibold ${isActive ? "text-indigo-950 font-bold" : "text-zinc-800"}`}>
          {guide.title}
        </div>
        <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed">
          {guide.description}
        </p>
      </div>
    </Link>
  );
}
