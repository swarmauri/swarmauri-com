import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MAX_LINE_LENGTH = 79;
const snippets = [];

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function decodeJsString(value) {
  return JSON.parse(`"${value}"`);
}

function addSnippet(file, label, code) {
  snippets.push({ file, label, code });
}

function extractJsonStringProperty(file, propertyName) {
  const source = read(file);
  const pattern = new RegExp(`"${propertyName}": "((?:\\\\.|[^"\\\\])*)"`, "g");
  let match;
  while ((match = pattern.exec(source))) {
    addSnippet(file, propertyName, decodeJsString(match[1]));
  }
}

function extractTemplateProperty(file, propertyName) {
  const source = read(file);
  const pattern = new RegExp(`${propertyName}:\\s*\`([\\s\\S]*?)\``, "g");
  let match;
  while ((match = pattern.exec(source))) {
    addSnippet(file, propertyName, match[1]);
  }
}

function extractEscapedStringProperty(file, propertyName) {
  const source = read(file);
  const pattern = new RegExp(
    `${propertyName}:\\s*"((?:\\\\.|[^"\\\\])*)"`,
    "g",
  );
  let match;
  while ((match = pattern.exec(source))) {
    addSnippet(file, propertyName, decodeJsString(match[1]));
  }
}

function extractPythonFences(file) {
  const source = read(file);
  const pattern = /```(?:py|python)\s*\n([\s\S]*?)```/g;
  let match;
  while ((match = pattern.exec(source))) {
    addSnippet(file, "python fenced block", match[1].trimEnd());
  }
}

function extractComposerPythonFragments() {
  const file = "src/pages/ComposerPage.tsx";
  const source = read(file);
  const stringPattern = /"((?:\\.|[^"\\])*)"/g;
  const templatePattern = /`([\s\S]*?)`/g;

  for (const pattern of [stringPattern, templatePattern]) {
    let match;
    while ((match = pattern.exec(source))) {
      const value =
        pattern === stringPattern ? decodeJsString(match[1]) : match[1];
      if (
        value.includes("from ") ||
        value.includes("print(") ||
        value.includes("# 2.") ||
        value.includes("# 3.")
      ) {
        addSnippet(file, "composer python fragment", value);
      }
    }
  }
}

extractJsonStringProperty("src/data/packages.ts", "importExample");
extractTemplateProperty("src/data/guides.ts", "codeBlock");
extractTemplateProperty("src/pages/ArchitecturePage.tsx", "code");
extractEscapedStringProperty("src/pages/ArchitecturePage.tsx", "code");
extractComposerPythonFragments();

for (const file of [
  "src/data/faq.ts",
  "src/data/updates.ts",
  "src/data/legacyContent.ts",
]) {
  extractPythonFences(file);
}

const failures = [];
for (const snippet of snippets) {
  snippet.code.split(/\r?\n/).forEach((line, index) => {
    if (line.length > MAX_LINE_LENGTH) {
      failures.push({
        ...snippet,
        lineNumber: index + 1,
        length: line.length,
        line,
      });
    }
  });
}

if (failures.length > 0) {
  console.error(
    `Python example line-length check failed: ${failures.length} line(s) ` +
      `over ${MAX_LINE_LENGTH} characters.`,
  );
  for (const failure of failures) {
    console.error(
      `${failure.file} (${failure.label}) line ${failure.lineNumber} ` +
        `[${failure.length}]: ${failure.line}`,
    );
  }
  process.exit(1);
}

console.log(
  `Python example line-length check passed: ${snippets.length} snippet(s), ` +
    `max ${MAX_LINE_LENGTH} characters.`,
);
