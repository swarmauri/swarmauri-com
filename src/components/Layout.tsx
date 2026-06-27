import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import StructuredData from "./StructuredData";
import { CANONICAL_TAXONOMY_DESCRIPTION } from "../data/taxonomy";

export default function Layout() {
  const globalStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://swarmauri.com/#organization",
      name: "Swarmauri",
      description: CANONICAL_TAXONOMY_DESCRIPTION,
      url: "https://swarmauri.com",
      logo: "https://swarmauri.com/logo.png",
      sameAs: [
        "https://github.com/swarmauri",
        "https://github.com/swarmauri/swarmauri-sdk",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://swarmauri.com/#website",
      name: "Swarmauri Ecosystem",
      description: CANONICAL_TAXONOMY_DESCRIPTION,
      url: "https://swarmauri.com",
      publisher: { "@id": "https://swarmauri.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://swarmauri.com/packages?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between" id="app-shell">
      {/* Global JSON-LD Schema */}
      <StructuredData data={globalStructuredData} />

      {/* Dynamic Grid Background Overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] z-0"></div>

      <div className="relative z-10 w-full flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
