import React from "react";
import { Terminal, Copy, Check, Info } from "lucide-react";
import PythonCodeHighlight from "./PythonCodeHighlight";

interface ComposerPreviewProps {
  pythonCode: string;
  composedMeta: { pkgs: string[]; imports: string };
  copiedText: string;
  copyToClipboard: (text: string, id: string) => void;
}

export default function ComposerPreview({
  pythonCode,
  composedMeta,
  copiedText,
  copyToClipboard,
}: ComposerPreviewProps) {
  return (
    <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-5 md:p-6 shadow-2xl relative flex flex-col justify-between" id="composer-preview">
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
          <div className="flex items-center space-x-2 text-zinc-400">
            <Terminal className="w-4.5 h-4.5 text-indigo-400" />
            <span className="font-mono text-xs font-bold tracking-tight">composed_agent.py</span>
          </div>
          <button
            onClick={() => copyToClipboard(pythonCode, "python")}
            className="px-2.5 py-1 text-[10px] uppercase font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all cursor-pointer flex items-center space-x-1"
          >
            {copiedText === "python" ? (
              <>
                <Check className="w-3 h-3 text-green-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Python Code Display */}
        <div className="bg-zinc-900/50 rounded-lg p-4 overflow-x-auto border border-zinc-900/80">
          <pre className="font-mono text-[11px] text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre">
            <PythonCodeHighlight code={pythonCode} />
          </pre>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-zinc-800 space-y-4">
        {/* Isolated Packages to Install */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">
            Required Workspace Members
          </span>
          <div className="flex flex-wrap gap-1.5">
            {composedMeta.pkgs.map((pkg, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-indigo-950/40 border border-indigo-900/50 text-[10px] font-mono text-indigo-300 font-semibold"
              >
                {pkg}
              </span>
            ))}
          </div>
        </div>

        {/* CLI Command */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">
            Automated Install
          </span>
          <div className="bg-zinc-900 p-2.5 rounded border border-zinc-800 flex items-center justify-between text-[11px]">
            <span className="font-mono text-zinc-400 truncate">
              <span className="text-zinc-600 mr-1.5 select-none">$</span>
              uv add {composedMeta.pkgs.join(" ")}
            </span>
            <button
              onClick={() =>
                copyToClipboard(`uv add ${composedMeta.pkgs.join(" ")}`, "install-cmd")
              }
              className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300 font-bold shrink-0 pl-2 cursor-pointer"
            >
              {copiedText === "install-cmd" ? "COPIED" : "COPY"}
            </button>
          </div>
        </div>

        {/* Information Callout */}
        <div className="flex items-start space-x-2 p-3 rounded bg-zinc-900/30 border border-zinc-800/80 text-[10px] text-zinc-500">
          <Info className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Swarmauri compositions leverage exact dependency isolations. Standard and adapter classes run entirely decoupled and can be updated individually without redeploying monolithic assemblies.
          </p>
        </div>
      </div>
    </div>
  );
}
