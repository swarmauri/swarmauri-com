import { UpdatePost } from "../types";
import { LEGACY_UPDATE_POSTS } from "./legacyContent";
import { SDK_METADATA } from "./packages";

const CURRENT_UPDATE_POSTS: UpdatePost[] = [
  {
    id: "up-01",
    title: `Swarmauri SDK ${SDK_METADATA.version} Update: Granular Package Portfolio`,
    date: "2026-06-22",
    category: "Release Notes",
    summary: `Swarmauri ${SDK_METADATA.version} now presents the namespace package as the primary release signal, with ${SDK_METADATA.totalWorkspaceMembers} active workspace members and ${SDK_METADATA.totalIndexedRecords} indexed package records organized by layer, role, and maturity.`,
    content: `The Swarmauri package portfolio has been reorganized around a source-generated package index so developers can choose between the aggregate \`swarmauri\` facade and focused split packages without guessing where capabilities live.

The current public release signal is the \`swarmauri\` namespace package at \`${SDK_METADATA.version}\`. The repository-level workspace still has its own internal monorepo version, but the website header, update copy, and package portfolio should treat the namespace package as the user-facing SDK version.

## What changed

- The catalog now tracks ${SDK_METADATA.totalWorkspaceMembers} active workspace members and ${SDK_METADATA.totalIndexedRecords} indexed package records.
- Foundation packages such as \`swarmauri_typing\`, \`swarmauri_core\`, \`swarmauri_base\`, and \`swarmauri_standard\` are separated from provider, plugin, experimental, facade, and deprecated compatibility packages.
- Provider and integration packages, including Pinecone, AWS S3, OpenAI, GitHub, Redis, RabbitMQ, transport, signing, token, certificate, billing, parser, and storage packages, can be installed directly when a service needs a narrow dependency footprint.
- The aggregate \`swarmauri\` facade remains available for developers who want namespace imports and registry-backed discovery.

## Why it matters

Swarmauri is not a single monolithic Python dependency. It is a layered package ecosystem. Contract-only environments can start with \`swarmauri_core\`; component authors can build on \`swarmauri_base\`; application teams can install concrete standard, community, and provider packages only when those capabilities are needed.

That structure reduces cold-start weight, narrows audit scope, and makes package ownership clearer for documentation, release notes, and support. It also helps teams explain the SDK accurately: the package catalog is generated from \`${SDK_METADATA.source}\`, while installation and usage examples are rendered from the generated website data.

## Recommended install paths

\`\`\`bash
# Broad namespace facade
uv add swarmauri

# Contract-first environment
uv add swarmauri_core swarmauri_typing

# Focused provider or capability package
uv add swarmauri_storage_s3 swarmauri_vectorstore_pinecone swarmauri_llm_openai
\`\`\`

For most application developers, start with \`swarmauri\` or \`swarmauri_standard\`. For production services with strict dependency boundaries, install only the split packages required by that service.`
  },
  {
    id: "up-02",
    title: "Why Composable Architecture is Critical for Agent Safety",
    date: "2026-06-15",
    category: "Architecture Notes",
    summary: "Reflecting on how monolithic AI frameworks introduce significant security threats and why Swarmauri chooses strict contract decoupling.",
    content: "When an application imports a massive AI SDK, it imports hundreds of transitive dependencies, multiplying the surface for supply chain exploits. Swarmauri isolates signature verifiers (`swarmauri_signing_ed25519`), key vaults, and SaaS integrations. By establishing strict Python Protocol interfaces, you can audit critical components line-by-line."
  },
  {
    id: "up-03",
    title: "Deep Dive: Elliptic Curve Cryptography in Distributed Agent Networks",
    date: "2026-06-10",
    category: "Package Highlights",
    summary: "Highlighting our swarmauri_signing_ed25519 standard package and its role in zero-trust execution pathways.",
    content: "We present a comprehensive overview of elliptic-curve algorithms applied to remote procedure calls (RPC). Using `swarmauri_signing_ed25519`, multi-agent environments can verify identity tokens and execution state before running raw LLM-generated code."
  },
  {
    id: "up-04",
    title: "How to Build a Custom Adapter in 10 Minutes",
    date: "2026-06-05",
    category: "Tutorials",
    summary: "Step-by-step developer guide on subclassing ModelBase or ToolBase to wrap proprietary business logic.",
    content: "This guide details how easy it is to leverage Pydantic v2 validation inside custom adapter packages. Learn about field parsing constraints, dynamic schema metadata exports, and seamless integration into Swarmauri's dynamic importer engine."
  }
];

export const UPDATE_POSTS: UpdatePost[] = [
  ...CURRENT_UPDATE_POSTS,
  ...LEGACY_UPDATE_POSTS
];
