import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  onView?: boolean;
}

export function SplitText({ text, className, delay = 0, onView = false }: SplitTextProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 200 },
    },
  };

  const animProps = onView
    ? { initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-50px' } }
    : { initial: 'hidden', animate: 'visible' };

  return (
    <motion.span className={cn('inline-block', className)} variants={container} {...animProps} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={child} className="inline-block" aria-hidden="true">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
