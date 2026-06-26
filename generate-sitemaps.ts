import fs from 'fs';
import path from 'path';
import { PACKAGES } from './src/data/packages';
import { GUIDE_TOPICS } from './src/data/guides';
import { UPDATE_POSTS } from './src/data/updates';
import { CAREER_ROLES } from './src/data/careers';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const TODAY = new Date().toISOString().split('T')[0];

// Helper to escape special XML characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateMasterIndex(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://swarmauri.com/sitemap-main.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://swarmauri.com/sitemap-packages.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://swarmauri.com/sitemap-guides.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://swarmauri.com/sitemap-updates.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://swarmauri.com/sitemap-careers.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
</sitemapindex>`;
}

function generateMainSitemap(): string {
  const routes = [
    { path: '', changefreq: 'daily', priority: '1.0' },
    { path: 'platform', changefreq: 'weekly', priority: '0.9' },
    { path: 'architecture', changefreq: 'weekly', priority: '0.8' },
    { path: 'composer', changefreq: 'daily', priority: '0.8' },
    { path: 'claims', changefreq: 'monthly', priority: '0.7' },
    { path: 'community', changefreq: 'weekly', priority: '0.7' },
    { path: 'privacy-terms', changefreq: 'yearly', priority: '0.3' }
  ];

  const urls = routes.map(r => `  <url>
    <loc>https://swarmauri.com/${r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function generatePackagesSitemap(): string {
  const items = [
    `  <url>
    <loc>https://swarmauri.com/packages</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
  ];

  PACKAGES.forEach(pkg => {
    const escapedName = escapeXml(pkg.name.toLowerCase());
    items.push(`  <url>
    <loc>https://swarmauri.com/packages/${escapedName}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items.join('\n')}
</urlset>`;
}

function generateGuidesSitemap(): string {
  const items = [
    `  <url>
    <loc>https://swarmauri.com/guides</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  ];

  GUIDE_TOPICS.forEach(guide => {
    const escapedId = escapeXml(guide.id.toLowerCase());
    items.push(`  <url>
    <loc>https://swarmauri.com/guides/${escapedId}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items.join('\n')}
</urlset>`;
}

function generateUpdatesSitemap(): string {
  const items = [
    `  <url>
    <loc>https://swarmauri.com/updates</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
  ];

  UPDATE_POSTS.forEach(post => {
    const escapedId = escapeXml(post.id.toLowerCase());
    // Use the post's actual date if available, otherwise fallback to today
    const postDate = post.date || TODAY;
    items.push(`  <url>
    <loc>https://swarmauri.com/updates/${escapedId}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items.join('\n')}
</urlset>`;
}

function generateCareersSitemap(): string {
  const items = [
    `  <url>
    <loc>https://swarmauri.com/careers</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  ];

  CAREER_ROLES.forEach(role => {
    const escapedId = escapeXml(role.id.toLowerCase());
    items.push(`  <url>
    <loc>https://swarmauri.com/careers/${escapedId}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items.join('\n')}
</urlset>`;
}

function main() {
  console.log(`Generating sitemaps inside: ${PUBLIC_DIR}...`);

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const files = {
    'sitemap.xml': generateMasterIndex(),
    'sitemap-main.xml': generateMainSitemap(),
    'sitemap-packages.xml': generatePackagesSitemap(),
    'sitemap-guides.xml': generateGuidesSitemap(),
    'sitemap-updates.xml': generateUpdatesSitemap(),
    'sitemap-careers.xml': generateCareersSitemap()
  };

  Object.entries(files).forEach(([filename, content]) => {
    const filepath = path.join(PUBLIC_DIR, filename);
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`  ✓ Generated ${filename} (${content.length} bytes)`);
  });

  console.log('Sitemaps generation complete!');
}

main();
