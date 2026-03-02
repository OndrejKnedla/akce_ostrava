import { Helmet } from 'react-helmet-async';
import { HeroSection } from '@/components/hero/HeroSection';
import { HorizontalScroll } from '@/components/events/HorizontalScroll';
import { StatsSection } from '@/components/sections/StatsSection';

import { AboutMini } from '@/components/sections/AboutMini';
import { Testimonials } from '@/components/sections/Testimonials';
import { Newsletter } from '@/components/sections/Newsletter';
import { InstagramGrid } from '@/components/sections/InstagramGrid';
import { SplitText } from '@/components/ui/SplitText';
import { PageTransition } from '@/components/layout/PageTransition';
import { getUpcomingEvents } from '@/data/events';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

const filterTabs = [
  { value: 'all', label: 'Vše' },
  { value: 'koncert', label: 'Koncerty' },
  { value: 'festival', label: 'Festivaly' },
  { value: 'show', label: 'VIP Akce' },
];

export default function HomePage() {
  const [filter, setFilter] = useState('all');
  const allEvents = getUpcomingEvents();
  const events = filter === 'all' ? allEvents : allEvents.filter((e) => e.category === filter);

  return (
    <PageTransition>
      <Helmet>
        <title>AKCE OSTRAVA!!! — Koncerty, Festivaly, Zážitky</title>
        <meta name="description" content="Nejlepší koncerty, festivaly a show v Ostravě. Ocelové srdce zábavy!!!" />
      </Helmet>

      <HeroSection />

      {/* Partner logos marquee */}
      <div className="bg-black py-8 overflow-hidden">
        <div
          className="flex w-max"
          style={{
            animation: 'marquee-scroll 20s linear infinite',
          }}
        >
          {[...Array(6)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center gap-20 px-10 shrink-0">
              <img src="https://www.slezskoostravskyhrad.cz/images/logo-slezsko-ostravsky-hrad.png" alt="Slezskoostravský hrad" className="h-14 md:h-20" />
              <img src="https://restarticket.com/restart-logo.png" alt="Restart Ticket" className="h-14 md:h-20" />
              <img src="https://restarticket.com/ticketlive-logo-new.png" alt="TicketLive" className="h-14 md:h-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl md:text-4xl uppercase text-ostrava-blue mb-6">
              <SplitText text="Nejbližší akce" onView />
              <span className="text-ostrava-red">!!!</span>
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={`px-4 py-2 rounded-lg font-heading text-xs uppercase tracking-wider transition-all ${
                    filter === tab.value
                      ? 'bg-ostrava-cyan text-white shadow-[0_0_15px_rgba(0,175,210,0.3)]'
                      : 'bg-ostrava-blue/10 text-ostrava-blue/60 hover:text-ostrava-blue'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <HorizontalScroll events={events} />

          <motion.div
            className="text-center mt-10"
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

      <AboutMini />
      <Testimonials />
      <Newsletter />
      <InstagramGrid />
    </PageTransition>
  );
}
