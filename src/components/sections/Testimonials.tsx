import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-16 md:py-24 bg-ostrava-ice">
      <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
        <motion.h2
          className="font-heading text-3xl md:text-4xl uppercase text-dark mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Co říkají návštěvníci
        </motion.h2>

        <div
          className="relative max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="glass !bg-white/60 !border-ostrava-blue/10 p-8 text-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-ostrava-cyan/20 text-6xl font-heading leading-none mb-4">!!!</div>
              <p className="text-ostrava-blue text-lg italic mb-6 leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < t.rating ? 'text-ostrava-yellow fill-ostrava-yellow' : 'text-ostrava-blue/20'}`}
                  />
                ))}
              </div>
              <p className="font-heading text-sm uppercase text-dark">{t.name}</p>
              <p className="text-ostrava-blue/50 text-xs">{t.event}</p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-ostrava-blue/30 hover:text-ostrava-cyan transition-colors hidden md:block"
            aria-label="Předchozí"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-ostrava-blue/30 hover:text-ostrava-cyan transition-colors hidden md:block"
            aria-label="Další"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-ostrava-cyan w-6' : 'bg-ostrava-blue/20'}`}
                aria-label={`Recenze ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
