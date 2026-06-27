import fs from "fs";
import path from "path";
import { CAREER_ROLES } from "./src/data/careers";
import { CLAIM_RECORDS } from "./src/data/claims";
import { GUIDE_TOPICS } from "./src/data/guides";
import { LEGACY_PAGES } from "./src/data/legacyContent";
import {
  FAMILIES,
  LAYERS,
  MATURITIES,
  PACKAGES,
  SDK_METADATA,
} from "./src/data/packages";
import { UPDATE_POSTS } from "./src/data/updates";
import { getUpdateSlug } from "./src/utils/updateSlugs";

const SITE_URL = "https://swarmauri.com";
const PUBLIC_DIR = path.join(process.cwd(), "public");
const GENERATED_AT = new Date();
const GENERATED_AT_ISO = GENERATED_AT.toISOString();

type SitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: string;
};

type SitemapFile = {
  filename: string;
  label: string;
  entries: SitemapEntry[];
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function absoluteUrl(route = ""): string {
  const normalized = route.replace(/^\/+/, "").replace(/\/+$/, "");
  return normalized ? `${SITE_URL}/${normalized}` : SITE_URL;
}

function routeSegment(value: string): string {
  return encodeURIComponent(value.toLowerCase());
}

function dateToIso(value?: string): string {
  if (!value) return GENERATED_AT_ISO;
  if (value.includes("T")) return new Date(value).toISOString();
  return new Date(`${value}T00:00:00.000Z`).toISOString();
}

function sitemapEntryXml(entry: SitemapEntry): string {
  const changefreq = entry.changefreq
    ? `\n    <changefreq>${entry.changefreq}</changefreq>`
    : "";
  const priority = entry.priority
    ? `\n    <priority>${entry.priority}</priority>`
    : "";

  return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>${changefreq}${priority}
  </url>`;
}

function sitemapUrlset(entries: SitemapEntry[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(sitemapEntryXml).join("\n")}
</urlset>
`;
}

function sitemapIndexXml(sitemaps: SitemapFile[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (sitemap) => `  <sitemap>
    <loc>${SITE_URL}/${sitemap.filename}</loc>
    <lastmod>${GENERATED_AT_ISO}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>
`;
}

function buildMainEntries(): SitemapEntry[] {
  const emptyLegacyPages = new Set([
    "careers",
    "faq",
    "privacy-policy",
    "services-and-solutions",
    "terms-of-service",
  ]);
  const legacyEntries = LEGACY_PAGES.filter(
    (page) => !emptyLegacyPages.has(page.id),
  ).map((page) => ({
    loc: absoluteUrl(page.legacyPath),
    lastmod: dateToIso(page.modified || page.date),
    changefreq: "yearly" as const,
    priority: "0.4",
  }));

  return [
    { loc: absoluteUrl(), lastmod: GENERATED_AT_ISO, changefreq: "daily", priority: "1.0" },
    { loc: absoluteUrl("platform"), lastmod: GENERATED_AT_ISO, changefreq: "weekly", priority: "0.9" },
    { loc: absoluteUrl("packages"), lastmod: dateToIso(SDK_METADATA.lastGenerated), changefreq: "daily", priority: "0.9" },
    { loc: absoluteUrl("architecture"), lastmod: GENERATED_AT_ISO, changefreq: "weekly", priority: "0.8" },
    { loc: absoluteUrl("composer"), lastmod: GENERATED_AT_ISO, changefreq: "daily", priority: "0.8" },
    { loc: absoluteUrl("guides"), lastmod: GENERATED_AT_ISO, changefreq: "weekly", priority: "0.8" },
    { loc: absoluteUrl("claims"), lastmod: GENERATED_AT_ISO, changefreq: "monthly", priority: "0.7" },
    { loc: absoluteUrl("updates"), lastmod: GENERATED_AT_ISO, changefreq: "daily", priority: "0.8" },
    { loc: absoluteUrl("careers"), lastmod: GENERATED_AT_ISO, changefreq: "weekly", priority: "0.8" },
    { loc: absoluteUrl("community"), lastmod: GENERATED_AT_ISO, changefreq: "weekly", priority: "0.7" },
    { loc: absoluteUrl("services"), lastmod: GENERATED_AT_ISO, changefreq: "monthly", priority: "0.6" },
    { loc: absoluteUrl("solutions"), lastmod: GENERATED_AT_ISO, changefreq: "monthly", priority: "0.6" },
    { loc: absoluteUrl("faq"), lastmod: GENERATED_AT_ISO, changefreq: "weekly", priority: "0.7" },
    { loc: absoluteUrl("privacy-policy"), lastmod: GENERATED_AT_ISO, changefreq: "yearly", priority: "0.3" },
    { loc: absoluteUrl("terms-of-service"), lastmod: GENERATED_AT_ISO, changefreq: "yearly", priority: "0.3" },
    { loc: absoluteUrl("llms.txt"), lastmod: GENERATED_AT_ISO, changefreq: "daily", priority: "0.6" },
    { loc: absoluteUrl("llms-full.txt"), lastmod: GENERATED_AT_ISO, changefreq: "daily", priority: "0.6" },
    ...legacyEntries,
  ];
}

function buildPackagesEntries(): SitemapEntry[] {
  return [
    {
      loc: absoluteUrl("packages"),
      lastmod: dateToIso(SDK_METADATA.lastGenerated),
      changefreq: "daily",
      priority: "0.9",
    },
    ...PACKAGES.map((pkg) => ({
      loc: absoluteUrl(`packages/${routeSegment(pkg.name)}`),
      lastmod: dateToIso(SDK_METADATA.lastGenerated),
      changefreq: "weekly" as const,
      priority: "0.8",
    })),
  ];
}

function buildGuidesEntries(): SitemapEntry[] {
  return [
    { loc: absoluteUrl("guides"), lastmod: GENERATED_AT_ISO, changefreq: "weekly", priority: "0.8" },
    ...GUIDE_TOPICS.map((guide) => ({
      loc: absoluteUrl(`guides/${routeSegment(guide.id)}`),
      lastmod: GENERATED_AT_ISO,
      changefreq: "weekly" as const,
      priority: "0.8",
    })),
  ];
}

function buildUpdatesEntries(): SitemapEntry[] {
  return [
    { loc: absoluteUrl("updates"), lastmod: GENERATED_AT_ISO, changefreq: "daily", priority: "0.8" },
    ...UPDATE_POSTS.map((post) => ({
      loc: absoluteUrl(`updates/${routeSegment(getUpdateSlug(post))}`),
      lastmod: dateToIso(post.date),
      changefreq: "monthly" as const,
      priority: "0.7",
    })),
  ];
}

function buildCareersEntries(): SitemapEntry[] {
  return [
    { loc: absoluteUrl("careers"), lastmod: GENERATED_AT_ISO, changefreq: "weekly", priority: "0.8" },
    ...CAREER_ROLES.map((role) => ({
      loc: absoluteUrl(`careers/${routeSegment(role.slug)}`),
      lastmod: GENERATED_AT_ISO,
      changefreq: "weekly" as const,
      priority: "0.7",
    })),
  ];
}

function sitemapXsl(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  exclude-result-prefixes="s">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Swarmauri Sitemap</title>
        <style>
          body { margin: 0; background: #f8fafc; color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
          header { background: #111827; color: white; padding: 36px 24px; border-bottom: 4px solid #4f46e5; }
          main { max-width: 1180px; margin: -24px auto 48px; padding: 0 18px; }
          .panel { background: white; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 12px 36px rgba(15, 23, 42, 0.08); overflow: hidden; }
          .intro { padding: 24px; border-bottom: 1px solid #e5e7eb; }
          h1 { margin: 0; font-size: 32px; line-height: 1.1; letter-spacing: 0; }
          h2 { margin: 0 0 6px; font-size: 20px; letter-spacing: 0; }
          p { margin: 0; color: #64748b; line-height: 1.55; font-size: 14px; }
          .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 12px; margin-top: 18px; }
          .stat { border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px; background: #f8fafc; }
          .label { color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }
          .value { margin-top: 4px; font-size: 22px; font-weight: 800; color: #111827; }
          table { width: 100%; border-collapse: collapse; font-size: 13px; }
          th { background: #f1f5f9; color: #475569; text-align: left; padding: 12px 14px; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; border-bottom: 1px solid #e2e8f0; }
          td { padding: 12px 14px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
          tr:hover td { background: #fafafa; }
          a { color: #4338ca; text-decoration: none; font-weight: 650; word-break: break-all; }
          a:hover { text-decoration: underline; }
          code, .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; color: #475569; font-size: 12px; }
          .badge { display: inline-block; border: 1px solid #c7d2fe; background: #eef2ff; color: #3730a3; border-radius: 999px; padding: 3px 8px; font-size: 11px; font-weight: 700; }
          .right { text-align: right; }
          footer { margin-top: 18px; color: #64748b; font-size: 12px; text-align: center; }
        </style>
      </head>
      <body>
        <header>
          <div style="max-width:1180px;margin:0 auto;">
            <h1>Swarmauri Sitemap</h1>
            <p style="color:#cbd5e1;margin-top:8px;">Generated XML sitemap files with nested indexes, crawl metadata, and readable tables for humans.</p>
          </div>
        </header>
        <main>
          <section class="panel">
            <xsl:choose>
              <xsl:when test="/s:sitemapindex">
                <div class="intro">
                  <h2>Sitemap Index</h2>
                  <p>This master file links to nested sitemaps for the company site, package catalog, guides, updates, and careers.</p>
                  <div class="stats">
                    <div class="stat"><div class="label">Type</div><div class="value">Index</div></div>
                    <div class="stat"><div class="label">Nested Sitemaps</div><div class="value"><xsl:value-of select="count(/s:sitemapindex/s:sitemap)"/></div></div>
                    <div class="stat"><div class="label">Last Generated</div><div class="value mono">${GENERATED_AT_ISO}</div></div>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Sitemap</th>
                      <th>Category</th>
                      <th class="right">Last Modified Datetime</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="/s:sitemapindex/s:sitemap">
                      <tr>
                        <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                        <td>
                          <span class="badge">
                            <xsl:choose>
                              <xsl:when test="contains(s:loc, 'packages')">Packages</xsl:when>
                              <xsl:when test="contains(s:loc, 'guides')">Guides</xsl:when>
                              <xsl:when test="contains(s:loc, 'updates')">Updates</xsl:when>
                              <xsl:when test="contains(s:loc, 'careers')">Careers</xsl:when>
                              <xsl:otherwise>Main</xsl:otherwise>
                            </xsl:choose>
                          </span>
                        </td>
                        <td class="right mono"><xsl:value-of select="s:lastmod"/></td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </xsl:when>
              <xsl:otherwise>
                <div class="intro">
                  <h2>URL Sitemap</h2>
                  <p><a href="/sitemap.xml">Back to sitemap index</a>. This child sitemap lists canonical URLs, priorities, change frequency, and ISO 8601 last modified datetimes.</p>
                  <div class="stats">
                    <div class="stat"><div class="label">Type</div><div class="value">URL Set</div></div>
                    <div class="stat"><div class="label">URLs</div><div class="value"><xsl:value-of select="count(/s:urlset/s:url)"/></div></div>
                    <div class="stat"><div class="label">Last Generated</div><div class="value mono">${GENERATED_AT_ISO}</div></div>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>URL</th>
                      <th>Priority</th>
                      <th>Change Frequency</th>
                      <th class="right">Last Modified Datetime</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="/s:urlset/s:url">
                      <tr>
                        <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                        <td><span class="badge"><xsl:value-of select="s:priority"/></span></td>
                        <td class="mono"><xsl:value-of select="s:changefreq"/></td>
                        <td class="right mono"><xsl:value-of select="s:lastmod"/></td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </xsl:otherwise>
            </xsl:choose>
          </section>
          <footer>Swarmauri generated sitemap view. XML remains compliant with the Sitemaps.org protocol.</footer>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
`;
}

function buildLlmsTxt(): string {
  const featuredPackages = PACKAGES.slice(0, 25)
    .map((pkg) => `- [${pkg.name}](${absoluteUrl(`packages/${routeSegment(pkg.name)}`)}): ${pkg.description}`)
    .join("\n");

  return `# Swarmauri

Swarmauri is a composable Python SDK and company portfolio for contract-first AI, agent, crypto, transport, storage, and provider integration packages.

## Canonical Pages

- [Home](${absoluteUrl()})
- [Platform](${absoluteUrl("platform")})
- [Architecture](${absoluteUrl("architecture")})
- [Package Catalog](${absoluteUrl("packages")})
- [Workflow Composer](${absoluteUrl("composer")})
- [Guides](${absoluteUrl("guides")})
- [Updates](${absoluteUrl("updates")})
- [Careers](${absoluteUrl("careers")})
- [Services](${absoluteUrl("services")})
- [Solutions](${absoluteUrl("solutions")})
- [FAQ](${absoluteUrl("faq")})
- [Privacy Policy](${absoluteUrl("privacy-policy")})
- [Terms of Service](${absoluteUrl("terms-of-service")})

## Current SDK Metadata

- Swarmauri namespace package version: ${SDK_METADATA.version}
- Monorepo version: ${SDK_METADATA.monorepoVersion}
- Python support: ${SDK_METADATA.pythonSupport}
- Workspace members: ${SDK_METADATA.totalWorkspaceMembers}
- Indexed package records: ${SDK_METADATA.totalIndexedRecords}
- Source: ${SDK_METADATA.source}
- Site metadata generated: ${GENERATED_AT_ISO}

## Layer Summary

${LAYERS.map((layer) => `- ${layer.id}: ${layer.description} (${layer.count} packages)`).join("\n")}

## Featured Packages

${featuredPackages}

## Full Assistant Index

See [llms-full.txt](${absoluteUrl("llms-full.txt")}) for the complete package, guide, update, claim, and career index.
`;
}

function buildLlmsFullTxt(sitemaps: SitemapFile[]): string {
  const sitemapSection = sitemaps
    .map((sitemap) => `- [${sitemap.label}](${SITE_URL}/${sitemap.filename}): ${sitemap.entries.length} entries`)
    .join("\n");

  const packageSection = PACKAGES.map(
    (pkg) => `### ${pkg.name}

- URL: ${absoluteUrl(`packages/${routeSegment(pkg.name)}`)}
- Layer: ${pkg.layer}
- Family: ${pkg.family}
- Role: ${pkg.role}
- Maturity: ${pkg.maturity}
- Version: ${pkg.version}
- Workspace backed: ${pkg.workspace ? "yes" : "no"}
- Python support: ${pkg.pythonVersion}
- Install: ${pkg.installCommand}
- Import example:

\`\`\`python
${pkg.importExample}
\`\`\`

- Source path: ${pkg.sourcePath}
- Docs/source link: ${pkg.docsLink}
- Dependencies: ${pkg.dependencies.length ? pkg.dependencies.join(", ") : "none listed"}
- Description: ${pkg.description}`,
  ).join("\n\n");

  const guideSection = GUIDE_TOPICS.map(
    (guide) => `### ${guide.title}

- URL: ${absoluteUrl(`guides/${routeSegment(guide.id)}`)}
- Description: ${guide.description}
- Explanation: ${guide.explanation}

\`\`\`python
${guide.codeBlock}
\`\`\``,
  ).join("\n\n");

  const updateSection = UPDATE_POSTS.map(
    (post) => `### ${post.title}

- URL: ${absoluteUrl(`updates/${routeSegment(getUpdateSlug(post))}`)}
- Date: ${post.date}
- Category: ${post.category}
- Summary: ${post.summary}
- Body: ${post.content}`,
  ).join("\n\n");

  const claimSection = CLAIM_RECORDS.map(
    (claim) => `### ${claim.claim}

- Category: ${claim.category}
- Package: ${claim.package}
- Status: ${claim.status}
- Verification: ${claim.verification}
- Details: ${claim.details}
- Citation: ${claim.citation ?? "none listed"}`,
  ).join("\n\n");

  const careerSection = CAREER_ROLES.map(
    (role) => `### ${role.title}

- URL: ${absoluteUrl(`careers/${routeSegment(role.slug)}`)}
- Department: ${role.department}
- Location: ${role.location}
- Type: ${role.type}
- Description: ${role.description}
- Requirements: ${role.requirements.join(" | ")}`,
  ).join("\n\n");

  return `# Swarmauri Full LLM Index

Generated: ${GENERATED_AT_ISO}

This file is the complete assistant-facing index for swarmauri.com. It is generated from the same source data as the nested XML sitemaps.

## Sitemap Files

${sitemapSection}

## SDK Metadata

- Swarmauri namespace package version: ${SDK_METADATA.version}
- Monorepo version: ${SDK_METADATA.monorepoVersion}
- Python support: ${SDK_METADATA.pythonSupport}
- Workspace member entries: ${SDK_METADATA.totalWorkspaceMemberEntries}
- Unique workspace members: ${SDK_METADATA.totalWorkspaceMembers}
- Indexed package records: ${SDK_METADATA.totalIndexedRecords}
- Workspace-backed indexed records: ${SDK_METADATA.workspaceBackedIndexedRecords}
- Duplicate workspace members: ${SDK_METADATA.duplicateWorkspaceMembers.length ? SDK_METADATA.duplicateWorkspaceMembers.join(", ") : "none"}
- SDK metadata source: ${SDK_METADATA.source}
- SDK metadata generated: ${SDK_METADATA.lastGenerated}

## Layers

${LAYERS.map((layer) => `- ${layer.id} / ${layer.name}: ${layer.description}; count=${layer.count}`).join("\n")}

## Families

${FAMILIES.map((family) => `- ${family.name}: ${family.count} packages; ${family.description}`).join("\n")}

## Maturities

${MATURITIES.map((maturity) => `- ${maturity.name}: ${maturity.count} packages; ${maturity.description}`).join("\n")}

## Packages

${packageSection}

## Guides

${guideSection}

## Updates

${updateSection}

## Claims

${claimSection}

## Careers

${careerSection}
`;
}

function writeFile(filename: string, content: string) {
  const filepath = path.join(PUBLIC_DIR, filename);
  fs.writeFileSync(filepath, content, "utf8");
  console.log(`  Generated ${filename} (${content.length} bytes)`);
}

function main() {
  console.log(`Generating discovery files inside: ${PUBLIC_DIR}...`);

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const sitemaps: SitemapFile[] = [
    { filename: "sitemap-main.xml", label: "Main Pages", entries: buildMainEntries() },
    { filename: "sitemap-packages.xml", label: "Package Catalog", entries: buildPackagesEntries() },
    { filename: "sitemap-guides.xml", label: "Guides", entries: buildGuidesEntries() },
    { filename: "sitemap-updates.xml", label: "Updates", entries: buildUpdatesEntries() },
    { filename: "sitemap-careers.xml", label: "Careers", entries: buildCareersEntries() },
  ];

  writeFile("sitemap.xml", sitemapIndexXml(sitemaps));
  sitemaps.forEach((sitemap) => {
    writeFile(sitemap.filename, sitemapUrlset(sitemap.entries));
  });
  writeFile("sitemap.xsl", sitemapXsl());
  writeFile("llms.txt", buildLlmsTxt());
  writeFile("llms-full.txt", buildLlmsFullTxt(sitemaps));

  console.log("Discovery file generation complete.");
}

main();
