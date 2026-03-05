import { useState } from 'react';
import { motion } from 'framer-motion';
import { SeoHead } from '@/seo/SeoHead';
import { Instagram, Facebook } from 'lucide-react';
import { SplitText } from '@/components/ui/SplitText';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { PageTransition } from '@/components/layout/PageTransition';
import { useLocale } from '@/i18n/useLocale';

export default function ContactPage() {
  const { addToast } = useToast();
  const { t } = useLocale();
  const [form, setForm] = useState({ name: '', email: '', subject: t('contact.subjectGeneral'), message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      addToast(t('contact.validEmail'), 'info');
      return;
    }
    if (form.message.length < 10) {
      addToast(t('contact.minLength'), 'info');
      return;
    }
    addToast(t('contact.success'));
    setForm({ name: '', email: '', subject: t('contact.subjectGeneral'), message: '' });
  };

  const inputClass = 'w-full bg-ostrava-ice border border-ostrava-blue/10 rounded-lg px-5 py-3 text-ostrava-blue placeholder:text-ostrava-blue/30 focus:border-ostrava-cyan focus:outline-none focus:shadow-[0_0_15px_rgba(0,175,210,0.2)] transition-all text-sm';

  return (
    <PageTransition>
      <SeoHead
        title={t('contact.seoTitle')}
        description={t('contact.seoDesc')}
        canonical="https://akceostrava.cz/kontakt"
      />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-ostrava-blue to-ostrava-blue/80 text-center">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase text-white">
          <SplitText text={t('contact.title')} />
          <span className="text-ostrava-cyan">!!!</span>
        </h1>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info */}
            <motion.div
              className="lg:col-span-2 order-1 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-heading text-2xl uppercase text-ostrava-blue mb-6">{t('contact.connectTitle')}</h2>

              <div className="mb-6 text-ostrava-blue/60 text-sm space-y-1">
                <p className="font-heading text-ostrava-blue text-base">RESTARTSTAGE PRODUCTION - FZCO</p>
                <p>odštěpný závod</p>
                <p>IČO: 22161104</p>
              </div>

              <div className="flex gap-3 mb-8">
                {[
                  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/restartstage_production/' },
                  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61569886395898' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-ostrava-ice border border-ostrava-blue/10 flex items-center justify-center text-ostrava-blue/50 hover:text-ostrava-cyan hover:border-ostrava-cyan/30 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

            </motion.div>

            {/* Form */}
            <motion.div
              className="lg:col-span-3 order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-heading text-2xl uppercase text-ostrava-blue mb-6">{t('contact.formTitle')}</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-ostrava-blue/40 text-xs uppercase block mb-2">{t('contact.nameLabel')}</label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={inputClass}
                    placeholder={t('contact.namePlaceholder')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-ostrava-blue/40 text-xs uppercase block mb-2">{t('contact.emailLabel')}</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={inputClass}
                    placeholder={t('contact.emailPlaceholder')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="text-ostrava-blue/40 text-xs uppercase block mb-2">{t('contact.subjectLabel')}</label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    className={inputClass}
                  >
                    <option>{t('contact.subjectGeneral')}</option>
                    <option>{t('contact.subjectCooperation')}</option>
                    <option>{t('contact.subjectComplaint')}</option>
                    <option>{t('contact.subjectOther')}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="text-ostrava-blue/40 text-xs uppercase block mb-2">{t('contact.messageLabel')}</label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className={`${inputClass} min-h-[150px] resize-y`}
                    placeholder={t('contact.messagePlaceholder')}
                    required
                  />
                </div>
                <Button type="submit" variant="cta" size="lg" className="w-full sm:w-auto">
                  {t('contact.submit')}
                </Button>
              </form>
            </motion.div>
          </div>

        </div>
      </section>

      <div className="py-6 bg-white border-t border-ostrava-blue/10 text-center">
        <p className="text-ostrava-blue/40 text-xs">
          {t('footer.copyright')}
        </p>
      </div>
    </PageTransition>
  );
}
