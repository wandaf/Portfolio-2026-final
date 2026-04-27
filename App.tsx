
import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CASE_STUDIES } from './constants';
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
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.key !== displayLocation.key) {
      setIsTransitioning(true);
      const timer = window.setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
        setScrollY(0);
        window.scrollTo(0, 0);
      }, 400);
      return () => window.clearTimeout(timer);
    }
  }, [location, displayLocation.key]);

  const handleCaseStudySelect = (study: CaseStudy) => {
    navigate(`/work/${study.slug}`);
  };

  const handlePageChange = (page: Page) => {
    navigate(pageToPath(page));
  };

  const activePage = useMemo(() => pathToActivePage(location.pathname), [location.pathname]);
  const displayPage = useMemo(() => pathToActivePage(displayLocation.pathname), [displayLocation.pathname]);

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

  return (
    <div className={`min-h-screen w-full flex flex-col transition-colors duration-500 ${displayPage === Page.PLAYGROUND ? 'bg-black' : 'bg-white'} selection:bg-gray-500 selection:text-white`}>
      <Branding isDarkMode={isDarkMode} onPageChange={handlePageChange} scrollY={scrollY} />
      
      <Navbar 
        activePage={activePage} 
        onPageChange={handlePageChange} 
        isScrolled={scrollY > 100} 
        isDarkMode={isDarkMode}
      />
      
      <main className={`flex-grow w-full relative z-10 transition-all duration-400 ease-in-out ${isTransitioning ? 'opacity-0 blur-xl' : 'opacity-100 blur-0'}`}>
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

      <Footer onPageChange={handlePageChange} />
    </div>
  );
};

export default App;
