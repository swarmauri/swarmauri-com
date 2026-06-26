import React, { useMemo, useState } from "react";
import { HelpCircle, Search } from "lucide-react";
import { breadcrumbListSchema, faqPageSchema } from "@mdwrk/structured-data";
import StructuredData from "../components/StructuredData";
import SEO from "../components/SEO";
import FaqQuestionAnswerList from "../components/uix/FaqQuestionAnswerList";
import { FAQ_CATEGORIES, FAQ_ITEMS } from "../data/faq";

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${item.question} ${item.answer}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  const structuredData = useMemo(() => {
    try {
      const breadcrumbs = breadcrumbListSchema({
        id: "https://swarmauri.com/faq#breadcrumb",
        items: [
          { label: "Home", href: "https://swarmauri.com" },
          { label: "FAQ", href: "https://swarmauri.com/faq" }
        ]
      });

      const faq = faqPageSchema({
        id: "https://swarmauri.com/faq#faq",
        items: FAQ_ITEMS.map((item) => ({
          question: item.question,
          answer: item.answer.replace(/`|\*\*|\[([^\]]+)\]\([^)]+\)/g, "$1")
        }))
      });

      return [breadcrumbs, faq];
    } catch (e) {
      console.error("Failed to build FAQ structured data", e);
      return null;
    }
  }, []);

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto" id="faq-page">
      <SEO
        title="Swarmauri FAQ"
        description="Current answers about Swarmauri installation, package layers, Python support, documentation, source-generated package catalog data, and contribution paths."
        keywords={["Swarmauri FAQ", "Swarmauri install", "Swarmauri packages", "Swarmauri docs"]}
      />
      <StructuredData data={structuredData} />

      <div className="border-b border-zinc-200 pb-5 space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-indigo-600">
          <HelpCircle className="h-4 w-4" />
          <span>Current FAQ</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">
          Swarmauri Questions & Answers
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-zinc-500">
          Current answers for developers evaluating the Swarmauri SDK, package catalog, documentation, and contribution path. Counts and package facts come from the generated site catalog.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 md:grid-cols-[1fr_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the FAQ"
            className="h-10 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-sm text-zinc-800 outline-none transition-colors placeholder:text-zinc-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
          />
        </label>
        <div className="flex flex-wrap items-center gap-1.5">
          {FAQ_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                selectedCategory === category
                  ? "border-zinc-950 bg-zinc-900 font-semibold text-white"
                  : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              <span className="capitalize">{category}</span>
            </button>
          ))}
        </div>
      </section>

      <FaqQuestionAnswerList items={filteredItems} />

      {filteredItems.length === 0 && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
          No FAQ answers matched the current filter.
        </div>
      )}
    </div>
  );
}
