import fs from "node:fs";
import path from "node:path";
import { CAREER_ROLES } from "../src/data/careers";
import { GUIDE_TOPICS } from "../src/data/guides";
import { PACKAGES } from "../src/data/packages";
import { FAMILIES } from "../src/data/packageSummary";
import {
  CANONICAL_TAXONOMY_DESCRIPTION,
  CANONICAL_TAXONOMY_KEYWORDS,
} from "../src/data/taxonomy";
import { UPDATE_POSTS } from "../src/data/updates";
import { getUpdateSlug } from "../src/utils/updateSlugs";

const SITE_URL = "https://swarmauri.com";
const DIST_DIR = path.join(process.cwd(), "dist");
const SHELL_PATH = path.join(DIST_DIR, "index.html");
const META_START = "<!-- swarmauri-meta:start -->";
const META_END = "<!-- swarmauri-meta:end -->";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

type RouteMeta = {
  route: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article" | "profile";
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function routeSegment(value: string): string {
  return encodeURIComponent(value.toLowerCase());
}

function normalizeRoute(route: string): string {
  const normalized = route.replace(/^\/+|\/+$/g, "");
  return normalized;
}

function absoluteUrl(route: string): string {
  const normalized = normalizeRoute(route);
  return normalized ? `${SITE_URL}/${normalized}` : SITE_URL;
}

function fullTitle(title: string): string {
  return title.includes("Swarmauri") ? title : `${title} | Swarmauri Ecosystem`;
}

function metaBlock(meta: RouteMeta): string {
  const title = fullTitle(meta.title);
  const description = meta.description;
  const image = meta.image ?? DEFAULT_IMAGE;
  const url = absoluteUrl(meta.route);
  const type = meta.type ?? "website";
  const keywords =
    meta.keywords?.join(", ") ??
    CANONICAL_TAXONOMY_KEYWORDS.join(", ");

  return `${META_START}
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(keywords)}" />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Swarmauri Composable Intelligence infrastructure" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:site_name" content="Swarmauri" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <link rel="canonical" href="${escapeHtml(url)}" />
    ${META_END}`;
}

function replaceMetadata(shellHtml: string, meta: RouteMeta): string {
  const start = shellHtml.indexOf(META_START);
  const end = shellHtml.indexOf(META_END);
  if (start === -1 || end === -1 || end < start) {
    throw new Error("Missing swarmauri metadata marker block in dist/index.html");
  }

  const title = fullTitle(meta.title);
  const afterMetaEnd = end + META_END.length;
  const withMetadata = `${shellHtml.slice(0, start)}${metaBlock(meta)}${shellHtml.slice(
    afterMetaEnd,
  )}`.replace(
    /<title>.*?<\/title>/,
    `<title>${escapeHtml(title)}</title>`,
  );

  return deferStylesheets(withMetadata);
}

function deferStylesheets(html: string): string {
  return html.replace(
    /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
    (_match, href: string) =>
      `<link rel="preload" crossorigin href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">` +
      `<noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`,
  );
}

function writeRouteHtml(shellHtml: string, meta: RouteMeta) {
  const normalized = normalizeRoute(meta.route);
  const html = replaceMetadata(shellHtml, meta);

  if (!normalized) {
    fs.writeFileSync(SHELL_PATH, html, "utf8");
    return;
  }

  const outputDir = path.join(DIST_DIR, ...normalized.split("/"));
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "index.html"), html, "utf8");
}

const routes: RouteMeta[] = [
  {
    route: "",
    title: "Swarmauri Ecosystem",
    description: CANONICAL_TAXONOMY_DESCRIPTION,
    keywords: CANONICAL_TAXONOMY_KEYWORDS,
  },
  {
    route: "framework",
    title: "Composable Intelligence Framework",
    description:
      `Explore ${FAMILIES.length} generated Swarmauri component families across tools, agents, models, parsers, middleware, crypto, storage, identity, evaluators, workflows, and integrations.`,
  },
  {
    route: "packages",
    title: "Package Portfolio Catalog",
    description:
      "Browse Swarmauri's generated package catalog with install commands, import examples, source paths, maturity, and package-layer metadata.",
  },
  {
    route: "architecture",
    title: "Ecosystem Architecture",
    description:
      "Explore the generated Swarmauri SDK package-index layer model, direct imports, facade imports, plugin discovery, and package citizenship.",
  },
  {
    route: "composer",
    title: "Agent Workflow Composer",
    description:
      "Compose Swarmauri execution routes from separated package primitives and preview dependency-aware Python workflow layouts.",
  },
  {
    route: "guides",
    title: "SDK Guides",
    description:
      "Learn how to install, import, compose, and extend Swarmauri packages across tools, skills, parsers, middleware, storage, crypto, identity, evaluators, workflows, and package authoring.",
  },
  {
    route: "claims",
    title: "Active Claims and Verifications",
    description:
      "Verify Swarmauri claims across packaging, cryptography, interface protocols, integrations, evidence, and ratings.",
  },
  {
    route: "updates",
    title: "Ecosystem Updates",
    description:
      "Read Swarmauri release notes, package highlights, architecture notes, tutorials, and archived project updates.",
  },
  {
    route: "careers",
    title: "Swarmauri Careers",
    description:
      "Build the next era of composable Python components with Swarmauri's remote, contract-first contributor network.",
  },
  {
    route: "community",
    title: "Community Hub and Support",
    description:
      "Connect with Swarmauri developers, technical contributors, repository resources, Discord, and community support channels.",
  },
  {
    route: "faq",
    title: "Swarmauri FAQ",
    description:
      "Current answers about Swarmauri installation, package layers, Python support, documentation, catalog data, and contribution paths.",
  },
  {
    route: "services",
    title: "Swarmauri Services",
    description:
      "Implementation, architecture, and documentation services for teams adopting Swarmauri's composable Python SDK and package ecosystem.",
  },
  {
    route: "solutions",
    title: "Swarmauri Solutions",
    description:
      "Solution patterns for Swarmauri agent systems, provider portability, and security-centered Python applications.",
  },
  {
    route: "privacy-policy",
    title: "Privacy Policy",
    description:
      "Swarmauri privacy policy for the company website, package catalog, open-source SDK, and developer documentation surfaces.",
  },
  {
    route: "terms-of-service",
    title: "Terms of Service",
    description:
      "Swarmauri terms for using the company website, package catalog, documentation, community resources, and open-source SDK materials.",
  },
  ...GUIDE_TOPICS.map((guide) => ({
    route: `guides/${routeSegment(guide.id)}`,
    title: `${guide.title} Guide`,
    description: guide.description,
    keywords: [guide.title, "swarmauri", "guide", "python"],
  })),
  ...PACKAGES.map((pkg) => ({
    route: `packages/${routeSegment(pkg.name)}`,
    title: `${pkg.name} Python Package`,
    description: pkg.description,
    keywords: [pkg.name, pkg.layer, pkg.family, "swarmauri", "python package"],
  })),
  ...UPDATE_POSTS.map((post) => ({
    route: `updates/${routeSegment(getUpdateSlug(post))}`,
    title: post.title,
    description: post.summary,
    keywords: [post.title, post.category, "swarmauri", "updates"],
    type: "article" as const,
  })),
  ...CAREER_ROLES.map((role) => ({
    route: `careers/${routeSegment(role.slug)}`,
    title: `${role.title} Role`,
    description: role.description,
    keywords: [role.title, role.department, "swarmauri", "careers"],
    type: "profile" as const,
  })),
];

function main() {
  if (!fs.existsSync(SHELL_PATH)) {
    throw new Error("dist/index.html does not exist. Run vite build first.");
  }

  const shellHtml = fs.readFileSync(SHELL_PATH, "utf8");
  const uniqueRoutes = new Map<string, RouteMeta>();
  for (const route of routes) {
    uniqueRoutes.set(normalizeRoute(route.route), route);
  }

  for (const route of uniqueRoutes.values()) {
    writeRouteHtml(shellHtml, route);
  }

  console.log(`Generated route metadata HTML for ${uniqueRoutes.size} routes.`);
}

main();
