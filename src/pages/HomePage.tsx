import { SeoHead } from '@/seo/SeoHead';
import { HeroSection } from '@/components/hero/HeroSection';
import { EventShowcase } from '@/components/events/EventShowcase';
import { Countdown } from '@/components/events/Countdown';
import { SplitText } from '@/components/ui/SplitText';
import { PageTransition } from '@/components/layout/PageTransition';
import { getUpcomingEvents, getEventBySlug } from '@/data/events';
import { translateEvents, translateEvent } from '@/utils/translateEvent';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/useLocale';

export default function HomePage() {
  const { t, lang, localePath } = useLocale();
  const events = translateEvents(getUpcomingEvents(), lang);
  const rawScooter = getEventBySlug('steel-rave-ostrava-2026');
  const scooter = rawScooter ? translateEvent(rawScooter, lang) : null;

  return (
    <PageTransition>
      <SeoHead
        title={t('home.seoTitle')}
        description={t('home.seoDesc')}
        canonical="https://akceostrava.cz/"
      />

      <HeroSection />

      {/* Steel Rave — Pre-sale countdown */}
      {scooter && (
        <section className="bg-ostrava-blue">
          <Link to={localePath('event', { slug: scooter.slug })}>
            <img src={scooter.image} alt={scooter.title} className="w-full h-auto block" />
          </Link>
          <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10 text-center">
            <motion.p
              className="font-heading text-white uppercase text-sm md:text-base tracking-wider mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('home.presaleIn')}<span className="text-ostrava-red">!!!</span>
            </motion.p>
            <Countdown targetDate="2026-03-09" targetTime="18:00" />
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to={localePath('event', { slug: scooter.slug })}
                className="inline-block font-heading uppercase text-sm tracking-wider text-ostrava-cyan border border-ostrava-cyan/40 rounded-lg px-6 py-3 hover:bg-ostrava-cyan/10 transition-all"
              >
                {t('events.aboutEvent')} →
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Partner logos marquee */}
      <div className="relative py-8 overflow-hidden bg-ostrava-blue">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-ostrava-blue to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-ostrava-blue to-transparent z-10 pointer-events-none" />
        <div
          className="flex w-max items-center"
          style={{
            animation: 'marquee-scroll 30s linear infinite',
          }}
        >
          {[0, 1].map((setIdx) => (
            <div key={setIdx} className="flex items-center gap-20 px-10 shrink-0">
              <img src="https://restarticket.com/restart-logo.png" alt="Restart Stage Production" className="h-14 md:h-20" />
              <img src="https://restarticket.com/ticketlive-logo-new.png" alt="TicketLive" className="h-14 md:h-20" />
              <img src="https://restarticket.com/restart-logo.png" alt="Restart Stage Production" className="h-14 md:h-20" />
              <img src="https://restarticket.com/ticketlive-logo-new.png" alt="TicketLive" className="h-14 md:h-20" />
            </div>
          ))}
        </div>
      </div>

      {/* === EVENTS — Main Section === */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-5xl uppercase text-ostrava-blue mb-4">
                <SplitText text={t('home.upcomingEvents')} onView />
                <span className="text-ostrava-red">!!!</span>
              </h2>
              <p className="text-ostrava-blue/50 text-lg max-w-xl mx-auto">
                {t('home.upcomingEventsDesc')}
              </p>
            </motion.div>
          </div>

          {/* Event showcases */}
          <div className="flex flex-col gap-12 md:gap-16">
            {events.map((event, i) => (
              <EventShowcase
                key={event.id}
                event={event}
                index={i}
                reversed={i % 2 === 1}
              />
            ))}
          </div>

          {/* Coming soon teaser */}
          <motion.div
            className="mt-16 text-center border-2 border-dashed border-ostrava-cyan/30 rounded-2xl py-10 px-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-heading text-2xl md:text-3xl uppercase text-ostrava-blue mb-2">
              {t('home.comingSoon')}<span className="text-ostrava-red">!!!</span>
            </div>
            <p className="text-ostrava-blue/50 text-sm">{t('home.comingSoonDesc')}</p>
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to={localePath('events')}
              className="text-ostrava-blue font-heading uppercase text-sm tracking-wider relative group"
            >
              {t('home.viewAll')}
              <span className="ml-1">{'\u2192'}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ostrava-blue transition-all group-hover:w-full" />
            </Link>
          </motion.div>
        </div>
      </section>

    </PageTransition>
  );
}
