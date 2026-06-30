import React from "react";
import { Sliders, Cpu, Layers } from "lucide-react";

interface ComposerSelectorProps {
  selectedModel: string;
  setSelectedModel: (m: string) => void;
  selectedTool: string;
  setSelectedTool: (t: string) => void;
  selectedMemory: string;
  setSelectedMemory: (m: string) => void;
  selectedSecurity: string;
  setSelectedSecurity: (s: string) => void;
}

export default function ComposerSelector({
  selectedModel,
  setSelectedModel,
  selectedTool,
  setSelectedTool,
  selectedMemory,
  setSelectedMemory,
  selectedSecurity,
  setSelectedSecurity,
}: ComposerSelectorProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5 md:p-6 space-y-6 shadow-sm" id="composer-selector">
      <div className="flex items-center space-x-2 pb-4 border-b border-zinc-100">
        <Sliders className="w-5 h-5 text-indigo-600" />
        <h2 className="font-sans font-bold text-zinc-900 text-sm uppercase tracking-wider">
          Composition Parameters
        </h2>
      </div>

      {/* Model Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
          Model Provider wrapper
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "OpenAIModel", name: "OpenAI", desc: "GPT-4o, o1" },
            { id: "GroqModel", name: "Groq", desc: "Llama-3, Mixtral" },
            { id: "GeminiProModel", name: "Gemini", desc: "Gemini 1.5, 2.0" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedModel(item.id)}
              className={`p-3 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                selectedModel === item.id
                  ? "bg-indigo-50/50 border-indigo-600 ring-1 ring-indigo-500"
                  : "bg-zinc-50/50 border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <div className="font-mono font-bold text-zinc-900">{item.name}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Tool Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
          Callable Agentic Tools
        </label>
        <select
          value={selectedTool}
          onChange={(e) => setSelectedTool(e.target.value)}
          className="w-full border border-zinc-300 rounded-md p-2.5 focus:outline-none focus:ring-1 focus:ring-zinc-900 text-xs bg-white"
        >
          <option value="CalculatorTool">CalculatorTool (Swarmauri Standard)</option>
          <option value="ImportMemoryModuleTool">ImportMemoryModuleTool (Swarmauri Standard)</option>
        </select>
      </div>

      {/* Memory Option */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
          Prompt Budget
        </label>
        <div className="flex gap-4">
          <label className="flex items-center space-x-2 text-xs text-zinc-600 cursor-pointer">
            <input
              type="radio"
              name="memory"
              checked={selectedMemory === "WindowMemory"}
              onChange={() => setSelectedMemory("WindowMemory")}
              className="text-zinc-900 focus:ring-zinc-900"
            />
            <span>Context budget (2k)</span>
          </label>
          <label className="flex items-center space-x-2 text-xs text-zinc-600 cursor-pointer">
            <input
              type="radio"
              name="memory"
              checked={selectedMemory === "FullMemory"}
              onChange={() => setSelectedMemory("FullMemory")}
              className="text-zinc-900 focus:ring-zinc-900"
            />
            <span>Context budget (4k)</span>
          </label>
        </div>
      </div>

      {/* Security Level */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
          Cryptographic Guardrails
        </label>
        <select
          value={selectedSecurity}
          onChange={(e) => setSelectedSecurity(e.target.value)}
          className="w-full border border-zinc-300 rounded-md p-2.5 focus:outline-none focus:ring-1 focus:ring-zinc-900 text-xs bg-white"
        >
          <option value="None">None (Standard execution)</option>
          <option value="Ed25519">Ed25519 Envelope Signer</option>
        </select>
      </div>
    </div>
  );
}
