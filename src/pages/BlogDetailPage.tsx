import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, ChevronRight } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { getArticleBySlug, getRelatedArticles, blogClusters } from '@/data/blogArticles';

function renderMarkdown(body: string): string {
  let html = body;

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-heading uppercase text-ostrava-blue mt-8 mb-3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl md:text-2xl font-heading uppercase text-ostrava-blue mt-10 mb-4 pb-2 border-b-2 border-ostrava-cyan/30">$1</h2>');

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-ostrava-blue font-semibold">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-ostrava-cyan hover:underline">$1</a>');

  // Tables
  html = html.replace(/^\|(.+)\|$/gm, (match) => {
    const cells = match.split('|').filter((c) => c.trim());
    if (cells.every((c) => /^[\s-:]+$/.test(c))) {
      return '<!-- separator -->';
    }
    return match;
  });

  // Process tables block by block
  const lines = html.split('\n');
  const result: string[] = [];
  let inTable = false;
  let isFirstRow = true;

  for (const line of lines) {
    if (line.startsWith('|') && line.endsWith('|') && !line.includes('<!-- separator -->')) {
      if (!inTable) {
        inTable = true;
        isFirstRow = true;
        result.push('<div class="overflow-x-auto my-6"><table class="w-full border-collapse text-sm rounded-lg overflow-hidden shadow-sm">');
      }
      const cells = line.split('|').filter((c) => c.trim()).map((c) => c.trim());
      if (isFirstRow) {
        result.push('<thead><tr>' + cells.map((c) => `<th class="bg-ostrava-blue text-white px-4 py-3 text-left font-heading uppercase text-xs tracking-wider">${c}</th>`).join('') + '</tr></thead><tbody>');
        isFirstRow = false;
      } else {
        result.push('<tr class="even:bg-ostrava-blue/[0.03] hover:bg-ostrava-cyan/5 transition-colors">' + cells.map((c) => `<td class="px-4 py-2.5 border-b border-ostrava-blue/10">${c}</td>`).join('') + '</tr>');
      }
    } else if (line.includes('<!-- separator -->')) {
      // skip separator rows
    } else {
      if (inTable) {
        result.push('</tbody></table></div>');
        inTable = false;
      }
      result.push(line);
    }
  }
  if (inTable) {
    result.push('</tbody></table></div>');
  }

  html = result.join('\n');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-5 mb-1.5 list-disc text-ostrava-blue/70">$1</li>');
  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul class="my-4">${match}</ul>`);

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-5 mb-1.5 list-decimal text-ostrava-blue/70">$1</li>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-ostrava-cyan pl-4 py-2 my-4 bg-ostrava-cyan/5 rounded-r-lg italic text-ostrava-blue/70">$1</blockquote>');

  // Paragraphs (lines that aren't already HTML)
  html = html.replace(/^(?!<[a-z/!]|$)(.+)$/gm, '<p class="text-ostrava-blue/70 leading-relaxed mb-4">$1</p>');

  // Clean up empty paragraphs
  html = html.replace(/<p[^>]*>\s*<\/p>/g, '');

  return html;
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  const related = useMemo(
    () => (article ? getRelatedArticles(article, 3) : []),
    [article]
  );

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const htmlContent = renderMarkdown(article.body);
  const clusterLabel = blogClusters.find((c) => c.id === article.cluster)?.label || article.cluster;

  return (
    <PageTransition>
      <Helmet>
        <title>{article.title} | AKCE OSTRAVA!!!</title>
        <meta name="description" content={article.metaDescription} />
        <meta name="keywords" content={article.keywords.join(', ')} />
        <link rel="canonical" href={`https://akceostrava.cz/blog/${article.slug}`} />
      </Helmet>

      {/* Hero with image */}
      <section className="relative pt-20 md:pt-24">
        {/* Background image */}
        <div className="absolute inset-0 h-[360px] md:h-[420px]">
          <img
            src={article.image.replace('w=800', 'w=1400').replace('h=500', 'h=600')}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ostrava-blue via-ostrava-blue/80 to-ostrava-blue/40" />
        </div>

        <div className="relative max-w-content mx-auto px-4 md:px-6 lg:px-8 pt-16 pb-12 md:pt-24 md:pb-16">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/50 hover:text-ostrava-cyan text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zpet na blog
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded text-xs font-semibold bg-ostrava-cyan/20 text-ostrava-cyan border border-ostrava-cyan/30">
              {clusterLabel}
            </span>
            <div className="flex items-center gap-1.5 text-white/50 text-xs">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(article.date).toLocaleDateString('cs-CZ')}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/50 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readingTime} min cteni</span>
            </div>
          </div>

          <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl uppercase text-white max-w-4xl leading-tight">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Article body */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.article
              className="blog-article"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Keywords */}
            {article.keywords.length > 0 && (
              <div className="mt-12 pt-6 border-t border-ostrava-blue/10">
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-3 py-1 rounded-full text-xs bg-ostrava-blue/5 text-ostrava-blue/50"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-12 bg-ostrava-blue/[0.03]">
          <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="font-heading text-xl uppercase text-ostrava-blue mb-8 text-center">
              Související články
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.slug}`}
                  className="group block bg-white border border-ostrava-blue/10 rounded-xl overflow-hidden hover:shadow-md hover:border-ostrava-cyan/20 transition-all"
                >
                  <div className="overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-ostrava-blue mb-2 line-clamp-2 group-hover:text-ostrava-cyan transition-colors">
                      {rel.title}
                    </h3>
                    <p className="text-ostrava-blue/50 text-xs leading-relaxed line-clamp-2 mb-3">
                      {rel.excerpt}
                    </p>
                    <span className="flex items-center gap-1 text-ostrava-cyan text-xs font-semibold">
                      Cist dale <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  );
}
