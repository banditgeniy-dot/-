import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GALLERY_WORKS, STUDIO_MEDIA } from '../data/studioData';

interface HeroSectionProps {
  onMachineClick: (x: number, y: number) => void;
}

function useTransparentSubject(src: string): string | null {
  const [cutoutUrl, setCutoutUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (cancelled) return;
      const maxDim = 960;
      const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.max(1, Math.round(img.naturalWidth * scale));
      const h = Math.max(1, Math.round(img.naturalHeight * scale));

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, w, h);
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;
      const total = w * h;

      // Edge-connected flood fill to isolate outer dark studio backdrop without erasing dark tattoo ink
      const isBg = new Uint8Array(total);
      const queue = new Int32Array(total);
      let head = 0;
      let tail = 0;

      const DARK_THRESHOLD = 38;
      const isDarkPixel = (idx: number) => {
        const p = idx * 4;
        const maxCh = Math.max(data[p], data[p + 1], data[p + 2]);
        return maxCh <= DARK_THRESHOLD;
      };

      const enqueue = (idx: number) => {
        if (isBg[idx]) return;
        if (!isDarkPixel(idx)) return;
        isBg[idx] = 1;
        queue[tail++] = idx;
      };

      for (let x = 0; x < w; x++) {
        enqueue(x);
        enqueue((h - 1) * w + x);
      }
      for (let y = 0; y < h; y++) {
        enqueue(y * w);
        enqueue(y * w + (w - 1));
      }

      while (head < tail) {
        const idx = queue[head++];
        const x = idx % w;
        const y = (idx - x) / w;

        if (x > 0) enqueue(idx - 1);
        if (x < w - 1) enqueue(idx + 1);
        if (y > 0) enqueue(idx - w);
        if (y < h - 1) enqueue(idx + w);
      }

      // Compute soft 2px edge feathering on boundary pixels adjacent to background
      const alphaMap = new Float32Array(total);
      for (let i = 0; i < total; i++) {
        alphaMap[i] = isBg[i] ? 0 : 1;
      }

      for (let pass = 0; pass < 2; pass++) {
        const nextAlpha = new Float32Array(alphaMap);
        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const idx = y * w + x;
            if (isBg[idx]) continue;
            const neighborMin = Math.min(
              alphaMap[idx - 1],
              alphaMap[idx + 1],
              alphaMap[idx - w],
              alphaMap[idx + w]
            );
            if (neighborMin < 1) {
              const p = idx * 4;
              const lum = Math.max(data[p], data[p + 1], data[p + 2]);
              // Smoothly blend dark edge fringe out to avoid jagged black halos
              const edgeFactor = lum < 48 ? lum / 48 : 0.72;
              nextAlpha[idx] = Math.min(alphaMap[idx], neighborMin * 0.4 + edgeFactor * 0.55);
            }
          }
        }
        alphaMap.set(nextAlpha);
      }

      for (let i = 0; i < total; i++) {
        data[i * 4 + 3] = Math.round(data[i * 4 + 3] * alphaMap[i]);
      }

      ctx.putImageData(imageData, 0, 0);
      canvas.toBlob((blob) => {
        if (cancelled || !blob) return;
        objectUrl = URL.createObjectURL(blob);
        setCutoutUrl(objectUrl);
      }, 'image/png');
    };

    img.src = src;

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  return cutoutUrl;
}

export function HeroSection({ onMachineClick }: HeroSectionProps) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const transparentSubjectUrl = useTransparentSubject(STUDIO_MEDIA.heroBack);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setParallax({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const previewWorks = GALLERY_WORKS.slice(0, 2);

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-between overflow-hidden bg-[#0a0a0a] px-6 pt-8 pb-8 lg:px-12 lg:pt-12 lg:pb-10"
    >
      {/* Top Editorial Row */}
      <div className="relative z-30 mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-8 md:flex-row md:items-start">
        {/* Left: Direct Studio Channels */}
        <div className="flex flex-col gap-1.5 text-xs font-medium tracking-wider text-zinc-400">
          <a
            href="#gallery"
            className="w-fit transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#dc2626]"
          >
            Instagram — @omg.atelier
          </a>
          <a
            href="#concept"
            className="w-fit transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#dc2626]"
          >
            Видеоархив студии
          </a>
          <a
            href="tel:+12125550194"
            className="w-fit font-mono tabular-nums text-zinc-300 transition-colors hover:text-[#dc2626]"
          >
            +1 (212) 555-0194
          </a>
        </div>

        {/* Right: Hero Hook & Thesis */}
        <div className="max-w-md md:text-right">
          <h1 className="font-display text-[clamp(1.75rem,3vw,2.65rem)] font-bold leading-[1.1] tracking-tight text-white [text-wrap:balance]">
            Там, где хаос становится вечным искусством.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Каждая линия несёт вечность. Закрытая нью-йоркская тату-студия: гиперреализм
            Black &amp; Grey, тёмный сюрреализм и безупречная интеграция шрамов.
          </p>
        </div>
      </div>

      {/* Center 3D Depth Stage: Alpha-isolated translucent person with OMG shining through */}
      <div className="relative mx-auto my-4 flex w-full max-w-[1440px] flex-1 items-center justify-center py-4 lg:my-0">
        {/* Layer 1 (z-10): Massive crisp white OMG display typography */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative z-10 flex w-full select-none items-center justify-center"
          style={{
            transform: `translate3d(${parallax.x * -14}px, ${parallax.y * -10}px, 0)`,
            transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span className="font-display text-[clamp(7.25rem,27vw,25rem)] font-extrabold leading-[0.82] tracking-[-0.06em] text-white">
            OMG
          </span>
        </div>

        {/* Layer 2 (z-20): Borderless translucent cutout subject over OMG */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[-2rem] top-[-1rem] z-20 flex items-end justify-center lg:bottom-[-2.5rem]"
          style={{
            transform: `translate3d(${parallax.x * 18}px, ${parallax.y * 12}px, 0)`,
            transition: 'transform 160ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            className="relative h-full max-h-[620px] w-full max-w-[465px] lg:max-h-[690px] lg:max-w-[520px]"
            style={{
              WebkitMaskImage:
                'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.85) 16%, black 28%)',
              maskImage:
                'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.85) 16%, black 28%)',
            }}
          >
            {transparentSubjectUrl ? (
              <img
                src={transparentSubjectUrl}
                alt="Детализированная татуировка на спине в стиле классической скульптуры и тёмного сюрреализма в студии OMG"
                className="h-full w-full object-cover object-top opacity-70 contrast-110"
              />
            ) : (
              <img
                src={STUDIO_MEDIA.heroBack}
                alt="Детализированная татуировка на спине в стиле классической скульптуры и тёмного сюрреализма в студии OMG"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-top opacity-70 mix-blend-lighten brightness-95 contrast-125"
                style={{
                  WebkitMaskImage:
                    'radial-gradient(ellipse 68% 82% at 50% 54%, black 48%, transparent 95%)',
                  maskImage:
                    'radial-gradient(ellipse 68% 82% at 50% 54%, black 48%, transparent 95%)',
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Studio Location, Quick Stats & See Work Preview */}
      <div className="relative z-30 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-end gap-6 border-t border-white/10 pt-6 md:grid-cols-12">
        {/* Location Tag */}
        <div className="md:col-span-3">
          <p className="text-xs font-medium tracking-wide text-zinc-400">
            Нью-Йорк · Ателье в Сохо
          </p>
          <p className="mt-1 text-sm font-medium text-white">
            142 Mercer St · Приём только по записи
          </p>
        </div>

        {/* Studio Metrics (Tabular Numerals) */}
        <div className="grid grid-cols-3 gap-6 md:col-span-6 md:px-4">
          <div>
            <p className="font-mono text-xl font-medium tabular-nums text-white lg:text-2xl">14+</p>
            <p className="mt-0.5 text-xs text-zinc-400">Лет мастерства</p>
          </div>
          <div>
            <p className="font-mono text-xl font-medium tabular-nums text-white lg:text-2xl">
              4 800+
            </p>
            <p className="mt-0.5 text-xs text-zinc-400">Авторских работ</p>
          </div>
          <div>
            <p className="font-mono text-xl font-medium tabular-nums text-white lg:text-2xl">
              100%
            </p>
            <p className="mt-0.5 text-xs text-zinc-400">Стерильность класса A</p>
          </div>
        </div>

        {/* Right: Quick Interactive Machine Trigger + See Work Thumbnails */}
        <div className="flex items-center justify-between gap-4 md:col-span-3 md:justify-end">
          <button
            type="button"
            data-cursor="Чернила"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              onMachineClick(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }}
            className="group flex items-center gap-2.5 border border-white/15 bg-[#121212] px-3 py-2 text-left transition-colors hover:border-[#dc2626] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#dc2626]"
          >
            <img
              src={STUDIO_MEDIA.tattooMachine}
              alt="Тату-машинка OMG — нажмите для брызг чернил"
              className="h-9 w-9 object-cover contrast-115"
            />
            <div>
              <span className="block text-xs font-semibold text-white">Тест чернил</span>
              <span className="block text-[11px] text-zinc-400 group-hover:text-[#dc2626]">
                Нажми сюда
              </span>
            </div>
          </button>

          <a
            href="#gallery"
            data-cursor="Смотреть"
            className="group flex items-center gap-3 border border-white/15 bg-[#121212] p-1.5 pr-3 transition-colors hover:border-white/40 focus-visible:outline-2 focus-visible:outline-[#dc2626]"
          >
            <div className="flex -space-x-2 overflow-hidden">
              {previewWorks.map((work) => (
                <img
                  key={work.id}
                  src={work.image}
                  alt={work.title}
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 border border-[#0a0a0a] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ))}
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-white whitespace-nowrap">
              <span>Работы</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
