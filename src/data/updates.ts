import { UpdatePost } from "../types";

export const UPDATE_POSTS: UpdatePost[] = [
  {
    id: "up-01",
    title: "Swarmauri SDK 0.6.2.dev3 Release: Granular Workspace Refactoring",
    date: "2026-06-22",
    category: "Release Notes",
    summary: "Today we completed the transition of our monorepo to 310 active workspace members, separating core interfaces from community adapters.",
    content: "Our team has successfully finished splitting standard components into highly focused packages. Under the new layout, developers using tools like Pincone, AWS S3, or OpenAI no longer need to pull massive, unrelated binary assets into their lightweight environments. Simply install the aggregate `swarmauri` facade, or construct custom environments starting with `swarmauri_core`."
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
