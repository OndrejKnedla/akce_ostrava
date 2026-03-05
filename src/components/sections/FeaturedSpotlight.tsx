import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/utils/formatDate';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getFeaturedEvent } from '@/data/events';
import { translateEvent } from '@/utils/translateEvent';
import { useLocale } from '@/i18n/useLocale';

export function FeaturedSpotlight() {
  const { t, lang, localePath } = useLocale();
  const event = translateEvent(getFeaturedEvent(), lang);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.2, 0.35], [40, 0]);
  const detailsOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const ctaOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);

  if (!isDesktop || reduced) {
    return (
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/40" />
        </div>
        <div className="relative z-10 max-w-content mx-auto px-4 md:px-6 text-center">
          <motion.h2
            className="font-heading text-4xl md:text-5xl uppercase text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {event.title}
          </motion.h2>
          <motion.p
            className="text-white/60 text-lg mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {formatDate(event.date, lang, event.time)} · {event.venue.name}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button variant="cta" size="lg" href={localePath('event', { slug: event.slug })}>
              {t('eventCard.buyTickets')}
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,15,0.4)_0%,rgba(10,10,15,0.9)_70%)]" />

        <div className="relative z-10 text-center px-8 max-w-3xl">
          <motion.h2
            className="font-heading text-5xl lg:text-7xl uppercase text-white mb-4"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            {event.title}
          </motion.h2>
          <motion.div style={{ opacity: detailsOpacity }}>
            <p className="text-white/60 text-xl mb-2">
              {formatDate(event.date, lang, event.time)}
            </p>
            <p className="text-white/40 text-lg mb-8">{event.venue.name}</p>
          </motion.div>
          <motion.div style={{ opacity: ctaOpacity }}>
            <Button variant="cta" size="lg" href={localePath('event', { slug: event.slug })}>
              {t('eventCard.buyTickets')}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
