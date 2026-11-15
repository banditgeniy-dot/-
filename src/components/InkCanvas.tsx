import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export interface InkCanvasHandle {
  sprayInk: (originX: number, originY: number, intensity?: number) => void;
  clearInk: () => void;
}

interface InkDroplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  highlightColor?: string;
  alpha: number;
  decay: number;
  drag: number;
  gravity: number;
  dripSpeed: number;
  dripLength: number;
  maxDrip: number;
  settled: boolean;
  settleTime: number;
  lobes: { angle: number; dist: number; size: number }[];
  streak: boolean;
}

interface InkCanvasProps {
  keepStains: boolean;
}

const INK_PALETTE = [
  { fill: '#f5f5f5', weight: 0.24 }, // Titanium white ink
  { fill: '#dc2626', weight: 0.30 }, // Crimson accent ink
  { fill: '#111111', highlight: 'rgba(255,255,255,0.34)', weight: 0.34 }, // Glossy obsidian black ink
  { fill: '#7c3aed', weight: 0.12 }, // Purple needle cartridge spark
];

function pickInkColor() {
  const r = Math.random();
  let acc = 0;
  for (const item of INK_PALETTE) {
    acc += item.weight;
    if (r <= acc) return item;
  }
  return INK_PALETTE[0];
}

export const InkCanvas = forwardRef<InkCanvasHandle, InkCanvasProps>(function InkCanvas(
  { keepStains },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dropletsRef = useRef<InkDroplet[]>([]);
  const keepStainsRef = useRef(keepStains);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    keepStainsRef.current = keepStains;
  }, [keepStains]);

  useImperativeHandle(ref, () => ({
    sprayInk(originX: number, originY: number, intensity = 68) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const count = reducedMotion ? 22 : intensity;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.45;
        const speed = reducedMotion
          ? 2 + Math.random() * 5
          : 4 + Math.pow(Math.random(), 0.7) * 24;
        const colorSpec = pickInkColor();
        const isBigSplatter = Math.random() < 0.22;
        const radius = isBigSplatter ? 5 + Math.random() * 10 : 1.5 + Math.random() * 4.5;

        const lobeCount = isBigSplatter ? 4 + Math.floor(Math.random() * 4) : 1 + Math.floor(Math.random() * 2);
        const lobes = Array.from({ length: lobeCount }, () => ({
          angle: Math.random() * Math.PI * 2,
          dist: radius * (0.7 + Math.random() * 1.15),
          size: radius * (0.28 + Math.random() * 0.45),
        }));

        dropletsRef.current.push({
          x: originX + (Math.random() - 0.5) * 14,
          y: originY + (Math.random() - 0.5) * 14,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (Math.random() * 2.5),
          radius,
          color: colorSpec.fill,
          highlightColor: colorSpec.highlight,
          alpha: 0.96,
          decay: 0.0065 + Math.random() * 0.007,
          drag: 0.91 + Math.random() * 0.045,
          gravity: 0.16 + Math.random() * 0.12,
          dripSpeed: isBigSplatter ? 0.18 + Math.random() * 0.35 : 0,
          dripLength: 0,
          maxDrip: isBigSplatter ? 14 + Math.random() * 34 : 0,
          settled: false,
          settleTime: 0,
          lobes,
          streak: Math.random() < 0.45,
        });
      }

      // Cap total active particles to prevent runaway memory if spammed rapidly
      if (dropletsRef.current.length > 520) {
        dropletsRef.current.splice(0, dropletsRef.current.length - 520);
      }
    },
    clearInk() {
      dropletsRef.current = [];
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const droplets = dropletsRef.current;
      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];

        if (!d.settled) {
          const prevX = d.x;
          const prevY = d.y;
          d.x += d.vx;
          d.y += d.vy;
          d.vx *= d.drag;
          d.vy = d.vy * d.drag + d.gravity * 0.45;

          const speedSq = d.vx * d.vx + d.vy * d.vy;
          if (speedSq < 0.45) {
            d.settled = true;
          }

          if (d.streak && speedSq > 4) {
            ctx.save();
            ctx.globalAlpha = d.alpha * 0.75;
            ctx.strokeStyle = d.highlightColor || d.color;
            ctx.lineWidth = Math.max(1, d.radius * 0.55);
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(d.x, d.y);
            ctx.stroke();
            ctx.restore();
          }
        } else {
          d.settleTime += 1;
          if (d.dripLength < d.maxDrip) {
            d.dripLength += d.dripSpeed;
          }
          if (!keepStainsRef.current && d.settleTime > 42) {
            d.alpha -= d.decay;
          }
        }

        if (d.alpha <= 0.02) {
          droplets.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, d.alpha);

        // Main ink droplet
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();

        // Glossy rim for dark obsidian drops against #0a0a0a canvas
        if (d.highlightColor) {
          ctx.strokeStyle = d.highlightColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Organic satellite splatter lobes
        for (const lobe of d.lobes) {
          const lx = d.x + Math.cos(lobe.angle) * lobe.dist;
          const ly = d.y + Math.sin(lobe.angle) * lobe.dist;
          ctx.beginPath();
          ctx.arc(lx, ly, lobe.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Viscous drip trail once landed
        if (d.dripLength > 1) {
          ctx.beginPath();
          ctx.moveTo(d.x - d.radius * 0.28, d.y);
          ctx.lineTo(d.x + d.radius * 0.28, d.y);
          ctx.lineTo(d.x + d.radius * 0.14, d.y + d.dripLength);
          ctx.arc(d.x, d.y + d.dripLength, d.radius * 0.18, 0, Math.PI);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70]"
    />
  );
});
