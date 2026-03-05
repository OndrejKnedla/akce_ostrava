import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SeoHead } from '@/seo/SeoHead';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Search } from 'lucide-react';
import { SplitText } from '@/components/ui/SplitText';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/layout/PageTransition';
import { blogArticles, blogClusters } from '@/data/blogArticles';
import { cn } from '@/utils/cn';
import { useLocale } from '@/i18n/useLocale';

const ARTICLES_PER_PAGE = 12;

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState('');
  const { t, localePath } = useLocale();

  const activeCluster = searchParams.get('tema') || 'all';

  const setCluster = (cluster: string) => {
    setSearchParams((prev) => {
      if (cluster === 'all') prev.delete('tema');
      else prev.set('tema', cluster);
      return prev;
    });
    setVisibleCount(ARTICLES_PER_PAGE);
  };

  const filtered = useMemo(() => {
    let result = activeCluster === 'all'
      ? [...blogArticles]
      : blogArticles.filter((a) => a.cluster === activeCluster);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeCluster, searchQuery]);

  const visible = filtered.slice(0, visibleCount);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' });
  };

  return (
    <PageTransition>
      <SeoHead
        title={t('blog.seoTitle')}
        description={t('blog.seoDesc')}
        canonical="https://akceostrava.cz/blog"
      />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-ostrava-blue to-ostrava-blue/80 text-center">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase text-white">
          <SplitText text={t('blog.title')} />
          <span className="text-ostrava-cyan">!!!</span>
        </h1>
        <p className="text-white/60 mt-4 max-w-lg mx-auto px-4">
          {t('blog.subtitle')}
        </p>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12 bg-[#f8f9fb] min-h-[60vh]">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
          {/* Search + filter row */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
            <div className="relative flex-shrink-0 w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ostrava-blue/30" />
              <input
                type="text"
                placeholder={t('blog.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(ARTICLES_PER_PAGE);
                }}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-ostrava-blue/10 bg-white text-sm text-ostrava-blue placeholder:text-ostrava-blue/30 focus:outline-none focus:border-ostrava-cyan focus:ring-1 focus:ring-ostrava-cyan/30 transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 overflow-x-auto">
              {blogClusters.map((cluster) => {
                const count =
                  cluster.id === 'all'
                    ? blogArticles.length
                    : blogArticles.filter((a) => a.cluster === cluster.id).length;
                if (count === 0 && cluster.id !== 'all') return null;
                return (
                  <button
                    key={cluster.id}
                    onClick={() => setCluster(cluster.id)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
                      activeCluster === cluster.id
                        ? 'bg-ostrava-cyan text-white'
                        : 'bg-white text-ostrava-blue/60 hover:bg-ostrava-blue/5 hover:text-ostrava-blue border border-ostrava-blue/10'
                    )}
                  >
                    {t(`blogClusters.${cluster.id}`)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Articles grid */}
          {visible.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visible.map((article, i) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.04, 0.25) }}
                  >
                    <Link
                      to={localePath('blogPost', { slug: article.slug })}
                      className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-transparent hover:border-ostrava-cyan/15"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col">
                        {/* Badge + reading time */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-ostrava-cyan/10 text-ostrava-cyan border border-ostrava-cyan/20">
                            {t(`blogClusters.${article.cluster}`)}
                          </span>
                          <span className="flex items-center gap-1 text-ostrava-blue/40 text-xs">
                            <Clock className="w-3 h-3" />
                            {t('blog.readTime', { time: article.readingTime })}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-bold text-[15px] text-ostrava-blue mb-2 line-clamp-2 group-hover:text-ostrava-cyan transition-colors leading-snug">
                          {article.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-ostrava-blue/50 text-[13px] leading-relaxed line-clamp-2 mb-4">
                          {article.excerpt}
                        </p>

                        {/* Date + read more */}
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-ostrava-blue/5">
                          <span className="text-ostrava-blue/35 text-xs">
                            {formatDate(article.date)}
                          </span>
                          <span className="flex items-center gap-1 text-ostrava-cyan text-xs font-semibold group-hover:gap-2 transition-all">
                            {t('blog.readMore')}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {visibleCount < filtered.length && (
                <motion.div
                  className="text-center mt-12"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <Button variant="ghost" onClick={() => setVisibleCount((c) => c + ARTICLES_PER_PAGE)}>
                    {t('blog.loadMore', { count: filtered.length - visibleCount })}
                  </Button>
                </motion.div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-ostrava-blue/50 text-lg">
                {searchQuery
                  ? t('blog.noSearchResults', { query: searchQuery })
                  : t('blog.noArticles')}
              </p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
