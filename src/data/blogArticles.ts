import rawArticles from './blog-articles.json';

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

export const blogArticles: BlogArticle[] = rawArticles as BlogArticle[];

export const blogClusters = [
  { id: 'all', label: 'Vše' },
  { id: 'koncerty_ostrava', label: 'Koncerty' },
  { id: 'festivaly', label: 'Festivaly' },
  { id: 'venues', label: 'Místa' },
  { id: 'vstupenky', label: 'Vstupenky' },
  { id: 'tipy_navstevnici', label: 'Tipy' },
  { id: 'ostrava_kultura', label: 'Ostrava' },
  { id: 'zanry', label: 'Žánry' },
  { id: 'sezona', label: 'Sezóna' },
  { id: 'zakulisi', label: 'Zákulisí' },
  { id: 'rodiny', label: 'Rodiny' },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getRelatedArticles(article: BlogArticle, count = 3): BlogArticle[] {
  return blogArticles
    .filter((a) => a.id !== article.id && a.cluster === article.cluster)
    .slice(0, count);
}
