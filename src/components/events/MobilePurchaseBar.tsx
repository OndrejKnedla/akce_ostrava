import { Button } from '@/components/ui/Button';
import type { EventData } from '@/types';

interface MobilePurchaseBarProps {
  event: EventData;
}

export function MobilePurchaseBar({ event }: MobilePurchaseBarProps) {
  const lowestPrice = event.tickets.length > 0 ? Math.min(...event.tickets.map((t) => t.price)) : 0;
  const isSoldOut = event.status === 'sold-out';
  const isAnnounced = event.status === 'announced';

  if (isSoldOut || isAnnounced) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[6000] bg-white/95 backdrop-blur-xl border-t border-ostrava-blue/10 shadow-lg px-4 py-3 lg:hidden">
      <div className="flex items-center justify-between max-w-content mx-auto">
        <div>
          <span className="font-mono text-lg font-bold text-ostrava-blue">
            od {lowestPrice.toLocaleString('cs-CZ')} Kč
          </span>
        </div>
        <Button
          variant="cta"
          size="sm"
          onClick={() => document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Koupit!!!
        </Button>
      </div>
    </div>
  );
}
