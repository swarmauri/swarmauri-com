import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import StructuredData from "./StructuredData";
import { organizationNode, webSiteSchema } from "@mdwrk/structured-data";

export default function Layout() {
  const globalStructuredData = useMemo(() => {
    try {
      const org = organizationNode({
        id: "https://swarmauri.com/#organization",
        name: "Swarmauri",
        description: "An open-source python platform for building composable, typed AI structures.",
        url: "https://swarmauri.com",
        logo: "https://swarmauri.com/logo.png",
        sameAs: [
          "https://github.com/swarmauri",
          "https://github.com/swarmauri/swarmauri-sdk"
        ]
      });

      const website = webSiteSchema({
        id: "https://swarmauri.com/#website",
        name: "Swarmauri Ecosystem",
        description: "Explore Swarmauri: A modular, contract-first open source framework for agents, language models, vector stores, and security-certified adapters.",
        url: "https://swarmauri.com",
        publisher: { "@id": "https://swarmauri.com/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://swarmauri.com/packages?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        } as any
      });

      return [org, website];
    } catch (e) {
      console.error("Failed to generate global structured data", e);
      return [];
    }
  }, []);

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

