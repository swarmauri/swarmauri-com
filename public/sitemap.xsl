<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  exclude-result-prefixes="s">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Swarmauri Ecosystem - XML Sitemap</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            margin: 0;
            padding: 0;
          }
          .header-bg {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #f8fafc;
            padding: 3rem 2rem;
            border-bottom: 4px solid #6366f1;
          }
          .container {
            max-width: 1200px;
            margin: -2rem auto 3rem auto;
            padding: 0 1rem;
          }
          .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
            border: 1px solid #e2e8f0;
            overflow: hidden;
            padding: 2rem;
          }
          .card-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: 0.5rem;
            color: #0f172a;
          }
          .card-subtitle {
            font-size: 0.875rem;
            color: #64748b;
            margin-bottom: 2rem;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.875rem;
          }
          th {
            background-color: #f1f5f9;
            color: #475569;
            font-weight: 600;
            text-align: left;
            padding: 0.75rem 1rem;
            border-bottom: 2px solid #e2e8f0;
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 0.05em;
          }
          td {
            padding: 1rem;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: middle;
          }
          tr:hover td {
            background-color: #f8fafc;
          }
          .url-link {
            color: #4f46e5;
            text-decoration: none;
            font-weight: 500;
            word-break: break-all;
          }
          .url-link:hover {
            text-decoration: underline;
          }
          .badge {
            display: inline-flex;
            align-items: center;
            border-radius: 9999px;
            padding: 0.25rem 0.75rem;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            font-family: monospace;
          }
          .badge-blue {
            background-color: #e0e7ff;
            color: #3730a3;
            border: 1px solid #c7d2fe;
          }
          .badge-green {
            background-color: #dcfce7;
            color: #166534;
            border: 1px solid #bbf7d0;
          }
          .badge-orange {
            background-color: #ffedd5;
            color: #9a3412;
            border: 1px solid #fed7aa;
          }
          .badge-indigo {
            background-color: #f5f3ff;
            color: #5b21b6;
            border: 1px solid #ddd6fe;
          }
          .mono {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            font-size: 0.8rem;
            color: #475569;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
          }
          .stat-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 1.25rem;
          }
          .stat-title {
            font-size: 0.75rem;
            text-transform: uppercase;
            color: #64748b;
            font-weight: 600;
            letter-spacing: 0.05em;
          }
          .stat-value {
            font-size: 1.75rem;
            font-weight: 800;
            color: #0f172a;
            margin-top: 0.25rem;
          }
          .desc {
            line-height: 1.6;
            font-size: 0.95rem;
            color: #334155;
          }
          .footer {
            text-align: center;
            margin-top: 4rem;
            color: #64748b;
            font-size: 0.8125rem;
            border-top: 1px solid #e2e8f0;
            padding-top: 2rem;
          }
          .breadcrumb {
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
            color: #94a3b8;
          }
          .breadcrumb a {
            color: #cbd5e1;
            text-decoration: none;
          }
          .breadcrumb a:hover {
            color: #f8fafc;
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="header-bg">
          <div style="max-width: 1200px; margin: 0 auto;">
            <div class="breadcrumb">
              <a href="/">Ecosystem Homepage</a> &#187; XML Sitemap
            </div>
            <h1 style="margin: 0 0 0.5rem 0; font-size: 2.5rem; font-weight: 800; tracking-tight: -0.025em;">
              Swarmauri SEO, AEO &amp; AiEO Indexing
            </h1>
            <p style="margin: 0; font-size: 1.1rem; color: #94a3b8; max-width: 800px; font-weight: 400; line-height: 1.5;">
              This sitemap index coordinates dynamic structured mappings for Search Engines (SEO), Answer Engines (AEO like Perplexity, ChatGPT), and AI Agents (AiEO).
            </p>
          </div>
        </div>

        <div class="container">
          <div class="card">
            
            <!-- Check if Root is Sitemap Index -->
            <xsl:choose>
              <xsl:when test="s:sitemapindex">
                <h2 class="card-title">Sitemap Index Matrix</h2>
                <p class="card-subtitle">
                  This index lists all sub-sitemaps that catalog modular packages, guides, career opportunities, and historical updates.
                </p>

                <div class="grid">
                  <div class="stat-box">
                    <div class="stat-title">Index Type</div>
                    <div class="stat-value" style="color: #6366f1;">Master Index</div>
                  </div>
                  <div class="stat-box">
                    <div class="stat-title">Nested Sitemaps</div>
                    <div class="stat-value">
                      <xsl:value-of select="count(s:sitemapindex/s:sitemap)"/>
                    </div>
                  </div>
                  <div class="stat-box">
                    <div class="stat-title">Target Environment</div>
                    <div class="stat-value" style="font-size: 1.25rem; font-weight: 700; margin-top: 0.5rem;">Google Enriched Rich Results</div>
                  </div>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th style="width: 55%;">Sitemap URL</th>
                      <th style="width: 25%;">Last Modified Date</th>
                      <th style="width: 20%; text-align: right;">Sitemap Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="s:sitemapindex/s:sitemap">
                      <tr>
                        <td>
                          <a class="url-link" href="{s:loc}">
                            <xsl:value-of select="s:loc"/>
                          </a>
                        </td>
                        <td class="mono">
                          <xsl:value-of select="s:lastmod"/>
                        </td>
                        <td style="text-align: right;">
                          <span class="badge badge-blue">
                            <xsl:choose>
                              <xsl:when test="contains(s:loc, '-packages')">Packages</xsl:when>
                              <xsl:when test="contains(s:loc, '-guides')">Guides</xsl:when>
                              <xsl:when test="contains(s:loc, '-updates')">Blog Posts</xsl:when>
                              <xsl:when test="contains(s:loc, '-careers')">Careers</xsl:when>
                              <xsl:when test="contains(s:loc, '-main')">Core Pages</xsl:when>
                              <xsl:otherwise>Sitemap</xsl:otherwise>
                            </xsl:choose>
                          </span>
                        </td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </xsl:when>

              <!-- Standard urlset Sitemap -->
              <xsl:otherwise>
                <h2 class="card-title">Document &amp; Resource Catalog</h2>
                <p class="card-subtitle">
                  Detailed link index containing specific canonical resource nodes optimized for semantic parser discovery.
                </p>

                <div class="grid">
                  <div class="stat-box">
                    <div class="stat-title">Total URLs Mapped</div>
                    <div class="stat-value" style="color: #10b981;">
                      <xsl:value-of select="count(s:urlset/s:url)"/>
                    </div>
                  </div>
                  <div class="stat-box">
                    <div class="stat-title">Main Domain</div>
                    <div class="stat-value" style="font-size: 1.2rem; font-weight: 700; margin-top: 0.5rem; word-break: break-all;">
                      swarmauri.com
                    </div>
                  </div>
                  <div class="stat-box">
                    <div class="stat-title">Back to Master Index</div>
                    <div class="stat-value" style="font-size: 1rem; margin-top: 0.5rem;">
                      <a href="/sitemap.xml" style="color: #4f46e5; text-decoration: none; font-weight: 600;">&larr; View Master Index</a>
                    </div>
                  </div>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th style="width: 50%;">Canonical URL</th>
                      <th style="width: 15%;">Priority</th>
                      <th style="width: 15%;">Change Freq</th>
                      <th style="width: 20%; text-align: right;">Last Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="s:urlset/s:url">
                      <tr>
                        <td>
                          <a class="url-link" href="{s:loc}">
                            <xsl:value-of select="s:loc"/>
                          </a>
                        </td>
                        <td>
                          <span class="badge badge-indigo">
                            <xsl:value-of select="s:priority"/>
                          </span>
                        </td>
                        <td>
                          <span class="badge badge-orange">
                            <xsl:value-of select="s:changefreq"/>
                          </span>
                        </td>
                        <td class="mono" style="text-align: right;">
                          <xsl:value-of select="s:lastmod"/>
                        </td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </xsl:otherwise>
            </xsl:choose>

            <div class="desc" style="margin-top: 3rem; border-top: 1px dashed #e2e8f0; padding-top: 2rem;">
              <h3 style="font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-top: 0;">Why do we use styled, nested sitemaps?</h3>
              <p style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #475569;">
                Traditional flat sitemaps aggregate thousands of loose links, raising cognitive load for developers and reducing crawl efficiency. Swarmauri utilizes <strong>Structured Sitemap Indexes</strong> to isolate specific domain spaces (e.g., packages, guides, careers). By linking custom <code>sitemap.xsl</code> styles, we turn invisible XML into readable web indexes while adhering perfectly to the <strong>Sitemaps.org Protocol</strong>.
              </p>
            </div>
            
          </div>

          <div class="footer">
            Swarmauri Ecosystem XML Indexing System &#183; Powered by @mdwrk/structured-data &#183; 2026-06-26
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
