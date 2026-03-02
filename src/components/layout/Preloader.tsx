import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-dark flex items-center justify-center"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-1">
              <motion.span
                className="font-heading text-4xl md:text-5xl text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                AKCE
              </motion.span>
              <motion.span
                className="font-heading text-4xl md:text-5xl text-ostrava-cyan ml-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                OSTRAVA
              </motion.span>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="font-heading text-4xl md:text-5xl text-ostrava-red"
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: 0.6 + i * 0.15,
                    type: 'spring',
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  !
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
