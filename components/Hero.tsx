import React, { useState, useEffect } from 'react';
import { GrainGradient } from '@paper-design/shaders-react';

interface HeroProps {
  scrollY: number;
}

const Hero: React.FC<HeroProps> = ({ scrollY }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [time, setTime] = useState('');
  const [size, setSize] = useState({ width: 1280, height: 720 });
  const fullText = "Wanda Felsenhardt";

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(() => setIsMounted(true), 150);

    // Time update logic for Chicago
    const updateTime = () => {
      const now = new Date();
      const timeString = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
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
  
  const contentOpacity = Math.max(0, 1 - (scrollY / (vh * 0.7)));
  const scale = 1 + (scrollY / vh * 0.04);
  const translateY = scrollY * 0.25;

  // Same as App whiteFadeProgress so hero white overlay stays in sync with global transition
  const startFade = 0;
  const endFade = vh * 0.9;
  const whiteFadeProgress =
    scrollY <= startFade ? 0 : scrollY >= endFade ? 1 : (() => {
      const t = (scrollY - startFade) / (endFade - startFade);
      return t * t * (3 - 2 * t);
    })();
  const bandHeightVh = whiteFadeProgress * 174; // starts at 0, grows fast while staying bottom-anchored

  return (
    <section className="relative w-full min-h-[100vh] h-[100vh] flex flex-col items-center justify-start overflow-hidden z-10 pt-40 md:pt-56 bg-[#0d0707]">
      {/* Grain gradient */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <GrainGradient
          width={size.width}
          height={size.height}
          colors={['#043153', '#0425a9', '#2e428a', '#09729f']}
          colorBack="#0d0707"
          softness={1}
          intensity={0.5}
          noise={0.25}
          shape="corners"
          speed={0.6}
          offsetX={0.14}
          offsetY={0.06}
        />
      </div>
      {/* Bottom-anchored white band that progressively grows upward on scroll */}
      <div
        className="absolute left-0 right-0 bottom-0 pointer-events-none"
        style={{
          height: `${bandHeightVh}vh`,
          background:
            'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 28%, rgba(255,255,255,0.95) 48%, rgba(255,255,255,0.68) 66%, rgba(255,255,255,0.26) 84%, rgba(255,255,255,0) 100%)',
          opacity: whiteFadeProgress > 0 ? 1 : 0,
        }}
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
            
            /* Spacing to ensure no clipping during lift or with descenders */
            padding: 0.15em 0.02em;
            margin: 0;
            
            /* Initial state for entrance animation: blurred, offset, and invisible */
            opacity: 0;
            filter: blur(35px);
            transform: translateY(1.5em);
            
            /* 
               Transition for the entrance: 
               Uses a sophisticated cubic-bezier for a weightless 'drifting' feel.
            */
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
        className={`max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 w-full will-change-transform text-white relative ${isMounted ? 'is-mounted' : ''}`}
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
              is a data-driven designer with experience in branding, UX design, and motion.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-24 mb-10 md:mb-16 transition-all duration-1000 delay-700" style={{ opacity: isMounted ? 1 : 0, transform: isMounted ? 'none' : 'translateY(20px)' }}>
            <div className="space-y-2">
              <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-medium text-white font-mono-tag">Focus</h3>
              <p className="text-xs md:text-sm opacity-50 font-light max-w-[200px]">
                Branding, UX Design,
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
            <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-medium text-white">Freelance Designer</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
