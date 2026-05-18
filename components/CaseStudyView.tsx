
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CaseStudy } from '../types';

interface CaseStudyViewProps {
  study: CaseStudy;
}

const normalizeAssetSrc = (src: string) => {
  try {
    return encodeURI(decodeURI(src));
  } catch {
    return encodeURI(src);
  }
};

const FadeInSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    // On small screens the IntersectionObserver-triggered reveal can occasionally miss due to
    // layout/resize timing. Avoid blank content by showing immediately on mobile widths.
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
      setVisible(true);
      return;
    }

    if (typeof (window as any).IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
    } catch {
      setVisible(true);
      return;
    }

    const current = domRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer?.unobserve(current);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`fade-up-element ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

const SectionHeading: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="text-3xl font-serif-heading font-semibold text-gray-900 mb-12 cursor-default">
    {title}
  </h2>
);

const GalleryBlockHeading: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
    <p className="text-gray-600 font-light text-sm md:text-base max-w-2xl">{description}</p>
  </div>
);

const HIGHER_ED_ROW_1 = [
  'assets/imgs/HigherEd/TPP_MusicEngineering_Versioning_2-0022-ezgif.com-video-to-gif-converter.gif',
  'assets/imgs/HigherEd/Desktop - 8.jpg',
];
const HIGHER_ED_ROW_2_SIMMONS = [
  'assets/imgs/HigherEd/Simmons_AWRT_2_002.gif',
  'assets/imgs/HigherEd/Simmons_AWRT_3_002-ezgif.com-video-to-gif-converter.gif',
];
const HIGHER_ED_ROW_3_UNNAMED = [
  'assets/imgs/HigherEd/unnamed-2.gif',
  'assets/imgs/HigherEd/unnamed.gif',
];
const HIGHER_ED_ROW_2_FULL = 'assets/imgs/HigherEd/Desktop - 6.jpg';
const HIGHER_ED_ROW_3_FULL = 'assets/imgs/HigherEd/Desktop - 9.jpg';
const HIGHER_ED_BETWEEN_GIFS = 'assets/imgs/HigherEd/Desktop - 7.jpg';
const HIGHER_ED_DESKTOP = [
  'assets/imgs/HigherEd/Desktop - 2.jpg',
  'assets/imgs/HigherEd/Desktop - 4.jpg',
  'assets/imgs/HigherEd/Desktop - 5.jpg',
];
const HIGHER_ED_ROOSEVELT_SLIDES = [1, 2, 3, 4, 5, 6, 7].map((n) => `assets/HIGHER ED/${n}.jpg`);

const HIGHER_ED_GALLERY_CAPTIONS = [
  {
    title: 'Tufts University',
    description:
      'Digital social campaign graphics, display ads, and print flyer for Tufts’ summer programs for high schoolers.',
  },
  {
    title: 'Simmons University',
    description: 'Static and animated social campaign assets.',
  },
  {
    title: 'Vermont Law & Graduate School',
    description: 'Social campaign assets for Vermont Law’s Masters programs.',
  },
  {
    title: 'Boston University',
    description: 'Motion assets for an AI-focused campaign.',
  },
  {
    title: 'Roosevelt University',
    description:
      'Digital campaign concept and omnichannel campaign for Roosevelt’s Schaumburg campus.',
  },
  {
    title: 'Northeastern University',
    description: 'Digital campaign assets for Northeastern’s tech programs.',
  },
  {
    title: 'University of Chicago',
    description: 'Digital campaign assets for University of Chicago’s MS in Chemistry.',
  },
] as const;

const MCDONALDS_GALLERY_GRID_4 = [
  'assets/imgs/Mcdonalds/IHUsE9aVdEHPrcf2LaRZdN9th6c.png.webp',
  'assets/imgs/Mcdonalds/uAtdCtqR69anravVJfnxNYeg.png.webp',
  'assets/imgs/Mcdonalds/4XsAkMo1LUqSy5HYVvNQrpcGWwI.png.webp',
  'assets/imgs/Mcdonalds/BZVXaeFgM7qknbDV2cYYhcaaE.png.webp',
];
const MCDONALDS_FULL_WIDTH_1 = 'assets/imgs/Mcdonalds/MDttHhf5aErkP5lFGprSH0tl10.png.webp';
const MCDONALDS_FULL_WIDTH_2 = 'assets/imgs/Mcdonalds/TsvuOqwvcrGMJKnRGwEf7lARjVk.png.webp';
/** Filename uses U+202F (narrow no-break space) before "PM". */
const MCDONALDS_SPECULATIVE_MLB_SCREENSHOT =
  'assets/imgs/Mcdonalds/Screenshot 2026-05-12 at 11.21.14\u202fPM.png';
const MCDONALDS_GALLERY_ROW_2 = [
  'assets/imgs/Mcdonalds/fzwbpbdhFVLhAWhcUm6yr2PMog.png.webp',
  'assets/imgs/Mcdonalds/CwHPBomIJykO7JgFCOElWYDbz3c.png.webp',
];
const MCDONALDS_ANIME_UNO_INTRO_GIF = 'assets/imgs/Mcdonalds/Demo_AnimexUno_Intro_v001-2-ezgif.com-resize.gif';
const MCDONALDS_ANIME_UNO_STILL = 'assets/imgs/Mcdonalds/uno.png';

const LULU_HERO = 'assets/imgs/lulu/kYZRTpDanLNfZKlx5CrQG4EF4s.png.webp';
const LULU_GALLERY_FULL = [
  'assets/imgs/lulu/HSaWAQFUD1zlSwRSRDKnwVxk.png.webp',
  'assets/imgs/lulu/MmnYaHvbTsQYXve1OxYbRui4.gif',
  'assets/imgs/lulu/pFtYvjhziehwZIq78VlJLauUiA.png.webp',
  'assets/imgs/lulu/QSholvwyZglzKvALGgPpe9MmhI8.webp',
  'assets/imgs/lulu/RxUMY6fFZPnPGeogHvog7wFFZ6M.png.webp',
  'assets/imgs/lulu/Ynjt4NLS1diZyXCXPdkh2BGHfns.png.webp',
  'assets/imgs/lulu/yfbGbxrhuyaAqehaLfji5icFnE.webp',
  'assets/imgs/lulu/eHDmIfGmM5q9Xhbjrc2tYe6lg4.png.webp',
  'assets/imgs/lulu/ZUPoDZdDRXOabr6g4KdxV9mfFBE.webp',
];
const LULU_PAIR_ROW = [
  'assets/imgs/lulu/4GBLiVlt2w19L6N8oSCx6uxsEyw.png.webp',
  'assets/imgs/lulu/AgEOl46SohWNcHJNt3pzSJQ.png.webp',
];
const LULU_OOH_INTRO_GIF = 'assets/imgs/lulu/Comp10-rev2-ezgif.com-crop.gif';

const LULU_OOH_GAP_PX = 6;

/** Side-by-side OOH: same rendered height, widths from intrinsic aspect ratios, full row width, thin gap only. */
const LululemonOohPair: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef0 = useRef<HTMLImageElement>(null);
  const imgRef1 = useRef<HTMLImageElement>(null);
  const [rowHeight, setRowHeight] = useState<number | null>(null);
  const [isStacked, setIsStacked] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 639px)').matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const onChange = () => setIsStacked(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener?.(onChange);
    };
  }, []);

  const layout = useCallback(() => {
    if (isStacked) {
      setRowHeight(null);
      return;
    }
    const wrap = wrapRef.current;
    const a = imgRef0.current;
    const b = imgRef1.current;
    if (!wrap || !a || !b || !a.naturalWidth || !b.naturalWidth) return;
    const W = wrap.getBoundingClientRect().width;
    if (W <= 0) return;
    const r0 = a.naturalWidth / a.naturalHeight;
    const r1 = b.naturalWidth / b.naturalHeight;
    const H = (W - LULU_OOH_GAP_PX) / (r0 + r1);
    setRowHeight(Math.max(1, H));
  }, [isStacked]);

  useEffect(() => {
    layout();
  }, [layout, isStacked]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', layout);
      return () => window.removeEventListener('resize', layout);
    }
    const ro = new ResizeObserver(() => layout());
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [layout]);

  const onImgLoad = () => layout();

  return (
    <div
      ref={wrapRef}
      className={`flex w-full ${isStacked ? 'flex-col gap-4' : 'flex-row flex-nowrap items-start'}`}
      style={
        isStacked
          ? undefined
          : {
              gap: LULU_OOH_GAP_PX,
              ...(rowHeight == null ? { visibility: 'hidden' as const } : {}),
            }
      }
    >
      {LULU_PAIR_ROW.map((src, i) => (
        <img
          key={src}
          ref={i === 0 ? imgRef0 : imgRef1}
          src={normalizeAssetSrc(src)}
          alt={`Lululemon campaign OOH ${i + 1}`}
          loading="eager"
          decoding="async"
          draggable={false}
          onLoad={onImgLoad}
          className={`block max-w-none shrink-0 ${isStacked ? 'h-auto w-full' : 'w-auto'}`}
          style={
            !isStacked && rowHeight != null
              ? { height: rowHeight, width: 'auto' }
              : undefined
          }
        />
      ))}
    </div>
  );
};

const MCDONALDS_CHANGEABLES_SEQUENCE = [1, 2, 3].map(
  (n) => `assets/imgs/Mcdonalds/Project 2/${n}.jpg`
);
const MCDONALDS_CHANGEABLES_MARQUEE = [4, 5, 6, 7, 8, 9].map(
  (n) => `assets/imgs/Mcdonalds/Project 2/${n}.jpg`
);

const CHANGEABLES_INTRO_VIDEO_EMBED_SRC =
  'https://www.youtube.com/embed/hBRl7qiig6w?autoplay=1&mute=1&loop=1&playlist=hBRl7qiig6w&playsinline=1&rel=0&controls=0&modestbranding=1&iv_load_policy=3&disablekb=1&cc_load_policy=0&fs=0';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    // iOS Safari (and older browsers) may only support addListener/removeListener.
    const anyMq = mq as unknown as {
      addEventListener?: (type: 'change', listener: () => void) => void;
      removeEventListener?: (type: 'change', listener: () => void) => void;
      addListener?: (listener: () => void) => void;
      removeListener?: (listener: () => void) => void;
    };

    if (anyMq.addEventListener) {
      anyMq.addEventListener('change', update);
      return () => anyMq.removeEventListener?.('change', update);
    }
    if (anyMq.addListener) {
      anyMq.addListener(update);
      return () => anyMq.removeListener?.(update);
    }

    return;
  }, []);
  return isMobile;
};

const HigherEdRooseveltSlideshow: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  useEffect(() => {
    if (!autoplayEnabled) return;
    const n = HIGHER_ED_ROOSEVELT_SLIDES.length;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, 3500);
    return () => window.clearInterval(id);
  }, [autoplayEnabled]);

  const stopAutoplayAndGo = (delta: number) => {
    setAutoplayEnabled(false);
    const n = HIGHER_ED_ROOSEVELT_SLIDES.length;
    setIndex((i) => (i + delta + n) % n);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative aspect-[4/3] w-full max-h-[min(72vh,680px)] sm:aspect-[16/10] sm:max-h-[min(85vh,920px)] md:aspect-[16/9]">
        {HIGHER_ED_ROOSEVELT_SLIDES.map((src, i) => (
          <img
            key={src}
            src={normalizeAssetSrc(src)}
            alt={`Roosevelt University campaign ${i + 1}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={`absolute inset-0 z-0 h-full w-full object-contain object-center transition-opacity duration-500 ease-out ${
              i === index ? 'z-[1] opacity-100' : 'pointer-events-none opacity-0'
            }`}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-between px-1 sm:px-2">
          <button
            type="button"
            onClick={() => stopAutoplayAndGo(-1)}
            aria-label="Previous slide"
            className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-white/70 text-gray-700 opacity-50 shadow-sm backdrop-blur-sm transition-[opacity,background-color] hover:bg-white/90 hover:opacity-90 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 sm:h-12 sm:w-12"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => stopAutoplayAndGo(1)}
            aria-label="Next slide"
            className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-white/70 text-gray-700 opacity-50 shadow-sm backdrop-blur-sm transition-[opacity,background-color] hover:bg-white/90 hover:opacity-90 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 sm:h-12 sm:w-12"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const ChangeablesSequenceSlideshow: React.FC = () => {
  const [index, setIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % MCDONALDS_CHANGEABLES_SEQUENCE.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, [isMobile]);

  return (
    <div className="relative w-full overflow-hidden">
      {isMobile ? (
        <div className="space-y-4">
          {MCDONALDS_CHANGEABLES_SEQUENCE.map((src, i) => (
            <div key={src} className="relative w-full">
              <img
                src={normalizeAssetSrc(src)}
                alt={`Changeables storyboard ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative w-full aspect-[16/10] md:aspect-[16/9] max-h-[min(72vh,860px)]">
          {MCDONALDS_CHANGEABLES_SEQUENCE.map((src, i) => (
            <img
              key={src}
              src={normalizeAssetSrc(src)}
              alt={`Changeables storyboard ${i + 1}`}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-500 ease-out ${
                i === index ? 'opacity-100 z-[1]' : 'opacity-0 z-0 pointer-events-none'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ChangeablesIntroVideo: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (hasStarted || typeof (window as any).IntersectionObserver === 'undefined') {
      setHasStarted(true);
      return;
    }

    const node = wrapRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.35, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full aspect-video rounded-lg overflow-hidden"
    >
      <iframe
        width="100%"
        height="100%"
        src={hasStarted ? CHANGEABLES_INTRO_VIDEO_EMBED_SRC : undefined}
        title="YouTube video player"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

const ChangeablesBackgroundMarquee = React.memo(function ChangeablesBackgroundMarquee() {
  // Static, fast-loading grid (no animation/observers) to avoid iOS rendering issues.
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {MCDONALDS_CHANGEABLES_MARQUEE.map((src, i) => (
          <div key={src} className="relative w-full overflow-hidden rounded-lg bg-gray-50 aspect-[16/9]">
            <img
              src={normalizeAssetSrc(src)}
              alt={`Changeables environment ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>
        ))}
      </div>
    </div>
  );
});

const EDITORIAL_THIRD_PLACE = [
  'assets/imgs/Editorial/The Third Place/Desktop - 13.jpg',
  'assets/imgs/Editorial/The Third Place/Desktop - 14.jpg',
  'assets/imgs/Editorial/The Third Place/Desktop - 18.jpg',
  'assets/imgs/Editorial/The Third Place/Desktop - 16.jpg',
  'assets/imgs/Editorial/The Third Place/Desktop - 17.jpg',
  'assets/imgs/Editorial/The Third Place/Desktop - 15.jpg',
];

const EDITORIAL_GEORGETOWN = [
  'assets/imgs/Editorial/Georgetown Magazine/Desktop - 20.jpg',
  'assets/imgs/Editorial/Georgetown Magazine/Desktop - 21.jpg',
];

const EDITORIAL_NIGHTLY = [
  'assets/imgs/Editorial/The Nightly/Desktop - 23.jpg',
  'assets/imgs/Editorial/The Nightly/Desktop - 22.jpg',
  'assets/imgs/Editorial/The Nightly/Desktop - 24.jpg',
];

const FACELESS_IMAGES = [
  'assets/imgs/Faceless Affair/1.png.webp',
  'assets/imgs/Faceless Affair/2.png.webp',
  'assets/imgs/Faceless Affair/3.png.webp',
];

const FACELESS_GIFS = [
  'assets/imgs/Faceless Affair/5.gif',
  'assets/imgs/Faceless Affair/4.gif',
  'assets/imgs/Faceless Affair/6.gif',
  'assets/imgs/Faceless Affair/7.gif',
  'assets/imgs/Faceless Affair/8.gif',
  'assets/imgs/Faceless Affair/9.gif',
  'assets/imgs/Faceless Affair/10.gif',
  'assets/imgs/Faceless Affair/11.gif',
  'assets/imgs/Faceless Affair/12.gif',
];

const ResearchDeckCallout: React.FC<{ deckUrl?: string }> = ({ deckUrl = 'https://www.figma.com/deck/7hFmhIFG2ls91PCwOjp4BE/MTA-Research?node-id=2052-43&t=PWkMRcQVca9G6R5P-1' }) => (
  <div className="rounded-2xl bg-[#e0e7ff] p-8 md:p-10 max-w-2xl">
    <p className="text-xl md:text-2xl font-light font-['IBM_Plex_Serif'] text-gray-900 mb-2">
      Interested in learning more about my process?
    </p>
    <p className="text-base md:text-lg font-light text-gray-700 mb-6">
      See my full research deck here.
    </p>
    <a
      href={deckUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-6 py-3 rounded-xl bg-[#212529] text-white text-sm font-medium hover:opacity-90 transition-opacity"
    >
      Research Deck
    </a>
  </div>
);

const MTA_GIFS = [
  'assets/MTA/ezgif.com-optimize (1).gif',
  'assets/MTA/Air7GrLLZ576mafZW991PNnKQI-ezgif.com-optimize.gif',
  'assets/MTA/DwXS158YuVYtowiM5GHfhzWJgc-ezgif.com-optimize.gif',
  'assets/MTA/sTA8Ojju19thyUAgmzGCvHflo-ezgif.com-optimize.gif',
];

const CaseStudyView: React.FC<CaseStudyViewProps> = ({ study }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const isMcdonalds = study.slug === 'mcdonalds-game';
  const isHigherEd = study.slug === 'higher-ed-campaign' || study.id === 4;
  const isMTA = study.slug === 'mta-open-source' || study.id === 2;
  const isEditorial = study.slug === 'editorial-design' || study.id === 5;
  const isFaceless = study.slug === 'faceless-affair' || study.id === 3;
  const isVivBrand = study.slug === 'viv-brand-project' || study.id === 8;
  const isLululemon = study.slug === 'lululemon-campaign' || study.id === 6;

  const sections = isMcdonalds
    ? [
        { id: 'overview', label: 'Background' },
        { id: 'changeables', label: 'Changeables' },
        { id: 'anime-uno', label: 'Anime x Uno' },
        { id: 'speculative', label: 'Speculative MLB' },
        { id: 'final', label: 'Final Thoughts' },
      ]
    : isHigherEd
    ? [
        { id: 'overview', label: 'Digital campaigns' },
        { id: 'visuals', label: 'Gallery' },
      ]
    : isMTA
    ? [
        { id: 'overview', label: 'Background' },
        { id: 'process', label: 'Process' },
        { id: 'features', label: 'Features' },
        { id: 'final', label: 'Final Thoughts' },
      ]
    : isVivBrand
    ? [
        { id: 'visual-style', label: 'Visual Style' },
        { id: 'typography-logo', label: 'Typography + Logo' },
        { id: 'applications', label: 'Applications' },
        { id: 'conclusion', label: 'Conclusion' },
      ]
    : isEditorial
    ? [
        { id: 'overview', label: 'Overview' },
        { id: 'third-place', label: 'The Third Place' },
        { id: 'georgetown', label: 'Georgetown Magazines' },
        { id: 'nightly', label: 'The Nightly' },
      ]
    : isFaceless
    ? [
        { id: 'overview', label: 'Background' },
        { id: 'experience', label: 'The Experience' },
        { id: 'how-might-we', label: 'How Might We' },
        { id: 'journey', label: 'User Journey' },
        { id: 'visual-design', label: 'Visual Design' },
        { id: 'final', label: 'Final Thoughts' },
      ]
    : isLululemon
    ? [
        { id: 'overview', label: 'Overview' },
        { id: 'visual-identity', label: 'Visual Identity' },
        { id: 'gallery', label: 'Gallery' },
      ]
    : [
        { id: 'overview', label: 'Overview' },
        { id: 'challenge', label: 'The Challenge' },
        { id: 'process', label: 'Process' },
        { id: 'visuals', label: 'Visual System' },
        { id: 'final', label: 'Final Result' },
      ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Space for navbar
      const offsetPosition = window.scrollY + element.getBoundingClientRect().top - offset;

      // Keep the index highlight stable during smooth scrolling.
      setActiveSection(id);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const updateActiveSection = () => {
      const offset = 160;
      let current = sections[0]?.id ?? 'overview';

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= offset) {
          current = section.id;
        } else {
          break;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- section ids come from study.slug via render; list must match that study only
  }, [study.slug]);

  return (
    <div className="w-full min-w-0 text-black bg-white min-h-screen">
      {/* 1. Impact Hero Image */}
      <div className="w-full h-[52vh] md:h-[59vh] relative overflow-hidden bg-black flex items-center justify-center">
        <img 
          src={normalizeAssetSrc(
            isMcdonalds
              ? 'assets/imgs/Mcdonalds/ld4tdsEQzQw9aIQj47eO0ZamxY (1).avif'
              : isMTA
              ? 'assets/MTA/Air7GrLLZ576mafZW991PNnKQI-ezgif.com-optimize.gif'
              : isVivBrand
              ? 'assets/imgs/Viv Brand/heroImage.jpg'
              : isLululemon
              ? LULU_HERO
              : study.slug === 'editorial-design'
              ? 'assets/imgs/Editorial/2I7GWougET3BKSbEA8Rqq5vg.png'
              : study.imageUrl
          )}
          alt={study.title}
          className={`h-full opacity-90 transition-opacity duration-1000 ${
            isMTA ? 'w-auto max-w-[70%] object-contain' : 'w-full object-cover'
          }`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto pt-16 md:pt-20 pb-48">
          {/* Header Section */}
          <div className="mb-24 md:mb-32">
            <FadeInSection>
              <p className="text-[10px] md:text-xs font-normal uppercase tracking-[0.15em] text-gray-400 mb-4 font-mono-tag">
                {study.category || "Case Study"}
              </p>
              <h1 className="text-[1.9125rem] md:text-[3.825rem] font-light font-['IBM_Plex_Serif'] tracking-tight mb-6 leading-[1.0] text-gray-900 max-w-3xl">
                {study.title}
              </h1>
              <p className="text-[0.875rem] md:text-[1.3125rem] text-gray-400 font-light leading-snug max-w-2xl mb-16">
                {study.subhead || study.description}
              </p>
            </FadeInSection>
            
            <FadeInSection className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 pt-8 border-t border-gray-100">
              <div>
                <p className="text-[10px] uppercase tracking-normal text-black font-bold mb-3 font-mono-tag">Timeline</p>
                <p className="text-gray-400 text-sm font-light">{study.timeline || '5 Weeks'}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-normal text-black font-bold mb-3 font-mono-tag">Role</p>
                <p className="text-gray-400 text-sm font-light whitespace-pre-line">{study.role || 'Designer,\nDeveloper'}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-normal text-black font-bold mb-3 font-mono-tag">Tools</p>
                <p className="text-gray-400 text-sm font-light">{study.tools || 'Figma, React'}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-normal text-black font-bold mb-3 font-mono-tag">Year</p>
                <p className="text-gray-400 text-sm font-light">{study.year ?? '2024'}</p>
              </div>
            </FadeInSection>
          </div>

          {/* Sticky Container */}
          <div className="flex flex-col md:flex-row gap-10 lg:gap-24 items-start">
            {/* Index Sidebar (hidden on mobile) */}
            <aside className="hidden md:block md:w-[120px] sticky top-40 mb-12 md:mb-0 h-fit shrink-0 md:-ml-6 lg:-ml-10">
              <nav className="flex flex-col gap-6">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left text-[10px] md:text-[12px] uppercase tracking-widest transition-all duration-500 ${
                      activeSection === section.id 
                        ? 'text-black font-bold opacity-100 scale-105 origin-left' 
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content Body */}
            <div className="min-w-0 flex-1 space-y-[6.4rem] overflow-x-clip">
              {isHigherEd ? (
                <>
                  <section id="overview" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Digital campaigns" />
                      <p className="text-gray-600 font-light text-lg leading-relaxed max-w-2xl">
                        While at Viv Higher Ed, I have designed multiple higher education campaigns. For these campaigns, I created moodboards, designed concepts, animated videos, and resized assets for a variety of digital channels.
                      </p>
                    </FadeInSection>
                  </section>

                  <section id="visuals" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Gallery" />
                      <div className="space-y-8">
                        <GalleryBlockHeading
                          title={HIGHER_ED_GALLERY_CAPTIONS[4].title}
                          description={HIGHER_ED_GALLERY_CAPTIONS[4].description}
                        />
                        <HigherEdRooseveltSlideshow />
                        <div className="relative w-full">
                          <img
                            src={encodeURI(HIGHER_ED_DESKTOP[0])}
                            alt="Roosevelt University campaign"
                            className="block h-auto w-full"
                          />
                        </div>
                        <GalleryBlockHeading
                          title={HIGHER_ED_GALLERY_CAPTIONS[0].title}
                          description={HIGHER_ED_GALLERY_CAPTIONS[0].description}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-stretch">
                          <div className="flex items-center justify-center overflow-hidden sm:col-span-1 p-4">
                            <img src={encodeURI(HIGHER_ED_ROW_1[0])} alt="TPP Music Engineering" className="h-full w-[75%] max-w-full object-contain object-center rounded-lg" />
                          </div>
                          <div className="flex items-center justify-center overflow-hidden sm:col-span-2">
                            <img src={encodeURI(HIGHER_ED_ROW_1[1])} alt="Higher ed campaign" className="h-full w-auto max-w-full object-contain object-center" />
                          </div>
                        </div>
                        <div className="relative w-full">
                          <img src={encodeURI(HIGHER_ED_ROW_2_FULL)} alt="Higher ed campaign" className="w-full h-auto block" />
                        </div>
                        <GalleryBlockHeading
                          title={HIGHER_ED_GALLERY_CAPTIONS[1].title}
                          description={HIGHER_ED_GALLERY_CAPTIONS[1].description}
                        />
                        <div className="relative w-full">
                          <img src={encodeURI(HIGHER_ED_ROW_3_FULL)} alt="Higher ed campaign" className="w-full h-auto block" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[22px]">
                          {HIGHER_ED_ROW_2_SIMMONS.map((src, i) => (
                            <div key={i} className="relative w-full flex items-center justify-center p-6">
                              <img src={encodeURI(src)} alt={`Simmons campaign ${i + 1}`} className="w-[75%] h-auto block rounded-lg" />
                            </div>
                          ))}
                        </div>
                        <GalleryBlockHeading
                          title={HIGHER_ED_GALLERY_CAPTIONS[2].title}
                          description={HIGHER_ED_GALLERY_CAPTIONS[2].description}
                        />
                        <div className="relative w-full">
                          <img src={encodeURI(HIGHER_ED_BETWEEN_GIFS)} alt="Higher ed campaign" className="w-full h-auto block" />
                        </div>
                        <GalleryBlockHeading
                          title={HIGHER_ED_GALLERY_CAPTIONS[3].title}
                          description={HIGHER_ED_GALLERY_CAPTIONS[3].description}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[22px]">
                          {HIGHER_ED_ROW_3_UNNAMED.map((src, i) => (
                            <div key={i} className="relative w-full flex items-center justify-center p-6">
                              <img src={encodeURI(src)} alt={`Campaign ${i + 1}`} className="w-[75%] h-auto block rounded-lg" />
                            </div>
                          ))}
                        </div>
                        {HIGHER_ED_DESKTOP.slice(1).map((src, i) => (
                          <div key={src}>
                            <GalleryBlockHeading
                              title={HIGHER_ED_GALLERY_CAPTIONS[5 + i].title}
                              description={HIGHER_ED_GALLERY_CAPTIONS[5 + i].description}
                            />
                            <div className="relative w-full">
                              <img src={encodeURI(src)} alt={`Higher ed desktop ${i + 1}`} className="w-full h-auto block" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </FadeInSection>
                  </section>
                </>
              ) : isMcdonalds ? (
                <>
                  <section id="overview" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Background" />
                      <p className="max-w-2xl text-gray-600 font-light text-lg leading-relaxed">
                        I worked as a designer on the McDonald's powerups team at The Marketing Store for 6 months. The digital team focuses on designing mobile games that pair with current Happy Meal toy series. I worked on the UI design, websites, character and background illustrations, QA testing, and animation storyboards for multiple mobile web games. The games I designed for included IPs from anime, McDonald's original characters, and movies.
                      </p>
                    </FadeInSection>
                  </section>

                  <section id="changeables" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Changeables" />
                      <div className="space-y-10">
                        <p className="text-gray-600 font-light text-lg leading-relaxed max-w-2xl">
                          The Changeables happy meal was a revamp of the transforming toys first released in the 80s. For this campaign, I got to storyboard, from low to high-fidelity, the intro video for the accompanying mobile game. This project leaned into retro pixel art, nostalgia, and colorful sci-fi inspired landscapes.
                        </p>
                        <ChangeablesSequenceSlideshow />
                        <div className="space-y-[31px]">
                          <p className="text-gray-600 font-light text-lg leading-relaxed max-w-2xl">
                            The storyboards evolved through different rounds. The journey evolved to ensure that gameplay such as collecting Happy Meals, freezing enemies, and Changeables transformations were featured. See below for the final intro, motion design done by the motion design team at tms.
                          </p>
                          <ChangeablesIntroVideo />
                        </div>
                        <div className="pt-6">
                          <h3 className="max-w-2xl text-2xl font-serif-heading font-semibold text-gray-900 mb-4">
                            Background illustrations
                          </h3>
                          <p className="text-gray-600 font-light text-lg leading-relaxed max-w-2xl mb-8">
                            I also had the chance to explore what the different environments the Changeables live in might look like. A couple of the assets and illustrations even snuck into the final intro video as background elements.
                          </p>
                        </div>
                      </div>
                    </FadeInSection>
                    <ChangeablesBackgroundMarquee />
                  </section>

                  <section id="anime-uno" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Anime x Uno" />
                      <div>
                        <p className="mb-10 text-gray-600 font-light text-lg leading-relaxed max-w-2xl">
                          This project was a Happy Meal collaboration between Uno and four anime properties. For this project, in addition to designing UX screens, I storyboarded the intro video for a digital game of Uno where the player can battle against characters from Naruto, SpyxFamily, Boruto, and My Hero Academia. The challenge was to make sure McDonald&apos;s, the anime properties, and Uno were all equally represented. I came up with the idea of a flying Uno card guiding the motion design and using colorful slices to differentiate the animes and characters.
                        </p>
                        <div className="flex w-full flex-row flex-nowrap items-center gap-2">
                          <div className="min-w-0 flex-1">
                            <img
                              src={normalizeAssetSrc(MCDONALDS_ANIME_UNO_STILL)}
                              alt="Anime x Uno storyboard still"
                              loading="lazy"
                              decoding="async"
                              draggable={false}
                              className="block h-auto w-full max-w-full object-contain object-center"
                            />
                          </div>
                          <div className="w-[26%] shrink-0 basis-[26%] min-w-0 sm:w-[25.53%] sm:basis-[25.53%]">
                            <img
                              src={normalizeAssetSrc(MCDONALDS_ANIME_UNO_INTRO_GIF)}
                              alt="Anime x Uno intro storyboard animation"
                              loading="lazy"
                              decoding="async"
                              draggable={false}
                              className="block h-auto w-full object-contain object-center"
                            />
                          </div>
                        </div>
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="speculative" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Speculative MLB campaign" />
                      <p className="text-gray-600 font-light text-lg leading-relaxed max-w-2xl">
                        While at tms, I worked on a speculative design project where teams explored different potential sports collaborations. My team focused on the World Series and MLB, and I designed, 3D-modelled, and art directed all aspects of the project.
                      </p>
                    </FadeInSection>
                  </section>

                  <section id="visuals" className="scroll-mt-40">
                    <FadeInSection>
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-8">
                          {MCDONALDS_GALLERY_GRID_4.map((src, i) => (
                            <div key={i} className="relative overflow-hidden aspect-[4/3]">
                              <img
                                src={normalizeAssetSrc(src)}
                                alt={`McDonald's project ${i + 1}`}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="relative w-full">
                          <img
                            src={normalizeAssetSrc(MCDONALDS_SPECULATIVE_MLB_SCREENSHOT)}
                            alt="Speculative MLB campaign"
                            loading="lazy"
                            decoding="async"
                            className="block h-auto w-full"
                          />
                        </div>
                        <div className="relative w-full">
                          <img
                            src={normalizeAssetSrc(MCDONALDS_FULL_WIDTH_1)}
                            alt="McDonald's project"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-auto block"
                          />
                        </div>
                        <div className="relative w-full">
                          <img
                            src={normalizeAssetSrc(MCDONALDS_FULL_WIDTH_2)}
                            alt="McDonald's project"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-auto block"
                          />
                        </div>
                        {MCDONALDS_GALLERY_ROW_2.map((src, i) => (
                          <div key={i} className="relative w-full">
                            <img
                              src={normalizeAssetSrc(src)}
                              alt={`McDonald's project ${i + 5}`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-auto block"
                            />
                          </div>
                        ))}
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="final" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Final Thoughts" />
                      <p className="text-gray-600 font-light text-lg leading-relaxed max-w-2xl">
                        Designing for games with global releases that required localization, coordination with the packaging and toys teams, and input from IP owners made me realize the importance of a flexible design system.
                      </p>
                    </FadeInSection>
                  </section>
                </>
              ) : isMTA ? (
                <>
                  <section id="overview" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Background" />
                      <p className="text-gray-600 font-light text-lg leading-relaxed max-w-2xl">
                        The MTA publishes open source data on their website on a variety of topics. I wanted to challenge myself to create a data visualization of their user ridership data. I decided to combine this data set with publicly-available weather data.
                      </p>
                      <div className="mt-8">
                        <a
                          href="/mta-transit/"
                          className="inline-block rounded-xl bg-[#212529] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                        >
                          View live visualization
                        </a>
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="process" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Process" />
                      <div className="text-gray-600 font-light text-lg leading-relaxed space-y-12 max-w-4xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                          <div>
                            <h3 className="text-base font-semibold text-gray-900 mb-2">Low-Fidelity Sketches</h3>
                            <p>Initial sketches included linear bar graphs and scatter plots but evolved into a radial format for a compact solution. User testing with early wireframes revealed that radial designs were more intuitive for visualizing cyclic patterns.</p>
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-gray-900 mb-2">Figma Prototype</h3>
                            <p>I developed a high-fidelity prototype in Figma of the sidebar to visualize how users might interact with the data.</p>
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-gray-900 mb-2">Code Development</h3>
                            <p><strong>Data Cleaning:</strong> Python for preprocessing. <strong>Visualization:</strong> D3.js for creating interactive radial graphs. <strong>User Interface:</strong> HTML, CSS for web development.</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 mb-2">Animated Weather Patterns</h3>
                          <p>I animated four different weather patterns in Adobe AfterEffects to add a responsive visual element in the center of the circle chart.</p>
                        </div>
                        <div className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden">
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/FyN8XrWWyM8?autoplay=1&mute=1&loop=1&playlist=FyN8XrWWyM8&playsinline=1&rel=0&controls=0&modestbranding=1&iv_load_policy=3&disablekb=1&cc_load_policy=0&fs=0"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full pointer-events-none"
                          />
                        </div>
                        <ResearchDeckCallout />
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="features" className="scroll-mt-40 bg-gray-100 rounded-2xl -mx-6 md:mx-0 lg:mx-0 px-6 md:px-12 lg:px-16 py-12 md:py-16">
                    <FadeInSection>
                      <SectionHeading title="Features" />
                      <div className="text-gray-600 font-light text-lg leading-relaxed space-y-12">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 mb-2 max-w-2xl">Transit Mode Selection</h3>
                          <p className="max-w-2xl">Users can toggle between buses, trains, or both using the lefthand side bar.</p>
                          <div className="mt-6 w-full">
                            <img src={encodeURI(MTA_GIFS[3])} alt="Transit mode selection" className="w-full h-auto block rounded-lg" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 mb-2 max-w-2xl">Temperature</h3>
                          <p className="max-w-2xl">Users can specify a specific temperature range by manually inputting the highest and lowest temperatures, or by simply using the slider bar.</p>
                          <div className="mt-6 w-full">
                            <img src={encodeURI(MTA_GIFS[0])} alt="Temperature controls" className="w-full h-auto block rounded-lg" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 mb-2 max-w-2xl">Weather Patterns</h3>
                          <p className="max-w-2xl">I simplified the range of weather patterns into four categories; sunny, cloudy, snowy, and rainy. Users can select each or multiple to see where the weather patterns overlap. For example, selecting both rainy and cloudy, or both sunny and snowy.</p>
                          <div className="mt-6 w-full">
                            <img src={encodeURI(MTA_GIFS[2])} alt="Weather patterns" className="w-full h-auto block rounded-lg" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 mb-2 max-w-2xl">Hover States</h3>
                          <p className="max-w-2xl">By hovering over the transport mode/population graphs users can see the weather information and daily average of riders. By hovering over the temperature range circle, an animation of each weather pattern is displayed in the center of the visualization.</p>
                          <div className="mt-6 w-full">
                            <img src={encodeURI(MTA_GIFS[1])} alt="Hover states" className="w-full h-auto block rounded-lg" />
                          </div>
                        </div>
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="final" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Final Thoughts" />
                      <div className="space-y-10 max-w-2xl">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 mb-2">What I Learned</h3>
                          <p className="text-gray-600 font-light text-lg leading-relaxed">
                            By doing the research on what was feasible with D3.js, I was better prepared to create an interactive infographic. There are so many publicly available data sets published by governments, nonprofits, and companies. I am interested in the challenge of making the data more interesting or useful to the average person.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 mb-2">Future Considerations</h3>
                          <ul className="text-gray-600 font-light text-lg leading-relaxed list-disc list-inside space-y-2">
                            <li>Expanding the dataset and refining filter interactions.</li>
                            <li>Experimenting more with UI motion design.</li>
                          </ul>
                        </div>
                      </div>
                    </FadeInSection>
                  </section>
                </>
              ) : isVivBrand ? (
                <>
                  <section id="visual-style" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Visual Style" />
                      <div className="space-y-6 max-w-[1240px] text-gray-600 font-light text-lg leading-relaxed">
                        <p>
                          I was inspired by the use of illustration to convey concepts such as problem-solving and collaboration while conveying friendliness. I gathered imspiration in a moodboard.
                        </p>
                        <div className="relative w-full">
                          <img src={normalizeAssetSrc('assets/imgs/Viv Brand/Moodboard.png')} alt="Viv Brand moodboard" className="w-full h-auto block" />
                        </div>
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="typography-logo" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Typography and Logo explorations" />
                      <div className="space-y-6 max-w-[1240px] text-gray-600 font-light text-lg leading-relaxed">
                        <p>
                          To pair with the illustrations, I used a friendly and approachable serif font combined with hand drawn elements such as lines and notations.
                        </p>
                        <div className="relative w-full">
                          <img src={normalizeAssetSrc('assets/imgs/Viv Brand/Viv_Concept_Doc_Master_006.jpg')} alt="Viv concept visual 006" className="w-full h-auto block" />
                        </div>
                        <div className="relative w-full">
                          <img src={normalizeAssetSrc('assets/imgs/Viv Brand/Viv_Concept_Doc_Master_007.jpg')} alt="Viv concept visual 007" className="w-full h-auto block" />
                        </div>
                        <div className="relative w-full">
                          <img src={normalizeAssetSrc('assets/imgs/Viv Brand/Viv_Concept_Doc_Master_008.jpg')} alt="Viv concept visual 008" className="w-full h-auto block" />
                        </div>
                        <div className="relative w-full">
                          <img src={normalizeAssetSrc('assets/imgs/Viv Brand/Artboard 4-100.jpg')} alt="Viv typography and logo explorations artboard 4" className="w-full h-auto block" />
                        </div>
                        <div className="relative w-full">
                          <img src={normalizeAssetSrc('assets/imgs/Viv Brand/Artboard 3-100.jpg')} alt="Viv typography and logo explorations artboard 3" className="w-full h-auto block" />
                        </div>
                        <div className="relative w-full">
                          <img src={normalizeAssetSrc('assets/imgs/Viv Brand/Artboard 6-100.jpg')} alt="Viv typography and logo explorations artboard 6" className="w-full h-auto block" />
                        </div>
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="applications" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Applications" />
                      <div className="space-y-6 max-w-[1240px] text-gray-600 font-light text-lg leading-relaxed">
                        <p>
                          I designed assets across multiple applications, from digital to environmental.
                        </p>
                        <div className="relative w-full">
                          <img src={normalizeAssetSrc('assets/imgs/Viv Brand/RE_Mark_Up_Posters_001.jpg')} alt="Viv applications posters" className="w-full h-auto block" />
                        </div>
                        <div className="relative w-full">
                          <img src={normalizeAssetSrc('assets/imgs/Viv Brand/RE_Movenment_Website_001.jpg')} alt="Viv applications website" className="w-full h-auto block" />
                        </div>
                        <div className="relative w-full">
                          <img src={normalizeAssetSrc('assets/imgs/Viv Brand/RE_Movement_Presentation.jpg')} alt="Viv applications presentation" className="w-full h-auto block" />
                        </div>
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="conclusion" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Conclusion" />
                      <p className="text-gray-600 font-light text-lg leading-relaxed max-w-3xl">
                        While this concept was scrapped for another direction, I enjoyed the challenge of conveying both seniority and knowledge with approachability and fun.
                      </p>
                    </FadeInSection>
                  </section>
                </>
              ) : isEditorial ? (
                <>
                  <section id="overview" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Editorial Design" />
                      <div className="text-gray-600 font-light text-lg leading-relaxed space-y-6 max-w-[1240px]">
                        <p>
                          Designing for print is how I first learned fundamental design skills such as hierarchy, alignment, and typography.
                        </p>
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="third-place" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="The Third Place" />
                      <div className="text-gray-600 font-light text-lg leading-relaxed space-y-8 max-w-[1240px]">
                        <p>
                          A personal project where I created a magazine about some of Washington DC&apos;s lesser-known attractions.
                          I was interested in exploring the concept of &quot;the third place,&quot; which refers to the social surroundings
                          that are separate from the two usual social environments of home and the workplace.
                        </p>
                        <div className="space-y-6">
                          {EDITORIAL_THIRD_PLACE.map((src, index) => (
                            <div key={index} className="relative w-full">
                              <img
                                src={encodeURI(src)}
                                alt={`The Third Place spread ${index + 1}`}
                                className="w-full h-auto block"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="georgetown" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Georgetown Magazine &amp; Georgetown Health" />
                      <div className="text-gray-600 font-light text-lg leading-relaxed space-y-8 max-w-[1240px]">
                        <p>
                          Each year Georgetown publishes four issues of Georgetown Magazine and four issues of Georgetown Health.
                          I have designed multiple features, created illustrations, scheduled photoshoots, delved into research
                          for articles, and on one occasion acted as a hand model.
                        </p>
                        <div className="space-y-6">
                          {EDITORIAL_GEORGETOWN.map((src, index) => (
                            <div key={index} className="relative w-full">
                              <img
                                src={encodeURI(src)}
                                alt={`Georgetown magazine spread ${index + 1}`}
                                className="w-full h-auto block"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="nightly" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="The Nightly" />
                      <div className="text-gray-600 font-light text-lg leading-relaxed space-y-8 max-w-[1240px]">
                        <p>
                          Spreads from a 32-page magazine I designed about dreams and sleep. For the &quot;Sleep Experts&quot; article,
                          we interviewed experts including writers, psychologists, and scientists studying sleep.
                        </p>
                        <div className="space-y-6">
                          {EDITORIAL_NIGHTLY.map((src, index) => (
                            <div key={index} className="relative w-full">
                              <img
                                src={encodeURI(src)}
                                alt={`The Nightly spread ${index + 1}`}
                                className="w-full h-auto block"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </FadeInSection>
                  </section>
                </>
              ) : isFaceless ? (
                <>
                  <section id="overview" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Background" />
                      <div className="text-gray-600 font-light text-lg leading-relaxed space-y-8 max-w-2xl">
                        <p>
                          This project was created at VCU Brandcenter for our Physical Computing class. Our task was to design an experience with physical and digital components for a piece of media.
                          Our team chose <em>Knives Out</em> for our piece of media, a movie series about Benoit Blanc, a detective who solves mysteries.
                        </p>
                      </div>
                      {FACELESS_IMAGES[0] && (
                        <div className="relative w-full mt-8">
                          <img
                            src={FACELESS_IMAGES[0]}
                            alt="Faceless Affair key art"
                            className="w-full h-auto block [clip-path:inset(0_5px_0_0)]"
                          />
                        </div>
                      )}
                    </FadeInSection>
                  </section>

                  <section id="experience" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="The Experience" />
                      <div className="text-gray-600 font-light text-lg leading-relaxed space-y-8 max-w-2xl">
                        <p>
                          We landed on creating a murder mystery game with an additional digital app component. We decided on this strategy because, like the <em>Knives Out</em> movie series, we wanted
                          to add a twist to a classic format.
                        </p>
                      </div>
                      {FACELESS_IMAGES[1] && (
                        <div className="relative w-full mt-8">
                          <img
                            src={FACELESS_IMAGES[1]}
                            alt="Faceless Affair app overview"
                            className="w-full h-auto block"
                          />
                        </div>
                      )}
                    </FadeInSection>
                  </section>

                  <section id="how-might-we" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="How Might We…" />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600 font-light text-lg leading-relaxed max-w-[65%]">
                        <p>Translate the experience of watching a movie or piece of media into an interactive experience?</p>
                        <p>Engage the user both in a physical and digital environment?</p>
                        <p>Refresh the classic murder-mystery dinner format into something new?</p>
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="journey" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="The User Journey" />
                      <div className="text-gray-600 font-light text-lg leading-relaxed space-y-8 max-w-2xl">
                        <p>
                          Our team spent a lot of time—and used countless flash cards—to figure out the game system for the experience. We explored multiple versions of the game and thought about
                          questions such as: Are all the characters completing the same actions? How are they interacting with the physical and digital space? What are the win/lose cases?
                        </p>
                        <p>
                          Ultimately, we settled on a game where one player becomes the murderer while the rest of the group acts as detectives. However, both teams complete the same scanning action
                          with their phones to collect clues in their inventory. While the murderer is looking for clues to solve the original “fabulous prize” task, the rest of the characters are
                          looking for clues about the murderer.
                        </p>
                        {FACELESS_IMAGES[2] && (
                          <div className="relative w-full rounded-2xl bg-gray-800 p-3 md:p-4 overflow-hidden">
                            <img
                              src={FACELESS_IMAGES[2]}
                              alt="Faceless Affair journey map"
                              className="w-full h-auto block rounded-xl"
                            />
                          </div>
                        )}
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="visual-design" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Visual & Experience Design" />
                      <div className="text-gray-600 font-light text-lg leading-relaxed space-y-10 max-w-[1240px]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                          <div>
                            <h3 className="text-base font-semibold text-gray-900 mb-1">Visual Design</h3>
                            <p className="">
                              I designed the logo in Adobe Illustrator, aiming to straddle the line between whimsical and elegant. We created imagery using Midjourney for the host character and
                              environments. In the future, I hope to further develop this project by 3D modeling each room the players go through.
                            </p>
                          </div>
                            {FACELESS_GIFS[0] && (
                              <div className="relative w-full flex justify-center">
                                <img
                                  src={FACELESS_GIFS[0]}
                                  alt="Faceless Affair visual design animation"
                                  className="w-full md:max-w-[65%] h-auto block rounded-[3rem]"
                                />
                              </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                          <div>
                            <h3 className="text-base font-semibold text-gray-900 mb-1">Digital Invitation</h3>
                            <p className="">
                              The players receive a digital invitation via text link that leads to a puzzle and an invitation to the manor, setting the tone for the experience before they arrive.
                            </p>
                          </div>
                            {FACELESS_GIFS[1] && (
                              <div className="relative w-full flex justify-center">
                                <img
                                  src={FACELESS_GIFS[1]}
                                  alt="Faceless Affair digital invitation"
                                  className="w-full md:max-w-[65%] h-auto block rounded-[3rem]"
                                />
                              </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                          <div>
                            <h3 className="text-base font-semibold text-gray-900 mb-1">Character Selection</h3>
                            <p className="">
                              Through the app, players are introduced to the cast of characters and select their role for the evening, aligning narrative expectations with gameplay.
                            </p>
                          </div>
                            {FACELESS_GIFS[2] && (
                              <div className="relative w-full flex justify-center">
                                <img
                                  src={FACELESS_GIFS[2]}
                                  alt="Faceless Affair face filter"
                                  className="w-full md:max-w-[65%] h-auto block rounded-[3rem]"
                                />
                              </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                          <div>
                            <h3 className="text-base font-semibold text-gray-900 mb-1">The Manor & Entry</h3>
                            <p className="">
                              When the players enter the manor, they receive phones with the app pre-loaded in the reception room at the beginning of the experience. Each phone has a privacy screen to
                              prevent other players from looking at each other’s screens.
                            </p>
                          </div>
                            {FACELESS_GIFS[3] && (
                              <div className="relative w-full flex justify-center">
                                <img
                                  src={FACELESS_GIFS[3]}
                                  alt="Faceless Affair manor entry"
                                  className="w-full md:max-w-[65%] h-auto block rounded-[3rem]"
                                />
                              </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                          <div className="md:col-span-1">
                            <h3 className="text-base font-semibold text-gray-900 mb-1">Scanning for Clues</h3>
                            <p className="">
                              Players can scan items marked with a special symbol and collect them in their digital inventory. I modeled the clue items in the 3D app Nomad and added additional texture in
                              Blender.
                            </p>
                          </div>
                          {(FACELESS_GIFS[5] || FACELESS_GIFS[6] || FACELESS_GIFS[4]) && (
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                              {[FACELESS_GIFS[5], FACELESS_GIFS[6], FACELESS_GIFS[4]].filter(Boolean).map((src, index) => (
                                <div key={index} className="relative w-full flex justify-center">
                                  <img
                                    src={src}
                                    alt={`Faceless Affair scanning clues ${index + 1}`}
                                    className="w-full h-auto block rounded-[3rem]"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                          <div className="md:col-span-1">
                            <h3 className="text-base font-semibold text-gray-900 mb-1">Accuse the Murderer</h3>
                            <p className="">
                              From the home screen, players can select which player to accuse of being the murderer and solve the mystery. We created distinct win and lose states depending on the
                              outcome of the game.
                            </p>
                          </div>
                            <div className="md:col-span-2 flex gap-6 justify-center items-center">
                              {FACELESS_GIFS[7] && (
                                <div className="relative flex-1 min-w-0 flex justify-center">
                                  <img
                                    src={FACELESS_GIFS[7]}
                                    alt="Faceless Affair accuse the murderer 1"
                                    className="w-full h-auto block rounded-[3rem]"
                                  />
                                </div>
                              )}
                              {FACELESS_GIFS[8] && (
                                <div className="relative flex-1 min-w-0 flex justify-center">
                                  <img
                                    src={FACELESS_GIFS[8]}
                                    alt="Faceless Affair accuse the murderer 2"
                                    className="w-full h-auto block rounded-[3rem]"
                                  />
                                </div>
                              )}
                            </div>
                        </div>

                        {/* Extra gifs as a small motion gallery (any beyond index 8) */}
                        {FACELESS_GIFS.slice(9).length > 0 && (
                          <div className="space-y-4 pt-4">
                            <h3 className="text-base font-semibold text-gray-900 mb-1">Additional Motion Explorations</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                              {FACELESS_GIFS.slice(9).map((src, index) => (
                                <div key={index} className="relative w-full flex justify-center">
                                  <img
                                    src={src}
                                    alt={`Faceless Affair motion ${index + 1}`}
                                    className="w-full md:max-w-[75%] h-auto block rounded-[3rem]"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="final" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Final Thoughts" />
                      <div className="space-y-10 max-w-2xl">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 mb-2">What We Learned</h3>
                          <p className="text-gray-600 font-light text-lg leading-relaxed">
                            Through this project, I became more familiar with app design, game design, and the challenges of translating a cinematic experience into an interactive one that lives across
                            both physical and digital touchpoints.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 mb-2">Future Considerations</h3>
                          <ul className="text-gray-600 font-light text-lg leading-relaxed list-disc list-inside space-y-2">
                            <li>Building out the rest of the characters and clues.</li>
                            <li>Creating alternate plots for different characters as the murderer.</li>
                            <li>Potentially expanding to new rooms and settings.</li>
                          </ul>
                        </div>
                      </div>
                    </FadeInSection>
                  </section>
                </>
              ) : isLululemon ? (
                <>
                  <section id="overview" className="scroll-mt-40">
                    <FadeInSection>
                      <div className="text-gray-600 font-light text-lg leading-relaxed space-y-12 max-w-2xl">
                        <p>
                          Campaign developed with Charlie Henson (AD), Laura Farina (ST), Julia Daum (ST), Ross Atkinson (CW), and Adam Fuller (CW).
                        </p>
                        <div className="space-y-4">
                          <h3 className="text-base font-semibold text-gray-900">Problem</h3>
                          <p>
                            Millennial women have been cultured to be harsh on themselves, leading to feeling disconnected from their bodies.
                          </p>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-base font-semibold text-gray-900">Strategy</h3>
                          <p>Present feeling comfortable in your body as the beginning to feeling comfortable in the world.</p>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-base font-semibold text-gray-900">Creative Insight</h3>
                          <p>
                            Your home is the place where you feel the most comfortable. But home is a feeling, not a place. And if you feel at home in your body, you’ll feel good everywhere else – and we
                            think that’s something to celebrate.
                          </p>
                        </div>
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="visual-identity" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="The Visual Identity" />
                      <p className="text-gray-600 font-light text-lg leading-relaxed max-w-2xl">
                        For the campaign, we used the visual symbol of a house overlaid on active, vibrant photography.
                      </p>
                    </FadeInSection>
                  </section>

                  <section id="gallery" className="scroll-mt-40">
                    <FadeInSection>
                      <div className="space-y-8">
                        {LULU_GALLERY_FULL.map((src, i) => (
                          <React.Fragment key={src}>
                            <div className="relative w-full">
                              <img
                                src={normalizeAssetSrc(src)}
                                alt={`Lululemon campaign ${i + 1}`}
                                loading="lazy"
                                decoding="async"
                                className="block h-auto w-full"
                              />
                            </div>
                            {i === 2 && (
                              <div className="flex w-full justify-center">
                                <div className="relative inline-block max-w-full">
                                  <img
                                    src={normalizeAssetSrc(LULU_OOH_INTRO_GIF)}
                                    alt="Lululemon campaign motion study"
                                    loading="lazy"
                                    decoding="async"
                                    draggable={false}
                                    className="relative z-0 block h-auto max-h-[min(85vh,920px)] w-auto max-w-full object-contain"
                                  />
                                  <div
                                    aria-hidden
                                    className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-20 bg-gradient-to-t from-white to-transparent"
                                  />
                                </div>
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                        <div className="space-y-4">
                          <div className="max-w-2xl space-y-3">
                            <h3 className="text-base font-semibold text-gray-900">OOH activation</h3>
                            <p className="text-gray-600 font-light text-lg leading-relaxed">
                              Lululemon will sponsor physical activations encouraging people to get outside while feeling at home in their body.
                            </p>
                          </div>
                          <LululemonOohPair />
                        </div>
                      </div>
                    </FadeInSection>
                  </section>
                </>
              ) : (
                <>
                  <section id="overview" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Project Context" />
                      <div className="text-gray-600 font-light text-lg leading-relaxed space-y-12">
                        <p className="max-w-2xl">
                          My approach focused on translating raw architectural intent into fluid human experiences. By dissecting the user journey, we identified friction points that weren't just functional, but emotional.
                        </p>
                        <div className="relative w-full">
                           <img 
                            src={`https://picsum.photos/seed/${study.slug}-context/1800/1100`} 
                            className="w-full h-auto block" 
                            alt="Context visual" 
                          />
                        </div>
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="challenge" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="The Challenge" />
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-5 text-gray-600 font-light text-lg leading-relaxed space-y-8">
                          <p>
                            Designing for complex systems requires a balance of logic and intuition. The primary hurdle was making high-density information feel breathable and actionable.
                          </p>
                          <ul className="space-y-6 text-sm text-gray-500 font-mono-tag">
                            <li className="flex items-start gap-4">
                              <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0" />
                              Bridging the gap between legacy data and modern UI.
                            </li>
                            <li className="flex items-start gap-4">
                              <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0" />
                              Maintaining performance across low-bandwidth environments.
                            </li>
                          </ul>
                        </div>
                        <div className="lg:col-span-7 aspect-square md:aspect-[16/10] overflow-hidden relative flex items-center justify-center">
                            <img src={`assets/imgs/Case1.png`} className="w-full h-full object-contain opacity-80" alt="Challenge visual" />
                        </div>
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="process" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Process" />
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 mb-24">
                        <div className="space-y-6">
                          <span className="text-[10px] text-gray-300 font-bold font-mono-tag">01 / Exploration</span>
                          <p className="text-sm text-gray-600 font-light leading-relaxed">Early sketches and conceptual frameworks.</p>
                        </div>
                        <div className="space-y-6">
                          <span className="text-[10px] text-gray-300 font-bold font-mono-tag">02 / Iteration</span>
                          <p className="text-sm text-gray-600 font-light leading-relaxed">Rapid prototyping and continuous feedback loops.</p>
                        </div>
                        <div className="space-y-6">
                          <span className="text-[10px] text-gray-300 font-bold font-mono-tag">03 / Synthesis</span>
                          <p className="text-sm text-gray-600 font-light leading-relaxed">Finalizing the atomic design language.</p>
                        </div>
                      </div>
                      <div className="w-full">
                          <img src={`https://picsum.photos/seed/${study.slug}-process/2200/1000`} className="w-full h-auto block" alt="Process panorama" />
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="visuals" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Visual System" />
                      <div className="space-y-16">
                        <p className="text-gray-600 font-light text-lg leading-relaxed max-w-2xl">
                          A cohesive visual language was established to ensure brand resonance across all touchpoints.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="aspect-square bg-gray-50 rounded-2xl p-16 flex flex-col justify-center border border-gray-100">
                               <h4 className="font-mono-tag text-[10px] uppercase tracking-widest text-gray-300 mb-12">Typography</h4>
                               <p className="text-5xl md:text-7xl font-serif-heading italic text-black">A a</p>
                               <p className="mt-4 text-xs font-mono-tag text-gray-400">IBM Plex Serif / Regular & Italic</p>
                            </div>
                            <div className="aspect-square bg-gray-50 rounded-2xl p-16 flex flex-col justify-center border border-gray-100">
                               <h4 className="font-mono-tag text-[10px] uppercase tracking-widest text-gray-300 mb-12">Type Scale</h4>
                               <div className="space-y-4">
                                 <div className="h-4 w-full bg-black/80 rounded-full" />
                                 <div className="h-4 w-3/4 bg-black/40 rounded-full" />
                                 <div className="h-4 w-1/2 bg-black/10 rounded-full" />
                               </div>
                            </div>
                        </div>
                      </div>
                    </FadeInSection>
                  </section>

                  <section id="final" className="scroll-mt-40">
                    <FadeInSection>
                      <SectionHeading title="Final Outcome" />
                      <div className="space-y-20">
                        <p className="text-gray-600 font-light text-lg leading-relaxed max-w-2xl">
                          The resulting platform saw a 40% increase in user engagement by simplifying complex navigation and prioritizing contextual information.
                        </p>
                        <div className="w-full">
                            <img src={`https://picsum.photos/seed/${study.slug}-final/2000/1125`} className="w-full h-auto block" alt="Final product" />
                        </div>
                      </div>
                    </FadeInSection>
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyView;
