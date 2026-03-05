import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://akceostrava.cz';
const TODAY = new Date().toISOString().split('T')[0];

// Language configs: [lang, prefix, route overrides]
const langs = [
  { lang: 'cs', prefix: '', routes: { events: 'akce', contact: 'kontakt', terms: 'obchodni-podminky', gdpr: 'gdpr' } },
  { lang: 'en', prefix: '/en', routes: { events: 'events', contact: 'contact', terms: 'terms', gdpr: 'gdpr' } },
  { lang: 'uk', prefix: '/uk', routes: { events: 'akce', contact: 'kontakt', terms: 'gdpr', gdpr: 'gdpr' } },
  { lang: 'sk', prefix: '/sk', routes: { events: 'akcie', contact: 'kontakt', terms: 'obchodne-podmienky', gdpr: 'gdpr' } },
];

// Static pages per language: [routeKey, changefreq, priority]
const staticPageKeys = [
  ['home', 'daily', '1.0'],
  ['events', 'daily', '0.9'],
  ['blog', 'daily', '0.9'],
  ['contact', 'monthly', '0.6'],
  ['terms', 'yearly', '0.3'],
  ['gdpr', 'yearly', '0.3'],
];

// Load events from source
const eventsPath = resolve(__dirname, '../src/data/events.ts');
const eventsSource = readFileSync(eventsPath, 'utf-8');
const slugRegex = /slug:\s*'([^']+)'/g;
const eventSlugs = [];
let match;
while ((match = slugRegex.exec(eventsSource)) !== null) {
  eventSlugs.push(match[1]);
}

// Load blog articles from JSON
const blogPath = resolve(__dirname, '../src/data/blog-articles.json');
const blogArticles = JSON.parse(readFileSync(blogPath, 'utf-8'));

// Build all URLs
const urls = [];

function buildPath(langConfig, routeKey) {
  const { prefix, routes } = langConfig;
  if (routeKey === 'home') return `${prefix}/` || '/';
  if (routeKey === 'blog') return `${prefix}/blog`;
  return `${prefix}/${routes[routeKey] || routeKey}`;
}

function buildAlternates(pathBuilder) {
  return langs.map((l) => ({
    lang: l.lang === 'cs' ? 'cs' : l.lang,
    href: `${SITE_URL}${pathBuilder(l)}`,
  }));
}

// Static pages
for (const [routeKey, changefreq, priority] of staticPageKeys) {
  for (const langConfig of langs) {
    const path = buildPath(langConfig, routeKey);
    const alternates = buildAlternates((l) => buildPath(l, routeKey));
    urls.push({ loc: `${SITE_URL}${path}`, changefreq, priority, lastmod: TODAY, alternates });
  }
}

// Event detail pages
for (const slug of eventSlugs) {
  for (const langConfig of langs) {
    const path = `${langConfig.prefix}/${langConfig.routes.events}/${slug}`;
    const alternates = buildAlternates((l) => `${l.prefix}/${l.routes.events}/${slug}`);
    urls.push({ loc: `${SITE_URL}${path}`, changefreq: 'weekly', priority: '0.8', lastmod: TODAY, alternates });
  }
}

// Blog detail pages
for (const article of blogArticles) {
  for (const langConfig of langs) {
    const path = `${langConfig.prefix}/blog/${article.slug}`;
    const alternates = buildAlternates((l) => `${l.prefix}/blog/${article.slug}`);
    urls.push({
      loc: `${SITE_URL}${path}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: article.date || TODAY,
      alternates,
    });
  }
}

// Generate XML with xhtml:link hreflang
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${u.alternates
      .map(
        (a) => `
    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`
      )
      .join('')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${u.alternates[0].href}" />
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outPath = resolve(__dirname, '../dist/sitemap.xml');
writeFileSync(outPath, xml, 'utf-8');

console.log(`Sitemap generated: ${urls.length} URLs → dist/sitemap.xml`);
