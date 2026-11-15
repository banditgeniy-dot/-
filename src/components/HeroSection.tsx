import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GALLERY_WORKS, STUDIO_MEDIA } from '../data/studioData';

interface HeroSectionProps {
  onMachineClick: (x: number, y: number) => void;
}

export function HeroSection({ onMachineClick }: HeroSectionProps) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    let rafId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        setParallax({ x: nx, y: ny });
        rafId = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
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
            className="w-fit py-0.5 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#dc2626]"
          >
            Instagram — @omg.atelier
          </a>
          <a
            href="#concept"
            className="w-fit py-0.5 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#dc2626]"
          >
            Видеоархив студии
          </a>
          <a
            href="tel:+12125550194"
            className="w-fit py-0.5 font-mono tabular-nums text-zinc-300 transition-colors hover:text-[#dc2626]"
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

      {/* Center 3D Depth Stage: Pre-cutout translucent person with OMG shining through */}
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
            <img
              src={STUDIO_MEDIA.heroBack}
              alt="Детализированная татуировка на спине в стиле классической скульптуры и тёмного сюрреализма в студии OMG"
              width={640}
              height={853}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-full w-full object-cover object-top opacity-70 contrast-110"
            />
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
              width={36}
              height={36}
              decoding="async"
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
                  width={40}
                  height={40}
                  decoding="async"
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
