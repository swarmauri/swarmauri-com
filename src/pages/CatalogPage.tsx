import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { RefreshCw, Info } from "lucide-react";
import { PACKAGES } from "../data/packages";
import { LAYERS, FAMILIES, MATURITIES, SDK_METADATA } from "../data/packageSummary";
import { softwareApplicationNode, breadcrumbListSchema } from "@mdwrk/structured-data";
import { generateSoftwareSourceCodeSchema, generateProductCollectionSchema } from "../utils/schema";
import StructuredData from "../components/StructuredData";
import CatalogFilters from "../components/CatalogFilters";
import PackageCard from "../components/PackageCard";
import PackageDetails from "../components/PackageDetails";
import SEO from "../components/SEO";

export default function CatalogPage() {
  const { packageName } = useParams<{ packageName?: string }>();
  const [copiedText, setCopiedText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLayer, setSelectedLayer] = useState("all");
  const [selectedFamily, setSelectedFamily] = useState("all");
  const [selectedMaturity, setSelectedMaturity] = useState("all");
  const [installTool, setInstallTool] = useState<"uv" | "pip">("uv");

  // Determine active package
  const selectedPackage = useMemo(() => {
    if (!packageName) return null;
    return PACKAGES.find((p) => p.name.toLowerCase() === packageName.toLowerCase()) || null;
  }, [packageName]);

  // Generators for schema
  const makeSourceNode = (pkg: typeof PACKAGES[0]) => {
    return generateSoftwareSourceCodeSchema({
      id: `https://swarmauri.com/packages/${pkg.name.toLowerCase()}#source`,
      name: pkg.name,
      description: pkg.description,
      codeRepository: `https://github.com/swarmauri/swarmauri-sdk/tree/main/${pkg.sourcePath}`,
      programmingLanguage: "Python",
      runtimePlatform: "Python " + pkg.pythonVersion,
      softwareVersion: pkg.version,
      dependencies: pkg.dependencies.join(", "),
      keywords: [pkg.family, pkg.layer, pkg.maturity, "python", "ai-framework", "swarmauri-sdk"].filter(Boolean)
    });
  };

  const makeAppNode = (pkg: typeof PACKAGES[0]) => {
    return softwareApplicationNode({
      id: `https://swarmauri.com/packages/${pkg.name.toLowerCase()}#app`,
      name: pkg.name,
      description: pkg.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      softwareVersion: pkg.version,
      publisher: { "@id": "https://swarmauri.com/#organization" }
    });
  };

  const structuredData = useMemo(() => {
    try {
      if (selectedPackage) {
        const sourceNode = makeSourceNode(selectedPackage);
        const appNode = makeAppNode(selectedPackage);
        const breadcrumbs = breadcrumbListSchema({
          id: `https://swarmauri.com/packages/${selectedPackage.name.toLowerCase()}#breadcrumb`,
          items: [
            { label: "Home", href: "https://swarmauri.com" },
            { label: "Packages", href: "https://swarmauri.com/packages" },
            { label: selectedPackage.name, href: `https://swarmauri.com/packages/${selectedPackage.name.toLowerCase()}` }
          ]
        });
        return [sourceNode, appNode, breadcrumbs];
      } else {
        // Multi-package schema listing when none is selected
        const sourceNodes = PACKAGES.map(makeSourceNode);
        const appNodes = PACKAGES.map(makeAppNode);
        const breadcrumbs = breadcrumbListSchema({
          id: "https://swarmauri.com/packages#breadcrumb",
          items: [
            { label: "Home", href: "https://swarmauri.com" },
            { label: "Packages", href: "https://swarmauri.com/packages" }
          ]
        });

        // Add ProductCollection schema as requested
        const productCollection = generateProductCollectionSchema({
          id: "https://swarmauri.com/packages#collection",
          name: "Swarmauri Package Catalog",
          description: "Comprehensive source-synchronized index of Swarmauri namespace modules.",
          url: "https://swarmauri.com/packages",
          items: PACKAGES.map((pkg) => ({
            id: `https://swarmauri.com/packages/${pkg.name.toLowerCase()}#app`,
            name: pkg.name,
            description: pkg.description,
            version: pkg.version
          }))
        });

        return [...sourceNodes, ...appNodes, breadcrumbs, productCollection];
      }
    } catch (e) {
      console.error("Failed to build Catalog structured data", e);
      return null;
    }
  }, [selectedPackage]);

  // Copy helper
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(""), 2000);
  };

  // Filter package lists
  const filteredPackages = useMemo(() => {
    return PACKAGES.filter((pkg) => {
      const matchesSearch =
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLayer = selectedLayer === "all" || pkg.layer === selectedLayer;
      const matchesFamily = selectedFamily === "all" || pkg.family === selectedFamily;
      const matchesMaturity = selectedMaturity === "all" || pkg.maturity === selectedMaturity;

      return matchesSearch && matchesLayer && matchesFamily && matchesMaturity;
    });
  }, [searchQuery, selectedLayer, selectedFamily, selectedMaturity]);

  const totalFilteredCount = filteredPackages.length;

  return (
    <div className="space-y-8 py-6" id="catalog-container">
      {selectedPackage ? (
        <SEO
          title={`${selectedPackage.name} Python Package`}
          description={selectedPackage.description}
          keywords={[selectedPackage.name, selectedPackage.family, selectedPackage.layer, selectedPackage.maturity, "python", "ai"]}
        />
      ) : (
        <SEO
          title="Package Portfolio Catalog"
          description="Browse and query Swarmauri's modular Python components. Filter by framework layers (base, core, model, vector store) and package maturities."
          keywords={["swarmauri", "python packages", "pydantic model", "ai-agents", "vector store"]}
        />
      )}
      {/* Catalog JSON-LD */}
      <StructuredData data={structuredData} />

      {/* Header & Live parameters */}
      <div className="border-b border-zinc-200 pb-5 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">
            Package Portfolio Catalog
          </h1>
          <p className="text-sm text-zinc-500 mt-1 max-w-xl">
            Source-synchronized index of Swarmauri namespace modules. Search, filter, and inspect specific installation parameters.
          </p>
        </div>
        <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3 text-right font-mono text-[10px] text-zinc-500 space-y-1 w-full md:w-auto">
          <div>Workspace member entries: <span className="font-bold text-zinc-800">{SDK_METADATA.totalWorkspaceMemberEntries}</span></div>
          <div>Unique workspace paths: <span className="font-bold text-zinc-800">{SDK_METADATA.totalWorkspaceMembers}</span></div>
          <div>Indexed package records: <span className="font-bold text-zinc-800">{SDK_METADATA.totalIndexedRecords}</span></div>
          <div>Workspace-backed index records: <span className="font-bold text-zinc-800">{SDK_METADATA.workspaceBackedIndexedRecords}</span></div>
          <div className="flex items-center justify-end space-x-1">
            <RefreshCw className="w-2.5 h-2.5 text-zinc-400 animate-spin-slow" />
            <span>Synced: {new Date(SDK_METADATA.lastGenerated).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {selectedPackage ? (
        /* Package Detail view */
        <PackageDetails
          selectedPackage={selectedPackage}
          installTool={installTool}
          setInstallTool={setInstallTool}
          copiedText={copiedText}
          copyToClipboard={copyToClipboard}
        />
      ) : (
        /* Catalog main list view with filters */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Panel: Search & Filters */}
          <CatalogFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedLayer={selectedLayer}
            setSelectedLayer={setSelectedLayer}
            selectedFamily={selectedFamily}
            setSelectedFamily={setSelectedFamily}
            selectedMaturity={selectedMaturity}
            setSelectedMaturity={setSelectedMaturity}
            LAYERS={LAYERS}
            FAMILIES={FAMILIES}
            MATURITIES={MATURITIES}
          />

          {/* Right Panel: Packages Grid List */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex justify-between items-center text-xs text-zinc-500">
              <div>
                Showing <span className="font-bold text-zinc-800">{totalFilteredCount}</span> of{" "}
                <span className="font-bold text-zinc-800">{PACKAGES.length}</span> documented catalog records
              </div>
            </div>

            {totalFilteredCount > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.name} pkg={pkg} />
                ))}
              </div>
            ) : (
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-12 text-center space-y-3">
                <Info className="w-8 h-8 text-zinc-400 mx-auto" />
                <h4 className="font-sans font-bold text-zinc-800">No Packages Match Filters</h4>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Try clearing some criteria or typing a different keyword into the search bar.
                </p>
                <button
                  onClick={() => {
                    setSelectedLayer("all");
                    setSelectedFamily("all");
                    setSelectedMaturity("all");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 bg-zinc-900 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  Reset Search
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
