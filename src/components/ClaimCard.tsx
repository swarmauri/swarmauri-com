import React from "react";
import { ShieldCheck, ExternalLink, Award } from "lucide-react";
import { ClaimRecord } from "../types";

interface ClaimCardProps {
  claim: ClaimRecord;
  key?: string | number;
}

export default function ClaimCard({ claim }: ClaimCardProps) {
  const tierMap = {
    t0: { label: "T0 (Informational)", color: "bg-zinc-50 text-zinc-600 border-zinc-200" },
    t1: { label: "T1 (Self-Certified)", color: "bg-blue-50 text-blue-700 border-blue-200" },
    t2: { label: "T2 (Test Verified)", color: "bg-purple-50 text-purple-700 border-purple-200" },
    t3: { label: "T3 (Crypto Verified)", color: "bg-amber-50 text-amber-700 border-amber-200" },
    t4: { label: "T4 (SSOT Certified)", color: "bg-rose-50 text-rose-700 border-rose-200" }
  };

  const tier = claim.reviewRating ? tierMap[claim.reviewRating] : tierMap.t0;

  return (
    <div
      className="bg-white border border-zinc-200 rounded-xl p-5 hover:shadow-md transition-all duration-150 flex flex-col justify-between space-y-4"
      id={`claim-card-${claim.id}`}
    >
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <h3 className="font-sans font-bold text-zinc-900 text-sm leading-snug">
              {claim.claim}
            </h3>
          </div>
          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border shrink-0 font-mono ${tier.color}`}>
            {tier.label}
          </span>
        </div>

        <p className="text-xs text-zinc-600 leading-relaxed">
          {claim.details}
        </p>

        {claim.about && (
          <p className="text-[10px] text-zinc-400 italic font-sans">
            Topic: {claim.about}
          </p>
        )}
      </div>

      <div className="pt-3 border-t border-zinc-100 space-y-2 text-[10px]">
        <div className="flex justify-between items-center">
          <span className="text-zinc-400 font-medium">Verified Package:</span>
          <span className="font-mono font-semibold text-zinc-700">{claim.package}</span>
        </div>

        {claim.author && (
          <div className="flex justify-between items-center">
            <span className="text-zinc-400 font-medium">Authority Unit:</span>
            <span className="font-semibold text-zinc-600">{claim.author}</span>
          </div>
        )}

        {claim.firstAppearance && (
          <div className="flex justify-between items-center">
            <span className="text-zinc-400 font-medium">First Logged:</span>
            <span className="text-zinc-500 font-mono">{claim.firstAppearance}</span>
          </div>
        )}

        <div className="flex justify-between items-center bg-zinc-50 p-1.5 rounded border border-zinc-150">
          <span className="text-zinc-500 font-bold shrink-0 mr-2">Method:</span>
          <span className="font-medium text-zinc-600 text-right truncate" title={claim.verification}>
            {claim.verification}
          </span>
        </div>

        {claim.citation && (
          <div className="pt-1 flex justify-end">
            {claim.citation.startsWith("http") ? (
              <a
                href={claim.citation}
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 font-semibold text-[9px]"
              >
                <span>View Registry Citation</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            ) : (
              <span className="text-zinc-400 text-[9px] font-medium font-mono">
                Citation: {claim.citation}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
