import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, MapPin, Clock, Globe } from "lucide-react";
import { CareerRole } from "../types";

interface CareerRoleDetailsProps {
  role: CareerRole;
}

export default function CareerRoleDetails({ role }: CareerRoleDetailsProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6 md:p-8 space-y-6 shadow-sm" id="career-role-details">
      <Link
        to="/careers"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 mb-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Active Roles</span>
      </Link>

      <div className="border-b border-zinc-100 pb-5 space-y-2">
        <h2 className="text-2xl font-bold font-sans text-zinc-900">{role.title}</h2>
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 font-medium">
          <span className="flex items-center space-x-1">
            <Briefcase className="w-4 h-4 text-zinc-400" />
            <span>{role.department}</span>
          </span>
          <span className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-zinc-400" />
            <span>{role.location}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-zinc-400" />
            <span>{role.type}</span>
          </span>
          <span className="flex items-center space-x-1 bg-zinc-100 px-2 py-0.5 rounded text-[10px] text-zinc-600 border border-zinc-200">
            <Globe className="w-3.5 h-3.5 text-zinc-400 mr-0.5" />
            <span>Distributed Operations</span>
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Role Description</h3>
        <p className="text-xs text-zinc-600 leading-relaxed bg-zinc-50/50 p-4 rounded-lg border border-zinc-200/50">
          {role.description}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Developer Requirements</h3>
        <ul className="space-y-2 text-xs text-zinc-600">
          {role.requirements.map((req, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <span className="text-indigo-600 select-none font-bold shrink-0 mt-0.5">&bull;</span>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
