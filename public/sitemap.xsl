<?xml version="1.0" encoding="UTF-8"?>
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
                    <div class="stat"><div class="label">Last Generated</div><div class="value mono">2026-06-27T11:56:26.159Z</div></div>
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
                    <div class="stat"><div class="label">Last Generated</div><div class="value mono">2026-06-27T11:56:26.159Z</div></div>
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
