import React, { useState } from "react";
import { LAYERS } from "../data/packages";
import { Code } from "lucide-react";
import SEO from "../components/SEO";
import PythonCodeHighlight from "../components/PythonCodeHighlight";

const LAYER_DETAILS: Record<
  string,
  {
    summary: string;
    dependencyPolicy: string;
    executionPattern: string;
    code: string;
  }
> = {
  "00-typing": {
    summary:
      "Standalone typing helpers used below the interface layer. This is a real package, not a facade namespace.",
    dependencyPolicy:
      "Keep it tiny and dependency-light so higher layers can share type composition helpers without importing runtime components.",
    executionPattern:
      "Imported directly from the swarmauri_typing distribution when type factories are needed.",
    code: "# Typing helpers are installed as their own foundation package.\nfrom swarmauri_typing import UnionFactory",
  },
  "10-interfaces": {
    summary:
      "Interface contracts live in swarmauri_core. They define callable surfaces such as prediction, tools, chains, and toolkit contracts.",
    dependencyPolicy:
      "Core should describe contracts, not carry provider execution logic or concrete component dependencies.",
    executionPattern:
      "Consumers import interfaces directly from swarmauri_core when implementing or validating component behavior.",
    code: "# Interface contracts live in swarmauri_core.\nfrom swarmauri_core.llms.IPredict import IPredict\nfrom swarmauri_core.tools.ITool import ITool",
  },
  "20-bases": {
    summary:
      "Reusable Pydantic-backed base classes and mixins sit above core interfaces and below concrete components.",
    dependencyPolicy:
      "Base classes can depend on core contracts and shared component models, but should not own provider-specific behavior.",
    executionPattern:
      "Custom components usually inherit from a specific base class, then implement the required runtime method.",
    code: "# Base classes implement reusable behavior over core contracts.\nfrom swarmauri_base.tools.ToolBase import ToolBase\nfrom swarmauri_base.ComponentBase import ComponentBase",
  },
  "30-standard-kernel": {
    summary:
      "swarmauri_standard is the bundled first-party standard component kernel for common documents, messages, tools, conversations, and vector stores.",
    dependencyPolicy:
      "The kernel groups broadly useful standard components; newer first-party capability packages may also be split out in the standards layer.",
    executionPattern:
      "Kernel components are imported from swarmauri_standard module paths unless accessed through a registered swarmauri facade path.",
    code: "# Bundled standard-kernel components live in swarmauri_standard.\nfrom swarmauri_standard.documents.Document import Document\nfrom swarmauri_standard.messages.HumanMessage import HumanMessage",
  },
  "40-standards": {
    summary:
      "First-party split standard packages provide focused capabilities such as token services, signing, crypto, parsers, transports, and key providers.",
    dependencyPolicy:
      "Install only the focused standard package you need when you want a smaller dependency footprint.",
    executionPattern:
      "Split packages expose their own import roots and may also be registered behind swarmauri.* facade paths.",
    code: "# Split first-party packages are installed and imported directly.\nfrom swarmauri_signing_ed25519 import Ed25519EnvelopeSigner",
  },
  "50-community": {
    summary:
      "Community and provider-specific packages use their own distribution and import roots while conforming to the same base/interface contracts where applicable.",
    dependencyPolicy:
      "Provider dependencies stay in the provider package instead of being pulled into the foundation packages.",
    executionPattern:
      "Import provider or community packages directly for explicit dependency control.",
    code: "# Community/provider packages are also direct import roots.\nfrom swarmauri_tool_jupyterexporthtml import JupyterExportHtmlTool",
  },
  "60-plugins": {
    summary:
      "Plugin packages and examples are plugin-layer packages indexed by the SDK, including manager-style packages such as EmbedXMP and example plugin packages.",
    dependencyPolicy:
      "Plugins are allowed to be integration-specific and can expose plugin entry points or direct package APIs.",
    executionPattern:
      "Plugin packages may be imported directly, and swarmauri plugin discovery scans swarmauri.* entry-point groups.",
    code: "# Plugin-layer packages can expose direct package APIs.\nfrom EmbedXMP import EmbedXMP, embed",
  },
  "70-experimental": {
    summary:
      "Experimental packages are planning-stage or incubating packages. They are indexed so the catalog is transparent, but they are not the stable public surface.",
    dependencyPolicy:
      "Treat these as isolated experiments until promoted into standard, community, plugin, or facade-backed surfaces.",
    executionPattern:
      "Use direct imports only when intentionally evaluating an experimental package.",
    code: "# Experimental packages are explicit opt-ins.\nfrom jaml import loads, dumps",
  },
  "80-facades": {
    summary:
      "The swarmauri package is the aggregate user-facing facade. It registers SwarmauriImporter and discovers plugins on import.",
    dependencyPolicy:
      "Facade imports route through registry mappings and entry-point discovery; concrete code still lives in split packages such as swarmauri_standard or swarmauri_signing_ed25519.",
    executionPattern:
      "A swarmauri.* import checks registered namespaces and maps the facade path to the concrete package path.",
    code: "# Facade import: registry maps swarmauri.* to concrete modules.\nfrom swarmauri.documents.Document import Document\nfrom swarmauri.signings.Ed25519EnvelopeSigner import Ed25519EnvelopeSigner",
  },
  "90-deprecated": {
    summary:
      "Deprecated compatibility packages remain indexed for migration visibility, but should not be presented as the preferred path for new work.",
    dependencyPolicy:
      "Prefer current standard or community package replacements; keep deprecated packages isolated when legacy compatibility is required.",
    executionPattern:
      "Deprecated packages still expose direct import roots while they remain available.",
    code: "# Deprecated compatibility imports should be migrated when practical.\nfrom swarmauri_embedding_tfidf import TfidfEmbedding\nfrom swarmauri_vectorstore_tfidf import TfidfVectorStore",
  },
};

export default function ArchitecturePage() {
  const [selectedLayerId, setSelectedLayerId] = useState("10-interfaces");

  const currentLayer = LAYERS.find((l) => l.id === selectedLayerId) || LAYERS[1];
  const currentLayerDetails = LAYER_DETAILS[currentLayer.id] || LAYER_DETAILS["10-interfaces"];

  return (
    <div className="space-y-12 py-6" id="architecture-page">
      <SEO
        title="Ecosystem Architecture"
        description="Explore the generated Swarmauri SDK package-index layer model, including direct imports, facade imports, plugin discovery, and package citizenship."
        keywords={["python namespace", "layers", "decoupling", "architectural pattern", "open-source", "interfaces"]}
      />
      {/* Page Header */}
      <div className="border-b border-zinc-200 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">
          Ecosystem Architecture
        </h1>
        <p className="text-sm text-zinc-500 mt-1 max-w-2xl">
          Swarmauri's SDK portfolio is organized by a generated package-index layer model. The layers describe package citizenship, dependency depth, and import posture across foundation packages, concrete component packages, plugins, facades, and deprecated compatibility packages.
        </p>
      </div>

      {/* Interactive Layer Diagram Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="architecture-grid">
        {/* Layer Stack Diagram (Left column) */}
        <div className="lg:col-span-5 space-y-3" id="layer-selector-stack">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Interactive Layer Stack</h3>
          <p className="text-[11px] text-zinc-400 select-none pb-2">Click any layer block to inspect its source role, dependency posture, and real import pattern.</p>
          
          <div className="flex flex-col space-y-1.5 font-mono">
            {LAYERS.map((layer) => {
              const isSelected = layer.id === selectedLayerId;
              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayerId(layer.id)}
                  id={`arch-layer-${layer.id}`}
                  className={`w-full p-2.5 rounded-lg border text-left transition-all duration-150 flex justify-between items-center ${
                    isSelected
                      ? "bg-zinc-900 border-zinc-950 text-white shadow-md translate-x-1"
                      : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300"
                  }`}
                >
                  <div className="flex items-center space-x-3 text-xs">
                    <span className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${
                      isSelected ? "bg-zinc-800 text-zinc-200" : "bg-zinc-100 text-zinc-600"
                    }`}>
                      {layer.id.split("-")[0]}
                    </span>
                    <span className="font-semibold text-[11px]">{layer.name.split("(")[0]}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    isSelected ? "bg-zinc-800 text-zinc-400" : "bg-zinc-100 text-zinc-500"
                  }`}>
                    {layer.count} pkgs
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Layer Specs Pane (Right column) */}
        <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6" id="layer-details-panel">
          <div className="space-y-2 border-b border-zinc-100 pb-4">
            <span className="text-[10px] uppercase font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
              Selected Layer: {currentLayer.id}
            </span>
            <h2 className="text-xl font-bold text-zinc-950">{currentLayer.name}</h2>
            <p className="text-sm text-zinc-600 italic">
              &ldquo;{currentLayer.meaning}&rdquo;
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-zinc-800 uppercase tracking-wider text-[10px] mb-1">Functional Description</h4>
              <p className="text-zinc-600 leading-relaxed text-xs mb-2">
                {currentLayerDetails.summary}
              </p>
              <p className="text-zinc-500 leading-relaxed text-xs">
                Package-index label: {currentLayer.description}
              </p>
            </div>

            {/* Direct Import vs Namespace Import */}
            <div>
              <h4 className="font-bold text-zinc-800 uppercase tracking-wider text-[10px] mb-2">Import & Execution Pattern</h4>
              <p className="text-zinc-600 leading-relaxed text-xs mb-2">
                {currentLayerDetails.executionPattern}
              </p>
              <pre className="bg-zinc-900 rounded-lg p-4 font-mono text-[11px] text-zinc-100 leading-relaxed overflow-x-auto whitespace-pre">
                <PythonCodeHighlight code={currentLayerDetails.code} language="python" />
              </pre>
            </div>

            {/* Extension pathway */}
            <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-200/80 space-y-3">
              <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[10px] flex items-center space-x-1">
                <Code className="w-4 h-4 text-indigo-600" />
                <span>Ecosystem Policy</span>
              </h4>
              <ul className="space-y-2 text-xs text-zinc-600">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0"></span>
                  <span><strong>Layer Source:</strong> Counts and labels come from the generated SDK package index, not from physical numbered directories.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0"></span>
                  <span><strong>Dependency Posture:</strong> {currentLayerDetails.dependencyPolicy}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0"></span>
                  <span><strong>Facade Rule:</strong> Direct package imports load concrete packages; <code className="bg-zinc-100 px-1 py-0.5 rounded">swarmauri.*</code> imports route through registry mappings and plugin discovery.</span>
                </li>
              </ul>
            </div>
            <p className="text-[10px] leading-relaxed text-zinc-400">
              Grounded in swarmauri-sdk/pkgs/package-index.toml, pkgs/swarmauri/docs/citizenship.md, pkgs/swarmauri/importer.py, and pkgs/swarmauri/plugin_manager.py.
            </p>
          </div>
        </div>
      </section>

      {/* Package lifecycle & dependency minimizer block */}
      <section className="bg-[#FAF9F6] border border-zinc-200 rounded-xl p-8 space-y-6" id="architecture-education">
        <h3 className="font-sans font-bold text-lg text-zinc-900">How Layers Map to Real Imports</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-600">
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px] font-mono">1</span>
              <span>Direct Package Import</span>
            </h4>
            <p className="leading-relaxed">
              Foundation, standard, community, plugin, experimental, and deprecated packages expose direct import roots such as <code className="bg-zinc-100 px-1 py-0.5 rounded">swarmauri_core</code>, <code className="bg-zinc-100 px-1 py-0.5 rounded">swarmauri_standard</code>, and <code className="bg-zinc-100 px-1 py-0.5 rounded">swarmauri_signing_ed25519</code>. Install the focused package when explicit dependency control matters.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px] font-mono">2</span>
              <span>Namespace Facade Resolution</span>
            </h4>
            <p className="leading-relaxed">
              Importing <code className="bg-zinc-100 px-1 py-0.5 rounded">swarmauri</code> registers <code className="bg-zinc-100 px-1 py-0.5 rounded">SwarmauriImporter</code> and runs plugin discovery. Facade paths such as <code className="bg-zinc-100 px-1 py-0.5 rounded">swarmauri.documents.Document</code> are mapped to concrete modules such as <code className="bg-zinc-100 px-1 py-0.5 rounded">swarmauri_standard.documents.Document</code>.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px] font-mono">3</span>
              <span>Extension Pathway</span>
            </h4>
            <p className="leading-relaxed">
              First-class and second-class resources share typed resource namespaces and must satisfy the required interface for that namespace. Third-class plugins live under <code className="bg-zinc-100 px-1 py-0.5 rounded">swarmauri.plugins</code> and do not require the same interface validation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
