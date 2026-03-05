import { motion } from 'framer-motion';
import { SeoHead } from '@/seo/SeoHead';
import { Button } from '@/components/ui/Button';
import { EventCard } from '@/components/events/EventCard';
import { PageTransition } from '@/components/layout/PageTransition';
import { events } from '@/data/events';

export default function NotFoundPage() {
  const randomEvent = events[Math.floor(Math.random() * events.length)];

  return (
    <PageTransition>
      <SeoHead
        title="404 — Stránka nenalezena"
        description="Stránka nebyla nalezena. Podívejte se na naše akce v Ostravě."
        noindex
      />

      <section className="min-h-screen flex items-center justify-center bg-dark relative overflow-hidden pt-20">
        {/* Floating particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-ostrava-cyan/20 animate-float"
            style={{
              width: 2 + Math.random() * 4,
              height: 2 + Math.random() * 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}

        <div className="text-center px-4 relative z-10 max-w-xl mx-auto">
          <motion.div
            className="font-heading text-[150px] md:text-[200px] text-ostrava-cyan leading-none mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            404
          </motion.div>

          <div className="mb-2">
            <span className="font-heading text-2xl md:text-3xl text-white">Tady nic není</span>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="font-heading text-2xl md:text-3xl text-ostrava-red inline-block"
                initial={{ opacity: 0, y: 20, scale: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.15, type: 'spring', stiffness: 400, damping: 10 }}
              >
                !
              </motion.span>
            ))}
          </div>

          <motion.div
            className="mt-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Button variant="cta" size="lg" href="/">
              Ale akce máme →
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-white/40 text-sm mb-4 font-heading uppercase">Zatím se podívejte na:</p>
            <div className="max-w-sm mx-auto">
              <EventCard event={randomEvent} />
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
