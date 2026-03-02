import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MobileMenu } from './MobileMenu';

const navLinks = [
  { to: '/', label: 'Úvod' },
  { to: '/akce', label: 'Akce' },
  { to: '/o-nas', label: 'O nás' },
  { to: '/kontakt', label: 'Kontakt' },
  { to: '/faq', label: 'FAQ' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[7000] transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-ostrava-blue/10 shadow-sm'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-heading text-xl md:text-2xl tracking-wider flex items-baseline gap-0.5">
            <span className={scrolled ? 'text-ostrava-blue' : 'text-white'}>AKCE</span>
            <span className={cn('ml-1', scrolled ? 'text-ostrava-cyan' : 'text-ostrava-cyan')}>OSTRAVA</span>
            <span className="text-ostrava-red">!!!</span>
          </Link>

          {isDesktop ? (
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'font-heading text-sm uppercase tracking-wider relative py-1 transition-colors',
                    location.pathname === link.to
                      ? 'text-ostrava-cyan'
                      : scrolled
                        ? 'text-ostrava-blue/60 hover:text-ostrava-blue'
                        : 'text-white/80 hover:text-white'
                  )}
                >
                  {link.label}
                  {location.pathname === link.to && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ostrava-cyan"
                      layoutId="navIndicator"
                    />
                  )}
                </Link>
              ))}
              <button className={cn('p-2 transition-colors', scrolled ? 'text-ostrava-blue/40 hover:text-ostrava-cyan' : 'text-white/50 hover:text-ostrava-cyan')} aria-label="Hledat">
                <Search className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setMenuOpen(true)}
              className={cn('p-2', scrolled ? 'text-ostrava-blue' : 'text-white')}
              aria-label="Otevřít menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
        </div>
      </motion.nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
