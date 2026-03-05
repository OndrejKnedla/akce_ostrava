import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { readFileSync } from 'fs';
import prerender from '@prerenderer/rollup-plugin';
import puppeteerRenderer from '@prerenderer/renderer-puppeteer';

function getPrerenderRoutes(): string[] {
  const staticRoutes = [
    '/',
    '/akce',
    '/blog',
    '/kontakt',
    '/obchodni-podminky',
    '/gdpr',
  ];

  // Event slugs from source
  const eventsSource = readFileSync(path.resolve(__dirname, 'src/data/events.ts'), 'utf-8');
  const slugRegex = /slug:\s*'([^']+)'/g;
  let match;
  while ((match = slugRegex.exec(eventsSource)) !== null) {
    staticRoutes.push(`/akce/${match[1]}`);
  }

  // Blog slugs from JSON
  const blogArticles = JSON.parse(
    readFileSync(path.resolve(__dirname, 'src/data/blog-articles.json'), 'utf-8')
  );
  for (const article of blogArticles) {
    staticRoutes.push(`/blog/${article.slug}`);
  }

  return staticRoutes;
}

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: getPrerenderRoutes(),
      renderer: new puppeteerRenderer({
        renderAfterDocumentEvent: 'prerender-ready',
        headless: true,
        timeout: 30000,
      }),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
