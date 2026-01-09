
import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [time, setTime] = useState('');
  const fullText = "Wanda Felsenhardt";

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
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
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  
  const contentOpacity = Math.max(0, 1 - (scrollY / (vh * 0.7)));
  const scale = 1 + (scrollY / vh * 0.04);
  const translateY = scrollY * 0.25;
  const blurAmount = (scrollY / vh) * 8;

  return (
    <section className="relative w-full h-[100vh] flex flex-col items-center justify-start overflow-hidden z-10 pt-40 md:pt-56">
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
          filter: `blur(${blurAmount}px)`
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
              is a data-driven designer creating digital experiences that 
              simplify, uplift, and nurture human connection.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-24 mb-10 md:mb-16 transition-all duration-1000 delay-700" style={{ opacity: isMounted ? 1 : 0, transform: isMounted ? 'none' : 'translateY(20px)' }}>
            <div className="space-y-2">
              <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-medium text-white font-mono-tag">Focus</h3>
              <p className="text-xs md:text-sm opacity-50 font-light max-w-[200px]">Motion, Branding, and UX Design</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-medium text-white font-mono-tag">Philosophy</h3>
              <p className="text-xs md:text-sm opacity-50 font-light max-w-[280px]">Empathetic storytelling, human connection, & tech for social good</p>
            </div>
          </div>

          <div className="w-full border-y border-white/10 py-6 md:py-10 mt-8 md:mt-12 flex flex-wrap justify-start gap-y-3 gap-x-4 md:gap-x-6 items-center opacity-70 transition-opacity duration-1000 delay-1000" style={{ opacity: isMounted ? 0.7 : 0 }}>
            <div className="flex items-center gap-3 md:gap-4">
              <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-medium text-white">currently</span>
              <span className="opacity-20 text-white font-light">|</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
               <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-medium text-white">
                  {time} Chicago, IL
                </span>
              </div>
              <span className="opacity-20 text-white font-light">|</span>
            </div>
            <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-medium text-white">Freelance Designer</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
