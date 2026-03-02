import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/utils/cn';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  label: string;
  sublabel: string;
  className?: string;
}

export function AnimatedCounter({ target, suffix = '', label, sublabel, className }: AnimatedCounterProps) {
  const { count, ref } = useCountUp(target, 2000, true);

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div className="font-mono text-5xl md:text-6xl font-bold text-ostrava-cyan mb-2">
        {count.toLocaleString('cs-CZ')}{suffix}
      </div>
      <div className="font-heading text-lg uppercase tracking-wider text-ostrava-blue">{label}</div>
      <div className="text-sm text-ostrava-blue/50 mt-1">{sublabel}</div>
    </div>
  );
}
