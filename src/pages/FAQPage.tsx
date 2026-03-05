import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { SeoHead } from '@/seo/SeoHead';
import { SplitText } from '@/components/ui/SplitText';
import { Accordion } from '@/components/ui/Accordion';
import { PageTransition } from '@/components/layout/PageTransition';
import { generalFaq } from '@/data/faq';
import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/useLocale';

const categoryKeys = ['all', 'catTickets', 'catVenue', 'catRefund', 'catVip', 'catGeneral'] as const;

// Map from translation labels back to data category values
const categoryDataMap: Record<string, string> = {
  catTickets: 'Vstupenky',
  catVenue: 'Místo konání',
  catRefund: 'Vrácení',
  catVip: 'VIP',
  catGeneral: 'Obecné',
};

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [activeCategoryKey, setActiveCategoryKey] = useState('all');
  const { t, localePath } = useLocale();

  const filtered = useMemo(() => {
    let items = generalFaq;
    if (activeCategoryKey !== 'all') {
      const dataCategory = categoryDataMap[activeCategoryKey];
      items = items.filter((i) => i.category === dataCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) => i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q)
      );
    }
    return items;
  }, [search, activeCategoryKey]);

  return (
    <PageTransition>
      <SeoHead
        title={t('faqPage.seoTitle')}
        description={t('faqPage.seoDesc')}
        canonical="https://akceostrava.cz/faq"
      />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-ostrava-blue to-ostrava-blue/80 text-center">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase text-white">
          <SplitText text={t('faqPage.title')} />
          <span className="text-ostrava-cyan">!!!</span>
        </h1>
      </section>

      <section className="py-12 md:py-20 bg-white min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          {/* Search */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ostrava-blue/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('faqPage.searchPlaceholder')}
              className="w-full bg-ostrava-ice border border-ostrava-blue/10 rounded-lg pl-12 pr-5 py-3 text-ostrava-blue placeholder:text-ostrava-blue/30 focus:border-ostrava-cyan focus:outline-none focus:shadow-[0_0_15px_rgba(0,175,210,0.2)] transition-all"
            />
          </motion.div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categoryKeys.map((key) => {
              const label = key === 'all' ? t('faqPage.all') : t(`faqPage.${key}`);
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategoryKey(key)}
                  className={`px-4 py-2 rounded-lg font-heading text-xs uppercase tracking-wider transition-all ${
                    activeCategoryKey === key
                      ? 'bg-ostrava-cyan text-white'
                      : 'bg-ostrava-ice text-ostrava-blue/50 hover:text-ostrava-blue'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Results */}
          {filtered.length > 0 ? (
            <Accordion items={filtered} />
          ) : (
            <div className="text-center py-12">
              <p className="text-ostrava-blue/50 text-lg mb-4">
                {t('faqPage.noResults')}
              </p>
              <Link
                to={localePath('contact')}
                className="text-ostrava-cyan font-heading uppercase text-sm tracking-wider hover:underline"
              >
                {t('faqPage.contactUs')}
              </Link>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
