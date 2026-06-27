import { PACKAGES } from "./packages";
import { SDK_METADATA } from "./packageSummary";

export interface FaqItem {
  id: string;
  category: "Product" | "Install" | "Packages" | "Docs" | "Contributing" | "Trust";
  question: string;
  answer: string;
}

const swarmauriPackage = PACKAGES.find((pkg) => pkg.name === "swarmauri");
const swarmauriCorePackage = PACKAGES.find((pkg) => pkg.name === "swarmauri_core");
const swarmauriBasePackage = PACKAGES.find((pkg) => pkg.name === "swarmauri_base");
const swarmauriStandardPackage = PACKAGES.find((pkg) => pkg.name === "swarmauri_standard");

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "what-is-swarmauri",
    category: "Product",
    question: "What is Swarmauri?",
    answer: `Swarmauri is a composable Python SDK for typed, pluggable AI and automation systems. The current site catalog is generated from the SDK package index and includes **${SDK_METADATA.totalWorkspaceMembers} active workspace members** and **${SDK_METADATA.totalIndexedRecords} indexed package records**.`
  },
  {
    id: "how-to-install",
    category: "Install",
    question: "How do I install Swarmauri?",
    answer: `For the aggregate facade package, use:\n\n\`\`\`bash\n${swarmauriPackage?.installCommand ?? "uv add swarmauri"}\n\`\`\`\n\nFor minimal contract-first environments, install only the pieces you need. Common foundation packages include \`${swarmauriCorePackage?.name ?? "swarmauri_core"}\`, \`${swarmauriBasePackage?.name ?? "swarmauri_base"}\`, and \`${swarmauriStandardPackage?.name ?? "swarmauri_standard"}\`.`
  },
  {
    id: "python-support",
    category: "Install",
    question: "Which Python versions are supported?",
    answer: `The generated package catalog reports the SDK Python support range as **\`${SDK_METADATA.pythonSupport}\`**. Individual packages may still have their own release cadence, so check the package detail page when pinning a production environment.`
  },
  {
    id: "facade-vs-split-packages",
    category: "Packages",
    question: "Should I install the main package or split packages?",
    answer: `Use \`${swarmauriPackage?.name ?? "swarmauri"}\` when you want the user-facing namespace facade and broad discovery. Use split packages when you want smaller dependency boundaries, faster cold starts, or a narrower audit surface. The package catalog exposes each package layer, source path, install command, dependency list, and maturity label.`
  },
  {
    id: "package-layers",
    category: "Packages",
    question: "How is the package catalog organized?",
    answer: "The catalog follows the SDK package-index layers: `00-typing`, `10-interfaces`, `20-bases`, `30-standard-kernel`, `40-standards`, `50-community`, `60-plugins`, `70-experimental`, `80-facades`, and `90-deprecated`. These layers separate contracts, reusable bases, first-party implementations, community/provider adapters, plugins, experiments, facades, and compatibility packages."
  },
  {
    id: "docs-location",
    category: "Docs",
    question: "Where should I look for docs and examples?",
    answer: "Use the website guides at [/guides](/guides) for quick orientation, the package catalog at [/packages](/packages) for source-generated package details, and the SDK repository at [github.com/swarmauri/swarmauri-sdk](https://github.com/swarmauri/swarmauri-sdk) for package source. The docs domain remains [docs.swarmauri.com](https://docs.swarmauri.com/) for the dedicated documentation site."
  },
  {
    id: "legacy-posts",
    category: "Docs",
    question: "Are older release posts still canonical?",
    answer: "Older imported posts are preserved as archive/version-specific update records. Treat current package counts, install commands, and package details on this site as generated catalog data, not as claims from older WordPress-era articles."
  },
  {
    id: "hosting-service",
    category: "Product",
    question: "Is Swarmauri an AI hosting service?",
    answer: "No. Swarmauri is an SDK and package ecosystem. Applications choose and configure the runtime, provider adapters, credentials, storage, and deployment environment. Provider wrappers call their respective external services only when your application configures and invokes them."
  },
  {
    id: "trust-claims",
    category: "Trust",
    question: "How are website claims kept accurate?",
    answer: `The package catalog is generated from \`${SDK_METADATA.source}\`, and the claims page is written as a citation-backed matrix. When counts change in the SDK workspace, the website catalog should be regenerated instead of hand-edited.`
  },
  {
    id: "contribute",
    category: "Contributing",
    question: "How can I contribute or report an issue?",
    answer: "Open issues and pull requests in the [Swarmauri SDK repository](https://github.com/swarmauri/swarmauri-sdk). For website or catalog issues, include the affected package name, page URL, and the source path shown in the package detail page."
  }
];

export const FAQ_CATEGORIES = [
  "all",
  ...Array.from(new Set(FAQ_ITEMS.map((item) => item.category)))
] as const;
