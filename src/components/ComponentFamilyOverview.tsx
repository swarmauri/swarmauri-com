import React from "react";
import { Boxes, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FAMILIES, SDK_METADATA } from "../data/packageSummary";
import { CANONICAL_TAXONOMY_SUMMARY } from "../data/taxonomy";

type ComponentFamilyOverviewProps = {
  variant?: "compact" | "detailed";
  title?: string;
  description?: string;
};

function familyLabel(name: string) {
  const overrides: Record<string, string> = {
    llm: "LLM",
    xmp: "XMP",
    ocr: "OCR",
    mcp: "MCP",
    jwt: "JWT",
  };

  return (
    overrides[name] ??
    name
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
}

export default function ComponentFamilyOverview({
  variant = "compact",
  title = "Component Families",
  description = CANONICAL_TAXONOMY_SUMMARY,
}: ComponentFamilyOverviewProps) {
  const detailed = variant === "detailed";

  return (
    <section
      className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 space-y-6"
      id="component-family-overview"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 text-indigo-600">
            <Boxes className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Generated from Package Index
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
            {title}
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 border border-zinc-200 font-mono">
            {FAMILIES.length} families
          </span>
          <span className="px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 border border-zinc-200 font-mono">
            {SDK_METADATA.totalIndexedRecords} indexed records
          </span>
        </div>
      </div>

      <div
        className={
          detailed
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            : "flex flex-wrap gap-2"
        }
      >
        {FAMILIES.map((family) =>
          detailed ? (
            <Link
              key={family.name}
              to={`/packages?family=${encodeURIComponent(family.name)}`}
              className="group rounded-lg border border-zinc-200 bg-zinc-50/60 p-3.5 transition-colors hover:border-indigo-200 hover:bg-indigo-50/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-zinc-900">
                    {familyLabel(family.name)}
                  </h3>
                  <p className="text-[11px] text-zinc-600 leading-normal">
                    {family.description}
                  </p>
                </div>
                <span className="shrink-0 rounded bg-white px-2 py-0.5 text-[10px] font-mono font-bold text-zinc-600 border border-zinc-200">
                  {family.count}
                </span>
              </div>
            </Link>
          ) : (
            <Link
              key={family.name}
              to={`/packages?family=${encodeURIComponent(family.name)}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-[11px] font-mono text-zinc-700 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
            >
              <span>{familyLabel(family.name)}</span>
              <span className="text-zinc-600">{family.count}</span>
            </Link>
          ),
        )}
      </div>

      <Link
        to="/packages"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
      >
        <span>Open the generated package catalog</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </section>
  );
}
