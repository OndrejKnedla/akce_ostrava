import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function CustomCursor() {
  const isHover = useMediaQuery('(hover: hover)');
  const reduced = useReducedMotion();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isHover || reduced) return;

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, select, textarea, [data-interactive]');
      setIsInteractive(!!interactive);
    };

    let raf: number;
    const animate = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isHover, reduced]);

  if (!isHover || reduced) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ willChange: 'transform' }}
    >
      <div
        className="rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
        style={{
          width: isInteractive ? 40 : 8,
          height: isInteractive ? 40 : 8,
          backgroundColor: isInteractive ? 'transparent' : '#00AFD2',
          border: isInteractive ? '2px solid #00AFD2' : 'none',
          mixBlendMode: isInteractive ? 'difference' : 'normal',
        }}
      />
    </div>
  );
}
