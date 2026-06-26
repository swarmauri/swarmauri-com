import React, { useMemo } from "react";
import { Shield, FileText, Lock, Scale } from "lucide-react";
import { breadcrumbListSchema } from "@mdwrk/structured-data";
import StructuredData from "../components/StructuredData";
import SEO from "../components/SEO";

export default function PrivacyTermsPage() {
  const structuredData = useMemo(() => {
    try {
      return breadcrumbListSchema({
        id: "https://swarmauri.com/privacy-terms#breadcrumb",
        items: [
          { label: "Home", href: "https://swarmauri.com" },
          { label: "Privacy & Terms", href: "https://swarmauri.com/privacy-terms" }
        ]
      });
    } catch (e) {
      console.error("Failed to build PrivacyTerms structured data", e);
      return null;
    }
  }, []);

  return (
    <div className="space-y-12 py-6 max-w-4xl mx-auto" id="privacy-terms-page">
      <SEO
        title="Privacy Policy & Terms of Service"
        description="Swarmauri Ecosystem Privacy Policy and Terms of Service. Review rules for open-source packages, liability disclosures, and license terms."
        keywords={["privacy policy", "terms of service", "open source license", "legal disclosure"]}
      />
      {/* Privacy & Terms JSON-LD */}
      <StructuredData data={structuredData} />

      {/* Page Header */}
      <div className="border-b border-zinc-200 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans flex items-center space-x-3">
          <Scale className="w-8 h-8 text-indigo-600" />
          <span>Privacy Policy & Terms of Service</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Last Updated: June 25, 2026 | Effective immediately for all open-source repositories and packages.
        </p>
      </div>

      {/* Intro block */}
      <section className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 sm:p-6 space-y-3">
        <h3 className="font-bold text-sm text-zinc-900 flex items-center space-x-2">
          <Shield className="w-5 h-5 text-indigo-600" />
          <span>Swarmauri Privacy Commitment</span>
        </h3>
        <p className="text-xs text-zinc-600 leading-relaxed">
          At Swarmauri, we believe that trust is the foundation of the developer-maintainer relationship. Because our SDK runs entirely on your local infrastructure or custom sandboxes, <strong>we do not collect, store, or transmit your proprietary data, API keys, or conversation histories</strong>. All integrations with third-party providers (like OpenAI, Groq, or Pinecone) execute directly from your client nodes to those respective endpoints.
        </p>
      </section>

      {/* Two Columns Grid for Privacy vs Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Privacy Policy */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-zinc-200 pb-2">
            <Lock className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-zinc-950 font-sans">Privacy Policy</h2>
          </div>

          <div className="space-y-4 text-xs text-zinc-600 leading-relaxed">
            <div className="space-y-1.5">
              <h3 className="font-semibold text-zinc-900 text-[13px]">1. Data Collection Scope</h3>
              <p>
                Our package catalog, landing website, and SDK code do not employ tracking beacons or persistent surveillance cookies. Standard web server access logs are retained only for temporary debugging and security audits.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-semibold text-zinc-900 text-[13px]">2. Secrets & API Key Safety</h3>
              <p>
                Your API credentials (such as those stored in <code className="bg-zinc-100 p-0.5 rounded font-mono text-[10px]">.env</code> files or system parameters) are loaded directly into standard Python runtime environments. Our codebase is open-source, allowing you to audit all model handlers line-by-line to verify zero telemetry egress.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-semibold text-zinc-900 text-[13px]">3. Open Source Analytics</h3>
              <p>
                We do not include hidden analytical telemetry in published PyPI binaries. When you invoke <code className="bg-zinc-100 p-0.5 rounded font-mono text-[10px]">uv add swarmauri</code>, standard package retrieval statistics are managed solely by PyPI infrastructure under their global privacy standard.
              </p>
            </div>
          </div>
        </div>

        {/* Terms of Service */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-zinc-200 pb-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-zinc-950 font-sans">Terms of Service</h2>
          </div>

          <div className="space-y-4 text-xs text-zinc-600 leading-relaxed">
            <div className="space-y-1.5">
              <h3 className="font-semibold text-zinc-900 text-[13px]">1. MIT License Alignment</h3>
              <p>
                The Swarmauri software repository, package definitions, and configuration helpers are distributed under the liberal MIT License. You may integrate our modular layers into both private commercial software and non-profit research pipelines without paying royalties.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-semibold text-zinc-900 text-[13px]">2. No Warranties (As-Is)</h3>
              <p>
                Our software ecosystem is provided "as is" without representations or warranties of any kind. This is especially true of our <code className="bg-zinc-100 p-0.5 rounded font-mono text-[10px]">70-experimental</code> planner modules, which are active research environments subject to high API drift.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-semibold text-zinc-900 text-[13px]">3. Responsible Integration</h3>
              <p>
                When utilizing our model wrappers, custom tools, or transports, you are responsible for adhering to safety guidelines and API usage limits prescribed by underlying provider networks (e.g. OpenAI, Anthropic, Google Cloud).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact and Questions */}
      <section className="bg-[#FAF9F6] border border-zinc-200 rounded-xl p-6 text-center space-y-2">
        <h4 className="font-sans font-bold text-zinc-900 text-xs uppercase tracking-wider">Need Custom Legal Clearances?</h4>
        <p className="text-xs text-zinc-500 max-w-xl mx-auto leading-relaxed">
          If your compliance department requires signed non-disclosure arrangements, secure air-gapped support SLAs, or specific licensing models, contact the core team directly on our Community Hub.
        </p>
      </section>
    </div>
  );
}
