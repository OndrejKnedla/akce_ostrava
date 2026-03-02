import { useState, useEffect } from 'react';
import { getTimeUntil } from '@/utils/formatCzechDate';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownProps {
  targetDate: string;
  targetTime: string;
}

function FlipDigit({ value }: { value: string }) {
  return (
    <div className="relative w-10 h-14 md:w-14 md:h-16 bg-ostrava-ice border border-ostrava-cyan/30 rounded-lg flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          className="font-mono text-xl md:text-2xl font-bold text-ostrava-cyan"
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function Countdown({ targetDate, targetTime }: CountdownProps) {
  const [time, setTime] = useState(() => getTimeUntil(targetDate, targetTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeUntil(targetDate, targetTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, targetTime]);

  const segments = [
    { value: time.days, label: 'dní' },
    { value: time.hours, label: 'hodin' },
    { value: time.minutes, label: 'minut' },
    { value: time.seconds, label: 'sekund' },
  ];

  return (
    <div className="flex items-center justify-center gap-3 md:gap-4">
      {segments.map((seg, i) => (
        <div key={seg.label} className="flex items-center gap-3 md:gap-4">
          <div className="text-center">
            <div className="flex gap-1">
              <FlipDigit value={String(seg.value).padStart(2, '0')[0]} />
              <FlipDigit value={String(seg.value).padStart(2, '0')[1]} />
            </div>
            <span className="text-[10px] md:text-xs text-ostrava-blue/40 mt-1 block uppercase tracking-wider">
              {seg.label}
            </span>
          </div>
          {i < segments.length - 1 && (
            <span className="text-ostrava-cyan/50 font-mono text-xl md:text-2xl font-bold -mt-4">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
