import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SeoHead } from '@/seo/SeoHead';
import { motion } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { EventGrid } from '@/components/events/EventGrid';
import { FilterBar } from '@/components/events/FilterBar';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/layout/PageTransition';
import { events } from '@/data/events';

export default function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(6);

  const category = searchParams.get('kategorie') || 'all';
  const sortBy = searchParams.get('razeni') || 'date';

  const setCategory = (cat: string) => {
    setSearchParams((prev) => {
      if (cat === 'all') prev.delete('kategorie');
      else prev.set('kategorie', cat);
      return prev;
    });
    setVisibleCount(6);
  };

  const setSort = (sort: string) => {
    setSearchParams((prev) => {
      prev.set('razeni', sort);
      return prev;
    });
  };

  const filtered = useMemo(() => {
    let result = category === 'all' ? [...events] : events.filter((e) => e.category === category);

    switch (sortBy) {
      case 'price':
        result.sort((a, b) => Math.min(...a.tickets.map((t) => t.price)) - Math.min(...b.tickets.map((t) => t.price)));
        break;
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title, 'cs'));
        break;
      default:
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    return result;
  }, [category, sortBy]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <PageTransition>
      <SeoHead
        title="Všechny akce"
        description="Prohlédněte si kompletní nabídku koncertů, festivalů a show v Ostravě."
        canonical="https://akceostrava.cz/akce"
      />

      {/* Mini hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-ostrava-blue to-ostrava-blue/80 text-center">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase text-white">
          <SplitText text="Všechny akce" />
          <span className="text-ostrava-cyan">!!!</span>
        </h1>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12 bg-white min-h-[60vh]">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
          <FilterBar
            activeCategory={category}
            onCategoryChange={setCategory}
            sortBy={sortBy}
            onSortChange={setSort}
          />

          {visible.length > 0 ? (
            <>
              <EventGrid events={visible} />
              {visibleCount < filtered.length && (
                <motion.div
                  className="text-center mt-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <Button variant="ghost" onClick={() => setVisibleCount((c) => c + 6)}>
                    Načíst další!!!
                  </Button>
                </motion.div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎭</div>
              <p className="text-ostrava-blue/50 text-lg">Žádné akce neodpovídají filtru. Zkuste jiný výběr.</p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
