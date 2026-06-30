import React, { useMemo } from "react";
import { Cpu, ShieldCheck, Zap, Code, Server, CheckCircle } from "lucide-react";
import { webApplicationNode } from "@mdwrk/structured-data";
import StructuredData from "../components/StructuredData";
import SEO from "../components/SEO";
import { SDK_METADATA } from "../data/packageSummary";
import {
  CANONICAL_TAXONOMY_DESCRIPTION,
  CANONICAL_TAXONOMY_KEYWORDS,
} from "../data/taxonomy";

export default function FrameworkPage() {
  const structuredData = useMemo(() => {
    try {
      return webApplicationNode({
        id: "https://swarmauri.com/framework/#application",
        name: "Swarmauri Composable Intelligence Framework",
        description: CANONICAL_TAXONOMY_DESCRIPTION,
        url: "https://swarmauri.com/framework",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Windows, Linux, macOS",
        softwareVersion: SDK_METADATA.version
      });
    } catch (e) {
      console.error("Failed to build WebApplication structured data", e);
      return null;
    }
  }, []);

  return (
    <div className="space-y-12 py-6" id="framework-page">
      <SEO
        title="Composable Intelligence Framework"
        description={CANONICAL_TAXONOMY_DESCRIPTION}
        keywords={CANONICAL_TAXONOMY_KEYWORDS}
      />
      {/* Platform WebApplication JSON-LD */}
      <StructuredData data={structuredData} />

      {/* Page Header */}
      <div className="border-b border-zinc-200 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">
          The Swarmauri Framework
        </h1>
        <p className="text-sm text-zinc-500 mt-2 max-w-2xl">
          Swarmauri separates contracts from implementations, enabling
          developers to compose tools, agents, models, parsers, middleware,
          storage, crypto, identity, evaluators, workflows, and provider
          integrations under stable Python package boundaries.
        </p>
      </div>

      {/* Hero Core Block */}
      <section className="bg-zinc-900 text-white rounded-xl p-8 space-y-6 border border-zinc-800 shadow-sm relative overflow-hidden" id="framework-hero-block">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
          <Cpu className="w-64 h-64 text-white" />
        </div>
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="text-indigo-400 font-mono text-xs uppercase font-bold tracking-wider">
            Primary Paradigm
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Swarmauri separates interface contracts from implementation libraries.
          </h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            Unlike massive, monolithic AI frameworks that bind every script to heavy SaaS dependencies (like complex native client binaries), Swarmauri isolates APIs. Developers can declare exact input constraints, interchange models in real time, and audit security layers with absolute confidence.
          </p>
        </div>
      </section>

      {/* Suggested Sections Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8" id="framework-pillars">
        {/* Section 1: Contract-First Architecture */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-3">
          <div className="flex items-center space-x-2 text-indigo-600">
            <Code className="w-5 h-5" />
            <h3 className="font-bold text-md text-zinc-900">Contract-First Isolation</h3>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            By keeping protocols strictly defined inside <code className="text-[11px] bg-zinc-100 px-1 font-mono rounded">swarmauri_core</code>, the system acts as a pure contract layer. There are zero concrete classes, active file reads, or internet lookups in the core package. This guarantees instant load times and zero supply-chain risk on the core boundary.
          </p>
        </div>

        {/* Section 2: Stable Namespace Imports */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-3">
          <div className="flex items-center space-x-2 text-indigo-600">
            <Zap className="w-5 h-5" />
            <h3 className="font-bold text-md text-zinc-900">Stable Namespace Resolution</h3>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            The aggregate <code className="text-[11px] bg-zinc-100 px-1 font-mono rounded">swarmauri</code> package orchestrates dynamic imports. This means developers use clean imports like <code className="text-[11px] bg-zinc-100 px-1 font-mono rounded">from swarmauri.standard import LocalModel</code> while the underlying loader automatically routes the request to split standard or community libraries securely behind the scenes.
          </p>
        </div>

        {/* Section 3: Pydantic-Backed Components */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-3">
          <div className="flex items-center space-x-2 text-indigo-600">
            <Server className="w-5 h-5" />
            <h3 className="font-bold text-md text-zinc-900">Round Trip Serialization</h3>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Components built on <code className="text-[11px] bg-zinc-100 px-1 font-mono">ComponentBase</code> carry Pydantic state plus Swarmauri YAML and TOML mixins. JSON round trips use <code className="text-[11px] bg-zinc-100 px-1 font-mono">model_dump_json()</code> and <code className="text-[11px] bg-zinc-100 px-1 font-mono">model_validate_json()</code>. YAML round trips use <code className="text-[11px] bg-zinc-100 px-1 font-mono">model_dump_yaml()</code> and <code className="text-[11px] bg-zinc-100 px-1 font-mono">model_validate_yaml()</code>. TOML round trips use <code className="text-[11px] bg-zinc-100 px-1 font-mono">model_dump_toml()</code> and <code className="text-[11px] bg-zinc-100 px-1 font-mono">model_validate_toml()</code>. Each path preserves registered <code className="text-[11px] bg-zinc-100 px-1 font-mono">type</code> metadata for component hydration from serialized payloads.
          </p>
        </div>

        {/* Section 4: Adapter Swaps and Decoupling */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-3">
          <div className="flex items-center space-x-2 text-indigo-600">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-bold text-md text-zinc-900">Hot-Swappable Providers</h3>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Because adapters conform strictly to shared protocols like <code className="text-[11px] bg-zinc-100 px-1 font-mono">IModel</code>, you can swap between OpenAI, Groq, Gemini, or local HuggingFace endpoints with a single line configuration change. Downstream reasoning and loops remain totally untouched.
          </p>
        </div>
      </section>

      {/* Decision Matrix: When to use what */}
      <section className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-6 sm:p-8 space-y-6" id="matrix-comparison">
        <h3 className="font-sans font-bold text-lg text-zinc-900">Choosing Your Integration Strategy</h3>
        <p className="text-xs text-zinc-600 leading-relaxed max-w-2xl">
          Depending on your system's performance, memory, and security parameters, Swarmauri supports two clean package consumption structures:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg border border-indigo-100/80 space-y-3">
            <span className="inline-block px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-[10px] font-mono uppercase font-semibold">
              Option A: Namespace Facade
            </span>
            <h4 className="font-bold text-sm text-zinc-950">Install the aggregate: swarmauri</h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Simplest, cleanest imports across the standard library.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Perfect for general agent scripting, notebooks, and quickstarts.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Automatic discovery and loading of split-packages.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-5 rounded-lg border border-indigo-100/80 space-y-3">
            <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-[10px] font-mono uppercase font-semibold">
              Option B: Granular Splitting
            </span>
            <h4 className="font-bold text-sm text-zinc-950">Install focused packages directly</h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Perfect for production microservices and serverless endpoints.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Zero extra dependencies, minimizing cold start latencies.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Isolates security boundaries to audited packages like <code className="font-mono text-[10px] bg-zinc-100 p-0.5 rounded">swarmauri_signing_ed25519</code>.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Storage, Transport, and Crypto surfaces */}
      <section className="bg-white border border-zinc-200 rounded-xl p-6 space-y-4" id="surfaces-overview">
        <h3 className="font-sans font-bold text-md text-zinc-900">Extensive Functional Footprint</h3>
        <p className="text-xs text-zinc-500 max-w-2xl leading-relaxed">
          Swarmauri provides more than typical agent execution loops; it wraps modern distributed-systems infrastructure under standard interfaces:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {[
            { title: "Transport Protocols", desc: "Network protocols carrying encrypted models safely across sockets." },
            { title: "Cipher Suites", desc: "AES-256 state encryption and authenticated context records." },
            { title: "Key Managers", desc: "Access AWS Key Vaults and HashiCorp secret providers uniformly." },
            { title: "Storage Adapters", desc: "Decoupled cloud adapters for AWS S3 and local filesystems." },
          ].map((item, idx) => (
            <div key={idx} className="bg-zinc-50 p-3.5 rounded-lg border border-zinc-150 space-y-1">
              <h4 className="font-sans font-semibold text-xs text-zinc-900">{item.title}</h4>
              <p className="text-[11px] text-zinc-500 leading-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
