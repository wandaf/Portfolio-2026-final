import React, { useState, useEffect } from 'react';
import HeroBackground from './HeroBackground';
import { useScrollYFrame, whiteFadeFromScroll } from '../hooks/useScrollYFrame';

const Hero: React.FC = () => {
  const scrollY = useScrollYFrame();
  const [isMounted, setIsMounted] = useState(false);
  const [time, setTime] = useState('');
  const [size, setSize] = useState({ width: 1280, height: 720 });
  const fullText = 'Wanda Felsenhardt';

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(() => setIsMounted(true), 150);

    const updateTime = () => {
      const now = new Date();
      const timeString = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(now);
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

  const contentOpacity = Math.max(0, 1 - scrollY / (vh * 0.7));
  const scale = 1 + (scrollY / vh) * 0.04;
  const translateY = scrollY * 0.25;
  const whiteFadeProgress = whiteFadeFromScroll(scrollY, vh);

  return (
    <section className="relative z-10 flex h-[100vh] min-h-[100vh] w-full flex-col items-center justify-start overflow-hidden bg-[#0d0707] pt-40 md:pt-56">
      <HeroBackground width={size.width} height={size.height} />

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1]"
        style={{
          height: `${whiteFadeProgress * 100}vh`,
          maxHeight: '100%',
          background:
            'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 28%, rgba(255,255,255,0.95) 48%, rgba(255,255,255,0.68) 66%, rgba(255,255,255,0.26) 84%, rgba(255,255,255,0) 100%)',
          opacity: whiteFadeProgress > 0 ? 1 : 0,
        }}
        aria-hidden
      />

      <style>
        {`
          .name-container {
            cursor: default;
            position: relative;
            display: inline-block;
          }

          .letter-span {
            display: inline-block;
            position: relative;
            color: white;
            padding: 0.15em 0.02em;
            margin: 0;
            opacity: 0;
            filter: blur(35px);
            transform: translateY(1.5em);
            transition:
              opacity 2.2s cubic-bezier(0.19, 1, 0.22, 1) var(--stagger),
              filter 2.8s cubic-bezier(0.19, 1, 0.22, 1) var(--stagger),
              transform 2.2s cubic-bezier(0.19, 1, 0.22, 1) var(--stagger);
          }

          .letter-span.is-visible {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        `}
      </style>

      <div
        className={`relative z-[2] mx-auto w-full max-w-[1400px] px-6 text-white md:px-12 lg:px-16 ${isMounted ? 'is-mounted' : ''}`}
        style={{
          opacity: contentOpacity,
          transform: `scale(${scale}) translateY(${translateY}px)`,
        }}
      >
        <div className="max-w-6xl text-left">
          <h1 className="name-container text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-6 md:mb-10 font-['IBM_Plex_Serif'] text-white whitespace-nowrap overflow-visible leading-[1.2] min-h-[1.2em] flex flex-wrap items-center select-none">
            {fullText.split('').map((char, i) => (
              <span
                key={i}
                className={`letter-span ${isMounted ? 'is-visible' : ''}`}
                style={{ 
                  ['--stagger' as any]: `${i * 60}ms`
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
          
          <div className="max-w-2xl">
            <p className="text-lg md:text-2xl font-light tracking-tight leading-relaxed opacity-80 mb-10 md:mb-16 transition-opacity duration-1000 delay-500" style={{ opacity: isMounted ? 0.8 : 0 }}>
              is a data-driven designer with experience in branding, digital design, and motion.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-24 mb-10 md:mb-16 transition-all duration-1000 delay-700" style={{ opacity: isMounted ? 1 : 0, transform: isMounted ? 'none' : 'translateY(20px)' }}>
            <div className="space-y-2">
              <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-medium text-white font-mono-tag">Focus</h3>
              <p className="text-xs md:text-sm opacity-50 font-light max-w-[200px]">
                Branding, Digital Design,
                <br />
                and motion
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-medium text-white font-mono-tag">Philosophy</h3>
              <p className="text-xs md:text-sm opacity-50 font-light max-w-[280px]">
                Design happens in conversation
                <br />
                with others
              </p>
            </div>
          </div>

          <div className="w-full border-y border-white/10 py-4 md:py-7 mt-8 md:mt-12 flex flex-wrap justify-start gap-y-3 gap-x-4 md:gap-x-6 items-center transition-opacity duration-1000 delay-1000" style={{ opacity: isMounted ? 1 : 0 }}>
            <div className="flex items-center gap-3 md:gap-4">
              <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-medium text-white">currently</span>
              <span className="text-white font-light">|</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
               <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-medium text-white">
                  {time} Chicago, IL
                </span>
              </div>
              <span className="text-white font-light">|</span>
            </div>
            <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-medium text-white">Designer @ Viv Higher Education</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
