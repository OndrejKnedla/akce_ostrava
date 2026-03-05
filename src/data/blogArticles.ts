import rawArticlesCs from './blog-articles.json';
import type { Lang } from '@/i18n/config';

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  cluster: string;
  date: string;
  excerpt: string;
  body: string;
  image: string;
  readingTime: number;
  wordCount: number;
}

// Lazy-loaded translation maps per language
const translationCache: Partial<Record<Lang, BlogArticle[]>> = {
  cs: rawArticlesCs as BlogArticle[],
};

async function loadTranslations(lang: Lang): Promise<BlogArticle[]> {
  if (translationCache[lang]) return translationCache[lang]!;

  try {
    let mod: { default: BlogArticle[] };
    switch (lang) {
      case 'en':
        mod = await import('./blog-articles-en.json');
        break;
      case 'sk':
        mod = await import('./blog-articles-sk.json');
        break;
      case 'uk':
        mod = await import('./blog-articles-uk.json');
        break;
      default:
        return rawArticlesCs as BlogArticle[];
    }
    translationCache[lang] = mod.default as BlogArticle[];
    return translationCache[lang]!;
  } catch {
    // Fallback to Czech if translation file missing
    return rawArticlesCs as BlogArticle[];
  }
}

// Synchronous access (Czech default, or cached translations)
export function getBlogArticles(lang: Lang = 'cs'): BlogArticle[] {
  return translationCache[lang] || (rawArticlesCs as BlogArticle[]);
}

// Async loader for language switching
export async function loadBlogArticles(lang: Lang): Promise<BlogArticle[]> {
  return loadTranslations(lang);
}

// Default Czech articles for backwards compatibility
export const blogArticles: BlogArticle[] = rawArticlesCs as BlogArticle[];

export const blogClusters = [
  { id: 'all', labelKey: 'blogClusters.all' },
  { id: 'koncerty_ostrava', labelKey: 'blogClusters.koncerty_ostrava' },
  { id: 'festivaly', labelKey: 'blogClusters.festivaly' },
  { id: 'venues', labelKey: 'blogClusters.venues' },
  { id: 'vstupenky', labelKey: 'blogClusters.vstupenky' },
  { id: 'tipy_navstevnici', labelKey: 'blogClusters.tipy_navstevnici' },
  { id: 'ostrava_kultura', labelKey: 'blogClusters.ostrava_kultura' },
  { id: 'zanry', labelKey: 'blogClusters.zanry' },
  { id: 'sezona', labelKey: 'blogClusters.sezona' },
  { id: 'zakulisi', labelKey: 'blogClusters.zakulisi' },
  { id: 'rodiny', labelKey: 'blogClusters.rodiny' },
];

export function getArticleBySlug(slug: string, lang: Lang = 'cs'): BlogArticle | undefined {
  const articles = getBlogArticles(lang);
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(article: BlogArticle, count = 3, lang: Lang = 'cs'): BlogArticle[] {
  const articles = getBlogArticles(lang);
  return articles
    .filter((a) => a.id !== article.id && a.cluster === article.cluster)
    .slice(0, count);
}
