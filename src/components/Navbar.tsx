import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

const NAV_LINKS = [
  { label: 'Главная', href: '#home' },
  { label: 'О студии', href: '#about' },
  { label: 'Мастера', href: '#artists' },
  { label: 'Работы', href: '#gallery' },
  { label: 'Услуги', href: '#services' },
  { label: 'Отзывы', href: '#reviews' },
];

export function Navbar({ onBookClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-8 px-6 lg:px-12">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#home"
          className="font-display text-2xl font-extrabold tracking-[-0.04em] text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dc2626]"
        >
          OMG
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav aria-label="Основная навигация" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-sm font-medium text-zinc-400 transition-colors duration-150 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dc2626]"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-[#dc2626] transition-transform duration-200 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary CTA with glowing hover effect */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBookClick}
            className="hidden sm:inline-flex items-center gap-2 border border-white/20 bg-white px-5 py-2.5 text-xs font-semibold tracking-wide text-[#0a0a0a] transition-all duration-200 hover:border-[#dc2626] hover:bg-[#dc2626] hover:text-white hover:shadow-[0_0_24px_rgba(220,38,38,0.55)] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dc2626]"
          >
            <span>Записаться</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Закрыть меню навигации' : 'Открыть меню навигации'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-white transition-colors hover:border-white/40 md:hidden cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0a0a0a] px-6 py-5 md:hidden">
          <nav aria-label="Мобильная навигация" className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-base font-medium text-zinc-300 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onBookClick();
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-[#0a0a0a] transition-colors hover:bg-[#dc2626] hover:text-white cursor-pointer"
            >
              <span>Записаться на консультацию</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
