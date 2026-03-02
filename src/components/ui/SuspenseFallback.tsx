import { motion } from 'framer-motion';

export function SuspenseFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="flex gap-2 text-5xl font-heading text-ostrava-cyan">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          >
            !
          </motion.span>
        ))}
      </div>
    </div>
  );
}
