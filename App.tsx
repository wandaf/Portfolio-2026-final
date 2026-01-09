
import React, { useState, useEffect, useMemo } from 'react';
import { Page, CaseStudy } from './types';
import Navbar from './components/Navbar';
import Branding from './components/Branding';
import Hero from './components/Hero';
import WorkGrid from './components/WorkGrid';
import Footer from './components/Footer';
import Playground from './components/Playground';
import About from './components/About';
import Resume from './components/Resume';
import CaseStudyView from './components/CaseStudyView';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.WORK);
  const [displayPage, setDisplayPage] = useState<Page>(Page.WORK);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentPage !== displayPage) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayPage(currentPage);
        setIsTransitioning(false);
        window.scrollTo(0, 0);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentPage, displayPage]);

  const handleCaseStudySelect = (study: CaseStudy) => {
    setSelectedCaseStudy(study);
    setCurrentPage(Page.CASE_STUDY);
  };

  const handlePageChange = (page: Page) => {
    setSelectedCaseStudy(null);
    setCurrentPage(page);
  };

  // Calculate the "Darkness" progress for the Work page transition
  const darkProgress = useMemo(() => {
    if (displayPage !== Page.WORK) return 0;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
    const startFade = vh * 0.5;
    const endFade = vh * 1.0;
    if (scrollY <= startFade) return 1;
    if (scrollY >= endFade) return 0;
    return 1 - (scrollY - startFade) / (endFade - startFade);
  }, [scrollY, displayPage]);

  // Determine if the current view (or scroll position) requires a Dark Mode (white text/icons)
  const isDarkMode = useMemo(() => {
    if (displayPage === Page.PLAYGROUND) return true;
    if (displayPage === Page.ABOUT || displayPage === Page.RESUME) return false;
    if (displayPage === Page.WORK) return darkProgress > 0.5;
    if (displayPage === Page.CASE_STUDY) {
      const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
      // Case study hero is roughly 80-90vh. Transition to light mode at 70vh scroll.
      return scrollY < vh * 0.7;
    }
    return false;
  }, [scrollY, displayPage, darkProgress]);

  const renderContent = () => {
    switch (displayPage) {
      case Page.WORK:
        return (
          <div className="w-full">
            <Hero />
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-20">
              <WorkGrid onSelectCaseStudy={handleCaseStudySelect} />
            </div>
          </div>
        );
      case Page.PLAYGROUND:
        return (
          <div className="w-full bg-black overflow-x-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
              <Playground />
            </div>
          </div>
        );
      case Page.ABOUT:
        return (
          <div className="w-full">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-32">
              <About />
            </div>
          </div>
        );
      case Page.RESUME:
        return (
          <div className="w-full">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-32">
              <Resume />
            </div>
          </div>
        );
      case Page.CASE_STUDY:
        return selectedCaseStudy ? <CaseStudyView study={selectedCaseStudy} /> : null;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col transition-colors duration-500 ${displayPage === Page.PLAYGROUND ? 'bg-black' : 'bg-white'} selection:bg-gray-500 selection:text-white`}>
      {/* The Fixed Black Veil for the Work page intro */}
      {displayPage === Page.WORK && (
        <div 
          className="fixed inset-0 z-0 bg-black pointer-events-none will-change-opacity"
          style={{ opacity: darkProgress }}
        />
      )}

      <Branding isDarkMode={isDarkMode} onPageChange={handlePageChange} />
      
      <Navbar 
        activePage={currentPage === Page.CASE_STUDY ? Page.WORK : currentPage} 
        onPageChange={handlePageChange} 
        isScrolled={scrollY > 100} 
        isDarkMode={isDarkMode}
      />
      
      <main className={`flex-grow w-full relative z-10 transition-all duration-400 ease-in-out ${isTransitioning ? 'opacity-0 blur-xl' : 'opacity-100 blur-0'}`}>
        {renderContent()}
      </main>

      <Footer onPageChange={handlePageChange} />
    </div>
  );
};

export default App;
