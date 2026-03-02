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
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 9999, backgroundColor: '#003C69' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-3"
            aria-label="Zavřít menu"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="mb-10 font-heading text-2xl">
            <span className="text-white">AKCE </span>
            <span className="text-ostrava-cyan">OSTRAVA</span>
            <span className="text-ostrava-red">!!!</span>
          </div>

          {navLinks.map((link, i) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <Link
                to={link.to}
                onClick={onClose}
                className={`font-heading text-2xl uppercase tracking-wider py-3 px-8 block text-center transition-colors ${
                  location.pathname === link.to
                    ? 'text-ostrava-cyan'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
