import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { formatDateShort } from '@/utils/formatDate';
import { cn } from '@/utils/cn';
import { useLocale } from '@/i18n/useLocale';
import type { EventData } from '@/types';

interface EventCardProps {
  event: EventData;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const { t, lang, localePath } = useLocale();
  const date = formatDateShort(event.date, lang);
  const lowestPrice = event.tickets.length > 0 ? Math.min(...event.tickets.map((t) => t.price)) : 0;
  const isSoldOut = event.status === 'sold-out';
  const isLastTickets = event.status === 'last-tickets';
  const isEarlyBird = event.status === 'early-bird';
  const isAnnounced = event.status === 'announced';

  return (
    <Link to={localePath('event', { slug: event.slug })} className="block">
      <GlassCard
        className="group flex flex-col overflow-hidden w-full !bg-white !border-ostrava-blue/10 shadow-md hover:shadow-xl"
        tilt
        hover
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <motion.div
            className="absolute inset-0 bg-ostrava-cyan z-10"
            initial={{ scaleX: 1 }}
            whileInView={{ scaleX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ transformOrigin: 'right' }}
          />
          <img
            src={event.image}
            alt={event.title}
            className={cn(
              'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105',
              isSoldOut && 'grayscale opacity-40'
            )}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Date badge */}
          <div className="absolute top-3 left-3 bg-white/95 border border-ostrava-blue/10 rounded-lg px-3 py-2 text-center shadow-sm">
            <div className="font-mono text-lg font-bold text-ostrava-blue leading-none">{date.day}</div>
            <div className="font-mono text-[10px] text-ostrava-blue/50 uppercase">{date.month}</div>
          </div>

          {/* Status badges */}
          {isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-ostrava-red/90 text-white font-heading uppercase text-lg px-6 py-2 rounded-lg -rotate-6">
                {t('eventCard.soldOut')}
              </span>
            </div>
          )}
          {isLastTickets && (
            <motion.div
              className="absolute top-3 right-3 bg-ostrava-red/90 text-white font-heading uppercase text-xs px-3 py-1 rounded"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {t('eventCard.lastTickets')}
            </motion.div>
          )}
          {isEarlyBird && (
            <div className="absolute top-3 right-3 bg-ostrava-yellow text-ostrava-blue font-heading uppercase text-xs px-3 py-1 rounded font-bold">
              Early Bird
            </div>
          )}
          {isAnnounced && (
            <div className="absolute top-3 right-3 bg-ostrava-yellow text-ostrava-blue font-heading uppercase text-xs px-3 py-1 rounded font-bold">
              {t('eventCard.soon')}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="font-heading text-lg uppercase text-ostrava-blue mb-2 line-clamp-2 group-hover:text-ostrava-cyan transition-colors">
            {event.title}
          </h3>
          <div className="flex items-center gap-1.5 text-ostrava-blue/50 text-sm mb-3">
            <MapPin className="w-3.5 h-3.5 text-ostrava-cyan flex-shrink-0" />
            <span>{event.venue.name}</span>
          </div>
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-ostrava-blue/10">
            {isAnnounced ? (
              <span className="font-heading text-sm uppercase text-ostrava-yellow">{t('eventCard.announceSoon')}</span>
            ) : (
              <span className="font-mono text-lg font-bold text-ostrava-blue">
                {t('eventCard.fromPrice', { price: lowestPrice.toLocaleString('cs-CZ') })}
              </span>
            )}
            {isAnnounced ? (
              <span className="text-ostrava-blue/30 text-sm font-heading uppercase">{t('eventCard.preparing')}</span>
            ) : !isSoldOut ? (
              <Button
                variant="primary"
                size="sm"
                href={event.tickets[0]?.purchaseUrl}
                external
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                {t('eventCard.buy')}
              </Button>
            ) : (
              <span className="text-ostrava-blue/30 text-sm font-heading uppercase">{t('eventCard.soldOut')}</span>
            )}
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
