import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { useTranslation } from 'react-i18next';
import type { TicketTier as TicketTierType } from '@/types';

interface TicketTierProps {
  tier: TicketTierType;
  index: number;
}

export function TicketTier({ tier, index }: TicketTierProps) {
  const { t } = useTranslation();
  const pct = tier.total > 0 ? (tier.available / tier.total) * 100 : 0;
  const isLow = pct < 20;
  const hasSavings = tier.originalPrice && tier.originalPrice > tier.price;
  const savings = hasSavings ? tier.originalPrice! - tier.price : 0;

  return (
    <motion.div
      className={cn(
        'glass flex flex-col p-6 relative',
        tier.highlighted && 'border-ostrava-cyan/40 shadow-[0_0_30px_rgba(0,175,210,0.15)] scale-[1.02] ring-2 ring-ostrava-cyan/20'
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {tier.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ostrava-yellow text-ostrava-blue text-xs font-heading uppercase font-bold px-4 py-1 rounded-full">
          {t('ticket.mostPopular')}
        </div>
      )}

      <h4 className="font-heading text-xl uppercase text-ostrava-blue mb-2">{tier.name}</h4>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="font-mono text-3xl font-bold text-ostrava-blue">
          {tier.price.toLocaleString('cs-CZ')} Kč
        </span>
        {hasSavings && (
          <span className="font-mono text-sm text-ostrava-blue/40 line-through">
            {tier.originalPrice!.toLocaleString('cs-CZ')} Kč
          </span>
        )}
      </div>

      {hasSavings && (
        <div className="text-success text-sm font-heading mb-4">
          {t('ticket.save', { amount: savings.toLocaleString('cs-CZ') })}
        </div>
      )}

      <ul className="space-y-2 mb-6 flex-1">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-ostrava-blue/70">
            <Check className="w-4 h-4 text-ostrava-cyan flex-shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Availability bar */}
      <div className="mb-4">
        <div className="h-2 bg-ostrava-blue/10 rounded-full overflow-hidden">
          <motion.div
            className={cn('h-full rounded-full shimmer-bar', isLow ? 'bg-ostrava-red' : 'bg-ostrava-cyan')}
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
        <p className={cn('text-xs mt-1', isLow ? 'text-ostrava-red' : 'text-ostrava-blue/40')}>
          {isLow && tier.available <= 50 ? (
            <motion.span animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              {t('ticket.remaining', { count: tier.available })}
            </motion.span>
          ) : (
            t('ticket.remainingOf', { available: tier.available, total: tier.total })
          )}
        </p>
      </div>

      <Button
        variant={tier.highlighted ? 'cta' : 'primary'}
        href={tier.purchaseUrl}
        external
        className="w-full"
      >
        {tier.highlighted ? t('ticket.buyHighlight') : t('ticket.buy')}
      </Button>
    </motion.div>
  );
}
