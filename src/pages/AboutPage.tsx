import { SeoHead } from '@/seo/SeoHead';
import { motion } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { StatsSection } from '@/components/sections/StatsSection';
import { OstravaSkyline } from '@/components/svg/OstravaSkyline';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/layout/PageTransition';
import { useLocale } from '@/i18n/useLocale';

export default function AboutPage() {
  const { t, localePath } = useLocale();

  const timeline = [
    { year: '2016', title: t('about.t2016'), desc: t('about.t2016d') },
    { year: '2018', title: t('about.t2018'), desc: t('about.t2018d') },
    { year: '2020', title: t('about.t2020'), desc: t('about.t2020d') },
    { year: '2022', title: t('about.t2022'), desc: t('about.t2022d') },
    { year: '2024', title: t('about.t2024'), desc: t('about.t2024d') },
    { year: '2026', title: t('about.t2026'), desc: t('about.t2026d') },
  ];

  const team = [
    { name: t('about.member1'), role: t('about.role1'), bio: t('about.bio1') },
    { name: t('about.member2'), role: t('about.role2'), bio: t('about.bio2') },
    { name: t('about.member3'), role: t('about.role3'), bio: t('about.bio3') },
  ];

  return (
    <PageTransition>
      <SeoHead
        title={t('about.seoTitle')}
        description={t('about.seoDesc')}
        canonical="https://akceostrava.cz/o-nas"
      />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-ostrava-blue to-ostrava-blue/80 text-center relative overflow-hidden">
        <OstravaSkyline className="absolute bottom-0 left-0 right-0 text-white/5" />
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase text-white relative z-10">
          <SplitText text={t('about.title')} />
          <span className="text-ostrava-cyan">!!!</span>
        </h1>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <motion.p
              className="text-ostrava-blue/70 text-lg leading-relaxed border-l-4 border-ostrava-red pl-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {t('about.story1')}
            </motion.p>
            <motion.p
              className="text-ostrava-blue/70 text-lg leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t('about.story2')}
              <span className="text-ostrava-red font-heading">{t('about.ostravaLives')}</span>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-ostrava-ice">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="font-heading text-3xl md:text-4xl uppercase text-ostrava-blue mb-12 text-center">
            {t('about.timeline')}<span className="text-ostrava-red">!!!</span>
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-ostrava-blue/15" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="md:w-1/2 md:text-right pl-16 md:pl-0">
                    {i % 2 === 0 && (
                      <div className="md:pr-8">
                        <span className="font-mono text-3xl font-bold text-ostrava-red">{item.year}</span>
                        <h3 className="font-heading text-lg uppercase text-ostrava-blue mt-1">{item.title}</h3>
                        <p className="text-ostrava-blue/50 text-sm mt-1">{item.desc}</p>
                      </div>
                    )}
                  </div>

                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-ostrava-cyan border-4 border-ostrava-ice z-10" />

                  <div className="md:w-1/2 pl-16 md:pl-8">
                    {i % 2 !== 0 && (
                      <div>
                        <span className="font-mono text-3xl font-bold text-ostrava-red">{item.year}</span>
                        <h3 className="font-heading text-lg uppercase text-ostrava-blue mt-1">{item.title}</h3>
                        <p className="text-ostrava-blue/50 text-sm mt-1">{item.desc}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="font-heading text-3xl md:text-4xl uppercase text-ostrava-blue mb-12 text-center">{t('about.team')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="glass p-6 text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="w-24 h-24 rounded-full bg-ostrava-blue/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="font-heading text-2xl text-ostrava-blue">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-heading text-lg uppercase text-ostrava-blue">{member.name}</h3>
                <p className="text-ostrava-cyan text-sm mb-2">{member.role}</p>
                <p className="text-ostrava-blue/50 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-ostrava-blue to-ostrava-blue/90 text-center">
        <div className="max-w-content mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl uppercase text-white mb-6">
            {t('about.cooperate')}<span className="text-ostrava-cyan">!!!</span>
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            {t('about.cooperateDesc')}
          </p>
          <Button variant="cta" size="lg" href={localePath('contact')}>
            {t('about.contactUs')}
          </Button>
        </div>
      </section>
    </PageTransition>
  );
}
