import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, Search } from 'lucide-react';
import { SplitText } from '@/components/ui/SplitText';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/layout/PageTransition';
import { blogArticles, blogClusters } from '@/data/blogArticles';
import { cn } from '@/utils/cn';

const ARTICLES_PER_PAGE = 12;

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <PageTransition>
      <Helmet>
        <title>Blog | AKCE OSTRAVA!!!</title>
        <meta
          name="description"
          content="Průvodce koncerty, festivaly a kulturním životem v Ostravě. Tipy, recenze a novinky ze světa živé hudby."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-ostrava-blue to-ostrava-blue/80 text-center">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase text-white">
          <SplitText text="Blog" />
          <span className="text-ostrava-cyan">!!!</span>
        </h1>
        <p className="text-white/60 mt-4 max-w-lg mx-auto px-4">
          Průvodce koncerty, festivaly a kulturním životem v Ostravě
        </p>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12 bg-white min-h-[60vh]">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
          {/* Search */}
          <div className="relative mb-6 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ostrava-blue/30" />
            <input
              type="text"
              placeholder="Hledat články..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(ARTICLES_PER_PAGE);
              }}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-ostrava-blue/15 text-ostrava-blue placeholder:text-ostrava-blue/30 focus:outline-none focus:border-ostrava-cyan focus:ring-1 focus:ring-ostrava-cyan/30 transition-colors"
            />
          </div>

          {/* Cluster filter */}
          <div className="flex flex-wrap gap-2 mb-8">
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
                    'px-4 py-2 rounded-lg text-sm font-heading uppercase tracking-wider transition-all',
                    activeCluster === cluster.id
                      ? 'bg-ostrava-cyan text-white shadow-[0_0_15px_rgba(0,175,210,0.3)]'
                      : 'bg-ostrava-blue/5 text-ostrava-blue/60 hover:bg-ostrava-blue/10 hover:text-ostrava-blue'
                  )}
                >
                  {cluster.label}
                  <span className="ml-1.5 text-xs opacity-60">({count})</span>
                </button>
              );
            })}
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
                    transition={{ delay: Math.min(i * 0.05, 0.3) }}
                  >
                    <Link
                      to={`/blog/${article.slug}`}
                      className="group block bg-white border border-ostrava-blue/10 rounded-xl overflow-hidden hover:shadow-lg hover:border-ostrava-cyan/20 transition-all h-full"
                    >
                      {/* Colored top bar */}
                      <div className="h-1 bg-gradient-to-r from-ostrava-cyan to-ostrava-blue" />

                      <div className="p-5 flex flex-col h-full">
                        {/* Cluster badge */}
                        <span className="inline-block self-start px-2.5 py-1 rounded text-[10px] font-heading uppercase tracking-wider bg-ostrava-blue/5 text-ostrava-blue/50 mb-3">
                          {blogClusters.find((c) => c.id === article.cluster)?.label || article.cluster}
                        </span>

                        <h2 className="font-heading text-base uppercase text-ostrava-blue mb-3 line-clamp-2 group-hover:text-ostrava-cyan transition-colors leading-tight">
                          {article.title}
                        </h2>

                        <p className="text-ostrava-blue/50 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-ostrava-blue/10">
                          <div className="flex items-center gap-1.5 text-ostrava-blue/40 text-xs">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{article.readingTime} min</span>
                          </div>
                          <span className="flex items-center gap-1 text-ostrava-cyan text-xs font-heading uppercase group-hover:gap-2 transition-all">
                            Číst
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {visibleCount < filtered.length && (
                <motion.div
                  className="text-center mt-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <Button variant="ghost" onClick={() => setVisibleCount((c) => c + ARTICLES_PER_PAGE)}>
                    Načíst další ({filtered.length - visibleCount} zbývá)
                  </Button>
                </motion.div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-ostrava-blue/50 text-lg">
                {searchQuery
                  ? `Žádné články pro "${searchQuery}". Zkuste jiný výraz.`
                  : 'Žádné články v této kategorii.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
