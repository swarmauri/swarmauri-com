import React, { useState } from "react";
import { LAYERS } from "../data/packages";
import { Code } from "lucide-react";
import SEO from "../components/SEO";

export default function ArchitecturePage() {
  const [selectedLayerId, setSelectedLayerId] = useState("10-interfaces");

  const currentLayer = LAYERS.find((l) => l.id === selectedLayerId) || LAYERS[1];

  return (
    <div className="space-y-12 py-6" id="architecture-page">
      <SEO
        title="Ecosystem Architecture"
        description="Explore the architectural 10-layer namespace package stack of the Swarmauri Ecosystem. Learn how decoupling, minimal footprints, and strict constraints ensure reliable software."
        keywords={["python namespace", "layers", "decoupling", "architectural pattern", "open-source", "interfaces"]}
      />
      {/* Page Header */}
      <div className="border-b border-zinc-200 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">
          Ecosystem Architecture
        </h1>
        <p className="text-sm text-zinc-500 mt-1 max-w-2xl">
          Swarmauri uses a 10-layer namespace package stack to achieve strict decoupling, minimal container footprints, and reliable execution.
        </p>
      </div>

      {/* Interactive Layer Diagram Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="architecture-grid">
        {/* Layer Stack Diagram (Left column) */}
        <div className="lg:col-span-5 space-y-3" id="layer-selector-stack">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Interactive Layer Stack</h3>
          <p className="text-[11px] text-zinc-400 select-none pb-2">Click any layer block to inspect its interfaces, constraints, and dependencies.</p>
          
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
              <p className="text-zinc-600 leading-relaxed text-xs">
                {currentLayer.description}
              </p>
            </div>

            {/* Direct Import vs Namespace Import */}
            <div>
              <h4 className="font-bold text-zinc-800 uppercase tracking-wider text-[10px] mb-2">Import & Execution Pattern</h4>
              <div className="bg-zinc-900 rounded-lg p-4 font-mono text-[11px] text-zinc-100 space-y-2 leading-relaxed">
                {selectedLayerId === "10-interfaces" && (
                  <>
                    <div className="text-zinc-500"># Direct clean interface boundaries. NO EXECUTION LOGIC</div>
                    <div>from swarmauri_core.models.IModel import IModel</div>
                  </>
                )}
                {selectedLayerId === "20-bases" && (
                  <>
                    <div className="text-zinc-500"># Inheriting standard Pydantic models for custom components</div>
                    <div>from swarmauri_base.tools.ToolBase import ToolBase</div>
                  </>
                )}
                {selectedLayerId === "50-community" && (
                  <>
                    <div className="text-zinc-500"># Third-party SaaS provider wrapper imports</div>
                    <div>from swarmauri_llm_openai.models.OpenAIModel import OpenAIModel</div>
                  </>
                )}
                {selectedLayerId !== "10-interfaces" && selectedLayerId !== "20-bases" && selectedLayerId !== "50-community" && (
                  <>
                    <div className="text-zinc-500"># Typical component access path</div>
                    <div>from swarmauri.standard import LocalModel</div>
                  </>
                )}
              </div>
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
                  <span><strong>Granular Scope:</strong> Dependencies are isolated strictly within this layer's individual pyproject declarations.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0"></span>
                  <span><strong>Stable API:</strong> Protocol checks inside Core prevent version drifting of lower levels.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Package lifecycle & dependency minimizer block */}
      <section className="bg-[#FAF9F6] border border-zinc-200 rounded-xl p-8 space-y-6" id="architecture-education">
        <h3 className="font-sans font-bold text-lg text-zinc-900">Understanding Direct Imports vs Namespace Facades</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-600">
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px] font-mono">1</span>
              <span>Direct Package Import</span>
            </h4>
            <p className="leading-relaxed">
              When deploying ultra-lightweight Docker images, developers bypass the main <code className="bg-zinc-100 px-1 py-0.5 rounded">swarmauri</code> package completely. They install only <code className="bg-zinc-100 px-1 py-0.5 rounded">swarmauri_core</code> and the specific integration package (e.g. <code className="bg-zinc-100 px-1 py-0.5 rounded">swarmauri_llm_openai</code>).
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px] font-mono">2</span>
              <span>Namespace Facade Resolution</span>
            </h4>
            <p className="leading-relaxed">
              When using the global <code className="bg-zinc-100 px-1 py-0.5 rounded">swarmauri</code> facade, Swarmauri leverages native PEP namespace package paths. This allows clean, uniform import statements while splitting real module code across various system directories.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px] font-mono">3</span>
              <span>Extension Pathway</span>
            </h4>
            <p className="leading-relaxed">
              Community members build custom pluggable components by subclassing the Pydantic-based Base classes. By following the naming conventions, custom packages are automatically recognized by the dynamic loader during setup.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
