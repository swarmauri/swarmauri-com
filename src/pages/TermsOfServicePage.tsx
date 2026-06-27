import React, { useMemo } from "react";
import { FileText, Scale, AlertTriangle, GitBranch } from "lucide-react";
import { breadcrumbListSchema } from "@mdwrk/structured-data";
import StructuredData from "../components/StructuredData";
import SEO from "../components/SEO";

export default function TermsOfServicePage() {
  const structuredData = useMemo(() => {
    try {
      return breadcrumbListSchema({
        id: "https://swarmauri.com/terms-of-service#breadcrumb",
        items: [
          { label: "Home", href: "https://swarmauri.com" },
          { label: "Terms of Service", href: "https://swarmauri.com/terms-of-service" }
        ]
      });
    } catch (e) {
      console.error("Failed to build TermsOfService structured data", e);
      return null;
    }
  }, []);

  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto" id="terms-of-service-page">
      <SEO
        title="Terms of Service"
        description="Swarmauri terms for using the company website, package catalog, documentation, community resources, and open-source SDK materials."
        keywords={["terms of service", "open source license", "MIT license", "swarmauri"]}
      />
      <StructuredData data={structuredData} />

      <div className="border-b border-zinc-200 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans flex items-center space-x-3">
          <Scale className="w-8 h-8 text-indigo-600" />
          <span>Terms of Service</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Last updated: June 25, 2026. These terms cover the public website, documentation, package catalog, and community-facing Swarmauri materials.
        </p>
      </div>

      <section className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 sm:p-6 space-y-3">
        <h2 className="font-bold text-sm text-zinc-900 flex items-center space-x-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          <span>Open-Source Use</span>
        </h2>
        <p className="text-xs text-zinc-600 leading-relaxed">
          Swarmauri software, package definitions, and source-controlled examples are distributed under their repository license terms. The website summarizes the ecosystem, but repository license files remain the controlling source for package-level license obligations.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white border border-zinc-200 rounded-xl p-5 space-y-3">
          <h2 className="font-semibold text-zinc-900 text-sm flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-indigo-600" />
            Community Contributions
          </h2>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Contributions submitted through public repositories, issues, discussions, or pull requests are handled through the applicable repository governance and contribution process.
          </p>
        </section>

        <section className="bg-white border border-zinc-200 rounded-xl p-5 space-y-3">
          <h2 className="font-semibold text-zinc-900 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-indigo-600" />
            No Warranty
          </h2>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Swarmauri materials are provided as-is. Experimental packages, examples, and integrations can change quickly and should be evaluated by your team before production use.
          </p>
        </section>
      </div>

      <section className="space-y-4 text-xs text-zinc-600 leading-relaxed">
        <div className="space-y-1.5">
          <h2 className="font-semibold text-zinc-900 text-[13px]">Responsible Integration</h2>
          <p>
            You are responsible for configuring model providers, vector stores, credential handling, security controls, data retention, and deployment environments in accordance with your own compliance requirements and provider terms.
          </p>
        </div>

        <div className="space-y-1.5">
          <h2 className="font-semibold text-zinc-900 text-[13px]">Website Content</h2>
          <p>
            Package pages, examples, and documentation are maintained as developer guidance. If a website statement conflicts with a repository license, source file, release artifact, or provider contract, the more specific source controls.
          </p>
        </div>

        <div className="space-y-1.5">
          <h2 className="font-semibold text-zinc-900 text-[13px]">Changes</h2>
          <p>
            We may update these terms as the website, documentation, package catalog, and community surfaces evolve. Continued use of the public website or materials means you accept the current posted terms.
          </p>
        </div>
      </section>
    </div>
  );
}
