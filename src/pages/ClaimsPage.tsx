import React, { useState, useMemo } from "react";
import { CLAIM_RECORDS } from "../data/claims";
import { ShieldCheck, Filter, AlertCircle } from "lucide-react";
import { claimNode, claimReviewNode, breadcrumbListSchema } from "@mdwrk/structured-data";
import StructuredData from "../components/StructuredData";
import ClaimCard from "../components/ClaimCard";
import SEO from "../components/SEO";

export default function ClaimsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredClaims = selectedCategory === "all"
    ? CLAIM_RECORDS
    : CLAIM_RECORDS.filter((c) => c.category === selectedCategory);

  const structuredData = useMemo(() => {
    try {
      const claimNodes = CLAIM_RECORDS.map((c) =>
        claimNode({
          id: `https://swarmauri.com/claims/${c.id}#claim`,
          name: c.claim,
          description: c.details,
          appearance: {
            id: `https://swarmauri.com/claims#appearance-${c.id}`,
            text: c.claim,
            author: { id: "https://swarmauri.com#organization", name: "Swarmauri" },
            claimInterpreter: { id: "https://swarmauri.com#verifier", name: "Swarmauri Core Verifier" },
            datePublished: "2026-06-26"
          }
        })
      );

      const claimReviewNodes = CLAIM_RECORDS.map((c) => {
        const ratingMap = {
          t0: { value: 0, text: "Informational assertion" },
          t1: { value: 1, text: "Self-Certified / Declarative contract" },
          t2: { value: 2, text: "Automated Test Verification" },
          t3: { value: 3, text: "Cryptographically Verified" },
          t4: { value: 4, text: "SSOT Registry Governance / Certified" }
        };

        const rating = c.reviewRating ? ratingMap[c.reviewRating] : ratingMap.t0;

        return claimReviewNode({
          id: `https://swarmauri.com/claims/${c.id}#review`,
          claimReviewed: c.claim,
          itemReviewed: {
            "@type": "SoftwareSourceCode",
            "name": c.package,
            "description": `Ecosystem Target: ${c.package}`
          },
          author: {
            "@type": "Organization",
            "@id": "https://swarmauri.com/#organization",
            "name": c.author || "Swarmauri Governance"
          },
          reviewRating: {
            "@type": "Rating",
            "ratingValue": rating.value.toString(),
            "bestRating": "4",
            "worstRating": "0",
            "alternateName": c.reviewRating || "t0",
            "description": rating.text
          },
          datePublished: "2026-06-26",
          // Extra parameters for advanced claims indexing
          url: `https://swarmauri.com/claims/${c.id}`,
          citation: c.citation,
          about: c.about,
          firstAppearance: c.firstAppearance
        } as any);
      });

      const breadcrumbs = breadcrumbListSchema({
        id: "https://swarmauri.com/claims#breadcrumb",
        items: [
          { label: "Home", href: "https://swarmauri.com" },
          { label: "Claims", href: "https://swarmauri.com/claims" }
        ]
      });

      return [...claimNodes, ...claimReviewNodes, breadcrumbs];
    } catch (e) {
      console.error("Failed to build Claims structured data", e);
      return null;
    }
  }, []);

  const categories = ["all", "Packaging", "Security", "Architecture", "Integrations", "Maturity"];

  return (
    <div className="space-y-12 py-6" id="claims-page">
      <SEO
        title="Active Claims & Verifications"
        description="Verify Swarmauri's claims across packaging decoupling, cryptography standards, interface protocols, and third-party integrations with verifiable evidence and ratings."
        keywords={["claims", "cryptography validation", "packaging decoupling", "swarmauri sdk", "verification ratings"]}
      />
      {/* Claims JSON-LD */}
      <StructuredData data={structuredData} />

      {/* Page Header */}
      <div className="border-b border-zinc-200 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans flex items-center space-x-2">
          <ShieldCheck className="w-8 h-8 text-indigo-600" />
          <span>Active Claims & Verifications</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1 max-w-2xl">
          Transparent cryptographic, architectural, and decoupling assertions. We verify every claim with live telemetry and automated test suites.
        </p>
      </div>

      {/* Claims Content Area */}
      <div className="space-y-6">
        {/* Category filtering */}
        <div className="flex items-center justify-between flex-wrap gap-4 bg-zinc-50 border border-zinc-200 rounded-lg p-3">
          <div className="flex items-center space-x-2 text-xs text-zinc-600 font-medium">
            <Filter className="w-4 h-4 text-zinc-400" />
            <span>Filter Claims:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs rounded-full cursor-pointer transition-all border ${
                  selectedCategory === cat
                    ? "bg-zinc-900 border-zinc-950 text-white font-semibold"
                    : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                <span className="capitalize">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Claims list */}
        {filteredClaims.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="claims-grid">
            {filteredClaims.map((claim) => (
              <ClaimCard key={claim.id} claim={claim} />
            ))}
          </div>
        ) : (
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-12 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-zinc-400 mx-auto" />
            <h4 className="font-sans font-bold text-zinc-800">No Claims Found</h4>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              No verified records exist for the selected category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
