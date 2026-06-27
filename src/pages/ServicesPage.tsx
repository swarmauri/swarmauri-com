import React, { useMemo } from "react";
import { BriefcaseBusiness, Code2, FileCheck2, Network } from "lucide-react";
import { breadcrumbListSchema } from "@mdwrk/structured-data";
import StructuredData from "../components/StructuredData";
import SEO from "../components/SEO";

const SERVICES = [
  {
    title: "SDK Integration",
    icon: Code2,
    text: "Implementation support for teams adopting Swarmauri packages inside typed Python services, agent workflows, provider integrations, and internal developer platforms."
  },
  {
    title: "Package Architecture",
    icon: Network,
    text: "Design review for dependency boundaries, namespace package usage, workspace layout, optional provider extras, and composable package portfolios."
  },
  {
    title: "Documentation Enablement",
    icon: FileCheck2,
    text: "Technical writing support for quickstarts, executable examples, migration notes, release updates, and developer-facing package documentation."
  }
];

export default function ServicesPage() {
  const structuredData = useMemo(() => {
    try {
      return breadcrumbListSchema({
        id: "https://swarmauri.com/services#breadcrumb",
        items: [
          { label: "Home", href: "https://swarmauri.com" },
          { label: "Services", href: "https://swarmauri.com/services" }
        ]
      });
    } catch (e) {
      console.error("Failed to build Services structured data", e);
      return null;
    }
  }, []);

  return (
    <div className="space-y-10 py-6" id="services-page">
      <SEO
        title="Swarmauri Services"
        description="Implementation, architecture, and documentation services for teams adopting Swarmauri's composable Python SDK and package ecosystem."
        keywords={["swarmauri services", "SDK implementation", "package architecture", "developer documentation"]}
      />
      <StructuredData data={structuredData} />

      <div className="border-b border-zinc-200 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans flex items-center space-x-3">
          <BriefcaseBusiness className="w-8 h-8 text-indigo-600" />
          <span>Swarmauri Services</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1 max-w-3xl">
          Practical support for organizations adopting Swarmauri packages, maintaining internal integrations, and turning the SDK into reliable developer-facing infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <section key={service.title} className="bg-white border border-zinc-200 rounded-xl p-5 space-y-3">
              <Icon className="w-5 h-5 text-indigo-600" />
              <h2 className="font-sans font-bold text-zinc-950 text-sm">{service.title}</h2>
              <p className="text-xs text-zinc-600 leading-relaxed">{service.text}</p>
            </section>
          );
        })}
      </div>

      <section className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 md:p-8 space-y-4">
        <h2 className="font-sans font-bold text-zinc-950 text-sm">Engagement Model</h2>
        <p className="text-xs text-zinc-600 leading-relaxed max-w-3xl">
          Services are scoped around concrete repository and documentation outcomes: dependency audits, package selection, install/import guidance, example validation, migration notes, and release-readiness support. Swarmauri does not require teams to use a hosted runtime to benefit from the SDK.
        </p>
      </section>
    </div>
  );
}
