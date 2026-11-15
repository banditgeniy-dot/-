import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ARTISTS } from '../data/studioData';

interface BookingFooterProps {
  preselectedArtist: string;
  preselectedStyle: string;
}

interface BookingReceipt {
  referenceId: string;
  name: string;
  email: string;
  artist: string;
  style: string;
}

const STYLE_OPTIONS = [
  'Black & Grey реализм',
  'Тёмный сюрреализм',
  'Тонкая линия',
  'Мифология',
  'Алхимия шрамов и перекрытий',
];

export function BookingFooter({
  preselectedArtist,
  preselectedStyle,
}: BookingFooterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [artist, setArtist] = useState(preselectedArtist || 'Любой свободный мастер');
  const [style, setStyle] = useState(preselectedStyle || STYLE_OPTIONS[0]);
  const [placement, setPlacement] = useState('');
  const [concept, setConcept] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<BookingReceipt | null>(null);

  useEffect(() => {
    if (preselectedArtist) setArtist(preselectedArtist);
  }, [preselectedArtist]);

  useEffect(() => {
    if (preselectedStyle) {
      const matched = STYLE_OPTIONS.find((opt) =>
        opt.toLowerCase().includes(preselectedStyle.toLowerCase())
      );
      setStyle(matched ?? preselectedStyle);
    }
  }, [preselectedStyle]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Пожалуйста, укажите ваше имя.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setError('Укажите корректный email, чтобы администратор мог связаться с вами.');
      return;
    }
    if (concept.trim().length < 10) {
      setError('Опишите вашу идею и зону нанесения чуть подробнее (от 10 символов).');
      return;
    }

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setReceipt({
      referenceId: `OMG-26-${randomCode}`,
      name: name.trim(),
      email: email.trim(),
      artist,
      style,
    });
  };

  const handleReset = () => {
    setReceipt(null);
    setName('');
    setEmail('');
    setPhone('');
    setPlacement('');
    setConcept('');
    setError(null);
  };

  return (
    <>
      {/* Booking Consultation Section */}
      <section id="booking" className="border-t border-white/10 bg-[#111111] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left: Studio Contact & Concierge Info */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <p className="text-xs font-medium tracking-widest text-[#dc2626] uppercase">
                  07. Приватная консультация
                </p>
                <h2 className="mt-4 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white [text-wrap:balance]">
                  Забронируйте кресло в Сохо.
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400">
                  Любой проект начинается с неспешной личной консультации — очно в нашем ателье на
                  Мерсер-стрит или по закрытой видеосвязи.
                </p>
              </div>

              <div className="mt-10 space-y-6 border-t border-white/10 pt-8 text-sm">
                <div>
                  <p className="text-xs text-zinc-500">Адрес ателье</p>
                  <p className="mt-1 font-medium text-white">
                    142 Mercer Street, Penthouse Suite B, Нью-Йорк
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-zinc-500">Часы работы</p>
                    <p className="mt-1 font-mono text-xs tabular-nums text-zinc-300">
                      Вт – Вс · 11:00 – 20:00
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Консьерж-служба</p>
                    <a
                      href="mailto:concierge@omgtattoo.studio"
                      className="mt-1 block font-medium text-white transition-colors hover:text-[#dc2626]"
                    >
                      concierge@omgtattoo.studio
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Minimalist Appointment Form */}
            <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-10 lg:col-span-7">
              {receipt ? (
                <div className="flex min-h-[380px] flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-[#dc2626]">
                      <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                      <span className="text-xs font-semibold tracking-widest uppercase">
                        Заявка принята
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-3xl font-bold text-white">
                      Спасибо, {receipt.name}.
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-400">
                      Арт-директор студии изучит ваши заметки и отправит свободные даты
                      консультации на почту <span className="text-white">{receipt.email}</span> в
                      течение 24 часов.
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-4 border-y border-white/10 py-5 sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-zinc-500">Номер заявки</p>
                        <p className="mt-1 font-mono text-sm font-medium tabular-nums text-white">
                          {receipt.referenceId}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Мастер</p>
                        <p className="mt-1 text-sm font-medium text-white">{receipt.artist}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Направление</p>
                        <p className="mt-1 text-sm font-medium text-white">{receipt.style}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-8 w-fit border border-white/20 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:border-white cursor-pointer"
                  >
                    Отправить ещё одну заявку
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {error && (
                    <div
                      role="alert"
                      className="border border-[#dc2626]/60 bg-[#dc2626]/10 px-4 py-3 text-xs font-medium text-red-200"
                    >
                      Ошибка: {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="booking-name" className="block text-xs font-medium text-zinc-400">
                        Ваше имя *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Александр Волков"
                        className="mt-2 w-full border border-white/15 bg-[#121212] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-email" className="block text-xs font-medium text-zinc-400">
                        Электронная почта *
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@domain.com"
                        className="mt-2 w-full border border-white/15 bg-[#121212] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="booking-artist" className="block text-xs font-medium text-zinc-400">
                        Выбор мастера
                      </label>
                      <select
                        id="booking-artist"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        className="mt-2 w-full border border-white/15 bg-[#121212] px-4 py-3 text-sm text-white transition-colors focus:border-white focus:outline-none"
                      >
                        <option value="Любой свободный мастер">Любой свободный мастер</option>
                        {ARTISTS.map((a) => (
                          <option key={a.id} value={a.name}>
                            {a.name} — {a.role}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="booking-style" className="block text-xs font-medium text-zinc-400">
                        Стиль и техника
                      </label>
                      <select
                        id="booking-style"
                        value={style}
                        onChange={(e) => setStyle(e.target.value)}
                        className="mt-2 w-full border border-white/15 bg-[#121212] px-4 py-3 text-sm text-white transition-colors focus:border-white focus:outline-none"
                      >
                        {STYLE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="booking-placement" className="block text-xs font-medium text-zinc-400">
                        Зона тела и примерный размер
                      </label>
                      <input
                        id="booking-placement"
                        type="text"
                        value={placement}
                        onChange={(e) => setPlacement(e.target.value)}
                        placeholder="Например, левое предплечье · 22 см"
                        className="mt-2 w-full border border-white/15 bg-[#121212] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-phone" className="block text-xs font-medium text-zinc-400">
                        Телефон (необязательно)
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (212) 000-0000"
                        className="mt-2 w-full border border-white/15 bg-[#121212] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-concept" className="block text-xs font-medium text-zinc-400">
                      Идея, референсы и особенности кожи *
                    </label>
                    <textarea
                      id="booking-concept"
                      rows={4}
                      required
                      value={concept}
                      onChange={(e) => setConcept(e.target.value)}
                      placeholder="Опишите атмосферу, желаемые сюжеты или наличие шрамов/старых татуировок для интеграции..."
                      className="mt-2 w-full resize-none border border-white/15 bg-[#121212] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 bg-white px-6 py-4 text-xs font-semibold tracking-wider text-[#0a0a0a] uppercase transition-all duration-200 hover:bg-[#dc2626] hover:text-white hover:shadow-[0_0_28px_rgba(220,38,38,0.45)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#dc2626]"
                  >
                    <span>Записаться на консультацию</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-white/10 bg-[#0a0a0a] py-10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center lg:px-12">
          <div className="flex items-center gap-6">
            <a href="#home" className="font-display text-xl font-extrabold tracking-tight text-white">
              OMG
            </a>
            <span className="text-xs text-zinc-500">
              142 Mercer Street, Сохо, Нью-Йорк
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400">
            <a href="#about" className="transition-colors hover:text-white">
              О студии
            </a>
            <a href="#artists" className="transition-colors hover:text-white">
              Мастера
            </a>
            <a href="#gallery" className="transition-colors hover:text-white">
              Работы
            </a>
            <a href="#services" className="transition-colors hover:text-white">
              Услуги
            </a>
            <a href="#booking" className="transition-colors hover:text-white">
              Запись
            </a>
          </div>

          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Тату-ателье OMG. Все права защищены.
          </p>
        </div>
      </footer>
    </>
  );
}
