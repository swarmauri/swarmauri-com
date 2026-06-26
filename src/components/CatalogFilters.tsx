import React from "react";
import { Search } from "lucide-react";
import { LayerInfo, FamilyInfo, MaturityInfo } from "../types";

interface CatalogFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLayer: string;
  setSelectedLayer: (layer: string) => void;
  selectedFamily: string;
  setSelectedFamily: (family: string) => void;
  selectedMaturity: string;
  setSelectedMaturity: (maturity: string) => void;
  LAYERS: LayerInfo[];
  FAMILIES: FamilyInfo[];
  MATURITIES: MaturityInfo[];
}

export default function CatalogFilters({
  searchQuery,
  setSearchQuery,
  selectedLayer,
  setSelectedLayer,
  selectedFamily,
  setSelectedFamily,
  selectedMaturity,
  setSelectedMaturity,
  LAYERS,
  FAMILIES,
  MATURITIES,
}: CatalogFiltersProps) {
  const hasActiveFilters =
    selectedLayer !== "all" ||
    selectedFamily !== "all" ||
    selectedMaturity !== "all" ||
    searchQuery !== "";

  return (
    <div className="space-y-6 bg-white border border-zinc-200 rounded-xl p-5 shadow-sm" id="catalog-filters">
      {/* Live Search */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-600">Search Packages</label>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="e.g. pinecone, ed25519..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-900 text-xs"
          />
        </div>
      </div>

      {/* Layer Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block">Filter by Layer</label>
        <select
          value={selectedLayer}
          onChange={(e) => setSelectedLayer(e.target.value)}
          className="w-full border border-zinc-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-zinc-900 text-xs bg-white"
        >
          <option value="all">All Layers ({LAYERS.length})</option>
          {LAYERS.map((layer) => (
            <option key={layer.id} value={layer.id}>
              {layer.id.split("-")[0]} - {layer.name.split("(")[0]}
            </option>
          ))}
        </select>
      </div>

      {/* Family Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block">Filter by Family</label>
        <select
          value={selectedFamily}
          onChange={(e) => setSelectedFamily(e.target.value)}
          className="w-full border border-zinc-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-zinc-900 text-xs bg-white"
        >
          <option value="all">All Families ({FAMILIES.length})</option>
          {FAMILIES.map((family) => (
            <option key={family.name} value={family.name}>
              {family.name} ({family.count})
            </option>
          ))}
        </select>
      </div>

      {/* Maturity Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block">Maturity Status</label>
        <div className="flex flex-col space-y-1">
          {["all", ...MATURITIES.map((maturity) => maturity.name)].map((status) => (
            <label key={status} className="flex items-center space-x-2 text-xs text-zinc-600 cursor-pointer">
              <input
                type="radio"
                name="maturity"
                checked={selectedMaturity === status}
                onChange={() => setSelectedMaturity(status)}
                className="text-zinc-900 focus:ring-zinc-900"
              />
              <span className="capitalize">{status === "all" ? "all" : `${status} (${MATURITIES.find((maturity) => maturity.name === status)?.count ?? 0})`}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters Reset */}
      {hasActiveFilters && (
        <button
          onClick={() => {
            setSelectedLayer("all");
            setSelectedFamily("all");
            setSelectedMaturity("all");
            setSearchQuery("");
          }}
          className="w-full py-1.5 border border-dashed border-zinc-300 text-zinc-500 hover:text-zinc-900 rounded text-[11px] font-semibold transition-colors cursor-pointer"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );
}
