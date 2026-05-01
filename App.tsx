
import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CASE_STUDIES, FOOTER_PANEL_HEIGHT_PX } from './constants';
import { CaseStudy, Page } from './types';
import Navbar from './components/Navbar';
import Branding from './components/Branding';
import Hero from './components/Hero';
import WorkGrid from './components/WorkGrid';
import Footer from './components/Footer';
import Playground from './components/Playground';
import About from './components/About';
import Resume from './components/Resume';
import CaseStudyView from './components/CaseStudyView';

function pageToPath(page: Page): string {
  switch (page) {
    case Page.WORK:
      return '/';
    case Page.PLAYGROUND:
      return '/playground';
    case Page.ABOUT:
      return '/about';
    case Page.RESUME:
      return '/resume';
    default:
      return '/';
  }
}

function pathToActivePage(pathname: string): Page {
  if (pathname.startsWith('/playground')) return Page.PLAYGROUND;
  if (pathname.startsWith('/about')) return Page.ABOUT;
  if (pathname.startsWith('/resume')) return Page.RESUME;
  // Case studies live under /work/:slug, but nav should highlight Work
  return Page.WORK;
}

const WorkRoute: React.FC<{ onSelectCaseStudy: (study: CaseStudy) => void; scrollY: number }> = ({ onSelectCaseStudy, scrollY }) => {
  return (
    <div className="w-full">
      <Hero scrollY={scrollY} />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-20">
        <WorkGrid onSelectCaseStudy={onSelectCaseStudy} />
      </div>
    </div>
  );
};

const CaseStudyRoute: React.FC = () => {
  const { slug } = useParams();
  const study = useMemo(() => {
    if (!slug) return null;
    return CASE_STUDIES.find((s) => s.slug === slug) ?? null;
  }, [slug]);

  if (!study) return <Navigate to="/" replace />;

  // External case studies are meant to open in a new tab from the grid,
  // but if someone lands here directly, just send them home.
  if (study.externalUrl) return <Navigate to="/" replace />;

  return <CaseStudyView study={study} />;
};

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [scrollY, setScrollY] = useState(0);
  const [maxScrollY, setMaxScrollY] = useState(0);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Animate document title as a subtle marquee
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const base = 'Wanda Felsenhardt | Visual Designer';
    const spacer = '   ';
    const text = base + spacer;
    let index = 0;

    const updateTitle = () => {
      // Rotate the string one character at a time
      const rotated = text.slice(index) + text.slice(0, index);
      document.title = rotated;
      index = (index + 1) % text.length;
    };

    // Set an initial title
    document.title = base;
    const interval = window.setInterval(updateTitle, 250); // ~4 chars per second

    return () => {
      window.clearInterval(interval);
      document.title = base;
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const updateIsMobile = () => setIsMobileViewport(media.matches);
    updateIsMobile();
    media.addEventListener('change', updateIsMobile);
    return () => media.removeEventListener('change', updateIsMobile);
  }, []);

  useEffect(() => {
    const updateScrollMetrics = () => {
      setScrollY(window.scrollY);
      setMaxScrollY(Math.max(0, document.documentElement.scrollHeight - window.innerHeight));
    };
    updateScrollMetrics();
    window.addEventListener('scroll', updateScrollMetrics, { passive: true });
    window.addEventListener('resize', updateScrollMetrics);
    return () => {
      window.removeEventListener('scroll', updateScrollMetrics);
      window.removeEventListener('resize', updateScrollMetrics);
    };
  }, []);

  useEffect(() => {
    if (location.key !== displayLocation.key) {
      setIsTransitioning(true);
      const timer = window.setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
        setScrollY(0);
        window.scrollTo(0, 0);
      }, 300);
      return () => window.clearTimeout(timer);
    }
  }, [location, displayLocation.key]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMaxScrollY(Math.max(0, document.documentElement.scrollHeight - window.innerHeight));
    });
    return () => cancelAnimationFrame(id);
  }, [displayLocation.pathname, isTransitioning]);

  const handleCaseStudySelect = (study: CaseStudy) => {
    navigate(`/work/${study.slug}`);
  };

  const handlePageChange = (page: Page) => {
    navigate(pageToPath(page));
  };

  const activePage = useMemo(() => pathToActivePage(location.pathname), [location.pathname]);
  const displayPage = useMemo(() => pathToActivePage(displayLocation.pathname), [displayLocation.pathname]);
  const isRouteSwitching = location.key !== displayLocation.key;
  /** Destination route while a transition is in flight (`location` updates before `displayLocation`). */
  const targetPage = useMemo(() => pathToActivePage(location.pathname), [location.pathname]);
  /** White crossfade between light pages; black veil when Playground is source or target so we never flash the wrong tone. */
  const transitionVeilLight =
    displayPage !== Page.PLAYGROUND && targetPage !== Page.PLAYGROUND;

  // Gradient → white: 0 = only gradient visible, 1 = white overlay fully visible (for nav/branding and transition)
  const whiteFadeProgress = useMemo(() => {
    if (displayPage !== Page.WORK) return 1;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
    const startFade = vh * 0.22;
    const endFade = vh * 0.9;
    if (scrollY <= startFade) return 0;
    if (scrollY >= endFade) return 1;
    const t = (scrollY - startFade) / (endFade - startFade);
    return t * t * (3 - 2 * t); // smoothstep for softer transition
  }, [scrollY, displayPage]);

  // Nav/branding: dark mode (light text) when we're still on the gradient
  const darkProgress = useMemo(() => 1 - whiteFadeProgress, [whiteFadeProgress]);

  // Determine if the current view (or scroll position) requires a Dark Mode (white text/icons)
  const isDarkMode = useMemo(() => {
    if (displayPage === Page.PLAYGROUND) return true;
    if (displayPage === Page.ABOUT || displayPage === Page.RESUME) return false;
    if (displayPage === Page.WORK) return darkProgress > 0.5;
    return false;
  }, [scrollY, displayPage, darkProgress]);

  const isPlayground = displayPage === Page.PLAYGROUND;

  /** `/work/:slug` case studies use `position: sticky` in the layout; any `transform` on an ancestor breaks it. */
  const isCaseStudyRoute = /^\/work\/[^/]+$/.test(displayLocation.pathname);

  // During the final scroll segment, ease the main layer upward slightly slower than the scroll
  // so the fixed footer feels more "stationary" while the white sheet lifts away.
  const footerRevealParallaxPx = useMemo(() => {
    if (isTransitioning || isCaseStudyRoute || isMobileViewport) return 0;
    const runwayStart = Math.max(0, maxScrollY - FOOTER_PANEL_HEIGHT_PX);
    const inRunway = Math.max(0, scrollY - runwayStart);
    return inRunway * 0.22;
  }, [scrollY, maxScrollY, isTransitioning, isCaseStudyRoute, isMobileViewport]);

  const mainStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    if (footerRevealParallaxPx !== 0) {
      style.transform = `translateY(${footerRevealParallaxPx}px) translateZ(0)`;
    }
    if (isCaseStudyRoute) {
      // Keep sticky sidebar functional (no overflow clipping) while preserving visible rounded bottom corners.
      const clip = 'inset(0 round 0 0 2.5rem 2.5rem)';
      style.clipPath = clip;
      style.WebkitClipPath = clip;
    }
    return style;
  }, [footerRevealParallaxPx, isCaseStudyRoute]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-black selection:bg-gray-500 selection:text-white">
      <Branding isDarkMode={isDarkMode} onPageChange={handlePageChange} scrollY={scrollY} />
      
      <Navbar 
        activePage={activePage} 
        onPageChange={handlePageChange} 
        isScrolled={scrollY > 100} 
        isDarkMode={isDarkMode}
      />
      
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 z-[8] transition-opacity duration-300 ease-in-out ${
            transitionVeilLight ? 'bg-white' : 'bg-black'
          } ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
        />
        <main
          style={mainStyle}
          className={`relative z-10 flex min-h-0 w-full flex-1 rounded-b-[1.75rem] sm:rounded-b-[2rem] md:rounded-b-[2.5rem] transition-opacity duration-300 ease-in-out ${
            isCaseStudyRoute ? 'overflow-visible' : 'overflow-hidden'
          } ${footerRevealParallaxPx !== 0 ? 'will-change-transform' : ''} ${
            isPlayground ? 'bg-black' : 'bg-white'
          } ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        >
          <Routes location={displayLocation}>
            <Route path="/" element={<WorkRoute onSelectCaseStudy={handleCaseStudySelect} scrollY={scrollY} />} />
            <Route
              path="/playground"
              element={
                <div className="w-full bg-black overflow-x-hidden">
                  <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
                    <Playground />
                  </div>
                </div>
              }
            />
            <Route
              path="/about"
              element={
                <div className="w-full">
                  <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-32">
                    <About />
                  </div>
                </div>
              }
            />
            <Route
              path="/resume"
              element={
                <div className="w-full">
                  <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-32">
                    <Resume />
                  </div>
                </div>
              }
            />
            <Route path="/work/:slug" element={<CaseStudyRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Hide during route transition so fixed footer does not sit on screen while main is swapping */}
      <div
        className={`transition-opacity duration-300 ease-in-out ${
          isTransitioning || isRouteSwitching ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        {/* Black runway: scroll distance while the rounded main lifts away; footer stays fixed so its text reads stationary */}
        <div
          className="pointer-events-none relative z-0 w-full shrink-0 bg-black"
          style={{ height: FOOTER_PANEL_HEIGHT_PX }}
          aria-hidden
        />

        <Footer onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default App;
