import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { langFromPath } from '@/i18n/routes';
import type { EventData } from '@/types';

interface EventJsonLdProps {
  event: EventData;
}

export function EventJsonLd({ event }: EventJsonLdProps) {
  const location = useLocation();
  const lang = langFromPath(location.pathname);
  const [h, m] = event.time.split(':');
  const startDate = `${event.date}T${h}:${m}:00+01:00`;

  const lowestPrice = Math.min(...event.tickets.map((t) => t.price));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description.substring(0, 300),
    startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    inLanguage: lang,
    location: {
      '@type': 'Place',
      name: event.venue.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.venue.address,
        addressLocality: event.venue.city,
        addressCountry: 'CZ',
      },
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: lowestPrice,
      priceCurrency: 'CZK',
      availability: event.status === 'sold-out'
        ? 'https://schema.org/SoldOut'
        : 'https://schema.org/InStock',
    },
    performer: event.lineup?.map((a) => ({
      '@type': 'PerformingGroup',
      name: a.name,
    })),
    image: event.image,
    organizer: {
      '@type': 'Organization',
      name: 'RESTARTSTAGE PRODUCTION - FZCO, odštěpný závod',
      url: 'https://akceostrava.cz',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
