import React, { useMemo } from "react";
import { Lock, Shield, Server, KeyRound } from "lucide-react";
import { breadcrumbListSchema } from "@mdwrk/structured-data";
import StructuredData from "../components/StructuredData";
import SEO from "../components/SEO";

export default function PrivacyPolicyPage() {
  const structuredData = useMemo(() => {
    try {
      return breadcrumbListSchema({
        id: "https://swarmauri.com/privacy-policy#breadcrumb",
        items: [
          { label: "Home", href: "https://swarmauri.com" },
          { label: "Privacy Policy", href: "https://swarmauri.com/privacy-policy" }
        ]
      });
    } catch (e) {
      console.error("Failed to build PrivacyPolicy structured data", e);
      return null;
    }
  }, []);

  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto" id="privacy-policy-page">
      <SEO
        title="Privacy Policy"
        description="Swarmauri privacy policy for the company website, package catalog, open-source SDK, and developer documentation surfaces."
        keywords={["privacy policy", "developer privacy", "open source telemetry", "swarmauri"]}
      />
      <StructuredData data={structuredData} />

      <div className="border-b border-zinc-200 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans flex items-center space-x-3">
          <Shield className="w-8 h-8 text-indigo-600" />
          <span>Privacy Policy</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Last updated: June 25, 2026. Applies to swarmauri.com, public package catalog pages, documentation surfaces, and open-source SDK distribution.
        </p>
      </div>

      <section className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 sm:p-6 space-y-3">
        <h2 className="font-bold text-sm text-zinc-900 flex items-center space-x-2">
          <Lock className="w-5 h-5 text-indigo-600" />
          <span>Developer Privacy Commitment</span>
        </h2>
        <p className="text-xs text-zinc-600 leading-relaxed">
          Swarmauri is an open-source SDK and package ecosystem. The SDK executes in your application runtime, local environment, or deployment infrastructure. We do not collect your prompts, API keys, vectors, documents, credentials, or application data through published Python packages.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white border border-zinc-200 rounded-xl p-5 space-y-3">
          <h2 className="font-semibold text-zinc-900 text-sm flex items-center gap-2">
            <Server className="w-4 h-4 text-indigo-600" />
            Website Data
          </h2>
          <p className="text-xs text-zinc-600 leading-relaxed">
            The company website and generated catalog pages may produce standard server access logs for availability, abuse prevention, and debugging. We do not use those logs to reconstruct SDK runtime behavior or inspect user application data.
          </p>
        </section>

        <section className="bg-white border border-zinc-200 rounded-xl p-5 space-y-3">
          <h2 className="font-semibold text-zinc-900 text-sm flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-indigo-600" />
            Secrets and Provider Keys
          </h2>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Provider credentials are loaded by your application through its own environment, configuration, or secret-management system. Swarmauri packages do not operate a hosted credential store for your external provider API keys.
          </p>
        </section>
      </div>

      <section className="space-y-4 text-xs text-zinc-600 leading-relaxed">
        <div className="space-y-1.5">
          <h2 className="font-semibold text-zinc-900 text-[13px]">Package Telemetry</h2>
          <p>
            Published PyPI packages do not include hidden analytical telemetry. Package download statistics, installation logs, and package index records are governed by the package registry or package manager infrastructure used by the developer.
          </p>
        </div>

        <div className="space-y-1.5">
          <h2 className="font-semibold text-zinc-900 text-[13px]">Third-Party Integrations</h2>
          <p>
            Swarmauri adapters call external providers only when your application configures and invokes those adapters. Third-party model, vector-store, storage, cloud, and cryptography providers apply their own privacy terms to requests sent directly by your application.
          </p>
        </div>

        <div className="space-y-1.5">
          <h2 className="font-semibold text-zinc-900 text-[13px]">Contact</h2>
          <p>
            For privacy questions tied to the website, documentation, open-source package publication, or community operations, contact the Swarmauri team through the public community and repository channels.
          </p>
        </div>
      </section>
    </div>
  );
}
