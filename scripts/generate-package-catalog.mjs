import fs from "fs";
import path from "path";

const repoRoot = process.cwd();
const sdkPkgsRoot = path.resolve(repoRoot, "..", "swarmauri-sdk", "pkgs");
const packageIndexPath = path.join(sdkPkgsRoot, "package-index.toml");
const workspacePath = path.join(sdkPkgsRoot, "pyproject.toml");
const outputPath = path.join(repoRoot, "src", "data", "packages.ts");

const FAMILY_DESCRIPTIONS = {
  agents: "Agent orchestration and task-execution components.",
  auth_idp: "Authentication, OAuth, OIDC, and identity-provider packages.",
  bases: "Reusable base implementations and component behavior.",
  billing: "Billing, payment, quota, and account-metering integrations.",
  certs: "Certificate creation, verification, and certificate-authority helpers.",
  certservice: "Certificate-service integrations backed by cloud or enterprise providers.",
  cipher_suite: "Standards-oriented cryptographic cipher-suite profiles.",
  community: "Community-maintained or provider-specific integrations.",
  crypto: "Cryptographic primitives, envelopes, and encryption adapters.",
  distance: "Distance and similarity calculations for vectors and structured data.",
  embedding: "Embedding model and feature-vector generation components.",
  evaluator: "Evaluation checks for code, behavior, safety, or usage constraints.",
  evaluatorpool: "Grouped evaluator execution components.",
  example: "Example packages used to document package structure and extension patterns.",
  facade: "Aggregate user-facing namespace or facade package.",
  gitfilter: "Git filter and repository-backed storage helpers.",
  interfaces: "Interface and protocol contracts.",
  keyprovider: "Key management, key storage, and key-provider integrations.",
  keyproviders: "Key-provider integrations and compatibility surfaces.",
  layout: "Layout and rendering-oriented package experiments.",
  llm: "Large-language-model provider adapters and inference integrations.",
  measurement: "Measurement and aggregate metric utilities.",
  metric: "Metric implementations for model, data, or vector behavior.",
  middleware: "Middleware that wraps execution boundaries for security, policy, logging, or transport behavior.",
  mre_crypto: "Multi-recipient encryption and key-wrapping components.",
  ocr: "Optical character recognition components.",
  parser: "Document, text, and structured-data parser packages.",
  plugin: "Plugin packages and extension examples.",
  pop: "Proof-of-possession token and credential helpers.",
  prompt: "Prompt-template and prompt-rendering components.",
  publisher: "Message publishing and webhook/event output integrations.",
  signing: "Digital-signature generation and verification packages.",
  skills: "Skill packages and skill-execution surfaces.",
  standard_kernel: "Bundled first-party standard component kernel.",
  "standard-kernel": "Bundled first-party standard component kernel.",
  storage: "Persistent storage adapters for files, object stores, and release assets.",
  tests: "Testing and validation helper packages.",
  tokens: "Token issuance, validation, rotation, and binding helpers.",
  tool: "Callable tools that agents and workflows can execute.",
  toolkit: "Grouped tool and runtime toolkit packages.",
  transport: "Network and process transports for serialized payloads.",
  typing: "Typing helpers and generic type-composition primitives.",
  vectorstore: "Vector database and similarity-search storage integrations.",
  xmp: "Extensible Metadata Platform encoders and metadata helpers.",
};

const MATURITY_DESCRIPTIONS = {
  foundation: "Foundational package used by the SDK architecture.",
  "standard-kernel": "Bundled first-party standard component kernel.",
  standard: "First-party standards-oriented package.",
  community: "Community or provider-specific integration package.",
  plugin: "Plugin or extension package.",
  experimental: "Incubating or planning-stage package.",
  facade: "Aggregate user-facing facade package.",
  deprecated: "Compatibility package retained for older usage.",
};

function stripComment(line) {
  let inString = false;
  let quote = "";
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const prev = line[i - 1];
    if ((char === `"` || char === `'`) && prev !== "\\") {
      if (!inString) {
        inString = true;
        quote = char;
      } else if (quote === char) {
        inString = false;
      }
    }
    if (char === "#" && !inString) {
      return line.slice(0, i).trimEnd();
    }
  }
  return line.trimEnd();
}

function splitArrayItems(raw) {
  const items = [];
  let current = "";
  let inString = false;
  let quote = "";
  let depth = 0;
  for (let i = 0; i < raw.length; i += 1) {
    const char = raw[i];
    const prev = raw[i - 1];
    if ((char === `"` || char === `'`) && prev !== "\\") {
      if (!inString) {
        inString = true;
        quote = char;
      } else if (quote === char) {
        inString = false;
      }
    }
    if (!inString && (char === "[" || char === "{")) depth += 1;
    if (!inString && (char === "]" || char === "}")) depth -= 1;
    if (char === "," && !inString && depth === 0) {
      if (current.trim()) items.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  if (current.trim()) items.push(current.trim());
  return items;
}

function parseTomlValue(rawValue) {
  const value = rawValue.trim();
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+$/.test(value)) return Number(value);
  if ((value.startsWith(`"`) && value.endsWith(`"`)) || (value.startsWith(`'`) && value.endsWith(`'`))) {
    return value.slice(1, -1).replace(/\\"/g, `"`);
  }
  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();
    if (!inner) return [];
    return splitArrayItems(inner)
      .filter((item) => !item.startsWith("{"))
      .map(parseTomlValue);
  }
  if (value.startsWith("{") && value.endsWith("}")) {
    return value;
  }
  return value;
}

function normalizeKey(key) {
  const trimmed = key.trim();
  if ((trimmed.startsWith(`"`) && trimmed.endsWith(`"`)) || (trimmed.startsWith(`'`) && trimmed.endsWith(`'`))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseToml(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const root = {};
  let current = root;
  let currentArray = null;
  let pendingKey = null;
  let pendingValue = [];
  let pendingTarget = null;

  const finishPending = () => {
    if (!pendingKey) return;
    pendingTarget[pendingKey] = parseTomlValue(pendingValue.join(" "));
    pendingKey = null;
    pendingValue = [];
    pendingTarget = null;
  };

  for (const originalLine of text.split(/\r?\n/)) {
    const line = stripComment(originalLine).trim();
    if (!line) continue;

    if (pendingKey) {
      pendingValue.push(line);
      if (line.includes("]")) finishPending();
      continue;
    }

    const arrayMatch = line.match(/^\[\[([^\]]+)]]$/);
    if (arrayMatch) {
      const name = arrayMatch[1];
      root[name] ||= [];
      const item = {};
      root[name].push(item);
      current = item;
      currentArray = name;
      continue;
    }

    const sectionMatch = line.match(/^\[([^\]]+)]$/);
    if (sectionMatch) {
      currentArray = null;
      const parts = sectionMatch[1]
        .replace(/'([^']+)'/g, "$1")
        .replace(/"([^"]+)"/g, "$1")
        .split(".");
      current = root;
      for (const part of parts) {
        current[part] ||= {};
        current = current[part];
      }
      continue;
    }

    const equalIndex = line.indexOf("=");
    if (equalIndex === -1) continue;
    const key = normalizeKey(line.slice(0, equalIndex));
    const value = line.slice(equalIndex + 1).trim();
    const target = currentArray ? current : current;

    if (value.startsWith("[") && !value.includes("]")) {
      pendingKey = key;
      pendingValue = [value];
      pendingTarget = target;
      continue;
    }

    target[key] = parseTomlValue(value);
  }

  finishPending();
  return root;
}

function readWorkspaceMembers(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const section = text.match(/\[tool\.uv\.workspace]\s*([\s\S]*?)(?:\n\[|$)/);
  if (!section) return [];
  const members = section[1].match(/members\s*=\s*\[([\s\S]*?)\]/);
  if (!members) return [];
  const uncommented = members[1]
    .split(/\r?\n/)
    .map(stripComment)
    .join("\n");
  return [...uncommented.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

function safeReadToml(filePath) {
  if (!fs.existsSync(filePath)) return {};
  try {
    return parseToml(filePath);
  } catch {
    return {};
  }
}

function cleanDependencyName(value) {
  if (typeof value !== "string") return "";
  const match = value.trim().match(/^[A-Za-z0-9_.-]+/);
  return match ? match[0] : "";
}

function sentenceFromReadme(packageDir) {
  const readmePath = path.join(packageDir, "README.md");
  if (!fs.existsSync(readmePath)) return "";
  const markdown = fs.readFileSync(readmePath, "utf8");
  const cleaned = markdown
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && !line.startsWith("[!") && !line.startsWith("<"))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  const firstSentence = cleaned.match(/^(.{40,220}?[.!?])\s/);
  return firstSentence ? firstSentence[1] : cleaned.slice(0, 220);
}

function packageVersion(project, fallback) {
  return project.version || fallback || "indexed";
}

function docsLink(project, sourcePath) {
  const urls = project.urls || {};
  return urls.Documentation || urls.Source || urls.Homepage || `https://github.com/swarmauri/swarmauri-sdk/tree/master/pkgs/${sourcePath}`;
}

function importExample(name, packageDir) {
  const importRoot = name.replace(/-/g, "_");
  const sourceRoot = path.join(packageDir, importRoot);
  if (fs.existsSync(sourceRoot) || fs.existsSync(path.join(packageDir, "src", importRoot))) {
    return `import ${importRoot}\n\nprint(${importRoot}.__name__)`;
  }
  return `# Indexed package record for ${name}\n# See source path for current import roots.`;
}

function maturityFromIndex(record) {
  if (record.maturity) return String(record.maturity);
  if (record.layer === "70-experimental") return "experimental";
  if (record.layer === "90-deprecated") return "deprecated";
  if (record.layer === "60-plugins") return "plugin";
  if (record.layer === "50-community") return "community";
  if (record.layer === "40-standards") return "standard";
  if (record.layer === "80-facades") return "facade";
  return "foundation";
}

function layerName(layerId) {
  const labels = {
    "00-typing": "00-Typing Utility Layer",
    "10-interfaces": "10-Interfaces Contract Layer",
    "20-bases": "20-Base Behavior Layer",
    "30-standard-kernel": "30-Standard Kernel Layer",
    "40-standards": "40-Standards Split First-Party Layer",
    "50-community": "50-Community Provider Layer",
    "60-plugins": "60-Plugin Extension Layer",
    "70-experimental": "70-Experimental Incubator Layer",
    "80-facades": "80-Facade Namespace Layer",
    "90-deprecated": "90-Deprecated Compatibility Layer",
  };
  return labels[layerId] || layerId;
}

function writeDataFile(data) {
  const content = `import { Package, LayerInfo, FamilyInfo, MaturityInfo } from "../types";

// Generated by scripts/generate-package-catalog.mjs from swarmauri-sdk/pkgs.
// Do not hand-edit package records; refresh from the SDK package index instead.
export const SDK_METADATA = ${JSON.stringify(data.metadata, null, 2)};

export const LAYERS: LayerInfo[] = ${JSON.stringify(data.layers, null, 2)};

export const FAMILIES: FamilyInfo[] = ${JSON.stringify(data.families, null, 2)};

export const MATURITIES: MaturityInfo[] = ${JSON.stringify(data.maturities, null, 2)};

export const PACKAGES: Package[] = ${JSON.stringify(data.packages, null, 2)};
`;
  fs.writeFileSync(outputPath, content, "utf8");
}

function main() {
  if (!fs.existsSync(packageIndexPath)) {
    throw new Error(`Missing SDK package index: ${packageIndexPath}`);
  }

  const index = parseToml(packageIndexPath);
  const workspace = parseToml(workspacePath);
  const workspaceMembers = readWorkspaceMembers(workspacePath);
  const members = new Set(workspaceMembers);
  const duplicateWorkspaceMembers = [...new Set(workspaceMembers.filter((member, index) => workspaceMembers.indexOf(member) !== index))];
  const rootProject = workspace.project || {};
  const namespacePackage = safeReadToml(path.join(sdkPkgsRoot, "swarmauri", "pyproject.toml"));
  const namespaceProject = namespacePackage.project || {};

  const layerCounts = new Map();
  const familyCounts = new Map();
  const maturityCounts = new Map();
  const packages = [];

  for (const record of index.packages || []) {
    const sourcePath = String(record.path || "");
    const packageDir = path.join(sdkPkgsRoot, sourcePath);
    const packageToml = safeReadToml(path.join(packageDir, "pyproject.toml"));
    const project = packageToml.project || {};
    const name = String(record.name || project.name || path.basename(sourcePath));
    const family = String(record.family || "uncategorized");
    const layer = String(record.layer || "unlayered");
    const maturity = maturityFromIndex(record);
    const rawDependencies = Array.isArray(project.dependencies) ? project.dependencies : [];
    const dependencies = rawDependencies
      .map(cleanDependencyName)
      .filter(Boolean)
      .slice(0, 16);
    const description = String(project.description || sentenceFromReadme(packageDir) || `${name} package indexed in the Swarmauri SDK package catalog.`);

    layerCounts.set(layer, (layerCounts.get(layer) || 0) + 1);
    familyCounts.set(family, (familyCounts.get(family) || 0) + 1);
    maturityCounts.set(maturity, (maturityCounts.get(maturity) || 0) + 1);

    packages.push({
      name,
      layer,
      family,
      maturity,
      version: packageVersion(project, rootProject.version),
      description,
      installCommand: `uv add ${name}`,
      importExample: importExample(name, packageDir),
      sourcePath: `pkgs/${sourcePath}`,
      role: String(record.role || "indexed-package"),
      pythonVersion: String(project["requires-python"] || rootProject["requires-python"] || ">=3.10,<3.15"),
      dependencies,
      docsLink: docsLink(project, sourcePath),
      workspace: members.has(sourcePath),
      order: Number(record.order || 0),
      orderSource: String(record.order_source || ""),
      orderReason: String(record.order_reason || ""),
    });
  }

  const layerDescriptions = index.layers || {};
  const layers = [...layerCounts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, count]) => ({
      id,
      name: layerName(id),
      count,
      meaning: String(layerDescriptions[id] || id),
      description: String(layerDescriptions[id] || id),
    }));

  const families = [...familyCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => ({
      name,
      count,
      description: FAMILY_DESCRIPTIONS[name] || `Swarmauri ${name} package family.`,
    }));

  const maturities = [...maturityCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => ({
      name,
      count,
      description: MATURITY_DESCRIPTIONS[name] || `Swarmauri packages marked ${name}.`,
    }));

  packages.sort((a, b) => a.layer.localeCompare(b.layer) || a.order - b.order || a.family.localeCompare(b.family) || a.name.localeCompare(b.name));

  writeDataFile({
    metadata: {
      version: namespaceProject.version || rootProject.version || "unknown",
      versionPackage: namespaceProject.name || "swarmauri",
      monorepoVersion: rootProject.version || "unknown",
      pythonSupport: rootProject["requires-python"] || ">=3.10,<3.15",
      totalWorkspaceMemberEntries: workspaceMembers.length,
      totalWorkspaceMembers: members.size,
      totalIndexedRecords: packages.length,
      workspaceBackedIndexedRecords: packages.filter((pkg) => pkg.workspace).length,
      duplicateWorkspaceMembers,
      lastGenerated: new Date().toISOString(),
      source: "swarmauri-sdk/pkgs/package-index.toml",
    },
    layers,
    families,
    maturities,
    packages,
  });

  console.log(`Generated ${packages.length} package catalog records at ${outputPath}`);
}

main();
