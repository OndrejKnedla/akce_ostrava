import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'cta';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  href?: string;
  external?: boolean;
}

export function Button({ variant = 'primary', size = 'md', children, className, href, external, ...props }: ButtonProps) {
  const base = 'relative inline-flex items-center justify-center font-heading uppercase tracking-wider rounded-lg transition-all duration-300 overflow-hidden focus-visible:outline-2 focus-visible:outline-ostrava-cyan focus-visible:outline-offset-2';

  const variants = {
    primary: 'bg-gradient-to-r from-ostrava-cyan to-ostrava-blue text-white hover:shadow-[0_0_30px_rgba(0,175,210,0.5)]',
    ghost: 'border-2 border-ostrava-cyan text-ostrava-cyan hover:bg-ostrava-cyan/10 hover:shadow-[0_0_20px_rgba(0,175,210,0.2)]',
    cta: 'bg-ostrava-red text-white hover:shadow-[0_0_40px_rgba(217,0,68,0.4)] hover:brightness-110',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
