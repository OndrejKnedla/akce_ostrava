import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useLocale } from '@/i18n/useLocale';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const location = useLocation();
  const { t, localePath } = useLocale();

  const navLinks = [
    { to: localePath('home'), label: t('nav.home') },
    { to: localePath('events'), label: t('nav.events') },
    { to: localePath('blog'), label: t('nav.blog') },
    { to: localePath('contact'), label: t('nav.contact') },
  ];

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
          <Link to={localePath('home')} className="font-heading text-xl md:text-2xl tracking-wider flex items-baseline gap-0.5">
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
              <button className={cn('p-2 transition-colors', scrolled ? 'text-ostrava-blue/40 hover:text-ostrava-cyan' : 'text-white/50 hover:text-ostrava-cyan')} aria-label={t('nav.search')}>
                <Search className="w-5 h-5" />
              </button>
              <LanguageSwitcher scrolled={scrolled} />
            </div>
          ) : (
            <button
              onClick={() => setMenuOpen(true)}
              className={cn(
                'p-3 rounded-lg transition-colors',
                scrolled
                  ? 'text-ostrava-blue hover:bg-ostrava-blue/10'
                  : 'text-white bg-white/10 hover:bg-white/20'
              )}
              aria-label={t('nav.openMenu')}
            >
              <Menu className="w-7 h-7" />
            </button>
          )}
        </div>
      </motion.nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
