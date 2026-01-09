
import React, { useState, useEffect } from 'react';
import { Page } from '../types';

interface BrandingProps {
  isDarkMode: boolean;
  onPageChange: (page: Page) => void;
}

const Branding: React.FC<BrandingProps> = ({ isDarkMode, onPageChange }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Shrink from 1.15 to 1.0 over 150px of scroll
  const scrollRange = 150;
  const progress = Math.min(scrollY / scrollRange, 1);
  const scale = 1.15 - (progress * 0.15);
  const nameOpacity = Math.max(0, 1 - scrollY / scrollRange);
  
  // Dynamically collapse width to ensure the button hit-area remains centered on the icon
  const nameMaxWidth = progress >= 1 ? '0px' : '150px';
  const nameMargin = progress >= 1 ? '0rem' : '0.75rem';
  
  const iconRotation = scrollY * 0.2;
  
  // High contrast colors for both dark and light modes
  const colorClass = isDarkMode ? 'text-white' : 'text-[#1a1a1a]';
  
  // Dynamic icon fill:
  // If dark mode (on dark bg): always white.
  // If light mode (on white bg): interpolate from Black (#1a1a1a) to Neon (#ccff00) based on scroll.
  const getIconFill = () => {
    if (isDarkMode) return '#ffffff';
    
    // RGB for #1a1a1a
    const startColor = { r: 26, g: 26, b: 26 };
    // RGB for #ccff00
    const endColor = { r: 204, g: 255, b: 0 };
    
    const r = Math.round(startColor.r + (endColor.r - startColor.r) * progress);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * progress);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * progress);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  const iconFill = getIconFill();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onPageChange(Page.WORK);
    // Smooth scroll to top when navigating or already at home
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="fixed top-6 left-6 md:left-10 md:top-8 z-[60] transition-transform duration-300 ease-out pointer-events-none"
      style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
    >
      <button 
        onClick={handleClick}
        className={`flex items-center group pointer-events-auto cursor-pointer focus:outline-none transition-colors duration-300 ${colorClass}`}
        aria-label="Wanda Felsenhardt - Home & Work"
      >
        <div 
          className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center transition-transform duration-500 ease-out"
          style={{ transform: `rotate(${iconRotation}deg)` }}
        >
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full transition-transform duration-0 ease-in-out group-hover:rotate-[360deg] group-hover:duration-[1000ms]"
          >
            <path 
              d="M50 50 C25 50 10 35 10 10 C35 10 50 25 50 50 Z" 
              style={{ fill: iconFill }}
              className="transition-[fill] duration-100"
            />
            <path 
              d="M50 50 C50 25 65 10 90 10 C90 35 75 50 50 50 Z" 
              style={{ fill: iconFill }}
              className="transition-[fill] duration-100"
            />
            <path 
              d="M50 50 C75 50 90 65 90 90 C65 90 50 75 50 50 Z" 
              style={{ fill: iconFill }}
              className="transition-[fill] duration-100"
            />
            <path 
              d="M50 50 C50 75 35 90 10 90 C10 65 25 50 50 50 Z" 
              style={{ fill: iconFill }}
              className="transition-[fill] duration-100"
            />
          </svg>
        </div>

        <div 
          className="flex items-center h-full overflow-hidden transition-all duration-300 ease-in-out pointer-events-none"
          style={{ 
            opacity: nameOpacity,
            maxWidth: nameMaxWidth,
            marginLeft: nameMargin
          }}
        >
          <span className="text-[12px] md:text-[15px] font-medium uppercase tracking-[0.4em] whitespace-nowrap leading-none flex items-center h-full pt-[2px]">
            Wanda F
          </span>
        </div>
      </button>
    </div>
  );
};

export default Branding;
