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
  },
];
