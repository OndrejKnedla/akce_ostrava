import { useEffect, useState } from 'react';
import { usePopupStore } from '@/store/usePopupStore';
import { getFeaturedEvent } from '@/data/events';
import { translateEvent } from '@/utils/translateEvent';
import { Modal } from './Modal';
import { Button } from './Button';
import { useLocale } from '@/i18n/useLocale';

export function ExitIntentPopup() {
  const { t, lang, localePath } = useLocale();
  const [show, setShow] = useState(false);
  const { canShowExitIntent, showExitIntent, setActiveModal } = usePopupStore();
  const event = translateEvent(getFeaturedEvent(), lang);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && canShowExitIntent()) {
        showExitIntent();
        setShow(true);
      }
    };

    timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 15000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [canShowExitIntent, showExitIntent]);

  const handleClose = () => {
    setShow(false);
    setActiveModal(null);
  };

  return (
    <Modal isOpen={show} onClose={handleClose} title="Exit intent">
      <div className="text-center">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-56 md:h-64 object-cover rounded-lg mb-6"
        />
        <h3 className="font-heading text-2xl uppercase text-ostrava-blue mb-2">
          {t('exitIntent.dontMiss', { title: event.title })}
        </h3>
        <p className="text-ostrava-blue/60 text-sm mb-6">{event.subtitle}</p>
        <div className="flex flex-col gap-3">
          <Button variant="cta" onClick={handleClose} href={localePath('event', { slug: event.slug })}>
            {t('exitIntent.buyTickets')}
          </Button>
          <button onClick={handleClose} className="text-ostrava-cyan text-sm hover:underline">
            {t('exitIntent.subscribe')}
          </button>
        </div>
      </div>
    </Modal>
  );
}
