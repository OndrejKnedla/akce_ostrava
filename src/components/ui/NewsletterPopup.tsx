import { useEffect, useState } from 'react';
import { usePopupStore } from '@/store/usePopupStore';
import { Modal } from './Modal';
import { Button } from './Button';
import { useToast } from './Toast';
import { useTranslation } from 'react-i18next';

export function NewsletterPopup() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const { canShowNewsletter, showNewsletter, setActiveModal } = usePopupStore();
  const { addToast } = useToast();

  useEffect(() => {
    const shown = sessionStorage.getItem('newsletter-popup');
    if (shown) return;

    const timer = setTimeout(() => {
      if (canShowNewsletter()) {
        showNewsletter();
        setShow(true);
        sessionStorage.setItem('newsletter-popup', 'true');
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [canShowNewsletter, showNewsletter]);

  const handleClose = () => {
    setShow(false);
    setActiveModal(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    addToast(t('newsletterPopup.thanks'));
    setEmail('');
    handleClose();
  };

  return (
    <Modal isOpen={show} onClose={handleClose} title="Newsletter">
      <div className="text-center">
        <div className="text-5xl font-heading text-ostrava-cyan mb-4">
          {'!!!'.split('').map((c, i) => (
            <span key={i} className="inline-block animate-bounce-in" style={{ animationDelay: `${i * 0.15}s` }}>
              {c}
            </span>
          ))}
        </div>
        <h3 className="font-heading text-xl uppercase text-ostrava-blue mb-2">
          {t('newsletterPopup.title')}
        </h3>
        <p className="text-ostrava-blue/60 text-sm mb-6">
          {t('newsletterPopup.description')}
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('newsletterPopup.placeholder')}
            className="flex-1 bg-ostrava-ice border border-ostrava-blue/10 rounded-lg px-4 py-3 text-sm text-ostrava-blue placeholder:text-ostrava-blue/30 focus:border-ostrava-cyan focus:outline-none transition-colors"
            required
          />
          <Button type="submit" variant="primary" size="md">
            {t('newsletterPopup.submit')}
          </Button>
        </form>
      </div>
    </Modal>
  );
}
