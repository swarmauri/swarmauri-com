import React, { useState, useMemo } from "react";
import { Cpu } from "lucide-react";
import ComposerSelector from "../components/ComposerSelector";
import ComposerPreview from "../components/ComposerPreview";
import SEO from "../components/SEO";

export default function ComposerPage() {
  const [selectedModel, setSelectedModel] = useState("OpenAIModel");
  const [selectedTool, setSelectedTool] = useState("CalculatorTool");
  const [selectedMemory, setSelectedMemory] = useState("WindowMemory");
  const [selectedSecurity, setSelectedSecurity] = useState("None");
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(""), 2000);
  };

  // Compile dependencies list based on configuration
  const composedMeta = useMemo(() => {
    const pkgs = ["swarmauri", "swarmauri_standard"];
    const imports = ["# 1. Activate Swarmauri namespace discovery\nimport swarmauri"];
    
    // Add model imports
    if (selectedModel === "OpenAIModel") {
      pkgs.push("swarmauri_llm_openai");
      imports.push(
        "from swarmauri_llm_openai.OpenAIModel import (\n" +
          "    OpenAIModel,\n" +
          ")",
      );
    } else if (selectedModel === "GroqModel") {
      pkgs.push("swarmauri_llm_groq");
      imports.push("from swarmauri_llm_groq.GroqModel import GroqModel");
    } else if (selectedModel === "GeminiProModel") {
      pkgs.push("swarmauri_llm_gemini");
      imports.push(
        "from swarmauri_llm_gemini.GeminiProModel import GeminiProModel",
      );
    }

    // Add tool imports
    if (selectedTool === "CalculatorTool") {
      imports.push(
        "from swarmauri_standard.tools.CalculatorTool import (\n" +
          "    CalculatorTool,\n" +
          ")",
      );
    } else if (selectedTool === "ImportMemoryModuleTool") {
      imports.push(
        "from swarmauri_standard.tools.ImportMemoryModuleTool import (\n" +
          "    ImportMemoryModuleTool,\n" +
          ")",
      );
    }

    // Add security
    if (selectedSecurity === "Ed25519") {
      pkgs.push("swarmauri_signing_ed25519");
      imports.push(
        "from swarmauri_signing_ed25519.Ed25519EnvelopeSigner import (\n" +
          "    Ed25519EnvelopeSigner,\n" +
          ")",
      );
    }

    return {
      pkgs,
      imports: imports.join("\n"),
    };
  }, [selectedModel, selectedTool, selectedMemory, selectedSecurity]);

  // Generate python preview
  const pythonCode = useMemo(() => {
    let setupLines = `${composedMeta.imports}
 
# 2. Component Initialization
`;

    // Instantiate model
    if (selectedModel === "OpenAIModel") {
      setupLines += `model = OpenAIModel(api_key="sk-openai-...")\n`;
    } else if (selectedModel === "GroqModel") {
      setupLines += `model = GroqModel(api_key="gsk-groq-...")\n`;
    } else if (selectedModel === "GeminiProModel") {
      setupLines += `model = GeminiProModel(api_key="AIzaSy...")\n`;
    }

    // Instantiate tool
    if (selectedTool === "CalculatorTool") {
      setupLines += `tool = CalculatorTool()\n`;
    } else if (selectedTool === "ImportMemoryModuleTool") {
      setupLines += `tool = ImportMemoryModuleTool()\n`;
    }

    // Configure memory budget
    if (selectedMemory === "WindowMemory") {
      setupLines += `memory_budget_tokens = 2048\n`;
    } else {
      setupLines += `memory_budget_tokens = 4096\n`;
    }

    // Security block
    if (selectedSecurity === "Ed25519") {
      setupLines += `signer_cls = Ed25519EnvelopeSigner\nprint("Ed25519 signer available.")\n`;
    }

    setupLines += `
# 3. Composed execution pathway
# Since all modules implement IModel, ITool, or ISigner protocols,
# they can be woven together under standard runtime loops safely.
print("Agent runtime initialized successfully!")
`;
    return setupLines;
  }, [composedMeta, selectedModel, selectedTool, selectedMemory, selectedSecurity]);

  return (
    <div className="space-y-12 py-6" id="composer-page">
      <SEO
        title="Agent Workflow Composer"
        description="Weave customized execution routes using Swarmauri's separated package primitives. Build real-time code layouts with exact PEP dependency definitions and modular agent parts."
        keywords={["agent composer", "python composition", "code generation", "swarmauri sdk", "agent runtime"]}
      />
      {/* Header */}
      <div className="border-b border-zinc-200 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans flex items-center space-x-2">
          <Cpu className="w-8 h-8 text-indigo-600 animate-pulse" />
          <span>Workflow Composer</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1 max-w-2xl">
          Weave customized execution routes using Swarmauri's separated package primitives. Build real-time code layouts with exact PEP dependency definitions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left selector */}
        <ComposerSelector
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          selectedMemory={selectedMemory}
          setSelectedMemory={setSelectedMemory}
          selectedSecurity={selectedSecurity}
          setSelectedSecurity={setSelectedSecurity}
        />

        {/* Right preview */}
        <ComposerPreview
          pythonCode={pythonCode}
          composedMeta={composedMeta}
          copiedText={copiedText}
          copyToClipboard={copyToClipboard}
        />
      </div>
    </div>
  );
}
