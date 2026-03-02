import { Helmet } from 'react-helmet-async';
import { HeroSection } from '@/components/hero/HeroSection';
import { EventShowcase } from '@/components/events/EventShowcase';
import { StatsSection } from '@/components/sections/StatsSection';
import { SplitText } from '@/components/ui/SplitText';
import { PageTransition } from '@/components/layout/PageTransition';
import { getUpcomingEvents } from '@/data/events';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomePage() {
  const events = getUpcomingEvents();

  return (
    <PageTransition>
      <Helmet>
        <title>AKCE OSTRAVA!!! — Koncerty, Festivaly, Zážitky</title>
        <meta name="description" content="Nejlepší koncerty, festivaly a show v Ostravě. Ocelové srdce zábavy!!!" />
      </Helmet>

      <HeroSection />

      {/* Partner logos marquee */}
      <div className="relative py-10 overflow-hidden bg-white">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div
          className="flex w-max items-center opacity-70"
          style={{
            animation: 'marquee-scroll 20s linear infinite',
          }}
        >
          {[...Array(6)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center gap-24 px-12 shrink-0">
              <img src="https://restarticket.com/restart-logo.png" alt="Restart Stage Production" className="h-12 md:h-16" />
              <img src="https://restarticket.com/ticketlive-logo-new.png" alt="TicketLive" className="h-12 md:h-16" />
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
                <SplitText text="Nejbližší akce" onView />
                <span className="text-ostrava-red">!!!</span>
              </h2>
              <p className="text-ostrava-blue/50 text-lg max-w-xl mx-auto">
                Tři akce, které musíš letos v Ostravě zažít. Kup vstupenky, než bude pozdě.
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

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/akce"
              className="text-ostrava-blue font-heading uppercase text-sm tracking-wider relative group"
            >
              Zobrazit všechny akce
              <span className="ml-1">→</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ostrava-blue transition-all group-hover:w-full" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section separator */}
      <div className="section-separator bg-white">
        <div className="w-16 h-px bg-ostrava-blue/20" />
        <span className="text-ostrava-red">!</span><span className="text-ostrava-red">!</span><span className="text-ostrava-red">!</span>
        <div className="w-16 h-px bg-ostrava-blue/20" />
      </div>

      <StatsSection />
    </PageTransition>
  );
}
