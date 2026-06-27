import { GuideTopic } from "../types";

export const GUIDE_TOPICS: GuideTopic[] = [
  {
    id: "quickstart",
    title: "1. The Unified Quickstart",
    description: "Learn how to import and initialize standard components using the main namespace package.",
    codeBlock: `from swarmauri.standard import LocalModel
from swarmauri_standard.tools.CalculatorTool import (
    CalculatorTool,
)

# Initialize a standard local component
model = LocalModel(name="offline-first")
tool = CalculatorTool()

print(f"Loaded: {model.name} with tool: {tool.name}")
# Output: Loaded: offline-first with tool: CalculatorTool`,
    explanation: "Using the main namespace allows high-level imports. The dynamic namespace is safe and doesn't pollute global path configurations."
  },
  {
    id: "minimalist",
    title: "2. The Minimalist Contract Setup",
    description: "Install only the contracts and typing layers if you are building highly secure runtime nodes.",
    codeBlock: `# Install only core boundaries and typing helpers
# command: uv add swarmauri_core swarmauri_typing

from swarmauri_core.tools.ITool import ITool
from swarmauri_typing import SubclassUnion

class CustomSecureTool(ITool):
    @property
    def name(self) -> str:
        return "SecureVault"
        
    def execute(self, secret_key: str) -> bool:
        # Custom execution adhering strictly to ITool contract
        return len(secret_key) > 32`,
    explanation: "This allows servers to run with zero heavy external libraries. Perfect for serverless environments requiring fast cold starts and absolute isolation."
  },
  {
    id: "llm-swap",
    title: "3. Hot-Swapping Model Providers",
    description: "Because every LLM wrapper conforms to the IModel contract, swapping providers requires exactly one line of change.",
    codeBlock: `from swarmauri_llm_openai.models.OpenAIModel import (
    OpenAIModel,
)
from swarmauri_llm_groq.models.GroqModel import GroqModel

# Swapping from OpenAI to Groq
# model = OpenAIModel(api_key="sk-...")
model = GroqModel(api_key="gsk_...")

# Execution remains exactly identical
response = model.predict(prompt="Compose a security audit strategy.")
print(response.text)`,
    explanation: "This abstraction is robust and avoids binding your software workflows to specific underlying SaaS vendors."
  },
  {
    id: "custom-component",
    title: "4. Authoring Custom Pluggable Components",
    description: "Extend Pydantic-backed base classes so your custom modules instantly inherit standard serialization.",
    codeBlock: `from swarmauri_base.tools.ToolBase import ToolBase
from pydantic import Field

class WeatherSensorTool(ToolBase):
    station_id: str = Field(description="Unique telemetry identifier")
    
    def execute(self) -> dict:
        # Real-time retrieval or mock reading
        return {"station": self.station_id, "celsius": 18.5}

# Serialization is automatically free!
serialized_json = WeatherSensorTool(station_id="ST-999").json()
print(serialized_json)`,
    explanation: "By subclassing ToolBase, Pydantic will validate all fields on initialization and generate correct dynamic schemas automatically."
  },
  {
    id: "payload-integrity",
    title: "5. Signing payloads with Ed25519",
    description: "Protect messages in transit with elliptic curve signers and symmetric encryptions.",
    codeBlock: `from swarmauri_signing_ed25519.signing.Ed25519Signer import (
    Ed25519Signer,
)
from swarmauri_cipher_suite_aes.ciphers.AesGcmCipher import (
    AesGcmCipher,
)

signer = Ed25519Signer()
cipher = AesGcmCipher(secret_key=b"32_byte_cryptographic_key_here")

payload = b"Authorized execution task"
signature = signer.sign(payload)
encrypted_state = cipher.encrypt(payload)

# Verify payload integrity
is_valid = signer.verify(payload, signature)
print(f"Decrypted payload is authentic: {is_valid}")`,
    explanation: "Swarmauri separates cryptosystems from general workflows. Teams requiring FIPS or custom air-gapped security can audit individual packages independently."
  }
];
