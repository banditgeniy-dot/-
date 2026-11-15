import { ArrowUpRight } from 'lucide-react';
import { ARTISTS, REVIEWS, SERVICES } from '../data/studioData';

interface ArtistsServicesReviewsProps {
  onSelectArtistToBook: (artistName: string) => void;
}

export function ArtistsServicesReviews({ onSelectArtistToBook }: ArtistsServicesReviewsProps) {
  return (
    <>
      {/* Artists Section */}
      <section id="artists" className="cv-auto border-t border-white/10 bg-[#0a0a0a] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-medium tracking-widest text-[#dc2626] uppercase">
                04. Мастера-резиденты
              </p>
              <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white [text-wrap:balance]">
                Три специалиста. Никаких учеников.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-zinc-400">
              Каждый резидент ведёт строго ограниченное число проектов в месяц, чтобы уделять
              максимум времени проработке эскиза и послойному контрасту.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {ARTISTS.map((artist) => (
              <article
                key={artist.id}
                className="group flex flex-col justify-between border border-white/10 bg-[#121212] transition-colors duration-200 hover:border-white/30"
              >
                <div>
                  <div className="aspect-square w-full overflow-hidden bg-black">
                    <img
                      src={artist.image}
                      alt={`${artist.name} — ${artist.role}`}
                      width={560}
                      height={560}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="font-mono tabular-nums text-zinc-300">
                        {artist.experience}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#dc2626]">{artist.availability}</span>
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-bold text-white">
                      {artist.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-zinc-300">{artist.role}</p>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-400">{artist.bio}</p>
                  </div>
                </div>

                <div className="border-t border-white/10 px-6 py-4">
                  <p className="text-xs text-zinc-400">{artist.specialty}</p>
                  <button
                    type="button"
                    onClick={() => onSelectArtistToBook(artist.name)}
                    className="mt-4 inline-flex w-full items-center justify-between border border-white/15 bg-[#0a0a0a] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-[#dc2626] hover:bg-[#dc2626] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#dc2626]"
                  >
                    <span>Записаться: {artist.name}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="cv-auto border-t border-white/10 bg-[#111111] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-medium tracking-widest text-[#dc2626] uppercase">
                05. Прайс и форматы
              </p>
              <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3rem)] font-bold leading-[1.08] tracking-tight text-white [text-wrap:balance]">
                Прозрачные сеансы и персональные проекты.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                В стоимость каждого формата входит закрытый стерильный кабинет, анатомическое
                3D-проектирование эскиза и профессиональный набор для заживления.
              </p>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10 lg:col-span-8">
              {SERVICES.map((service) => (
                <div
                  key={service.index}
                  className="grid grid-cols-1 gap-4 py-7 sm:grid-cols-12 sm:items-center"
                >
                  <div className="sm:col-span-7">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs tabular-nums text-[#dc2626]">
                        {service.index}.
                      </span>
                      <h3 className="font-display text-xl font-bold text-white">{service.name}</h3>
                    </div>
                    <p className="mt-2 pl-7 text-sm leading-relaxed text-zinc-400">
                      {service.description}
                    </p>
                  </div>

                  <div className="pl-7 sm:col-span-5 sm:pl-0 sm:text-right">
                    <p className="font-mono text-lg font-medium tabular-nums text-white">
                      {service.rate}
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">
                      {service.duration} · {service.deposit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <section id="reviews" className="cv-auto border-t border-white/10 bg-[#0a0a0a] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="border-b border-white/10 pb-8">
            <p className="text-xs font-medium tracking-widest text-[#dc2626] uppercase">
              06. Зажившие работы
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white [text-wrap:balance]">
              Проверенное качество спустя месяцы после сеанса.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {REVIEWS.map((review) => (
              <figure
                key={review.id}
                className="flex flex-col justify-between border border-white/10 bg-[#121212] p-7"
              >
                <blockquote className="text-sm leading-relaxed text-zinc-300">
                  &laquo;{review.quote}&raquo;
                </blockquote>

                <figcaption className="mt-8 border-t border-white/10 pt-5">
                  <p className="font-display text-base font-bold text-white">
                    {review.clientName}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">{review.commission}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                    <span>Мастер: {review.artist}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums text-[#dc2626]">
                      {review.healedTime}
                    </span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
