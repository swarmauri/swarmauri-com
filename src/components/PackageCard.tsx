import React from "react";
import { Link } from "react-router-dom";
import { Package } from "../types";

interface PackageCardProps {
  pkg: Package;
  key?: string | number;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const maturityClass = pkg.maturity === "deprecated"
    ? "bg-zinc-100 text-zinc-600 border-zinc-200"
    : pkg.maturity === "experimental" || pkg.maturity.includes("incubat")
      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
      : pkg.maturity === "foundation" || pkg.maturity === "standard-kernel"
        ? "bg-indigo-50 text-indigo-700 border-indigo-200"
        : "bg-green-50 text-green-700 border-green-200";

  return (
    <Link
      to={`/packages/${pkg.name}`}
      className="bg-white border border-zinc-200 rounded-xl p-5 hover:shadow-md hover:border-zinc-300 transition-all duration-150 flex flex-col justify-between cursor-pointer group"
      id={`package-card-${pkg.name}`}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-start gap-2">
          <span className="font-mono text-xs font-bold text-zinc-800 group-hover:text-indigo-600 transition-colors break-all">
            {pkg.name}
          </span>
          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase font-mono border shrink-0 ${maturityClass}`}>
            {pkg.maturity}
          </span>
        </div>
        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
          {pkg.description}
        </p>
      </div>

      <div className="pt-4 border-t border-zinc-100 mt-4 flex justify-between items-center text-[11px]">
        <span className="font-mono text-zinc-400">{pkg.layer.split("-")[0]} - {pkg.family}{pkg.workspace ? "" : " - non-workspace"}</span>
        <span className="text-indigo-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1">
          <span>Inspect Package</span>
          <span>&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
