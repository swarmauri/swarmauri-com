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
    const pkgs = ["swarmauri"];
    const imports = ["# 1. Base imports\nfrom swarmauri.standard import LocalModel"];
    
    // Add model imports
    if (selectedModel === "OpenAIModel") {
      pkgs.push("swarmauri_llm_openai");
      imports.push("from swarmauri_llm_openai.models.OpenAIModel import OpenAIModel");
    } else if (selectedModel === "GroqModel") {
      pkgs.push("swarmauri_llm_groq");
      imports.push("from swarmauri_llm_groq.models.GroqModel import GroqModel");
    } else if (selectedModel === "GeminiModel") {
      pkgs.push("swarmauri_llm_gemini");
      imports.push("from swarmauri_llm_gemini.models.GeminiModel import GeminiModel");
    }

    // Add tool imports
    if (selectedTool === "CalculatorTool") {
      imports.push("from swarmauri_standard.tools.CalculatorTool import CalculatorTool");
    } else if (selectedTool === "WebSearchTool") {
      pkgs.push("swarmauri_tool_websearch");
      imports.push("from swarmauri_tool_websearch.tools.WebSearchTool import WebSearchTool");
    }

    // Add memory
    imports.push("from swarmauri_standard.memories.MaxTokenMemory import MaxTokenMemory");

    // Add security
    if (selectedSecurity === "Ed25519") {
      pkgs.push("swarmauri_signing_ed25519");
      imports.push("from swarmauri_signing_ed25519.signing.Ed25519Signer import Ed25519Signer");
    } else if (selectedSecurity === "AesGcm") {
      pkgs.push("swarmauri_cipher_suite_aes");
      imports.push("from swarmauri_cipher_suite_aes.ciphers.AesGcmCipher import AesGcmCipher");
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
    } else if (selectedModel === "GeminiModel") {
      setupLines += `model = GeminiModel(api_key="AIzaSy...")\n`;
    } else {
      setupLines += `model = LocalModel(name="offline-first")\n`;
    }

    // Instantiate tool
    if (selectedTool === "CalculatorTool") {
      setupLines += `tool = CalculatorTool()\n`;
    } else if (selectedTool === "WebSearchTool") {
      setupLines += `tool = WebSearchTool(api_key="search-api-key")\n`;
    }

    // Instantiate memory
    if (selectedMemory === "WindowMemory") {
      setupLines += `memory = MaxTokenMemory(max_tokens=2048)\n`;
    } else {
      setupLines += `memory = MaxTokenMemory(max_tokens=4096)\n`;
    }

    // Security block
    if (selectedSecurity === "Ed25519") {
      setupLines += `signer = Ed25519Signer()\nprint("Secure signature active.")\n`;
    } else if (selectedSecurity === "AesGcm") {
      setupLines += `cipher = AesGcmCipher(secret_key=b"32_byte_symmetric_secret_key...")\nprint("Symmetric state cipher initialized.")\n`;
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
