import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId: number | null = null;

    const tick = () => {
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * 0.24;
      ringY += dy * 0.24;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    const scheduleTick = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible((prev) => (prev ? prev : true));

      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;
      const interactive = target?.closest('a, button, input, select, textarea');

      const nextLabel = cursorTarget
        ? cursorTarget.getAttribute('data-cursor')
        : interactive
        ? ''
        : null;
      setCursorLabel((prev) => (prev === nextLabel ? prev : nextLabel));

      scheduleTick();
    };

    const onLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  const isExpanded = cursorLabel !== null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[80] -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#dc2626] transition-opacity duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[80] flex items-center justify-center rounded-full border transition-[width,height,margin,border-color,background-color,opacity] duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          cursorLabel
            ? '-ml-9 -mt-9 h-18 w-18 border-white/60 bg-black/75 backdrop-blur-xs'
            : isExpanded
            ? '-ml-6 -mt-6 h-12 w-12 border-[#dc2626]/80 bg-[#dc2626]/10'
            : '-ml-4.5 -mt-4.5 h-9 w-9 border-white/30'
        }`}
      >
        {cursorLabel && (
          <span className="font-mono text-[10px] font-medium tracking-wider text-white uppercase">
            {cursorLabel}
          </span>
        )}
      </div>
    </>
  );
}
