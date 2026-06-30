import { GuideTopic } from "../types";

export const GUIDE_TOPICS: GuideTopic[] = [
  {
    id: "quickstart",
    title: "1. Unified Namespace Quickstart",
    description:
      "Install the main namespace package when you want broad access to standard Swarmauri components.",
    codeBlock: `from swarmauri.standard import LocalModel
from swarmauri_standard.tools.CalculatorTool import (
    CalculatorTool,
)

model = LocalModel(name="offline-first")
tool = CalculatorTool()

print(f"Loaded: {model.name} with tool: {tool.name}")`,
    explanation:
      "The aggregate swarmauri package is a convenience facade. It is best for notebooks, tutorials, prototypes, and applications that benefit from clean imports across the standard library.",
    faqs: [
      {
        question: "Why should I use the unified facade package?",
        answer: "The aggregate `swarmauri` package is a convenience wrapper. It enables quick prototyping, interactive notebook sessions, and fast onboarding with clean imports across standard components."
      },
      {
        question: "Is it recommended to use the unified package in high-performance production microservices?",
        answer: "In production microservices, especially where cold-start latency is critical (such as serverless/cloud functions), it is recommended to install only the interface and provider-specific split packages (e.g., `swarmauri_core` and specific `swarmauri_llm_*` packages) to keep runtime boundaries lean."
      }
    ]
  },
  {
    id: "minimalist-contracts",
    title: "2. Minimal Contract Install",
    description:
      "Install only interface and typing packages when a service needs contracts without implementation dependencies.",
    codeBlock: `# command: uv add swarmauri_core swarmauri_typing

from swarmauri_core.tools.ITool import ITool
from swarmauri_typing import SubclassUnion

class SecureVaultTool(ITool):
    @property
    def name(self) -> str:
        return "SecureVault"

    def execute(self, secret_key: str) -> bool:
        return len(secret_key) > 32

tool_types: SubclassUnion[ITool] = SecureVaultTool`,
    explanation:
      "The core and typing packages define boundaries without pulling in provider clients. Use this shape for runtime nodes that need strict import control and fast cold starts.",
    faqs: [
      {
        question: "What are the benefits of a minimalist contract installation?",
        answer: "Installing only `swarmauri_core` or `swarmauri_typing` prevents pulling in heavy runtime client dependencies (such as OpenAI, Pinecone, or PyTesseract clients). This reduces the build size, keeps security audit surfaces minimal, and speeds up startup times."
      },
      {
        question: "Can I subclass interfaces directly from swarmauri_core?",
        answer: "Yes. Any custom component or adapter can subclass core interfaces (like `ITool` or `ILlm`) directly. This ensures your custom modules conform strictly to the standard SDK contracts and can be used in orchestrators."
      }
    ]
  },
  {
    id: "tools-and-skills",
    title: "3. Tools and Skills",
    description:
      "Use tool and skill packages as executable capabilities that can be composed by agents, workflows, or your own runtime.",
    codeBlock: `# command: uv add swarmauri_tool_skill_execution
# command: uv add swarmauri_skill_filesystem

import swarmauri_tool_skill_execution as skill_tool
import swarmauri_skill_filesystem as filesystem_skill

print(skill_tool.__name__)
print(filesystem_skill.__name__)`,
    explanation:
      "Tools expose callable actions; skills package reusable capabilities that tools or orchestrators can invoke. They are a major family in the catalog, not a minor agent example.",
    faqs: [
      {
        question: "What is the difference between a Tool and a Skill?",
        answer: "A Tool represents an executable mechanism with a defined input/output schema. A Skill groups reusable capabilities (e.g., filesystem access, browser automation, or search functions) that a Tool or an agent workflow can invoke."
      },
      {
        question: "Can a single agent compose multiple skills and tools simultaneously?",
        answer: "Absolutely. Swarmauri agent components accept lists or dictionaries of tools. These tools can delegate execution details to standard or custom skill packages, allowing for modular agent behavior."
      }
    ]
  },
  {
    id: "parsers-and-ocr",
    title: "4. Parsers and OCR Pipelines",
    description:
      "Install parser packages directly when your application needs document, text, PDF, OCR, or extraction behavior.",
    codeBlock: `# command: uv add swarmauri_parser_keywordextractor
# command: uv add swarmauri_ocr_pytesseract

import swarmauri_parser_keywordextractor as keyword_parser
import swarmauri_ocr_pytesseract as ocr_adapter

print(keyword_parser.__name__)
print(ocr_adapter.__name__)`,
    explanation:
      "Parser and OCR packages let ingestion pipelines stay separate from model inference. This keeps document handling, extraction, and downstream reasoning independently replaceable.",
    faqs: [
      {
        question: "Why are parsers separate from model inference packages?",
        answer: "Decoupling document ingestion (parsers, OCR loaders) from LLM reasoning ensures that text-extraction logic can scale or be replaced independently of model invocation, preventing bloated dependencies."
      },
      {
        question: "Does the OCR package require external binary dependencies?",
        answer: "Yes, certain OCR adapters like `swarmauri_ocr_pytesseract` act as Python wrappers and require the underlying system binary (e.g., the `tesseract-ocr` system engine) to be installed in the host environment."
      }
    ]
  },
  {
    id: "middleware-patterns",
    title: "5. Middleware Boundaries",
    description:
      "Use middleware packages for auth, headers, rate limits, CORS, JSON-RPC, logging, and transport boundary behavior.",
    codeBlock: `# command: uv add swarmauri_middleware_jwt
# command: uv add swarmauri_middleware_securityheaders

import swarmauri_middleware_jwt as jwt_middleware
import swarmauri_middleware_securityheaders as headers

print(jwt_middleware.__name__)
print(headers.__name__)`,
    explanation:
      "Middleware is a first-class package family. Use it to wrap execution boundaries and keep transport, policy, and security concerns outside application business logic.",
    faqs: [
      {
        question: "Where does middleware fit in a Swarmauri-based application?",
        answer: "Middleware packages wrap transport or execution boundaries. They handle cross-cutting concerns like JWT auth validation, security headers, rate limiting, and structured logging, keeping business logic clean."
      },
      {
        question: "Can I chain multiple middleware components together?",
        answer: "Yes, Swarmauri middleware components are designed to be chainable or wrapped sequentially to enforce multi-layered policies at API, RPC, or message boundaries."
      }
    ]
  },
  {
    id: "signing-certs-tokens",
    title: "6. Signing, Certificates, and Tokens",
    description:
      "Compose signing, certificate, and token packages when messages and identities need explicit cryptographic boundaries.",
    codeBlock: `# command: uv add swarmauri_signing_ed25519
# command: uv add swarmauri_certs_x509
# command: uv add swarmauri_tokens_jwt

import swarmauri_certs_x509 as certs
import swarmauri_signing_ed25519 as signing
import swarmauri_tokens_jwt as tokens

print(signing.__name__)
print(certs.__name__)
print(tokens.__name__)`,
    explanation:
      "Security-sensitive systems can install only the signers, certificate utilities, and token handlers they audit. This is separate from LLM provider selection.",
    faqs: [
      {
        question: "Why are cryptographic signers packaged separately?",
        answer: "Separating signing, token generation, and X.509 certificate management allows security-critical architectures to audit and pin only specific cryptographic libraries (such as Ed25519) without any LLM footprint."
      },
      {
        question: "How do token packages differ from auth identity providers?",
        answer: "Token packages handle cryptographic generation, parsing, and verifying of signatures (e.g., JWT, JWS), whereas auth identity providers integrate directly with external identity servers (e.g., Keycloak, GitHub) to obtain sessions."
      }
    ]
  },
  {
    id: "auth-identity",
    title: "7. Auth Identity Providers",
    description:
      "Install auth IDP packages for provider-specific identity integrations without folding them into the rest of the runtime.",
    codeBlock: `# command: uv add swarmauri_auth_idp_github
# command: uv add swarmauri_auth_idp_keycloak

import swarmauri_auth_idp_github as github_idp
import swarmauri_auth_idp_keycloak as keycloak_idp

print(github_idp.__name__)
print(keycloak_idp.__name__)`,
    explanation:
      "Identity provider packages make GitHub, Keycloak, Okta, Google, AWS, Azure, and related auth surfaces visible as installable integration units.",
    faqs: [
      {
        question: "What auth providers does Swarmauri support?",
        answer: "The SDK supports multiple identity providers, with dedicated packages like `swarmauri_auth_idp_github` and `swarmauri_auth_idp_keycloak`. These make integrating OAuth and third-party identity providers uniform."
      },
      {
        question: "Do I need to supply client credentials to initialize an identity provider?",
        answer: "Yes. Identity providers require standard client-side configuration, including Client IDs, Secret keys, and Auth endpoints, usually sourced from your application's secure environment variables."
      }
    ]
  },
  {
    id: "storage-and-publishers",
    title: "8. Storage and Publishers",
    description:
      "Install storage and publisher adapters when your system needs durable state, object storage, queues, or webhook delivery.",
    codeBlock: `# command: uv add swarmauri_storage_s3
# command: uv add swarmauri_publisher_redis

import swarmauri_publisher_redis as redis_publisher
import swarmauri_storage_s3 as s3_storage

print(s3_storage.__name__)
print(redis_publisher.__name__)`,
    explanation:
      "Storage and publisher packages keep persistence and event delivery replaceable. They sit beside AI components rather than underneath them.",
    faqs: [
      {
        question: "How do storage adapters abstract file-based operations?",
        answer: "Storage adapters like `swarmauri_storage_s3` provide unified contracts to read, write, and list blobs, ensuring your application code remains unchanged whether storing files on S3, Azure, GCP, or locally."
      },
      {
        question: "When should I use a Publisher package instead of direct API calls?",
        answer: "Publisher packages (like `swarmauri_publisher_redis`) are ideal for real-time messaging, task queues, or webhook dispatching, abstracting the broker protocol and ensuring loose coupling."
      }
    ]
  },
  {
    id: "evaluators-measurement",
    title: "9. Evaluators and Measurement",
    description:
      "Use evaluator packages to measure runtime behavior, accessibility, subprocess use, imports, and other quality boundaries.",
    codeBlock: `# command: uv add swarmauri_evaluator_subprocess
# command: uv add swarmauri_evaluator_externalimports

import swarmauri_evaluator_externalimports as imports_eval
import swarmauri_evaluator_subprocess as subprocess_eval

print(imports_eval.__name__)
print(subprocess_eval.__name__)`,
    explanation:
      "Evaluation is part of the SDK portfolio. These packages help teams measure implementation quality, policy compliance, and runtime behavior.",
    faqs: [
      {
        question: "What can I evaluate with Swarmauri evaluator packages?",
        answer: "Evaluators measure runtime metrics such as subprocess calls, external package imports, validation rates, and schema compliance. They are critical for monitoring agents and guarding security policy."
      },
      {
        question: "Are evaluators executed synchronously during agent runs?",
        answer: "They can be configured to run synchronously to gate action execution, or asynchronously as post-execution audit pipelines to collect telemetry and quality metrics."
      }
    ]
  },
  {
    id: "models-vectorstores-embeddings",
    title: "10. Models, Embeddings, and Vector Stores",
    description:
      "Treat models and vector stores as one family of examples among many, with the same package isolation rules as the rest of the SDK.",
    codeBlock: `# command: uv add swarmauri_llm_groq
# command: uv add swarmauri_embedding_doc2vec
# command: uv add swarmauri_vectorstore_pinecone

import swarmauri_embedding_doc2vec as embeddings
import swarmauri_llm_groq as groq_llm
import swarmauri_vectorstore_pinecone as pinecone

print(groq_llm.__name__)
print(embeddings.__name__)
print(pinecone.__name__)`,
    explanation:
      "Agents, language models, embeddings, and vector stores remain important, but they are examples of a wider component taxonomy rather than the full definition of Swarmauri.",
    faqs: [
      {
        question: "Are model providers completely interchangeable in Swarmauri?",
        answer: "Yes. By adhering to uniform LLM and Embedding interfaces, you can swap Groq, OpenAI, Cohere, or local models without modifying any downstream workflow or agent logic."
      },
      {
        question: "How do vector stores integrate with document embeddings?",
        answer: "Embeddings packages (like Doc2Vec) convert parsed text chunks into numeric vectors, which are then passed to vector store adapters (like Pinecone) to perform fast nearest-neighbor semantic search."
      }
    ]
  },
  {
    id: "workflow-and-toolkits",
    title: "11. Workflows and Toolkits",
    description:
      "Use workflow and toolkit packages for higher-level composition without losing direct package ownership.",
    codeBlock: `# command: uv add swarmauri_workflow_statedriven
# command: uv add swarmauri_toolkit_jupytertoolkit

import swarmauri_toolkit_jupytertoolkit as jupyter_tools
import swarmauri_workflow_statedriven as workflow

print(workflow.__name__)
print(jupyter_tools.__name__)`,
    explanation:
      "Toolkits group related tools, while workflow packages express execution structure. Both are catalog families that sit above the lower-level component packages.",
    faqs: [
      {
        question: "When should I use a Workflow package?",
        answer: "Workflow packages (e.g., `swarmauri_workflow_statedriven`) are designed for orchestrating complex multi-step reasoning processes, state machines, and agent feedback loops where linear execution is insufficient."
      },
      {
        question: "What does a Toolkit contain?",
        answer: "A Toolkit is a specialized packaging unit that aggregates multiple related tools (such as Jupyter notebook execution tools or database inspectors) into a single, cohesive bundle for agent consumption."
      }
    ]
  },
  {
    id: "package-authoring",
    title: "12. Package Authoring",
    description:
      "Author new packages against core interfaces and base classes so they fit the package index, docs, and import rules.",
    codeBlock: `# command: uv add swarmauri_base swarmauri_core

from pydantic import Field
from swarmauri_base.tools.ToolBase import ToolBase

class ProjectTool(ToolBase):
    project_id: str = Field(description="Stable project identifier")

    def execute(self) -> dict[str, str]:
        return {"project_id": self.project_id}

tool = ProjectTool(project_id="docs-site")
print(tool.model_dump_json())`,
    explanation:
      "New Swarmauri packages should land in the right layer, expose direct package imports, and use base classes only when they remove real duplication or enforce shared contracts.",
    faqs: [
      {
        question: "How do I ensure my custom package is fully compatible with Swarmauri?",
        answer: "Your custom package should inherit from core interface classes (such as `ToolBase` or `LlmBase` using Pydantic fields) and use the `swarmauri_base` package to leverage standard serialization and configuration."
      },
      {
        question: "Why is Pydantic used for package parameters?",
        answer: "Pydantic enforces type safety, handles robust runtime validation of input/output fields, and supports automated generation of JSON schemas, which are essential for agent tool-calling."
      }
    ]
  }
];
