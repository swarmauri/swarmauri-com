const FAMILY_LABEL_OVERRIDES: Record<string, string> = {
  auth_idp: "AuthIDP",
  certservice: "CertService",
  cipher_suite: "CipherSuite",
  dataconnector: "DataConnector",
  documentstore: "DocumentStore",
  embeddedsigner: "EmbeddedSigner",
  embedxmp: "EmbedXMP",
  evaluatorpool: "EvaluatorPool",
  evaluator_result: "EvaluatorResult",
  fasttokenizer: "FastTokenizer",
  gitfilter: "GitFilter",
  image_gen: "ImageGen",
  inner_product: "InnerProduct",
  keyprovider: "KeyProvider",
  keyproviders: "KeyProviders",
  llm: "LLM",
  logger_formatter: "LoggerFormatter",
  logger_handler: "LoggerHandler",
  mcp: "MCP",
  mediasigner: "MediaSigner",
  mre_crypto: "MRECrypto",
  ocr: "OCR",
  pop: "POP",
  prompt_template: "PromptTemplate",
  pseudometric: "PseudoMetric",
  rate_limit: "RateLimit",
  schema_converter: "SchemaConverter",
  service_registry: "ServiceRegistry",
  standard_kernel: "StandardKernel",
  "standard-kernel": "StandardKernel",
  stt: "STT",
  task_mgmt_strategy: "TaskMgmtStrategy",
  tool_llm: "ToolLLM",
  tts: "TTS",
  vectorstore: "VectorStore",
  vlm: "VLM",
  xmp: "XMP",
  jwt: "JWT",
};

export function familyLabel(name: string) {
  return (
    FAMILY_LABEL_OVERRIDES[name] ??
    name
      .split(/[_\-.]+/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("")
  );
}
