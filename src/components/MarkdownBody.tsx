import React from "react";
import { MarkdownRenderer } from "@mdwrk/markdown-renderer-react";
import "@mdwrk/markdown-renderer-react/styles/default.css";

interface MarkdownBodyProps {
  markdown: string;
  className?: string;
  compact?: boolean;
}

export default function MarkdownBody({ markdown, className = "", compact = false }: MarkdownBodyProps) {
  return (
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
        codeInlineBackground: "#f1f1f3",
        codeInlineForeground: "#27272a",
        codeBlockBackground: "#f4f4f5",
        codeBlockForeground: "#27272a",
        codeHeaderBackground: "#ececf0",
        codeHeaderForeground: "#52525b",
        codeLanguageBackground: "transparent",
        codeLanguageForeground: "#52525b",
        fontUi: "Inter, ui-sans-serif, system-ui, sans-serif",
        fontMono: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace",
        lineHeight: "1.65",
        headingLineHeight: "1.25",
      }}
    />
  );
}
