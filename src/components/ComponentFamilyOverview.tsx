import React from "react";
import { Boxes, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { COMPONENT_FAMILIES } from "../data/packageSummary";
import { CANONICAL_TAXONOMY_SUMMARY } from "../data/taxonomy";
import { familyLabel } from "../utils/familyLabels";

type ComponentFamilyOverviewProps = {
  variant?: "compact" | "detailed";
  title?: string;
  description?: string;
};

export default function ComponentFamilyOverview({
  variant = "compact",
  title = "Component Families",
  description = CANONICAL_TAXONOMY_SUMMARY,
}: ComponentFamilyOverviewProps) {
  const detailed = variant === "detailed";
  const componentTotal = COMPONENT_FAMILIES.reduce(
    (total, family) => total + family.count,
    0,
  );

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
              Generated from SDK Components
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
            {COMPONENT_FAMILIES.length} families
          </span>
          <span className="px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 border border-zinc-200 font-mono">
            {componentTotal} components
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
        {COMPONENT_FAMILIES.map((family) =>
          detailed ? (
            <article
              key={family.name}
              className="rounded-lg border border-zinc-200 bg-zinc-50/60 p-3.5"
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
            </article>
          ) : (
            <span
              key={family.name}
              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-[11px] font-mono text-zinc-700"
            >
              <span>{familyLabel(family.name)}</span>
              <span className="text-zinc-600">{family.count}</span>
            </span>
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
