import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { RefreshCw, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { PACKAGES } from "../data/packages";
import { LAYERS, FAMILIES, MATURITIES, SDK_METADATA } from "../data/packageSummary";
import { softwareApplicationNode, breadcrumbListSchema } from "@mdwrk/structured-data";
import { generateSoftwareSourceCodeSchema, generateProductCollectionSchema } from "../utils/schema";
import StructuredData from "../components/StructuredData";
import CatalogFilters from "../components/CatalogFilters";
import PackageCard from "../components/PackageCard";
import PackageDetails from "../components/PackageDetails";
import SEO from "../components/SEO";

const ITEMS_PER_PAGE = 12;

export default function CatalogPage() {
  const { packageName } = useParams<{ packageName?: string }>();
  const [copiedText, setCopiedText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLayer, setSelectedLayer] = useState("all");
  const [selectedFamily, setSelectedFamily] = useState("all");
  const [selectedMaturity, setSelectedMaturity] = useState("all");
  const [installTool, setInstallTool] = useState<"uv" | "pip">("uv");
  const [currentPage, setCurrentPage] = useState(1);

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

  // Reset page to 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLayer, selectedFamily, selectedMaturity]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalFilteredCount / ITEMS_PER_PAGE));
  }, [totalFilteredCount]);

  const activePage = useMemo(() => {
    return Math.max(1, Math.min(currentPage, totalPages));
  }, [currentPage, totalPages]);

  const paginatedPackages = useMemo(() => {
    const start = (activePage - 1) * ITEMS_PER_PAGE;
    return filteredPackages.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPackages, activePage]);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [];
    if (activePage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (activePage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", activePage - 1, activePage, activePage + 1, "...", totalPages);
    }
    return pages;
  }, [activePage, totalPages]);

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
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center text-xs text-zinc-500">
              <div>
                Showing <span className="font-bold text-zinc-800">{(activePage - 1) * ITEMS_PER_PAGE + 1}</span> -{" "}
                <span className="font-bold text-zinc-800">{Math.min(activePage * ITEMS_PER_PAGE, totalFilteredCount)}</span> of{" "}
                <span className="font-bold text-zinc-800">{totalFilteredCount}</span> documented catalog records (filtered from <span className="font-bold text-zinc-800">{PACKAGES.length}</span>)
              </div>
            </div>

            {totalFilteredCount > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paginatedPackages.map((pkg) => (
                    <PackageCard key={pkg.name} pkg={pkg} />
                  ))}
                </div>

                {/* Paginator Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-zinc-200 text-xs font-medium" id="catalog-paginator">
                    <div className="text-zinc-500">
                      Page <span className="text-zinc-850 font-bold">{activePage}</span> of <span className="text-zinc-850 font-bold">{totalPages}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={activePage === 1}
                        className="p-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer flex items-center justify-center shadow-sm"
                        aria-label="Previous Page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      {pageNumbers.map((page, idx) => {
                        if (page === "...") {
                          return (
                            <span key={idx} className="px-2 py-1 text-zinc-400">
                              ...
                            </span>
                          );
                        }
                        return (
                          <button
                            key={idx}
                            onClick={() => setCurrentPage(Number(page))}
                            className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer font-mono ${
                              activePage === page
                                ? "bg-zinc-900 border-zinc-900 text-white font-bold"
                                : "border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={activePage === totalPages}
                        className="p-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer flex items-center justify-center shadow-sm"
                        aria-label="Next Page"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
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
