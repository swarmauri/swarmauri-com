import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { CareerRole } from "../types";

interface CareerRoleCardProps {
  role: CareerRole;
  key?: string | number;
}

export default function CareerRoleCard({ role }: CareerRoleCardProps) {
  return (
    <Link
      to={`/careers/${role.id}`}
      className="bg-white border border-zinc-200 rounded-xl p-6 hover:shadow-md hover:border-zinc-300 transition-all duration-150 flex flex-col justify-between cursor-pointer group"
      id={`role-card-${role.id}`}
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <h3 className="font-sans font-bold text-base text-zinc-900 group-hover:text-indigo-600 transition-colors">
            {role.title}
          </h3>
          <div className="flex items-center space-x-3 text-xs text-zinc-500 font-medium">
            <span className="flex items-center space-x-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{role.department}</span>
            </span>
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{role.location}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{role.type}</span>
            </span>
          </div>
        </div>

        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3">
          {role.description}
        </p>
      </div>

      <div className="pt-4 border-t border-zinc-100 mt-4 flex justify-between items-center text-xs">
        <span className="text-zinc-400 font-mono text-[10px]">ID: {role.id}</span>
        <span className="text-indigo-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1">
          <span>Apply Now</span>
          <span>&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
