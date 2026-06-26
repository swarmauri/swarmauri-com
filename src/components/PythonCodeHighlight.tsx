import React from "react";

interface PythonCodeHighlightProps {
  code: string;
}

export default function PythonCodeHighlight({ code }: PythonCodeHighlightProps) {
  // Regex to capture python elements:
  // 1. Comments: #[^\r\n]*
  // 2. Triple-quoted strings or single-quoted/double-quoted strings:
  //    ("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')
  // 3. Keywords: def, class, import, from, as, return, if, elif, else, for, in, while, try, except, finally, with, assert, and, or, not, is, lambda, pass, yield
  // 4. Constants/Special: True, False, None, self
  // 5. Common functions / types: print, len, range, dict, list, set, str, int, float, bool, super, object
  // 6. Decorators: @\w+
  // 7. Numbers: \b\d+\b
  const regex = /(#[^\r\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')|\b(def|class|import|from|as|return|if|elif|else|for|in|while|try|except|finally|with|assert|and|or|not|is|lambda|pass|yield)\b|\b(True|False|None|self)\b|\b(print|len|range|dict|list|set|str|int|float|bool|super|object)\b|(@\w+)|\b(\d+)\b/g;

  let match;
  let lastIndex = 0;
  const elements: React.ReactNode[] = [];
  let key = 0;

  const addText = (text: string) => {
    if (!text) return;
    elements.push(<span key={key++}>{text}</span>);
  };

  const addSpan = (text: string, className: string) => {
    elements.push(
      <span key={key++} className={className}>
        {text}
      </span>
    );
  };

  while ((match = regex.exec(code)) !== null) {
    const matchIndex = match.index;
    const matchText = match[0];

    // Add preceding plain text
    if (matchIndex > lastIndex) {
      addText(code.substring(lastIndex, matchIndex));
    }

    if (match[1]) {
      // Comment
      addSpan(matchText, "text-zinc-500 italic");
    } else if (match[2]) {
      // String
      addSpan(matchText, "text-emerald-400 font-medium");
    } else if (match[3]) {
      // Keyword
      addSpan(matchText, "text-violet-400 font-semibold");
    } else if (match[4]) {
      // Constant / self
      addSpan(matchText, "text-amber-400 font-medium");
    } else if (match[5]) {
      // Common function/type
      addSpan(matchText, "text-sky-300 font-medium");
    } else if (match[6]) {
      // Decorator
      addSpan(matchText, "text-pink-400 font-medium");
    } else if (match[7]) {
      // Number
      addSpan(matchText, "text-orange-400 font-medium");
    } else {
      addText(matchText);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < code.length) {
    addText(code.substring(lastIndex));
  }

  return <code className="font-mono">{elements}</code>;
}
