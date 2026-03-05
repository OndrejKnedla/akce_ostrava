import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SeoHead } from '@/seo/SeoHead';
import { BreadcrumbJsonLd } from '@/seo/BreadcrumbJsonLd';
import { Calendar, MapPin, Share2 } from 'lucide-react';
import { getEventBySlug, getRelatedEvents } from '@/data/events';
import { formatCzechDate } from '@/utils/formatCzechDate';
import { downloadICS } from '@/utils/generateICS';
import { TicketTier } from '@/components/events/TicketTier';
import { PurchaseSidebar } from '@/components/events/PurchaseSidebar';
import { MobilePurchaseBar } from '@/components/events/MobilePurchaseBar';
import { Countdown } from '@/components/events/Countdown';
import { EventCard } from '@/components/events/EventCard';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { Lightbox } from '@/components/ui/Lightbox';
import { PageTransition } from '@/components/layout/PageTransition';
import { EventJsonLd } from '@/seo/EventJsonLd';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/utils/cn';
import { useState, useCallback } from 'react';

export default function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const event = getEventBySlug(slug || '');
  const { addToast } = useToast();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  }, []);

  if (!event) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl text-ostrava-blue mb-4">Akce nenalezena</h1>
            <Link to="/akce" className="text-ostrava-cyan hover:underline">← Zpět na akce</Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const related = getRelatedEvents(event.id);
  const lowestPrice = event.tickets.length > 0 ? Math.min(...event.tickets.map((t) => t.price)) : 0;
  const isAnnounced = event.status === 'announced';

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      addToast('Zkopírováno!!!');
    } catch {
      addToast('Odkaz zkopírován', 'info');
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`${event.title} - ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  return (
    <PageTransition>
      <SeoHead
        title={event.title}
        description={event.subtitle}
        canonical={`https://akceostrava.cz/akce/${event.slug}`}
        ogImage={event.image}
      />
      <EventJsonLd event={event} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Domů', url: 'https://akceostrava.cz/' },
          { name: 'Akce', url: 'https://akceostrava.cz/akce' },
          { name: event.title, url: `https://akceostrava.cz/akce/${event.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-content mx-auto">
            <motion.h1
              className="font-heading text-3xl md:text-5xl lg:text-6xl uppercase text-white mb-4"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {event.title}
            </motion.h1>
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="glass px-4 py-2 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-ostrava-cyan" />
                {formatCzechDate(event.date, event.time)}
              </span>
              <a
                href="#venue"
                className="glass px-4 py-2 text-sm flex items-center gap-2 hover:border-ostrava-cyan/40 transition-colors"
                onClick={(e) => { e.preventDefault(); document.getElementById('venue')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                <MapPin className="w-4 h-4 text-ostrava-cyan" />
                {event.venue.name}
              </a>
              {isAnnounced ? (
                <span className="glass px-4 py-2 text-sm font-heading uppercase text-ostrava-yellow">
                  Brzy oznámíme!!!
                </span>
              ) : (
                <span className="glass px-4 py-2 text-sm font-mono font-bold">
                  od {lowestPrice.toLocaleString('cs-CZ')} Kč
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Countdown */}
              {event.status !== 'sold-out' && (
                <motion.div
                  className="mb-8 p-6 glass text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-ostrava-blue/40 text-sm mb-3 font-heading uppercase tracking-wider">Do začátku akce zbývá</p>
                  <Countdown targetDate={event.date} targetTime={event.time} />
                </motion.div>
              )}

              {/* Description */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-2xl uppercase text-ostrava-blue mb-4">O akci</h2>
                {event.description.split('\n\n').map((p, i) => (
                  <p key={i} className={cn(
                    'text-ostrava-blue/70 leading-relaxed mb-4',
                    i === 0 && 'border-l-4 border-ostrava-red pl-4 text-ostrava-blue/80'
                  )}>
                    {p}
                  </p>
                ))}
              </motion.div>

              {/* Lineup */}
              {event.lineup && event.lineup.length > 0 && (
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-heading text-2xl uppercase text-ostrava-blue mb-6">Line-up</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {event.lineup.map((artist) => (
                      <div key={artist.name} className="glass p-4 text-center group">
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                        <h4 className="font-heading text-sm uppercase text-ostrava-blue">{artist.name}</h4>
                        <p className="text-ostrava-blue/40 text-xs">{artist.genre}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tickets */}
              <div id="tickets" className="mb-12 scroll-mt-24">
                <h2 className="font-heading text-2xl uppercase text-ostrava-blue mb-6">
                  Vstupenky<span className="text-ostrava-cyan">!!!</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {event.tickets.map((tier, i) => (
                    <TicketTier key={tier.id} tier={tier} index={i} />
                  ))}
                </div>
              </div>

              {/* Venue */}
              <div id="venue" className="mb-12 scroll-mt-24">
                <h2 className="font-heading text-2xl uppercase text-ostrava-blue mb-6">Místo konání</h2>
                <div className="glass p-6">
                  <h3 className="font-heading text-lg text-ostrava-blue mb-2">{event.venue.name}</h3>
                  <p className="text-ostrava-blue/60 text-sm mb-2">{event.venue.address}</p>
                  <p className="text-ostrava-blue/40 text-sm mb-4">{event.venue.transport}</p>
                  <div className="rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <iframe
                      src={`https://maps.google.com/maps?q=${event.venue.mapQuery}&output=embed`}
                      className="w-full h-full border-0"
                      loading="lazy"
                      title={`Mapa - ${event.venue.name}`}
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>

              {/* Gallery */}
              {event.gallery.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-heading text-2xl uppercase text-ostrava-blue mb-6">Galerie</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {event.gallery.map((img, i) => (
                      <motion.button
                        key={i}
                        className="rounded-lg overflow-hidden cursor-pointer group"
                        style={{ aspectRatio: '4/3' }}
                        onClick={() => openLightbox(i)}
                        whileHover={{ scale: 1.02 }}
                      >
                        <img src={img} alt={`Galerie ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      </motion.button>
                    ))}
                  </div>
                  <Lightbox
                    images={event.gallery}
                    currentIndex={lightboxIndex}
                    isOpen={lightboxOpen}
                    onClose={() => setLightboxOpen(false)}
                    onNext={() => setLightboxIndex((i) => (i + 1) % event.gallery.length)}
                    onPrev={() => setLightboxIndex((i) => (i - 1 + event.gallery.length) % event.gallery.length)}
                  />
                </div>
              )}

              {/* FAQ */}
              {event.faq.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-heading text-2xl uppercase text-ostrava-blue mb-6">Často kladené otázky</h2>
                  <Accordion items={event.faq} />
                </div>
              )}

              {/* Share */}
              <div className="glass p-6 flex flex-wrap items-center gap-3">
                <Share2 className="w-5 h-5 text-ostrava-cyan" />
                <span className="text-ostrava-blue/60 text-sm mr-2">Sdílet:</span>
                <Button variant="ghost" size="sm" onClick={handleWhatsApp}>WhatsApp</Button>
                <Button variant="ghost" size="sm" onClick={handleFacebook}>Facebook</Button>
                <Button variant="ghost" size="sm" onClick={handleShare}>Kopírovat odkaz</Button>
                <Button variant="ghost" size="sm" onClick={() => downloadICS(event)}>Přidat do kalendáře</Button>
              </div>
            </div>

            {/* Sidebar — desktop only */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <PurchaseSidebar event={event} />
            </div>
          </div>

          {/* Related events */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading text-2xl uppercase text-ostrava-blue mb-8 text-center">
                Mohlo by vás také zajímat<span className="text-ostrava-cyan">!!!</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((e, i) => (
                  <EventCard key={e.id} event={e} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <MobilePurchaseBar event={event} />
    </PageTransition>
  );
}
