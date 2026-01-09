import React from 'react';
import { Page } from '../types';

interface FooterProps {
  onPageChange: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const handleLinkClick = (page: Page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full pb-12 transition-colors duration-700">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="bg-[#F0E6FF] rounded-[8pt] p-8 md:p-12 text-black">
          {/* Main Footer Layout: Flexbox to push content to extremes */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-24">
            
            {/* Left Side: Contact */}
            <div className="flex flex-col mb-16 md:mb-0">
              <p className="text-[10px] uppercase tracking-[0.2em] font-mono-tag text-black/40 mb-4 md:mb-6">Contact</p>
              <a 
                href="mailto:wandafelsen@gmail.com" 
                className="text-lg md:text-xl font-medium hover:opacity-50 transition-opacity"
              >
                wandafelsen@gmail.com
              </a>
            </div>

            {/* Right Side: Grouped Navigation and Links (Pushed to the far right) */}
            <div className="flex flex-col sm:flex-row gap-12 md:gap-20 lg:gap-24">
              
              {/* Navigation Column */}
              <div className="min-w-[140px]">
                <p className="text-[10px] uppercase tracking-[0.2em] font-mono-tag text-black/40 mb-6">Navigation</p>
                <nav className="flex flex-col gap-4">
                  <button 
                    onClick={() => handleLinkClick(Page.WORK)}
                    className="text-xl md:text-2xl font-semibold flex items-center gap-2 hover:translate-x-2 transition-transform w-fit text-left"
                  >
                    Work <span className="text-sm">↗</span>
                  </button>
                  <button 
                    onClick={() => handleLinkClick(Page.PLAYGROUND)}
                    className="text-xl md:text-2xl font-semibold flex items-center gap-2 hover:translate-x-2 transition-transform w-fit text-left"
                  >
                    Playground <span className="text-sm">↗</span>
                  </button>
                  <button 
                    onClick={() => handleLinkClick(Page.ABOUT)}
                    className="text-xl md:text-2xl font-semibold flex items-center gap-2 hover:translate-x-2 transition-transform w-fit text-left"
                  >
                    About <span className="text-sm">↗</span>
                  </button>
                </nav>
              </div>

              {/* Links Column */}
              <div className="min-w-[140px]">
                <p className="text-[10px] uppercase tracking-[0.2em] font-mono-tag text-black/40 mb-6">Links</p>
                <nav className="flex flex-col gap-4">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xl md:text-2xl font-semibold flex items-center gap-2 hover:translate-x-2 transition-transform w-fit"
                  >
                    LinkedIn <span className="text-sm">↗</span>
                  </a>
                  <button 
                    onClick={() => handleLinkClick(Page.RESUME)}
                    className="text-xl md:text-2xl font-semibold flex items-center gap-2 hover:translate-x-2 transition-transform w-fit text-left"
                  >
                    Resume <span className="text-sm">↗</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Bottom Section: Small Copyright (Line removed) */}
          <div className="flex justify-end">
            <span className="text-xs font-mono-tag uppercase tracking-[0.3em] text-black/40 font-medium">
              © 2026
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;