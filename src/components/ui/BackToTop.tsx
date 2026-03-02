import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="fixed bottom-6 right-6 z-[5000] w-12 h-12 rounded-lg bg-ostrava-blue text-white shadow-lg hover:shadow-[0_0_20px_rgba(0,60,105,0.4)] transition-all flex flex-col items-center justify-center gap-0 font-heading text-lg leading-none"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          aria-label="Zpět nahoru"
        >
          <span>!</span>
          <span>!</span>
          <span>!</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
