import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import type { EventData } from '@/types';

interface PurchaseSidebarProps {
  event: EventData;
}

export function PurchaseSidebar({ event }: PurchaseSidebarProps) {
  const lowestPrice = event.tickets.length > 0 ? Math.min(...event.tickets.map((t) => t.price)) : 0;
  const isSoldOut = event.status === 'sold-out';
  const isAnnounced = event.status === 'announced';

  return (
    <motion.div
      className="glass p-6 sticky top-24"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="font-heading text-lg uppercase text-ostrava-blue mb-1 line-clamp-2">{event.title}</h3>
      <p className="text-ostrava-blue/40 text-sm mb-4">{event.subtitle}</p>

      {isAnnounced ? (
        <div className="font-heading text-lg uppercase text-ostrava-yellow mb-2">Brzy oznámíme!!!</div>
      ) : (
        <div className="font-mono text-2xl font-bold text-ostrava-blue mb-2">
          od {lowestPrice.toLocaleString('cs-CZ')} Kč
        </div>
      )}

      {event.status === 'last-tickets' && (
        <motion.p
          className="text-ostrava-red text-sm font-heading mb-4"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Poslední vstupenky!!!
        </motion.p>
      )}
      {event.status === 'early-bird' && event.earlyBirdDeadline && (
        <p className="text-ostrava-red text-sm font-heading mb-4">
          Early Bird do {new Date(event.earlyBirdDeadline).toLocaleDateString('cs-CZ')}
        </p>
      )}

      {isAnnounced ? (
        <div className="text-center text-ostrava-blue/50 font-heading uppercase py-3 text-sm">Sledujte naše stránky</div>
      ) : !isSoldOut ? (
        <Button variant="cta" className="w-full" onClick={() => document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' })}>
          Koupit vstupenky!!!
        </Button>
      ) : (
        <div className="text-center text-ostrava-blue/30 font-heading uppercase py-3">Vyprodáno</div>
      )}

      <div className="mt-4 flex items-center gap-2 text-ostrava-blue/30 text-xs">
        <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
        Právě si prohlíží {12 + Math.floor(Math.random() * 35)} lidí
      </div>
    </motion.div>
  );
}
