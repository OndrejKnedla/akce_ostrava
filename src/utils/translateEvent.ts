import type { EventData } from '@/types';
import type { Lang } from '@/i18n/config';
import { getEventTranslation } from '@/data/event-translations';

export function translateEvent(event: EventData, lang: Lang): EventData {
  if (lang === 'cs') return event;

  const tr = getEventTranslation(event.slug, lang);
  if (!tr) return event;

  return {
    ...event,
    title: tr.title,
    subtitle: tr.subtitle,
    description: tr.description,
    venue: {
      ...event.venue,
      transport: tr.transport,
    },
    tickets: event.tickets.map((ticket) => {
      const ticketTr = tr.tickets[ticket.id];
      return ticketTr
        ? { ...ticket, name: ticketTr.name, features: ticketTr.features }
        : ticket;
    }),
    faq: event.faq?.map((item, i) => tr.faq[i] || item),
    lineup: event.lineup?.map((artist) => ({
      ...artist,
      genre: tr.genres[artist.genre] || artist.genre,
    })),
  };
}

export function translateEvents(events: EventData[], lang: Lang): EventData[] {
  return events.map((e) => translateEvent(e, lang));
}
