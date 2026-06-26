import { ClaimRecord } from "../types";

export const CLAIM_RECORDS: ClaimRecord[] = [
  {
    id: "cl-01",
    claim: "Granular Package Decoupling",
    category: "Packaging",
    package: "Entire Ecosystem",
    verification: "310 packages isolated with individual pyproject.toml",
    status: "Verified",
    details: "Each package contains distinct dependency scopes, avoiding dependency bloat in lightweight runtimes.",
    citation: "https://github.com/swarmauri/swarmauri-sdk/blob/main/pyproject.toml",
    about: "Python packaging structures and isolated workspace decoupling",
    firstAppearance: "Swarmauri Workspace Specification v1",
    author: "Swarmauri Packaging Team",
    reviewRating: "t1"
  },
  {
    id: "cl-02",
    claim: "Elliptic Curve Integrity",
    category: "Security",
    package: "swarmauri_signing_ed25519",
    verification: "NIST-standard cryptography validation & tests in repo",
    status: "Verified",
    details: "Leverages the Ed25519 algorithm via the python cryptography library for non-repudiable message verification.",
    citation: "NIST Special Publication 800-186",
    about: "Ed25519 signature validation mechanics",
    firstAppearance: "swarmauri_signing_ed25519 initial release",
    author: "Swarmauri Cryptography Unit",
    reviewRating: "t3"
  },
  {
    id: "cl-03",
    claim: "Symmetric Encryption GCM",
    category: "Security",
    package: "swarmauri_cipher_suite_aes",
    verification: "PyTest cryptographic suite verified offline",
    status: "Verified",
    details: "Implements AES-256-GCM, ensuring authentic payload delivery and confidential internal agent state storage.",
    citation: "NIST SP 800-38D",
    about: "AES-GCM Authenticated Encryption suite",
    firstAppearance: "swarmauri_cipher_suite_aes release notes",
    author: "Swarmauri Cryptography Unit",
    reviewRating: "t3"
  },
  {
    id: "cl-04",
    claim: "Contract-Implementation Decoupling",
    category: "Architecture",
    package: "swarmauri_core",
    verification: "Zero concrete imports or python execution code within swarmauri_core",
    status: "Verified",
    details: "Enforces strict protocol declarations, guaranteeing that developers can replace implementations with zero core modifications.",
    citation: "PEP-544 Protocols and Abstract Base Classes",
    about: "Core interface segregation principles",
    firstAppearance: "swarmauri_core interface release",
    author: "Swarmauri Architecture Board",
    reviewRating: "t2"
  },
  {
    id: "cl-05",
    claim: "Pinecone Similarity Matching",
    category: "Integrations",
    package: "swarmauri_vectorstore_pinecone",
    verification: "Pinecone Client v3 fully compatible",
    status: "Verified",
    details: "Maps abstract similarity query methods onto Pinecone Serverless REST protocols with automatic dimension validation.",
    citation: "https://docs.pinecone.io/guides/get-started/quickstart",
    about: "Pinecone REST protocol integrations",
    firstAppearance: "swarmauri_vectorstore_pinecone release",
    author: "Swarmauri Integrations Guild",
    reviewRating: "t2"
  },
  {
    id: "cl-06",
    claim: "Pydantic State Safety",
    category: "Maturity",
    package: "swarmauri_base",
    verification: "Pydantic v2 Type Enforcement on all properties",
    status: "Verified",
    details: "Guarantees robust schema sanitization, parsing verification, and uniform JSON serialization across all derived component instances.",
    citation: "https://docs.pydantic.dev/latest/concepts/models/",
    about: "Pydantic validation schemas and model integrity",
    firstAppearance: "swarmauri_base serialization core",
    author: "PyPI SSOT Registry",
    reviewRating: "t4"
  }
];
