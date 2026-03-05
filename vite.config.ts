import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { readFileSync } from 'fs';

function getPrerenderRoutes(): string[] {
  const langs = [
    { prefix: '', events: 'akce', contact: 'kontakt', terms: 'obchodni-podminky', gdpr: 'gdpr', about: 'o-nas', faq: 'faq' },
    { prefix: '/en', events: 'events', contact: 'contact', terms: 'terms', gdpr: 'gdpr', about: 'about', faq: 'faq' },
    { prefix: '/uk', events: 'akce', contact: 'kontakt', terms: 'gdpr', gdpr: 'gdpr', about: 'pro-nas', faq: 'faq' },
    { prefix: '/sk', events: 'akcie', contact: 'kontakt', terms: 'obchodne-podmienky', gdpr: 'gdpr', about: 'o-nas', faq: 'faq' },
  ];

  const routes: string[] = [];

  // Event slugs from source
  const eventsSource = readFileSync(path.resolve(__dirname, 'src/data/events.ts'), 'utf-8');
  const slugRegex = /slug:\s*'([^']+)'/g;
  const eventSlugs: string[] = [];
  let match;
  while ((match = slugRegex.exec(eventsSource)) !== null) {
    eventSlugs.push(match[1]);
  }

  // Blog slugs from JSON
  const blogArticles = JSON.parse(
    readFileSync(path.resolve(__dirname, 'src/data/blog-articles.json'), 'utf-8')
  );

  for (const lang of langs) {
    const p = lang.prefix;

    // Static routes
    routes.push(p ? `${p}/` : '/');
    routes.push(`${p}/${lang.events}`);
    routes.push(`${p}/blog`);
    routes.push(`${p}/${lang.contact}`);
    routes.push(`${p}/${lang.terms}`);
    routes.push(`${p}/${lang.gdpr}`);
    routes.push(`${p}/${lang.about}`);
    routes.push(`${p}/${lang.faq}`);

    // Event detail pages
    for (const slug of eventSlugs) {
      routes.push(`${p}/${lang.events}/${slug}`);
    }

    // Blog detail pages
    for (const article of blogArticles) {
      routes.push(`${p}/blog/${article.slug}`);
    }
  }

  return routes;
}

// Log route count during build
const routes = getPrerenderRoutes();
console.log(`Prerender: ${routes.length} routes across 4 languages`);

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
