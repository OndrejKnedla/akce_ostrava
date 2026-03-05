import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { formatCzechDate } from '@/utils/formatCzechDate';
import { getDaysUntil } from '@/utils/formatCzechDate';
import type { EventData } from '@/types';

interface EventShowcaseProps {
  event: EventData;
  index: number;
  reversed?: boolean;
}

export function EventShowcase({ event, index, reversed = false }: EventShowcaseProps) {
  const lowestPrice = event.tickets.length > 0 ? Math.min(...event.tickets.map((t) => t.price)) : 0;
  const daysLeft = getDaysUntil(event.date);
  const isAnnounced = event.status === 'announced';
  const categoryLabels: Record<string, string> = {
    koncert: 'Koncert',
    festival: 'Festival',
    show: 'VIP Show',
  };

  return (
    <motion.div
      className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-0 lg:gap-8 items-stretch`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      {/* Image */}
      <Link
        to={`/akce/${event.slug}`}
        className="relative lg:w-3/5 overflow-hidden rounded-t-2xl lg:rounded-2xl group"
        style={{ aspectRatio: '16/9' }}
      >
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-4 left-4 bg-ostrava-cyan text-white font-heading uppercase text-xs px-3 py-1.5 rounded-lg tracking-wider">
          {categoryLabels[event.category] || event.category}
        </div>

        {/* Days left */}
        {daysLeft > 0 && (
          <div className="absolute top-4 right-4 bg-white/95 text-ostrava-blue font-heading text-xs px-3 py-1.5 rounded-lg">
            za <span className="font-mono font-bold text-ostrava-red">{daysLeft}</span> dní
          </div>
        )}

        {/* Title overlay on mobile */}
        <div className="absolute bottom-0 left-0 right-0 p-5 lg:hidden">
          <h3 className="font-heading text-2xl uppercase text-white leading-tight">
            {event.title}
          </h3>
        </div>
      </Link>

      {/* Content */}
      <div className="lg:w-2/5 flex flex-col justify-center p-6 lg:p-0 bg-white lg:bg-transparent rounded-b-2xl lg:rounded-none border border-ostrava-blue/10 lg:border-0">
        <h3 className="hidden lg:block font-heading text-2xl xl:text-3xl uppercase text-ostrava-blue leading-tight mb-3">
          <Link to={`/akce/${event.slug}`} className="hover:text-ostrava-cyan transition-colors">
            {event.title}
          </Link>
        </h3>

        <p className="text-ostrava-blue/60 text-sm mb-5 leading-relaxed line-clamp-3">
          {event.subtitle}
        </p>

        <div className="flex flex-col gap-2 mb-5">
          <div className="flex items-center gap-2 text-ostrava-blue/70 text-sm">
            <Calendar className="w-4 h-4 text-ostrava-cyan flex-shrink-0" />
            <span>{formatCzechDate(event.date, event.time)}</span>
          </div>
          <div className="flex items-center gap-2 text-ostrava-blue/70 text-sm">
            <MapPin className="w-4 h-4 text-ostrava-cyan flex-shrink-0" />
            <span>{event.venue.name}, {event.venue.city}</span>
          </div>
        </div>

        {/* Lineup preview */}
        {event.lineup && event.lineup.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {event.lineup.map((artist) => (
              <span
                key={artist.name}
                className="bg-ostrava-ice text-ostrava-blue/70 text-xs font-heading uppercase px-3 py-1 rounded-full"
              >
                {artist.name}
              </span>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center gap-4 mt-auto">
          {isAnnounced ? (
            <div className="bg-ostrava-yellow/20 border border-ostrava-yellow/40 rounded-lg px-5 py-3">
              <div className="font-heading text-ostrava-blue uppercase text-sm">Brzy oznámíme!!!</div>
              <div className="text-ostrava-blue/50 text-xs">Sledujte naše stránky</div>
            </div>
          ) : (
            <>
              <div>
                <div className="text-ostrava-blue/40 text-xs font-heading uppercase">Vstupenky od</div>
                <div className="font-mono text-2xl font-bold text-ostrava-blue">
                  {lowestPrice.toLocaleString('cs-CZ')} Kč
                </div>
              </div>
              <Button variant="cta" size="md" href={event.tickets[0]?.purchaseUrl} external>
                Koupit
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
