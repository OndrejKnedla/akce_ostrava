import { EventCard } from './EventCard';
import type { EventData } from '@/types';

interface HorizontalScrollProps {
  events: EventData[];
}

export function HorizontalScroll({ events }: HorizontalScrollProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, i) => (
        <EventCard key={event.id} event={event} index={i} />
      ))}
    </div>
  );
}
