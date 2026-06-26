import React, { useMemo } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { ArrowLeft, Archive, CalendarDays } from "lucide-react";
import { breadcrumbListSchema } from "@mdwrk/structured-data";
import StructuredData from "../components/StructuredData";
import SEO from "../components/SEO";
import { findLegacyPageByPath } from "../data/legacyContent";

export default function LegacyPage() {
  const location = useLocation();
  const page = findLegacyPageByPath(location.pathname);

  const structuredData = useMemo(() => {
    if (!page) return null;

    try {
      return breadcrumbListSchema({
        id: `https://swarmauri.com${page.legacyPath}#breadcrumb`,
        items: [
          { label: "Home", href: "https://swarmauri.com" },
          { label: page.title, href: `https://swarmauri.com${page.legacyPath}` }
        ]
      });
    } catch (e) {
      console.error("Failed to build legacy page structured data", e);
      return null;
    }
  }, [page]);

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto" id={`legacy-page-${page.id}`}>
      <SEO
        title={page.title}
        description={page.summary}
        keywords={[page.title, "swarmauri", "legacy site content"]}
      />
      <StructuredData data={structuredData} />

      <div className="border-b border-zinc-200 pb-5 space-y-3">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Swarmauri</span>
        </Link>
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-zinc-500">
          <span className="inline-flex items-center gap-1 rounded border border-amber-200 bg-amber-50 px-2 py-1 font-bold uppercase text-amber-700">
            <Archive className="h-3.5 w-3.5" />
            Archived legacy page
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            Updated {page.modified}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">
          {page.title}
        </h1>
        <p className="text-sm text-zinc-500 max-w-2xl">
          Migrated from the previous Swarmauri website export at {page.legacyPath}.
        </p>
      </div>

      <article className="bg-white border border-zinc-200 rounded-xl p-6 md:p-8 shadow-sm">
        <div className="prose prose-zinc max-w-none text-sm text-zinc-600 leading-relaxed">
          <p className="font-medium text-zinc-800 text-base leading-relaxed bg-zinc-50 p-4 rounded-lg border border-zinc-200/50">
            {page.summary}
          </p>
          <div className="whitespace-pre-wrap pt-4">
            {page.content}
          </div>
        </div>
      </article>
    </div>
  );
}
