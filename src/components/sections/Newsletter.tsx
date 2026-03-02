import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      addToast('Zadejte platný e-mail', 'info');
      return;
    }
    addToast('Díky za přihlášení!!!');
    setEmail('');
  };

  return (
    <section id="newsletter" className="relative py-16 md:py-24 bg-ostrava-blue overflow-hidden">
      {/* Floating dots */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-ostrava-cyan/20 animate-float"
          style={{
            width: 2 + Math.random() * 4,
            height: 2 + Math.random() * 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}

      <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8 relative text-center">
        <motion.h2
          className="font-heading text-3xl md:text-4xl uppercase text-white mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Buďte první<span className="text-ostrava-cyan">!!!</span>
        </motion.h2>

        <motion.p
          className="text-white/60 text-lg mb-8 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Buďte první, kdo se dozví o nových akcích. Odběratelé získávají vstupenky o 48 hodin dříve.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Váš e-mail"
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-5 py-3 text-white placeholder:text-white/40 focus:border-ostrava-cyan focus:outline-none focus:shadow-[0_0_15px_rgba(0,175,210,0.2)] transition-all"
            required
          />
          <Button type="submit" variant="primary" size="md">
            Přihlásit se!!!
          </Button>
        </motion.form>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/50">
          <span className="border border-white/20 rounded-full px-3 py-1">Exkluzivní předprodej</span>
          <span className="border border-white/20 rounded-full px-3 py-1">Slevy</span>
          <span className="border border-white/20 rounded-full px-3 py-1">Insider info</span>
        </div>
      </div>
    </section>
  );
}
