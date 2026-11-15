import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_WORKS, type GalleryWork, type TattooStyle } from '../data/studioData';

interface GallerySectionProps {
  onSelectStyleToBook: (style: string) => void;
}

const FILTER_STYLES: TattooStyle[] = [
  'Все',
  'Black & Grey',
  'Тёмный сюрреализм',
  'Тонкая линия',
  'Мифология',
];

export function GallerySection({ onSelectStyleToBook }: GallerySectionProps) {
  const [activeFilter, setActiveFilter] = useState<TattooStyle>('Все');
  const [selectedWork, setSelectedWork] = useState<GalleryWork | null>(null);

  const filteredWorks =
    activeFilter === 'Все'
      ? GALLERY_WORKS
      : GALLERY_WORKS.filter((work) => work.style === activeFilter);

  useEffect(() => {
    if (!selectedWork) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedWork(null);
      } else if (e.key === 'ArrowRight') {
        const idx = filteredWorks.findIndex((w) => w.id === selectedWork.id);
        if (idx !== -1) {
          setSelectedWork(filteredWorks[(idx + 1) % filteredWorks.length]);
        }
      } else if (e.key === 'ArrowLeft') {
        const idx = filteredWorks.findIndex((w) => w.id === selectedWork.id);
        if (idx !== -1) {
          setSelectedWork(filteredWorks[(idx - 1 + filteredWorks.length) % filteredWorks.length]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedWork, filteredWorks]);

  const navigateLightbox = (dir: 1 | -1) => {
    if (!selectedWork) return;
    const idx = filteredWorks.findIndex((w) => w.id === selectedWork.id);
    if (idx === -1) return;
    const nextIdx = (idx + dir + filteredWorks.length) % filteredWorks.length;
    setSelectedWork(filteredWorks[nextIdx]);
  };

  return (
    <section id="gallery" className="border-t border-white/10 bg-[#0a0a0a] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Section Header + Filter Controls */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-medium tracking-widest text-[#dc2626] uppercase">
              02. Избранные работы
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white [text-wrap:balance]">
              Архив монохромной татуировки и тёмного реализма.
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div
            role="tablist"
            aria-label="Фильтр татуировок по стилю"
            className="flex flex-wrap items-center gap-1.5 border border-white/10 bg-[#121212] p-1"
          >
            {FILTER_STYLES.map((style) => {
              const isActive = activeFilter === style;
              return (
                <button
                  key={style}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(style)}
                  className={`px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#dc2626] ${
                    isActive
                      ? 'bg-white text-[#0a0a0a]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {style}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Editorial Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorks.map((work, index) => {
            const isHeroSpan =
              activeFilter === 'Все' && (index === 0 || index === 3);

            return (
              <article
                key={work.id}
                className={`group relative overflow-hidden border border-white/10 bg-[#121212] ${
                  isHeroSpan ? 'lg:row-span-2 min-h-[460px] lg:min-h-[640px]' : 'min-h-[380px]'
                }`}
              >
                <button
                  type="button"
                  data-cursor="Смотреть"
                  onClick={() => setSelectedWork(work)}
                  className="relative flex h-full w-full flex-col text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#dc2626]"
                >
                  <div className="relative h-full w-full flex-1 overflow-hidden bg-[#141414]">
                    <img
                      src={work.image}
                      alt={`${work.title} — ${work.style}, мастер ${work.artist}`}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95"
                    />
                  </div>

                  {/* Overlay Info */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <span className="font-medium text-[#dc2626]">{work.style}</span>
                      <span aria-hidden="true">·</span>
                      <span>{work.artist}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums text-zinc-400">{work.sessions}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <h3 className="font-display text-xl font-bold text-white lg:text-2xl">
                        {work.title}
                      </h3>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                      />
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedWork && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedWork.title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md md:p-10"
          onClick={() => setSelectedWork(null)}
        >
          <div
            className="relative grid max-h-[90vh] w-full max-w-5xl grid-cols-1 overflow-hidden border border-white/15 bg-[#0f0f0f] md:grid-cols-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Закрыть просмотр работы"
              onClick={() => setSelectedWork(null)}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center border border-white/20 bg-[#0a0a0a]/90 text-white transition-colors hover:border-[#dc2626] hover:bg-[#dc2626] cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Lightbox Image */}
            <div className="relative flex max-h-[55vh] items-center justify-center bg-black md:col-span-7 md:max-h-[85vh]">
              <img
                src={selectedWork.image}
                alt={selectedWork.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain"
              />
            </div>

            {/* Lightbox Details */}
            <div className="flex flex-col justify-between p-6 md:col-span-5 md:p-8">
              <div>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="font-medium text-[#dc2626]">{selectedWork.style}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedWork.placement}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-white lg:text-3xl">
                  {selectedWork.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                  {selectedWork.description}
                </p>

                <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Мастер</span>
                    <span className="font-medium text-white">{selectedWork.artist}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Зона нанесения</span>
                    <span className="font-medium text-white">{selectedWork.placement}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Время работы</span>
                    <span className="font-mono tabular-nums text-white">
                      {selectedWork.sessions}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const style = selectedWork.style;
                    setSelectedWork(null);
                    onSelectStyleToBook(style);
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 bg-white px-5 py-3 text-xs font-semibold tracking-wide text-[#0a0a0a] transition-colors hover:bg-[#dc2626] hover:text-white cursor-pointer"
                >
                  <span>Записаться в этом стиле</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <div className="flex items-center justify-between gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => navigateLightbox(-1)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 border border-white/15 py-2.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/40 hover:text-white cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    <span>Назад</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateLightbox(1)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 border border-white/15 py-2.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/40 hover:text-white cursor-pointer"
                  >
                    <span>Далее</span>
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
