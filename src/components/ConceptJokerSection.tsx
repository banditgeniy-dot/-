import { useState } from 'react';
import { JOKER_PILLARS, STUDIO_MEDIA } from '../data/studioData';

export function ConceptJokerSection() {
  const [activePillarId, setActivePillarId] = useState<string>(JOKER_PILLARS[0].id);

  const activePillar =
    JOKER_PILLARS.find((p) => p.id === activePillarId) ?? JOKER_PILLARS[0];

  return (
    <section
      id="concept"
      className="border-t border-white/10 bg-[#111111] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Powerful Tagline & Interactive Philosophy Cards */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-xs font-medium tracking-widest text-[#dc2626] uppercase">
                03. Философия тёмного искусства
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,4vw,3.75rem)] font-extrabold leading-[1.03] tracking-tight text-white [text-wrap:balance]">
                Даже шрамы Джокера — это наши татуировки.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
                Мы отвергаем стерильные шаблоны. Настоящая вечность рождается там, где
                психологическое напряжение встречается с хирургическим контролем — превращая
                несовершенства, шрамы и жёсткую геометрию в искусство на коже.
              </p>
            </div>

            {/* 3 Interactive Philosophy Cards */}
            <div className="mt-10 space-y-3">
              {JOKER_PILLARS.map((pillar) => {
                const isSelected = pillar.id === activePillarId;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActivePillarId(pillar.id)}
                    onMouseEnter={() => setActivePillarId(pillar.id)}
                    className={`w-full border p-5 text-left transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#dc2626] ${
                      isSelected
                        ? 'border-white bg-white text-[#0a0a0a]'
                        : 'border-white/10 bg-[#0a0a0a] text-white hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-lg font-bold tracking-tight">
                        <span
                          className={`mr-2.5 font-mono text-xs tabular-nums ${
                            isSelected ? 'text-[#dc2626]' : 'text-zinc-500'
                          }`}
                        >
                          {pillar.index}.
                        </span>
                        {pillar.title}
                      </h3>
                      <span
                        className={`text-xs font-medium ${
                          isSelected ? 'text-zinc-600' : 'text-zinc-500'
                        }`}
                      >
                        {pillar.calloutLabel}
                      </span>
                    </div>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        isSelected ? 'text-zinc-700' : 'text-zinc-400'
                      }`}
                    >
                      {pillar.summary}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Cinematic Joker Portrait with Interactive Anatomical Callout Pins */}
          <div className="relative flex flex-col lg:col-span-6">
            <div className="relative flex-1 min-h-[520px] overflow-hidden border border-white/15 bg-[#0a0a0a]">
              <img
                src={STUDIO_MEDIA.jokerConcept}
                alt="Высококонтрастный монохромный портрет в духе Джокера с интегрированной татуировкой вдоль шрамов на щеке и шее"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30"
              />

              {/* Interactive Target Callout Markers */}
              {JOKER_PILLARS.map((pillar) => {
                const isSelected = pillar.id === activePillarId;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    aria-label={`Изучить принцип: ${pillar.calloutLabel}`}
                    onClick={() => setActivePillarId(pillar.id)}
                    style={{
                      top: pillar.pinPosition.top,
                      left: pillar.pinPosition.left,
                    }}
                    className={`group absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2.5 cursor-pointer transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-[#dc2626] ${
                      isSelected ? 'z-20 scale-105' : 'z-10 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        isSelected
                          ? 'border-[#dc2626] bg-[#dc2626]/30'
                          : 'border-white/50 bg-black/70'
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isSelected ? 'bg-[#dc2626]' : 'bg-white'
                        }`}
                      />
                    </span>

                    <span
                      className={`border px-3 py-1.5 text-left backdrop-blur-md transition-colors ${
                        isSelected
                          ? 'border-white/40 bg-[#0a0a0a]/90 text-white'
                          : 'border-white/15 bg-black/70 text-zinc-300'
                      }`}
                    >
                      <span className="block text-[11px] font-semibold whitespace-nowrap">
                        {pillar.calloutLabel}
                      </span>
                    </span>
                  </button>
                );
              })}

              {/* Bottom Active Pillar Technical Readout */}
              <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#0a0a0a]/90 p-6 backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
                  <span className="font-medium text-[#dc2626]">
                    {activePillar.index}. {activePillar.title}
                  </span>
                  <span className="font-mono text-zinc-400">{activePillar.calloutDetail}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-200">{activePillar.technicalNote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
