import { ParticleCanvas } from './ParticleCanvas';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Trans } from 'react-i18next';
import { useLocale } from '@/i18n/useLocale';

export function HeroSection() {
  const { t, localePath } = useLocale();

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      <ParticleCanvas />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.h1
          className="font-heading text-2xl md:text-3xl lg:text-4xl text-white mb-6 uppercase whitespace-nowrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Trans i18nKey="hero.title">
            Objev svět <span className="text-ostrava-yellow">zábavy</span> v <span className="text-ostrava-cyan">Ostravě</span><span className="text-ostrava-red">!!!</span>
          </Trans>
        </motion.h1>

        <motion.p
          className="text-white/70 text-lg md:text-xl mb-10 font-body max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Button variant="cta" size="lg" href={localePath('events')}>
            {t('hero.cta')}
          </Button>
          <Button variant="ghost" size="lg" href={localePath('contact')}>
            {t('hero.contact')}
          </Button>
        </motion.div>
      </div>

      {/* Bottom wave transition to white */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 70 1440 60V100H0V40Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
