import { motion } from 'framer-motion';
import { Music, Landmark, Flame } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { OstravaSkyline } from '@/components/svg/OstravaSkyline';
import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/useLocale';

export function AboutMini() {
  const { t, localePath } = useLocale();

  const features = [
    { icon: Music, title: t('aboutMini.worldArtists'), desc: t('aboutMini.worldArtistsDesc') },
    { icon: Landmark, title: t('aboutMini.iconicVenues'), desc: t('aboutMini.iconicVenuesDesc') },
    { icon: Flame, title: t('aboutMini.unforgettable'), desc: t('aboutMini.unforgettableDesc') },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-ostrava-ice overflow-hidden">
      <OstravaSkyline className="absolute bottom-0 right-0 w-1/2 text-ostrava-blue/5" />

      <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8 relative">
        <motion.h2
          className="font-heading text-3xl md:text-4xl uppercase text-dark mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('aboutMini.title')}<span className="text-ostrava-cyan">!!!</span>
        </motion.h2>

        <motion.p
          className="text-ostrava-blue/70 text-lg text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {t('aboutMini.description')}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((f, i) => (
            <GlassCard
              key={f.title}
              className="p-6 text-center !bg-white/60 !border-ostrava-blue/10 hover:!border-ostrava-cyan/30"
              tilt
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <f.icon className="w-10 h-10 text-ostrava-cyan mx-auto mb-4" />
                <h3 className="font-heading text-lg uppercase text-dark mb-2">{f.title}</h3>
                <p className="text-ostrava-blue/60 text-sm">{f.desc}</p>
              </motion.div>
            </GlassCard>
          ))}
        </div>

        <div className="text-center">
          <Link to={localePath('about')} className="text-ostrava-cyan font-heading uppercase text-sm tracking-wider hover:underline">
            {t('aboutMini.moreAbout')}
          </Link>
        </div>
      </div>
    </section>
  );
}
