import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePopupStore } from '@/store/usePopupStore';
import { Button } from './Button';

export function CookieBanner() {
  const { cookieDismissed, dismissCookie } = usePopupStore();
  const [visible, setVisible] = useState(!cookieDismissed);

  const handleDismiss = () => {
    dismissCookie();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[5500] p-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <div className="glass max-w-content mx-auto flex flex-col sm:flex-row items-center gap-4 px-6 py-4">
            <p className="text-sm text-ostrava-blue/70 flex-1">
              Používáme cookies pro zlepšení vašeho zážitku na webu.
            </p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button variant="primary" size="sm" onClick={handleDismiss}>
                Přijmout vše
              </Button>
              <button
                onClick={handleDismiss}
                className="text-ostrava-blue/50 text-sm hover:text-ostrava-blue transition-colors"
              >
                Odmítnout
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
