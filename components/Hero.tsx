import React, { useState, useEffect } from 'react';
import HeroBackground from './HeroBackground';
import { useScrollYFrame, whiteFadeFromScroll } from '../hooks/useScrollYFrame';

const HERO_ICONS = {
  hand: '/assets/icons/Waving-Hand--Streamline-Plump.svg',
  pencil: '/assets/icons/Fill-And-Sign--Streamline-Plump.svg',
  paint: '/assets/icons/Paint-Bucket--Streamline-Plump.svg',
  desktop: '/assets/icons/Desktop-Emoji--Streamline-Plump.svg',
  star: '/assets/icons/Star-2--Streamline-Plump.svg',
} as const;

type HeroIntroIconProps = {
  src: string;
  alt: string;
  motion?: 'wave' | 'bob';
};

const HeroIntroIcon: React.FC<HeroIntroIconProps> = ({ src, alt, motion }) => (
  <img
    src={src}
    alt={alt}
    aria-hidden={alt === ''}
    className={`hero-intro-icon${motion ? ` hero-intro-icon--${motion}` : ''}`}
    draggable={false}
  />
);

const Hero: React.FC = () => {
  const scrollY = useScrollYFrame();
  const [isMounted, setIsMounted] = useState(false);
  const [time, setTime] = useState('');
  const [size, setSize] = useState({ width: 1280, height: 720 });

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
    <section className="relative z-10 flex min-h-[100vh] w-full flex-col justify-center overflow-x-hidden bg-[#0d0707] px-6 py-16 md:px-12 md:py-20 lg:px-16">
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
          .hero-intro {
            font-family: 'IBM Plex Serif', serif;
            font-weight: 300;
            color: white;
            line-height: 1.35;
            letter-spacing: -0.02em;
          }

          .hero-intro em {
            font-style: italic;
          }

          .hero-intro-icon {
            display: inline-block;
            width: 0.92em;
            height: 0.92em;
            margin: 0 0.12em;
            vertical-align: -0.1em;
            flex-shrink: 0;
            filter: brightness(0) invert(1);
          }

          @keyframes hero-hand-wave {
            0%,
            100% {
              transform: rotate(0deg);
            }
            20% {
              transform: rotate(16deg);
            }
            40% {
              transform: rotate(-6deg);
            }
            60% {
              transform: rotate(14deg);
            }
            80% {
              transform: rotate(-4deg);
            }
          }

          @keyframes hero-star-bob {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-0.18em);
            }
          }

          .hero-intro-icon--wave {
            transform-origin: 72% 88%;
            animation: hero-hand-wave 2.2s ease-in-out infinite;
          }

          .hero-intro-icon--bob {
            animation: hero-star-bob 2.4s ease-in-out infinite;
          }
        `}
      </style>

      <div
        className={`relative z-[2] w-full max-w-[1400px] text-white ${isMounted ? 'is-mounted' : ''}`}
        style={{
          opacity: contentOpacity,
          transform: `scale(${scale}) translateY(${translateY}px)`,
        }}
      >
        <div className="inline-block max-w-full text-left">
          <p
            className="hero-intro text-left text-[1.89rem] sm:text-[2.1rem] md:text-[2.625rem] lg:text-[3.01rem] mb-8 md:mb-10 transition-opacity duration-1000 delay-300"
            style={{ opacity: isMounted ? 1 : 0 }}
          >
            <span className="md:hidden">
              <span className="block">
                Hi, I&rsquo;m Wanda{' '}
                <HeroIntroIcon src={HERO_ICONS.hand} alt="" motion="wave" />
              </span>
              <span className="block">Based in Chicago</span>
              <span className="block">
                I&rsquo;m a{' '}
                <HeroIntroIcon src={HERO_ICONS.pencil} alt="" />
                {' '}multidisciplinary
              </span>
              <span className="block">designer with experience</span>
              <span className="block">
                in{' '}
                <HeroIntroIcon src={HERO_ICONS.paint} alt="" />
                {' '}
                <em>branding,</em>
              </span>
              <span className="block">
                <HeroIntroIcon src={HERO_ICONS.desktop} alt="" />
                {' '}
                <em>digital design</em>
              </span>
              <span className="block">
                and{' '}
                <HeroIntroIcon src={HERO_ICONS.star} alt="" motion="bob" />
                {' '}
                <em>motion.</em>
              </span>
            </span>

            <span className="hidden md:block">
              <span className="block">
                Hi, I&rsquo;m Wanda{' '}
                <HeroIntroIcon src={HERO_ICONS.hand} alt="" motion="wave" />
                {' '}Based in Chicago
              </span>
              <span className="block">
                I&rsquo;m a{' '}
                <HeroIntroIcon src={HERO_ICONS.pencil} alt="" />
                {' '}multidisciplinary designer
              </span>
              <span className="block">
                with experience in{' '}
                <HeroIntroIcon src={HERO_ICONS.paint} alt="" />
                {' '}
                <em>branding,</em>
              </span>
              <span className="block">
                <HeroIntroIcon src={HERO_ICONS.desktop} alt="" />
                {' '}
                <em>digital design</em> and{' '}
                <HeroIntroIcon src={HERO_ICONS.star} alt="" motion="bob" />
                {' '}
                <em>motion.</em>
              </span>
            </span>
          </p>

          <div className="w-0 min-w-full border-y border-white/10 py-4 md:py-7 flex flex-wrap justify-start gap-y-3 gap-x-4 md:gap-x-6 items-center transition-opacity duration-1000 delay-700" style={{ opacity: isMounted ? 1 : 0 }}>
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
