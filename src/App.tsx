import { useCallback, useRef, useState, type MouseEvent } from 'react';
import { AboutMachineSection } from './components/AboutMachineSection';
import { ArtistsServicesReviews } from './components/ArtistsServicesReviews';
import { BookingFooter } from './components/BookingFooter';
import { ConceptJokerSection } from './components/ConceptJokerSection';
import { CustomCursor } from './components/CustomCursor';
import { GallerySection } from './components/GallerySection';
import { HeroSection } from './components/HeroSection';
import { InkCanvas, type InkCanvasHandle } from './components/InkCanvas';
import { Navbar } from './components/Navbar';
import { STUDIO_MEDIA } from './data/studioData';

export default function App() {
  const inkCanvasRef = useRef<InkCanvasHandle | null>(null);
  const [inkShots, setInkShots] = useState(0);
  const [keepStains, setKeepStains] = useState(false);
  const [floatingBuzz, setFloatingBuzz] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');

  const fireInk = useCallback((x: number, y: number, intensity = 68) => {
    inkCanvasRef.current?.sprayInk(x, y, intensity);
    setInkShots((prev) => prev + 1);
  }, []);

  const handleFloatingMachineClick = (e: MouseEvent<HTMLButtonElement>) => {
    setFloatingBuzz(true);
    setTimeout(() => setFloatingBuzz(false), 240);
    const rect = e.currentTarget.getBoundingClientRect();
    fireInk(rect.left + rect.width / 2, rect.top + rect.height / 2, 72);
  };

  const scrollToBooking = useCallback(() => {
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSelectArtistToBook = useCallback(
    (artistName: string) => {
      setSelectedArtist(artistName);
      scrollToBooking();
    },
    [scrollToBooking]
  );

  const handleSelectStyleToBook = useCallback(
    (styleName: string) => {
      setSelectedStyle(styleName);
      scrollToBooking();
    },
    [scrollToBooking]
  );

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      <CustomCursor />
      <InkCanvas ref={inkCanvasRef} keepStains={keepStains} />

      <Navbar onBookClick={scrollToBooking} />

      <main>
        <HeroSection onMachineClick={(x, y) => fireInk(x, y, 70)} />

        <AboutMachineSection
          inkShots={inkShots}
          keepStains={keepStains}
          onToggleKeepStains={() => setKeepStains((prev) => !prev)}
          onClearInk={() => inkCanvasRef.current?.clearInk()}
          onFireInk={fireInk}
        />

        <GallerySection onSelectStyleToBook={handleSelectStyleToBook} />

        <ConceptJokerSection />

        <ArtistsServicesReviews onSelectArtistToBook={handleSelectArtistToBook} />

        <BookingFooter
          preselectedArtist={selectedArtist}
          preselectedStyle={selectedStyle}
        />
      </main>

      {/* Always-accessible tactile Tattoo Machine ink splatter trigger */}
      <button
        type="button"
        data-cursor="Чернила"
        aria-label="Нажмите на тату-машинку, чтобы выбросить чернила"
        onClick={handleFloatingMachineClick}
        className={`group fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-[#121212] shadow-2xl transition-all duration-200 hover:scale-105 hover:border-[#dc2626] hover:shadow-[0_0_24px_rgba(220,38,38,0.5)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#dc2626] ${
          floatingBuzz ? 'animate-machine-buzz border-[#dc2626]' : ''
        }`}
      >
        <img
          src={STUDIO_MEDIA.tattooMachine}
          alt="Тату-машинка для брызг чернил"
          className="h-full w-full scale-125 object-cover object-[65%_35%]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0"
        />
      </button>
    </div>
  );
}
