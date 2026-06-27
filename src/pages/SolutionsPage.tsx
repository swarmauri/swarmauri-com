import React, { useMemo } from "react";
import { Boxes, BrainCircuit, KeySquare, PlugZap } from "lucide-react";
import { breadcrumbListSchema } from "@mdwrk/structured-data";
import StructuredData from "../components/StructuredData";
import SEO from "../components/SEO";

const SOLUTIONS = [
  {
    title: "Composable Agent Systems",
    icon: BrainCircuit,
    text: "Assemble typed model, tool, memory, parser, prompt, and evaluator packages into application-owned agent workflows."
  },
  {
    title: "Provider Portability",
    icon: PlugZap,
    text: "Use focused adapter packages to keep model, embedding, vector store, storage, and transport integrations replaceable."
  },
  {
    title: "Security-Centered Components",
    icon: KeySquare,
    text: "Apply signing, crypto, token, certificate, and proof-oriented packages where applications need explicit trust boundaries."
  }
];

export default function SolutionsPage() {
  const structuredData = useMemo(() => {
    try {
      return breadcrumbListSchema({
        id: "https://swarmauri.com/solutions#breadcrumb",
        items: [
          { label: "Home", href: "https://swarmauri.com" },
          { label: "Solutions", href: "https://swarmauri.com/solutions" }
        ]
      });
    } catch (e) {
      console.error("Failed to build Solutions structured data", e);
      return null;
    }
  }, []);

  return (
    <div className="space-y-10 py-6" id="solutions-page">
      <SEO
        title="Swarmauri Solutions"
        description="Solution patterns for using Swarmauri's package ecosystem across agent systems, provider portability, and security-centered Python applications."
        keywords={["swarmauri solutions", "agent systems", "provider portability", "secure Python components"]}
      />
      <StructuredData data={structuredData} />

      <div className="border-b border-zinc-200 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans flex items-center space-x-3">
          <Boxes className="w-8 h-8 text-indigo-600" />
          <span>Swarmauri Solutions</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1 max-w-3xl">
          Practical architecture patterns for teams using Swarmauri as a package portfolio rather than a closed hosted platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SOLUTIONS.map((solution) => {
          const Icon = solution.icon;
          return (
            <section key={solution.title} className="bg-white border border-zinc-200 rounded-xl p-5 space-y-3">
              <Icon className="w-5 h-5 text-indigo-600" />
              <h2 className="font-sans font-bold text-zinc-950 text-sm">{solution.title}</h2>
              <p className="text-xs text-zinc-600 leading-relaxed">{solution.text}</p>
            </section>
          );
        })}
      </div>

      <section className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 md:p-8 space-y-4">
        <h2 className="font-sans font-bold text-zinc-950 text-sm">Solution Fit</h2>
        <p className="text-xs text-zinc-600 leading-relaxed max-w-3xl">
          Swarmauri is best suited for teams that want explicit package boundaries, application-owned runtime control, provider choice, and inspectable source-backed abstractions for AI and automation systems.
        </p>
      </section>
    </div>
  );
}
