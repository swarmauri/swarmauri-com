import React from "react";
import { Terminal, Code, Check } from "lucide-react";
import { GuideTopic } from "../types";
import PythonCodeHighlight from "./PythonCodeHighlight";

interface GuideViewerProps {
  activeGuide: GuideTopic;
  copiedText: string;
  copyToClipboard: (text: string, id: string) => void;
}

export default function GuideViewer({
  activeGuide,
  copiedText,
  copyToClipboard,
}: GuideViewerProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5 md:p-8 space-y-6 shadow-sm" id="guide-viewer">
      <div className="border-b border-zinc-100 pb-5">
        <h2 className="text-xl font-bold text-zinc-900 font-sans tracking-tight">
          {activeGuide.title}
        </h2>
        <p className="text-sm text-zinc-500 mt-1.5 leading-relaxed">
          {activeGuide.description}
        </p>
      </div>

      {/* Code Editor Preview */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
          <div className="flex items-center space-x-1">
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>executable_snippet.py</span>
          </div>
          <button
            onClick={() => copyToClipboard(activeGuide.codeBlock, activeGuide.id)}
            className="px-2 py-0.5 rounded border border-zinc-200 hover:border-zinc-300 font-bold bg-zinc-50 transition-all cursor-pointer"
          >
            {copiedText === activeGuide.id ? "COPIED" : "COPY CODE"}
          </button>
        </div>

        <div className="bg-zinc-950 p-4 rounded-lg shadow-inner relative border border-zinc-800">
          <pre className="font-mono text-xs text-indigo-200 overflow-x-auto whitespace-pre leading-relaxed">
            <PythonCodeHighlight code={activeGuide.codeBlock} />
          </pre>
        </div>
      </div>

      {/* Dynamic Explanation */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 flex items-center space-x-1">
          <Code className="w-3.5 h-3.5 text-indigo-500" />
          <span>Protocol Explanation</span>
        </h3>
        <p className="text-xs text-zinc-600 leading-relaxed bg-zinc-50/50 p-4 rounded-lg border border-zinc-200/50">
          {activeGuide.explanation}
        </p>
      </div>
    </div>
  );
}
