import { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SeoHead } from '@/seo/SeoHead';
import { BreadcrumbJsonLd } from '@/seo/BreadcrumbJsonLd';
import { BlogPostingJsonLd } from '@/seo/BlogPostingJsonLd';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, ChevronRight } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { getArticleBySlug, getRelatedArticles, blogClusters } from '@/data/blogArticles';

function renderMarkdown(body: string): string {
  let html = body;

  // Fix double dashes to em-dashes
  html = html.replace(/ -- /g, ' — ');
  html = html.replace(/--/g, '—');

  // Headers - readable, NOT uppercase
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-ostrava-blue/90 mt-8 mb-3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-[22px] md:text-2xl font-bold text-ostrava-blue mt-10 mb-4 pb-2 border-b border-ostrava-blue/10">$1</h2>');

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-ostrava-blue/80">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-ostrava-cyan underline decoration-ostrava-cyan/30 hover:decoration-ostrava-cyan transition-colors">$1</a>');

  // Tables - separator detection
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
        result.push('<div class="overflow-x-auto my-8 rounded-xl border border-ostrava-blue/10 shadow-sm"><table class="w-full border-collapse text-sm">');
      }
      const cells = line.split('|').filter((c) => c.trim()).map((c) => c.trim());
      if (isFirstRow) {
        result.push('<thead><tr>' + cells.map((c) => `<th class="bg-ostrava-blue/[0.06] px-4 py-3 text-left text-xs font-semibold text-ostrava-blue/70 uppercase tracking-wider border-b border-ostrava-blue/10">${c}</th>`).join('') + '</tr></thead><tbody>');
        isFirstRow = false;
      } else {
        result.push('<tr class="hover:bg-ostrava-cyan/[0.03] transition-colors">' + cells.map((c) => `<td class="px-4 py-3 border-b border-ostrava-blue/[0.06] text-ostrava-blue/65">${c}</td>`).join('') + '</tr>');
      }
    } else if (line.includes('<!-- separator -->')) {
      // skip
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
  html = html.replace(/^- (.+)$/gm, '<li class="mb-2">$1</li>');
  html = html.replace(/(<li class="mb-2">.*<\/li>\n?)+/g, (match) => `<ul class="my-5 pl-5 space-y-0 list-disc marker:text-ostrava-cyan/50 text-[15px] leading-relaxed text-ostrava-blue/65">${match}</ul>`);

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="mb-2">$1</li>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-ostrava-cyan/40 pl-5 py-3 my-6 bg-ostrava-cyan/[0.04] rounded-r-lg text-ostrava-blue/65 italic">$1</blockquote>');

  // Paragraphs
  html = html.replace(/^(?!<[a-z/!]|$)(.+)$/gm, '<p class="text-[15px] md:text-base text-ostrava-blue/65 leading-[1.8] mb-5">$1</p>');

  // Clean up
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
      <SeoHead
        title={article.title}
        description={article.metaDescription}
        canonical={`https://akceostrava.cz/blog/${article.slug}`}
        ogType="article"
        ogImage={article.image}
        keywords={article.keywords.join(', ')}
        article={{
          publishedTime: article.date,
          section: clusterLabel,
          tags: article.keywords,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Domů', url: 'https://akceostrava.cz/' },
          { name: 'Blog', url: 'https://akceostrava.cz/blog' },
          { name: article.title, url: `https://akceostrava.cz/blog/${article.slug}` },
        ]}
      />
      <BlogPostingJsonLd
        title={article.title}
        description={article.metaDescription}
        datePublished={article.date}
        image={article.image}
        url={`https://akceostrava.cz/blog/${article.slug}`}
        keywords={article.keywords}
        wordCount={article.wordCount}
        section={clusterLabel}
      />

      {/* Hero with image */}
      <section className="relative">
        {/* Background image */}
        <div className="h-[320px] md:h-[400px] relative">
          <img
            src={article.image.replace('w=800', 'w=1400').replace('h=500', 'h=600')}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ostrava-blue via-ostrava-blue/70 to-ostrava-blue/30" />
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8 pb-10 md:pb-14">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/50 hover:text-ostrava-cyan text-sm mb-5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Zpet na blog
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white backdrop-blur-sm border border-white/20">
                {clusterLabel}
              </span>
              <div className="flex items-center gap-1.5 text-white/60 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(article.date).toLocaleDateString('cs-CZ')}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/60 text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readingTime} min</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-[38px] font-bold text-white max-w-3xl leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-[720px] mx-auto">
            <motion.article
              className="blog-article"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Keywords */}
            {article.keywords.length > 0 && (
              <div className="mt-14 pt-6 border-t border-ostrava-blue/10">
                <p className="text-xs text-ostrava-blue/30 mb-3 font-medium uppercase tracking-wider">Klicova slova</p>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-3 py-1.5 rounded-full text-xs bg-ostrava-blue/[0.04] text-ostrava-blue/50 border border-ostrava-blue/[0.06]"
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
        <section className="py-14 bg-[#f8f9fb]">
          <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-ostrava-blue mb-8 text-center">
              Souvisejici clanky
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-ostrava-cyan/15"
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
                    <h3 className="font-bold text-sm text-ostrava-blue mb-2 line-clamp-2 group-hover:text-ostrava-cyan transition-colors leading-snug">
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
