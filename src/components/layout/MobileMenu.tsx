import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { to: '/', label: 'Úvod' },
  { to: '/akce', label: 'Akce' },
  { to: '/o-nas', label: 'O nás' },
  { to: '/kontakt', label: 'Kontakt' },
  { to: '/faq', label: 'FAQ' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9000] bg-dark/98"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
            aria-label="Zavřít menu"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="flex flex-col items-center justify-center h-full gap-2">
            <div className="mb-8 font-heading text-2xl">
              <span className="text-white">AKCE </span>
              <span className="text-ostrava-cyan">OSTRAVA</span>
              <span className="text-ostrava-red">!!!</span>
            </div>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  to={link.to}
                  onClick={onClose}
                  className={`font-heading text-3xl uppercase tracking-wider py-3 px-8 block transition-colors ${
                    location.pathname === link.to
                      ? 'text-ostrava-cyan border-l-4 border-ostrava-cyan'
                      : 'text-white/70 hover:text-white border-l-4 border-transparent'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Decorative !!! */}
            <div className="absolute bottom-10 text-ostrava-red/5 font-heading text-[200px] leading-none select-none pointer-events-none">
              !!!
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
