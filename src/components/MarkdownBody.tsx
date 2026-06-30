import React, { useEffect, useRef } from "react";
import { MarkdownRenderer } from "@mdwrk/markdown-renderer-react";
import "@mdwrk/markdown-renderer-react/styles/default.css";

interface MarkdownBodyProps {
  markdown: string;
  className?: string;
  compact?: boolean;
}

export default function MarkdownBody({ markdown, className = "", compact = false }: MarkdownBodyProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    enhanceMarkdownCodeBlocks(host);
    const handleClick = (event: MouseEvent) => {
      void handleCodeCopyClick(event);
    };
    host.addEventListener("click", handleClick);

    return () => {
      host.removeEventListener("click", handleClick);
    };
  }, [markdown]);

  return (
    <div ref={hostRef}>
      <MarkdownRenderer
        markdown={markdown}
        className={`markdown-body swarmauri-markdown-body ${compact ? "swarmauri-markdown-body-compact" : ""} ${className}`.trim()}
        htmlHandling="escape"
        getLinkAttributes={(href) =>
          href?.startsWith("http")
            ? { target: "_blank", rel: "noreferrer noopener" }
            : undefined
        }
        themeStyle={{
          foreground: "#52525b",
          foregroundMuted: "#71717a",
          background: "transparent",
          border: "#e4e4e7",
          accent: "#4f46e5",
          codeInlineBackground: "#f5f3ff",
          codeInlineForeground: "#4f46e5",
          codeBlockBackground: "#09090b",
          codeBlockForeground: "#f4f4f5",
          codeHeaderBackground: "#18181b",
          codeHeaderForeground: "#a1a1aa",
          codeLanguageBackground: "transparent",
          codeLanguageForeground: "#a1a1aa",
          fontUi: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
          fontMono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace",
          lineHeight: "1.65",
          headingLineHeight: "1.25",
        }}
      />
    </div>
  );
}

type SyntaxTokenType =
  | "plain"
  | "comment"
  | "keyword"
  | "string"
  | "number"
  | "literal"
  | "function"
  | "operator"
  | "property"
  | "punctuation";

interface SyntaxToken {
  text: string;
  type: SyntaxTokenType;
}

const LANGUAGE_ALIASES: Record<string, string> = {
  py: "python",
  python: "python",
  bash: "bash",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  console: "bash",
  js: "javascript",
  jsx: "javascript",
  javascript: "javascript",
  ts: "typescript",
  tsx: "typescript",
  typescript: "typescript",
  json: "json",
  yaml: "yaml",
  yml: "yaml",
  toml: "toml",
};

function enhanceMarkdownCodeBlocks(root: HTMLElement) {
  const codeBlocks = root.querySelectorAll<HTMLElement>(
    ".swarmauri-markdown-body .md-code-content, .swarmauri-markdown-body pre > code",
  );

  codeBlocks.forEach((codeElement) => {
    addCodeBlockClipboardButton(codeElement);
    if (codeElement.dataset.swarmauriHighlighted === "true") return;

    const language = getCodeBlockLanguage(codeElement);
    if (!language) return;

    const tokens = tokenizeCode(codeElement.textContent ?? "", language);
    if (!tokens) return;

    codeElement.replaceChildren(renderTokens(tokens));
    codeElement.dataset.swarmauriHighlighted = "true";
    codeElement.dataset.swarmauriSyntaxLanguage = language;
  });
}

function addCodeBlockClipboardButton(codeElement: HTMLElement) {
  const figure = codeElement.closest<HTMLElement>(".md-code-block");
  const pre = codeElement.closest<HTMLElement>("pre");
  const container = figure || pre;
  if (!container || container.querySelector(".md-code-copy-button")) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "md-code-copy-button";
  button.setAttribute("aria-label", "Copy code");
  button.setAttribute("title", "Copy code");
  button.dataset.codeTarget = "true";
  button.textContent = "Copy";

  const header = figure?.querySelector<HTMLElement>(".md-code-header");
  if (header) {
    header.append(button);
    return;
  }

  container.prepend(button);
}

async function handleCodeCopyClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const button = target.closest<HTMLButtonElement>(".md-code-copy-button");
  if (!button) return;

  const container = button.closest<HTMLElement>(".md-code-block, pre");
  const codeElement = container?.querySelector<HTMLElement>(
    ".md-code-content, code",
  );
  const code = codeElement?.textContent ?? "";
  if (!code) return;

  try {
    await navigator.clipboard.writeText(code);
    button.dataset.copyState = "copied";
    button.setAttribute("aria-label", "Copied code");
    button.textContent = "Copied";
    window.setTimeout(() => {
      button.dataset.copyState = "";
      button.setAttribute("aria-label", "Copy code");
      button.textContent = "Copy";
    }, 1600);
  } catch {
    button.dataset.copyState = "failed";
    button.setAttribute("aria-label", "Copy failed");
    button.textContent = "Failed";
    window.setTimeout(() => {
      button.dataset.copyState = "";
      button.setAttribute("aria-label", "Copy code");
      button.textContent = "Copy";
    }, 1600);
  }
}

function getCodeBlockLanguage(codeElement: HTMLElement) {
  const figureLanguage = codeElement
    .closest<HTMLElement>("[data-code-language]")
    ?.dataset.codeLanguage;
  const classLanguage = Array.from(codeElement.classList)
    .find((className) => className.startsWith("language-"))
    ?.replace(/^language-/, "");
  const rawLanguage = (figureLanguage || classLanguage || "").toLowerCase();
  return LANGUAGE_ALIASES[rawLanguage] || "";
}

function renderTokens(tokens: SyntaxToken[]) {
  const fragment = document.createDocumentFragment();

  tokens.forEach((token) => {
    if (token.type === "plain") {
      fragment.append(document.createTextNode(token.text));
      return;
    }

    const span = document.createElement("span");
    span.className = `md-syntax-token md-syntax-${token.type}`;
    span.textContent = token.text;
    fragment.append(span);
  });

  return fragment;
}

function tokenizeCode(code: string, language: string) {
  if (language === "python") return tokenizeWithPatterns(code, PYTHON_PATTERNS);
  if (language === "bash") return tokenizeWithPatterns(code, BASH_PATTERNS);
  if (language === "json") return tokenizeWithPatterns(code, JSON_PATTERNS);
  if (language === "yaml") return tokenizeWithPatterns(code, YAML_PATTERNS);
  if (language === "toml") return tokenizeWithPatterns(code, TOML_PATTERNS);
  if (language === "javascript" || language === "typescript") {
    return tokenizeWithPatterns(code, SCRIPT_PATTERNS);
  }
  return null;
}

interface TokenPattern {
  regex: RegExp;
  type: SyntaxTokenType;
}

function tokenizeWithPatterns(code: string, patterns: readonly TokenPattern[]) {
  const tokens: SyntaxToken[] = [];
  let index = 0;

  while (index < code.length) {
    const nextMatch = findNextMatch(code, index, patterns);
    if (!nextMatch) {
      tokens.push({ text: code.slice(index), type: "plain" });
      break;
    }

    if (nextMatch.index > index) {
      tokens.push({ text: code.slice(index, nextMatch.index), type: "plain" });
    }

    tokens.push({ text: nextMatch.text, type: nextMatch.type });
    index = nextMatch.index + nextMatch.text.length;
  }

  return tokens;
}

function findNextMatch(
  code: string,
  startIndex: number,
  patterns: readonly TokenPattern[],
) {
  let bestMatch:
    | { index: number; text: string; type: SyntaxTokenType }
    | undefined;

  patterns.forEach((pattern) => {
    pattern.regex.lastIndex = startIndex;
    const match = pattern.regex.exec(code);
    if (!match?.[0]) return;

    if (
      !bestMatch ||
      match.index < bestMatch.index ||
      (match.index === bestMatch.index && match[0].length > bestMatch.text.length)
    ) {
      bestMatch = {
        index: match.index,
        text: match[0],
        type: pattern.type,
      };
    }
  });

  return bestMatch;
}

const PYTHON_PATTERNS: readonly TokenPattern[] = [
  { regex: /#[^\r\n]*/g, type: "comment" },
  {
    regex: /("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/g,
    type: "string",
  },
  {
    regex: /\b(def|class|import|from|as|return|if|elif|else|for|in|while|try|except|finally|with|assert|and|or|not|is|lambda|pass|yield|async|await)\b/g,
    type: "keyword",
  },
  { regex: /\b(True|False|None|self|cls)\b/g, type: "literal" },
  {
    regex: /\b(print|len|range|dict|list|set|str|int|float|bool|super|object)\b/g,
    type: "function",
  },
  { regex: /@\w+/g, type: "function" },
  { regex: /\b\d+(?:\.\d+)?\b/g, type: "number" },
];

const BASH_PATTERNS: readonly TokenPattern[] = [
  { regex: /#[^\r\n]*/g, type: "comment" },
  { regex: /"[^"\r\n]*(?:\\.[^"\r\n]*)*"|'[^'\r\n]*(?:\\.[^'\r\n]*)*'/g, type: "string" },
  { regex: /\b(uv|pip|python|python3|npm|npx|pnpm|yarn|git|docker|pytest|ruff|curl|cd|mkdir|rm|cp|mv|echo|export)\b/g, type: "function" },
  { regex: /--?[A-Za-z][\w-]*/g, type: "property" },
  { regex: /\$[A-Za-z_][A-Za-z0-9_]*/g, type: "literal" },
  { regex: /\b\d+(?:\.\d+)?\b/g, type: "number" },
];

const SCRIPT_PATTERNS: readonly TokenPattern[] = [
  { regex: /\/\/[^\r\n]*|\/\*[\s\S]*?\*\//g, type: "comment" },
  { regex: /`(?:\\[\s\S]|[^`\\])*`|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'/g, type: "string" },
  {
    regex: /\b(import|export|from|const|let|var|function|return|if|else|for|of|in|while|class|extends|new|async|await|type|interface|as|satisfies)\b/g,
    type: "keyword",
  },
  { regex: /\b(true|false|null|undefined|this)\b/g, type: "literal" },
  { regex: /\b\d+(?:\.\d+)?\b/g, type: "number" },
];

const JSON_PATTERNS: readonly TokenPattern[] = [
  { regex: /"[^"\\]*(?:\\.[^"\\]*)*"(?=\s*:)/g, type: "property" },
  { regex: /"[^"\\]*(?:\\.[^"\\]*)*"/g, type: "string" },
  { regex: /\b(true|false|null)\b/g, type: "literal" },
  { regex: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/gi, type: "number" },
  { regex: /[{}[\],:]/g, type: "punctuation" },
];

const YAML_PATTERNS: readonly TokenPattern[] = [
  { regex: /#[^\r\n]*/g, type: "comment" },
  { regex: /^[ \t-]*[A-Za-z0-9_.-]+(?=\s*:)/gm, type: "property" },
  { regex: /"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\r\n]*(?:\\.[^'\r\n]*)*'/g, type: "string" },
  { regex: /\b(true|false|null|yes|no|on|off)\b/gi, type: "literal" },
  { regex: /-?\b\d+(?:\.\d+)?\b/g, type: "number" },
];

const TOML_PATTERNS: readonly TokenPattern[] = [
  { regex: /#[^\r\n]*/g, type: "comment" },
  { regex: /^\s*\[[^\]\r\n]+\]/gm, type: "keyword" },
  { regex: /^[ \t]*[A-Za-z0-9_.-]+(?=\s*=)/gm, type: "property" },
  { regex: /"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\r\n]*(?:\\.[^'\r\n]*)*'/g, type: "string" },
  { regex: /\b(true|false)\b/g, type: "literal" },
  { regex: /-?\b\d+(?:\.\d+)?\b/g, type: "number" },
];
