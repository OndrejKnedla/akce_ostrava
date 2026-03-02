import { motion } from 'framer-motion';
import { EventCard } from './EventCard';
import type { EventData } from '@/types';

interface EventGridProps {
  events: EventData[];
}

export function EventGrid({ events }: EventGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {events.map((event, i) => (
        <motion.div
          key={event.id}
          variants={{
            hidden: { opacity: 0, y: 40, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <EventCard event={event} index={i} />
        </motion.div>
      ))}
    </motion.div>
  );
}
