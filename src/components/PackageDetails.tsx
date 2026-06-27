import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ExternalLink, AlertTriangle } from "lucide-react";
import { Package } from "../types";
import PythonCodeHighlight from "./PythonCodeHighlight";

interface PackageDetailsProps {
  selectedPackage: Package;
  installTool: "uv" | "pip";
  setInstallTool: (tool: "uv" | "pip") => void;
  copiedText: string;
  copyToClipboard: (text: string, id: string) => void;
}

export default function PackageDetails({
  selectedPackage,
  installTool,
  setInstallTool,
  copiedText,
  copyToClipboard,
}: PackageDetailsProps) {
  const installCommand =
    installTool === "uv"
      ? `uv add ${selectedPackage.name}`
      : `pip install ${selectedPackage.name}`;
  const maturityClass = selectedPackage.maturity === "deprecated"
    ? "bg-zinc-100 text-zinc-700 border border-zinc-200"
    : selectedPackage.maturity === "experimental" || selectedPackage.maturity.includes("incubat")
      ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
      : selectedPackage.maturity === "foundation" || selectedPackage.maturity === "standard-kernel"
        ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
        : "bg-green-100 text-green-800 border border-green-200";

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6 md:p-8 space-y-6 shadow-sm" id="package-detail-view">
      <Link
        to="/packages"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 mb-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Package Catalog</span>
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <h2 className="text-2xl font-bold font-mono text-zinc-900">{selectedPackage.name}</h2>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${maturityClass}`}>
              {selectedPackage.maturity}
            </span>
          </div>
          <p className="text-zinc-600 text-sm max-w-3xl leading-relaxed">
            {selectedPackage.description}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-mono text-zinc-400">Current version:</span>
          <div className="font-mono text-sm font-bold text-zinc-800">{selectedPackage.version}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Properties list */}
        <div className="md:col-span-2 space-y-6">
          {/* CLI Installation */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Installation Command</h3>
              <div className="flex space-x-1.5">
                <button
                  onClick={() => setInstallTool("uv")}
                  className={`px-2 py-0.5 text-[10px] rounded font-mono cursor-pointer ${installTool === "uv" ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600"}`}
                >
                  uv
                </button>
                <button
                  onClick={() => setInstallTool("pip")}
                  className={`px-2 py-0.5 text-[10px] rounded font-mono cursor-pointer ${installTool === "pip" ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600"}`}
                >
                  pip
                </button>
              </div>
            </div>
            <div className="bg-zinc-950 p-4 rounded-lg flex items-center justify-between border border-zinc-800 shadow-inner">
              <pre className="font-mono text-xs text-zinc-100 overflow-x-auto whitespace-pre pr-4">
                <PythonCodeHighlight code={`$ ${installCommand}`} language="bash" />
              </pre>
              <button
                onClick={() => copyToClipboard(installCommand, "detail-install")}
                className="px-2.5 py-1 text-[10px] uppercase font-mono rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-all border border-zinc-700 cursor-pointer shrink-0"
              >
                {copiedText === "detail-install" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Import Example */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Import & Usage Examples</h3>
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 relative">
              <pre className="font-mono text-xs text-indigo-200 overflow-x-auto whitespace-pre-wrap leading-relaxed pr-8">
                <PythonCodeHighlight code={selectedPackage.importExample} language="python" />
              </pre>
              <button
                onClick={() => copyToClipboard(selectedPackage.importExample, "detail-import")}
                className="absolute top-3 right-3 px-2 py-0.5 text-[10px] uppercase font-mono rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-all border border-zinc-700 cursor-pointer"
              >
                {copiedText === "detail-import" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Package dependencies */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Package Dependencies</h3>
            {selectedPackage.dependencies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedPackage.dependencies.map((dep, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-zinc-100 border border-zinc-200 font-mono text-xs text-zinc-700">
                    {dep}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic">No heavy third-party dependencies.</p>
            )}
          </div>
        </div>

        {/* Right Column: Metadata block */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-5 space-y-4">
          <h3 className="font-bold text-xs text-zinc-900 uppercase tracking-wider pb-2 border-b border-zinc-200">
            Package Attributes
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-bold">Layer assignment:</span>
              <span className="font-mono font-medium text-zinc-800">{selectedPackage.layer}</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-bold">Family:</span>
              <span className="font-mono font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 inline-block">
                {selectedPackage.family}
              </span>
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-bold">Functional Role:</span>
              <span className="text-zinc-700 leading-relaxed block">{selectedPackage.role}</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-bold">Workspace Membership:</span>
              <span className="font-mono font-medium text-zinc-800">{selectedPackage.workspace ? "active workspace member" : "indexed non-workspace record"}</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-bold">Layer Order:</span>
              <span className="font-mono font-medium text-zinc-800">{selectedPackage.layer}.{selectedPackage.order}</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-bold">Python Requirement:</span>
              <span className="font-mono font-medium text-zinc-800">{selectedPackage.pythonVersion}</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-bold">Monorepo source directory:</span>
              <span className="font-mono text-zinc-600 block bg-zinc-100 p-1.5 rounded border border-zinc-200 overflow-x-auto text-[11px]">
                {selectedPackage.sourcePath}
              </span>
            </div>
          </div>

          {/* Experimental warning */}
          {(selectedPackage.maturity === "experimental" || selectedPackage.maturity.includes("incubat")) && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-[11px] text-yellow-800 flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
              <span>
                <strong>Experimental Caveat:</strong> This package represents alpha research. API methods may change without prior deprecation cycles.
              </span>
            </div>
          )}

          {selectedPackage.maturity === "deprecated" && (
            <div className="p-3 bg-zinc-100 border border-zinc-200 rounded text-[11px] text-zinc-700 flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
              <span>
                <strong>Deprecated Caveat:</strong> This package is retained for compatibility and should not be presented as a preferred new-project default.
              </span>
            </div>
          )}

          {/* Link shortcuts */}
          <div className="pt-3 border-t border-zinc-200 flex flex-col space-y-2">
            <a
              href={selectedPackage.docsLink}
              target="_blank"
              rel="noreferrer"
              className="w-full text-center px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Open API Documentation</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Canonical SEO Link Display */}
          <div className="pt-3 border-t border-zinc-200 space-y-1">
            <span className="text-zinc-400 block text-[9px] uppercase font-bold tracking-wider">Canonical URL:</span>
            <span className="font-mono text-[10px] text-indigo-600 font-semibold break-all bg-indigo-50/50 p-1 rounded border border-indigo-100 block">
              https://swarmauri.com/packages/{selectedPackage.name.toLowerCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
