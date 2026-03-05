import { useEffect } from 'react';
import { usePopupStore } from '@/store/usePopupStore';
import { useToast } from './Toast';
import { socialProofPool } from '@/data/socialProof';
import { events } from '@/data/events';
import { translateEvent } from '@/utils/translateEvent';
import { useLocale } from '@/i18n/useLocale';

export function SocialProofToast() {
  const { t, lang } = useLocale();
  const { canShowToast, incrementToast } = usePopupStore();
  const { addToast } = useToast();

  useEffect(() => {
    const getRandomInterval = () => 30000 + Math.random() * 30000;

    let timer: ReturnType<typeof setTimeout>;

    const showProof = () => {
      if (canShowToast()) {
        const person = socialProofPool[Math.floor(Math.random() * socialProofPool.length)];
        const rawEvent = events[Math.floor(Math.random() * events.length)];
        const event = translateEvent(rawEvent, lang);
        const ticketStr = person.tickets === 1
          ? t('socialProof.ticket_one')
          : person.tickets < 5
            ? t('socialProof.ticket_few')
            : t('socialProof.ticket_many');
        const isFemale = person.name.endsWith('a');
        const message = isFemale
          ? t('socialProof.bought_female', { name: person.name, city: person.city, tickets: ticketStr, event: event.title })
          : t('socialProof.bought_male', { name: person.name, city: person.city, tickets: ticketStr, event: event.title });
        addToast(message, 'info');
        incrementToast();
      }
      timer = setTimeout(showProof, getRandomInterval());
    };

    timer = setTimeout(showProof, getRandomInterval());

    return () => clearTimeout(timer);
  }, [canShowToast, incrementToast, addToast, t, lang]);

  return null;
}
