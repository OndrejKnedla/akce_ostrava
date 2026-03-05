import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const LANGS = ['en', 'sk', 'uk'];
const BATCH_COUNT = 20;
const BASE_DIR = join(import.meta.dirname, '..', 'src', 'data', 'translations');
const OUT_DIR = join(import.meta.dirname, '..', 'src', 'data');

for (const lang of LANGS) {
  const allArticles = [];
  let missing = 0;

  for (let i = 0; i < BATCH_COUNT; i++) {
    const batchFile = join(BASE_DIR, lang, `batch-${i}.json`);
    if (existsSync(batchFile)) {
      try {
        const batch = JSON.parse(readFileSync(batchFile, 'utf-8'));
        allArticles.push(...batch);
        console.log(`  [${lang}] batch-${i}: ${batch.length} articles`);
      } catch (e) {
        console.error(`  [${lang}] batch-${i}: PARSE ERROR - ${e.message}`);
        missing++;
      }
    } else {
      console.warn(`  [${lang}] batch-${i}: MISSING`);
      missing++;
    }
  }

  const outFile = join(OUT_DIR, `blog-articles-${lang}.json`);
  writeFileSync(outFile, JSON.stringify(allArticles, null, 2), 'utf-8');
  console.log(`[${lang}] Total: ${allArticles.length} articles written to blog-articles-${lang}.json (${missing} batches missing)\n`);
}
