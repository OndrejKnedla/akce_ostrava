import { useEffect } from 'react';
import { usePopupStore } from '@/store/usePopupStore';
import { useToast } from './Toast';
import { socialProofPool } from '@/data/socialProof';
import { events } from '@/data/events';

export function SocialProofToast() {
  const { canShowToast, incrementToast } = usePopupStore();
  const { addToast } = useToast();

  useEffect(() => {
    const getRandomInterval = () => 30000 + Math.random() * 30000;

    let timer: ReturnType<typeof setTimeout>;

    const showProof = () => {
      if (canShowToast()) {
        const person = socialProofPool[Math.floor(Math.random() * socialProofPool.length)];
        const event = events[Math.floor(Math.random() * events.length)];
        const verb = person.name.endsWith('a') ? 'koupila' : 'koupil';
        addToast(
          `${person.name} z ${person.city} právě ${verb} ${person.tickets} ${person.tickets === 1 ? 'vstupenku' : person.tickets < 5 ? 'vstupenky' : 'vstupenek'} na ${event.title}`,
          'info'
        );
        incrementToast();
      }
      timer = setTimeout(showProof, getRandomInterval());
    };

    timer = setTimeout(showProof, getRandomInterval());

    return () => clearTimeout(timer);
  }, [canShowToast, incrementToast, addToast]);

  return null;
}
