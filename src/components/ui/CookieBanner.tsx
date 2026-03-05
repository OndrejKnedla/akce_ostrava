import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Settings, Shield, BarChart3, ChevronDown } from 'lucide-react';
import { usePopupStore } from '@/store/usePopupStore';
import { Button } from './Button';

interface CookieCategory {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  required: boolean;
  defaultOn: boolean;
}

const categories: CookieCategory[] = [
  {
    id: 'necessary',
    label: 'Nezbytné',
    description: 'Zajišťují základní funkce webu, jako je navigace a přístup k zabezpečeným oblastem. Bez těchto cookies web nemůže správně fungovat.',
    icon: <Shield className="w-4 h-4" />,
    required: true,
    defaultOn: true,
  },
  {
    id: 'analytics',
    label: 'Analytické',
    description: 'Pomáhají nám porozumět, jak návštěvníci web používají. Data jsou anonymizována (Vercel Analytics).',
    icon: <BarChart3 className="w-4 h-4" />,
    required: false,
    defaultOn: true,
  },
];

export function CookieBanner() {
  const { cookieDismissed, dismissCookie } = usePopupStore();
  const [visible, setVisible] = useState(!cookieDismissed);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map((c) => [c.id, c.defaultOn]))
  );

  const handleAcceptAll = () => {
    dismissCookie('all');
    setVisible(false);
  };

  const handleRejectOptional = () => {
    dismissCookie('necessary');
    setVisible(false);
  };

  const handleSaveSettings = () => {
    const accepted = Object.entries(consent)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join(',');
    dismissCookie(accepted);
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
          <div className="max-w-content mx-auto bg-white/95 backdrop-blur-xl border border-ostrava-blue/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Main bar */}
            <div className="px-6 py-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-ostrava-cyan/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield className="w-5 h-5 text-ostrava-cyan" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-sm uppercase text-ostrava-blue mb-1">Ochrana vašeho soukromí</h3>
                  <p className="text-sm text-ostrava-blue/60 leading-relaxed">
                    Používáme cookies pro správné fungování webu a analýzu návštěvnosti.
                    Více informací najdete v{' '}
                    <Link to="/gdpr" className="text-ostrava-cyan hover:underline">zásadách ochrany osobních údajů</Link>.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button variant="cta" size="sm" onClick={handleAcceptAll} className="flex-shrink-0">
                  Přijmout vše
                </Button>
                <Button variant="primary" size="sm" onClick={handleRejectOptional} className="flex-shrink-0">
                  Pouze nezbytné
                </Button>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center justify-center gap-2 text-ostrava-blue/50 text-sm hover:text-ostrava-blue transition-colors py-2"
                >
                  <Settings className="w-4 h-4" />
                  Nastavení
                  <ChevronDown className={`w-3 h-3 transition-transform ${showSettings ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Settings panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-ostrava-blue/10 px-6 py-5 bg-ostrava-ice/50">
                    <div className="space-y-4 mb-5">
                      {categories.map((cat) => (
                        <div key={cat.id} className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-lg bg-white border border-ostrava-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-ostrava-blue/50">
                            {cat.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-4">
                              <span className="font-heading text-xs uppercase text-ostrava-blue">{cat.label}</span>
                              {cat.required ? (
                                <span className="text-[10px] uppercase text-ostrava-blue/30 font-heading flex-shrink-0">Vždy aktivní</span>
                              ) : (
                                <button
                                  onClick={() => setConsent((c) => ({ ...c, [cat.id]: !c[cat.id] }))}
                                  className={`w-11 h-6 rounded-full flex-shrink-0 transition-colors relative ${
                                    consent[cat.id] ? 'bg-ostrava-cyan' : 'bg-ostrava-blue/20'
                                  }`}
                                >
                                  <span
                                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                                      consent[cat.id] ? 'translate-x-[22px]' : 'translate-x-1'
                                    }`}
                                  />
                                </button>
                              )}
                            </div>
                            <p className="text-xs text-ostrava-blue/50 leading-relaxed mt-1">{cat.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="primary" size="sm" onClick={handleSaveSettings}>
                      Uložit nastavení
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
