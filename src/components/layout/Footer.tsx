import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import { OstravaSkyline } from '@/components/svg/OstravaSkyline';

export function Footer() {
  return (
    <footer className="bg-ostrava-blue relative overflow-hidden">
      <OstravaSkyline className="text-white/5 absolute top-0 left-0 right-0" />

      <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="font-heading text-2xl tracking-wider inline-block mb-4">
              <span className="text-white">AKCE </span>
              <span className="text-ostrava-cyan">OSTRAVA</span>
              <span className="text-ostrava-red">!!!</span>
            </Link>
            <p className="text-white/50 text-sm mb-6 max-w-sm">
              Ocelové srdce zábavy. Nejlepší koncerty, festivaly a show v Ostravě a okolí.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider text-white mb-4">Navigace</h4>
            <ul className="space-y-2">
              {[
                { to: '/akce', label: 'Akce' },
                { to: '/o-nas', label: 'O nás' },
                { to: '/kontakt', label: 'Kontakt' },
                { to: '/faq', label: 'FAQ' },
              ].map((link) => (
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
            <h4 className="font-heading text-sm uppercase tracking-wider text-white mb-4">Informace</h4>
            <ul className="space-y-2 mb-6">
              <li><Link to="/obchodni-podminky" className="text-white/50 text-sm hover:text-ostrava-cyan transition-colors">Obchodní podmínky</Link></li>
              <li><Link to="/gdpr" className="text-white/50 text-sm hover:text-ostrava-cyan transition-colors">Zásady GDPR</Link></li>
            </ul>

            <h4 className="font-heading text-sm uppercase tracking-wider text-white mb-3">Sociální sítě</h4>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Youtube, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
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
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <span>© 2026 RESTARTSTAGE PRODUCTION s.r.o.</span>
          <span>Ocelové srdce zábavy!!!</span>
        </div>
      </div>
    </footer>
  );
}
