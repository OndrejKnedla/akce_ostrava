import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const stats = [
  { target: 50000, suffix: '+', label: 'Návštěvníků', sublabel: 'ročně' },
  { target: 100, suffix: '+', label: 'Akcí', sublabel: 'uspořádáno' },
  { target: 30, suffix: '+', label: 'Umělců', sublabel: 'mezinárodních' },
  { target: 10, suffix: '+', label: 'Zkušeností', sublabel: 'let na scéně' },
];

export function StatsSection() {
  return (
    <section className="relative py-16 md:py-24 bg-ostrava-ice overflow-hidden">
      {/* Watermark !!! */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-heading text-[300px] md:text-[500px] text-ostrava-blue/[0.04] rotate-[15deg] leading-none">
          !!!
        </span>
      </div>

      <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8 relative">
        <motion.h2
          className="font-heading text-3xl md:text-4xl uppercase text-center text-ostrava-blue mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ostrava žije<span className="text-ostrava-cyan">!!!</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <AnimatedCounter {...stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
