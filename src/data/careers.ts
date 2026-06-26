import { CareerRole } from "../types";

export const CAREER_ROLES: CareerRole[] = [
  {
    id: "car-01",
    title: "Lead SDK Infrastructure Engineer (Python)",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-Time",
    description: "Join the core open-source team maintaining the Swarmauri monorepo structure. You will own workspace organization, dependency decoupling, packaging automation, and PEP namespace resolution.",
    requirements: [
      "5+ years of Python expertise with deep knowledge of PEP namespace packaging and modern package managers (uv, poetry).",
      "Robust experience designing strict Pydantic v2 serialization schemas and typing systems.",
      "Passion for building zero-dependency core utilities and decoupled, test-driven micro-packages."
    ]
  },
  {
    id: "car-02",
    title: "Developer Relations & Technical Writer",
    department: "Developer Relations",
    location: "Remote",
    type: "Full-Time",
    description: "Translate advanced cryptographic concepts, multi-agent planners, and composable python packages into highly digestible tutorials, quickstarts, and visual catalog systems.",
    requirements: [
      "Outstanding technical writing skills with a portfolio of developer-first API documentation.",
      "Hands-on experience with MkDocs, Material themes, and automating doc-string extractions.",
      "Comfortable writing executable Python test suites to guarantee code snippet validity."
    ]
  },
  {
    id: "car-03",
    title: "Open Source Core Contributor (Talent Network)",
    department: "Community",
    location: "Async",
    type: "Contract-to-Hire",
    description: "Swarmauri values active contributor-to-hire pathways. Submit high-quality PRs, build provider integration packages, or write security adapters to join our primary fully-remote engineering staff.",
    requirements: [
      "Proven public track record of contributing to open-source python repositories.",
      "Familiarity with Swarmauri's contract-first architecture (ModelBase, ToolBase, VectorStoreBase).",
      "Self-driven, documentation-first execution model in asynchronous settings."
    ]
  }
];
