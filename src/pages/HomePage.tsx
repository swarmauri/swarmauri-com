import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Terminal, Layers, ShieldCheck, Briefcase, Sparkles, BookOpen, Cpu, Code } from "lucide-react";
import { COMPONENT_FAMILIES, SDK_METADATA } from "../data/packageSummary";
import {
  CANONICAL_TAXONOMY_DESCRIPTION,
  CANONICAL_TAXONOMY_KEYWORDS,
} from "../data/taxonomy";
import SEO from "../components/SEO";
import ComponentFamilyOverview from "../components/ComponentFamilyOverview";
import { familyLabel } from "../utils/familyLabels";

export default function HomePage() {
  const [copiedText, setCopiedText] = useState("");
  const navigate = useNavigate();
  const featuredFamilies = COMPONENT_FAMILIES.slice(0, 4);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const navigateTo = (tab: string) => {
    navigate(`/${tab}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-16 py-8" id="homepage-container">
      <SEO
        title="Composable Intelligence Infrastructure"
        description={CANONICAL_TAXONOMY_DESCRIPTION}
        keywords={CANONICAL_TAXONOMY_KEYWORDS}
      />
      {/* 1. Hero Viewport */}
      <section className="relative overflow-hidden bg-white border border-zinc-200/80 rounded-2xl p-8 sm:p-12 lg:p-16 shadow-sm" id="hero-banner">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Composable Intelligence Infrastructure</span>
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-zinc-900 leading-tight">
            Typed Python Components for AI-Native Software
          </h1>
          
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Build AI, agent, security, runtime, data, and integration workflows
            from independently installable Python packages with stable
            contracts, Pydantic-backed models, and provider-specific components.
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={() => navigateTo("packages")}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm transition-all duration-150 flex items-center justify-center space-x-2 shadow-md cursor-pointer"
            >
              <span>Explore Package Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo("guides")}
              className="w-full sm:w-auto px-6 py-3 rounded-lg border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-medium text-sm transition-all duration-150 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read the Docs</span>
            </button>
            <button
              onClick={() => navigateTo("architecture")}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium text-sm transition-all duration-150 flex items-center justify-center space-x-2 border border-indigo-100 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Layer Architecture</span>
            </button>
          </div>

          {/* Quick CLI Inline installation box */}
          <div className="pt-8 max-w-lg mx-auto">
            <div className="bg-zinc-900 rounded-lg p-3 flex items-center justify-between border border-zinc-800 shadow-inner">
              <div className="flex items-center space-x-2 text-zinc-400 font-mono text-xs select-none">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span className="text-zinc-500">$</span>
                <span className="text-zinc-100">uv add swarmauri</span>
              </div>
              <button
                onClick={() => copyToClipboard("uv add swarmauri", "uv")}
                className="px-2.5 py-1 text-[10px] uppercase font-mono font-bold rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-all border border-zinc-700 cursor-pointer"
              >
                {copiedText === "uv" ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-[11px] text-zinc-600 font-mono mt-2">
              Requires Python {SDK_METADATA.pythonSupport} | Workspace Members: {SDK_METADATA.totalWorkspaceMembers}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Core Value: What is Swarmauri */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8" id="about-pillars">
        <h2 className="sr-only">Swarmauri architecture pillars</h2>
        <div className="bg-white border border-zinc-200 p-6 rounded-xl hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-white mb-4">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-sans font-bold text-lg text-zinc-950 mb-2">Contract-First Architecture</h3>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Swarmauri separates pure Python interface contracts (<code className="text-[11px] bg-zinc-100 text-zinc-800 px-1 font-mono rounded">swarmauri_core</code>) from the physical execution libraries, guaranteeing completely isolated module environments.
          </p>
        </div>

        <div className="bg-white border border-zinc-200 p-6 rounded-xl hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-sans font-bold text-lg text-zinc-950 mb-2">Cryptographic Safety Built-in</h3>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Decouple your security constraints. Swarmauri includes dedicated packages for elliptic curve signing (`ed25519`), asymmetric ciphers, and key providers, keeping your tokens safe in untrusted LLM pipelines.
          </p>
        </div>

        <div className="bg-white border border-zinc-200 p-6 rounded-xl hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white mb-4">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-sans font-bold text-lg text-zinc-950 mb-2">Composable Intelligence Surface</h3>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Compose only the intelligence capabilities your system needs. Start with stable contracts, then opt into models, tools, parsers, memory, transport, security, and provider adapters as explicit package choices.
          </p>
        </div>
      </section>

      {/* 3. Deep Dive Portfolio Teaser */}
      <section className="bg-[#FAF9F6] border border-zinc-200 rounded-xl p-8 flex flex-col md:flex-row justify-between items-center gap-8" id="portfolio-teaser">
        <div className="space-y-4 max-w-xl">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
            A Pluggable Ecosystem of {SDK_METADATA.totalIndexedRecords} Indexed Records
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            The package ecosystem spans {COMPONENT_FAMILIES.length} component
            families across the standard library, community integrations, and
            extension packages. Filter by maturity, family, or role to build the
            exact runtime your application needs.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            {featuredFamilies.map((family) => (
              <span
                key={family.name}
                className="px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 border border-zinc-200 font-mono"
              >
                {family.count} {familyLabel(family.name)}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full md:w-auto flex flex-col space-y-3 min-w-[200px]">
          <button
            onClick={() => navigateTo("packages")}
            className="w-full px-5 py-3 text-center text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg shadow transition-colors cursor-pointer"
          >
            Browse Package Catalog
          </button>
          <button
            onClick={() => navigateTo("composer")}
            className="w-full px-5 py-3 text-center text-sm font-semibold text-zinc-700 hover:text-zinc-900 border border-zinc-300 hover:bg-zinc-50 rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Code className="w-4 h-4" />
            <span>Try Workflow Composer</span>
          </button>
        </div>
      </section>

      <ComponentFamilyOverview
        title="All Component Families"
        description="Agents, models, and vector stores are examples in a broader component ecosystem. The generated catalog also includes tools, parsers, middleware, signing, certificates, identity, tokens, storage, publishers, evaluators, workflows, and many other families."
      />

      {/* 4. Layer Architecture Preview */}
      <section className="space-y-6" id="architecture-teaser">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">The Swarmauri 10-Layer Stack</h2>
          <p className="text-sm text-zinc-500 max-w-lg mx-auto">
            From low-level typing schemas to global facades, Swarmauri maintains strict execution boundaries.
          </p>
        </div>
        
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm overflow-hidden space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { num: "00", name: "Typing Utilities", color: "bg-orange-50 border-orange-200 text-orange-800" },
              { num: "10", name: "Interfaces (Core)", color: "bg-blue-50 border-blue-200 text-blue-800" },
              { num: "20", name: "Bases (Pydantic)", color: "bg-violet-50 border-violet-200 text-violet-800" },
              { num: "30", name: "Standard Kernel", color: "bg-pink-50 border-pink-200 text-pink-800" },
              { num: "40", name: "Split Standards", color: "bg-amber-50 border-amber-200 text-amber-800" },
              { num: "50", name: "Community Integrations", color: "bg-teal-50 border-teal-200 text-teal-800" },
              { num: "60", name: "Extension Plugins", color: "bg-indigo-50 border-indigo-200 text-indigo-800" },
              { num: "70", name: "Experimental Planners", color: "bg-yellow-50 border-yellow-200 text-yellow-800" },
              { num: "80", name: "Aggregate Facades", color: "bg-red-50 border-red-200 text-red-800" },
              { num: "90", name: "Deprecated compatibility", color: "bg-zinc-100 border-zinc-200 text-zinc-600" },
            ].map((layer) => (
              <div key={layer.num} className={`p-3 rounded-lg border ${layer.color} text-center space-y-1`}>
                <div className="font-mono text-xs font-bold">{layer.num}</div>
                <div className="text-[11px] font-medium leading-tight">{layer.name}</div>
              </div>
            ))}
          </div>
          <div className="text-center pt-2">
            <button
              onClick={() => navigateTo("architecture")}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center space-x-1 cursor-pointer"
            >
              <span>Explore Layers & Import Rules</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Trust, Claims and Careers Block */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8" id="secondary-teaser">
        {/* Claims and Policy */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-indigo-600">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-sans font-bold text-lg text-zinc-950">Active Claims & Verifications</h3>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              We treat software claims as a product surface. Swarmauri lists fully verified, cryptographic, decoupling, and package isolation metrics with transparent validation processes. No marketing overclaims or FIPS-compliance exaggerations.
            </p>
          </div>
          <button
            onClick={() => navigateTo("claims")}
            className="text-xs font-bold text-zinc-900 hover:text-indigo-600 flex items-center space-x-1 pt-2 border-t border-zinc-100 mt-4 cursor-pointer"
          >
            <span>View Verification Matrix</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Careers Culture */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-zinc-900">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              <h3 className="font-sans font-bold text-lg text-zinc-950">Join Swarmauri Careers</h3>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              We operate an async-first, open-source organization. We actively hire from our contributor pool: build provider plugins, audit crypto primitives, or write guides, and transition from open-source author to staff member.
            </p>
          </div>
          <button
            onClick={() => navigateTo("careers")}
            className="text-xs font-bold text-zinc-900 hover:text-indigo-600 flex items-center space-x-1 pt-2 border-t border-zinc-100 mt-4 cursor-pointer"
          >
            <span>Explore Active Roles & Talent Network</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </section>
    </div>
  );
}
