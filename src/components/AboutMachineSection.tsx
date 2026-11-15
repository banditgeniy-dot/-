import { useState, type MouseEvent } from 'react';
import { Eraser, Layers, Sparkles } from 'lucide-react';
import { STUDIO_MEDIA } from '../data/studioData';

interface AboutMachineSectionProps {
  inkShots: number;
  keepStains: boolean;
  onToggleKeepStains: () => void;
  onClearInk: () => void;
  onFireInk: (x: number, y: number, intensity?: number) => void;
}

export function AboutMachineSection({
  inkShots,
  keepStains,
  onToggleKeepStains,
  onClearInk,
  onFireInk,
}: AboutMachineSectionProps) {
  const [buzzing, setBuzzing] = useState(false);

  const handleMachineTrigger = (e: MouseEvent<HTMLElement>) => {
    setBuzzing(true);
    setTimeout(() => setBuzzing(false), 240);
    onFireInk(e.clientX, e.clientY, 76);
  };

  return (
    <section id="about" className="cv-auto border-t border-white/10 bg-[#0a0a0a] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Studio Manifesto & Craft Metrics */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-xs font-medium tracking-widest text-[#dc2626] uppercase">
                01. Ателье и инструмент
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white [text-wrap:balance]">
                Создано навсегда. Нанесено без компромиссов.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
                Основанная в Нью-Йорке студия OMG работает как закрытое архитектурное ателье, а не
                поточный салон. Каждый сеанс проходит один на один в изолированном кабинете,
                соединяя академическую светотень с точной калибровкой роторного оборудования под
                плотность вашей кожи.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
                Нажмите на тату-машинку Mast Flip Pro справа, чтобы проверить физику разлёта
                чернил: каждое нажатие выбрасывает брызги чёрного обсидиана, титановых белил и
                алого пигмента во все стороны.
              </p>
            </div>

            {/* Clean Architectural Specs Row */}
            <div className="mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
              <div>
                <p className="font-mono text-2xl font-medium tabular-nums text-white">2.6–4.0 мм</p>
                <p className="mt-1 text-xs text-zinc-400">Регулируемый ход иглы</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-medium tabular-nums text-white">0.25 мм</p>
                <p className="mt-1 text-xs text-zinc-400">Точность тонкого контура</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-medium tabular-nums text-[#dc2626]">
                  {inkShots}
                </p>
                <p className="mt-1 text-xs text-zinc-400">Выбросов чернил</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Tattoo Machine Card */}
          <div className="flex flex-col lg:col-span-6">
            <div
              role="button"
              tabIndex={0}
              data-cursor="Чернила"
              aria-label="Интерактивная тату-машинка Mast Flip Pro. Нажмите, чтобы выбросить чернила в разные стороны."
              onClick={handleMachineTrigger}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const rect = e.currentTarget.getBoundingClientRect();
                  setBuzzing(true);
                  setTimeout(() => setBuzzing(false), 240);
                  onFireInk(rect.left + rect.width * 0.25, rect.top + rect.height * 0.85, 76);
                }
              }}
              className={`group relative flex-1 min-h-[380px] overflow-hidden border border-white/15 bg-[#121212] cursor-pointer transition-colors duration-200 hover:border-[#dc2626]/70 focus-visible:outline-2 focus-visible:outline-[#dc2626] ${
                buzzing ? 'animate-machine-buzz border-[#dc2626]' : ''
              }`}
            >
              <img
                src={STUDIO_MEDIA.tattooMachine}
                alt="Роторная тату-машинка Mast Flip Pro в чёрных перчатках с фиолетовым картриджем"
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-full w-full scale-110 object-cover object-[65%_35%] transition-transform duration-500 group-hover:scale-[1.13]"
              />
              {/* Dark vignette & editorial scrim */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-black/20 to-[#0a0a0a]/45"
              />

              {/* Subtle violet/crimson spark indicator near needle tip */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute bottom-14 left-12 h-14 w-14 rounded-full bg-[#dc2626]/30 blur-xl transition-opacity duration-200 ${
                  buzzing ? 'opacity-100 scale-150' : 'opacity-40 group-hover:opacity-80'
                }`}
              />

              {/* Bottom Caption Inside Frame */}
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6">
                <div>
                  <p className="text-xs font-medium text-[#dc2626]">
                    Интерактивный инструмент · Нажми для брызг
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold text-white">
                    Mast Flip Pro — Калиброванная система
                  </h3>
                </div>
                <span className="inline-flex items-center gap-2 border border-white/25 bg-[#0a0a0a]/85 px-4 py-2 text-xs font-semibold text-white backdrop-blur-xs transition-colors group-hover:border-[#dc2626] group-hover:bg-[#dc2626]">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Выбросить чернила</span>
                </span>
              </div>
            </div>

            {/* Canvas Ink Controls */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-white/10 bg-[#121212] px-4 py-3">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span>Следы чернил</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-zinc-300">
                  {keepStains ? 'Остаются на экране' : 'Растворяются'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onToggleKeepStains}
                  className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    keepStains
                      ? 'border-[#dc2626] bg-[#dc2626]/15 text-white'
                      : 'border-white/15 bg-transparent text-zinc-300 hover:border-white/35 hover:text-white'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{keepStains ? 'Следы: Вкл' : 'Следы: Выкл'}</span>
                </button>
                <button
                  type="button"
                  onClick={onClearInk}
                  className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/40 hover:text-white whitespace-nowrap cursor-pointer"
                >
                  <Eraser className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Очистить</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
