import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import { OstravaSkyline } from '@/components/svg/OstravaSkyline';
import { useLocale } from '@/i18n/useLocale';

export function Footer() {
  const { t, localePath } = useLocale();

  const navLinks = [
    { to: localePath('events'), label: t('nav.events') },
    { to: localePath('blog'), label: t('nav.blog') },
    { to: localePath('contact'), label: t('nav.contact') },
  ];

  return (
    <footer className="bg-ostrava-blue relative overflow-hidden">
      <OstravaSkyline className="text-white/5 absolute top-0 left-0 right-0" />

      <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-center md:text-left">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to={localePath('home')} className="font-heading text-2xl tracking-wider inline-block mb-4">
              <span className="text-white">AKCE </span>
              <span className="text-ostrava-cyan">OSTRAVA</span>
              <span className="text-ostrava-red">!!!</span>
            </Link>
            <p className="text-white/50 text-sm mb-6 max-w-sm mx-auto md:mx-0">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider text-white mb-4">{t('footer.navigation')}</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/50 text-sm hover:text-ostrava-cyan transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Social */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider text-white mb-4">{t('footer.info')}</h4>
            <ul className="space-y-2 mb-6">
              <li><Link to={localePath('terms')} className="text-white/50 text-sm hover:text-ostrava-cyan transition-colors">{t('footer.terms')}</Link></li>
              <li><Link to={localePath('gdpr')} className="text-white/50 text-sm hover:text-ostrava-cyan transition-colors">{t('footer.gdpr')}</Link></li>
            </ul>

            <h4 className="font-heading text-sm uppercase tracking-wider text-white mb-3">{t('footer.social')}</h4>
            <div className="flex items-center justify-center md:justify-start gap-3">
              {[
                { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/restartstage_production/' },
                { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61569886395898' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-ostrava-cyan hover:border-ostrava-cyan/30 hover:shadow-[0_0_15px_rgba(0,175,210,0.2)] transition-all"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30 text-center md:text-left">
          <span>{t('footer.copyright')}</span>
          <span>{t('footer.taglineBrand')}</span>
        </div>
      </div>
    </footer>
  );
}
