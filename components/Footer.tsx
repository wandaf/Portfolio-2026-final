import React, { useEffect, useRef, useState } from 'react';
import { GrainGradient } from '@paper-design/shaders-react';
import { FOOTER_PANEL_HEIGHT_PX } from '../constants';
import { Page } from '../types';

interface FooterProps {
  onPageChange: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const [time, setTime] = useState('');
  const footerRef = useRef<HTMLElement>(null);
  const [grainSize, setGrainSize] = useState({ width: 1280, height: FOOTER_PANEL_HEIGHT_PX });

  useEffect(() => {
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
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = footerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const measure = () => {
      const w = Math.max(1, el.offsetWidth);
      const h = Math.max(1, el.offsetHeight);
      setGrainSize({ width: w, height: h });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleNav = (page: Page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      style={{ height: FOOTER_PANEL_HEIGHT_PX }}
      className="pointer-events-auto fixed inset-x-0 bottom-0 z-[1] flex flex-col overflow-hidden bg-[#0d0707] text-white [transform:translateZ(0)]"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <GrainGradient
          width={grainSize.width}
          height={grainSize.height}
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

      {/* flex-1 + justify-center: fill footer min-height and vertically center the row in that space */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center px-6 py-5 md:px-12 md:pt-6 md:pb-[20px] lg:px-16">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 md:gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-xl space-y-6 md:space-y-10">
            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                aria-hidden
              />
              <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/90 md:text-[11px]">
                {time} Chicago, IL
              </span>
            </div>
            <div className="space-y-3 font-['IBM_Plex_Serif'] font-light tracking-tight">
              <p className="text-3xl leading-tight md:text-4xl lg:text-[2.75rem]">Connect with me:</p>
              <a
                href="mailto:wandafelsen@gmail.com"
                className="block text-3xl leading-tight text-white transition-opacity hover:opacity-70 md:text-4xl lg:text-[2.75rem]"
              >
                wandafelsen@gmail.com
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-10 sm:gap-16 md:gap-24 lg:gap-32">
            <div>
              <p className="mb-6 font-mono-tag text-[10px] uppercase tracking-[0.2em] text-white/50">Navigation</p>
              <nav className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => handleNav(Page.WORK)}
                  className="text-left text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-60 md:text-xs"
                >
                  Work
                </button>
                <button
                  type="button"
                  onClick={() => handleNav(Page.PLAYGROUND)}
                  className="text-left text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-60 md:text-xs"
                >
                  Playground
                </button>
                <button
                  type="button"
                  onClick={() => handleNav(Page.ABOUT)}
                  className="text-left text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-60 md:text-xs"
                >
                  About
                </button>
                <button
                  type="button"
                  onClick={() => handleNav(Page.RESUME)}
                  className="text-left text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-60 md:text-xs"
                >
                  Resume
                </button>
              </nav>
            </div>
            <div>
              <p className="mb-6 font-mono-tag text-[10px] uppercase tracking-[0.2em] text-white/50">Links</p>
              <nav className="flex flex-col gap-4">
                <a
                  href="mailto:wandafelsen@gmail.com"
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-60 md:text-xs"
                >
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/wanda-f/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-60 md:text-xs"
                >
                  LinkedIn
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
