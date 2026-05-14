import React from 'react';
import { Page } from '../types';

interface NavbarProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
  isScrolled: boolean;
  isDarkMode?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, onPageChange, isScrolled, isDarkMode }) => {
  const navItems = [
    { label: 'Work', value: Page.WORK },
    { label: 'Playground', value: Page.PLAYGROUND },
    { label: 'About', value: Page.ABOUT },
    { label: 'Resume', value: Page.RESUME },
  ];

  const glassBg = isDarkMode ? 'bg-white/5' : 'bg-white/70';
  const navShadow = 'shadow-[0_0_20px_rgba(0,0,0,0.08)]';
  
  const textColor = isDarkMode ? 'text-white/60' : 'text-gray-500 font-normal';
  const activeColor = isDarkMode ? 'text-white font-medium' : 'text-black font-medium';
  const dotColor = isDarkMode ? 'bg-white' : 'bg-black';
  const navRowHover = isDarkMode
    ? '[&:has(.nav-link:hover)_.nav-link]:opacity-60 [&:has(.nav-link:hover)_.nav-link:hover]:!opacity-100 [&:has(.nav-link:hover)_.nav-link:not(:hover)_.nav-active-dot]:!bg-gray-500 [&:has(.nav-link:hover)_.nav-link:hover_.nav-active-dot]:!bg-white'
    : '[&:has(.nav-link:hover)_.nav-link]:!text-gray-500 [&:has(.nav-link:hover)_.nav-link:hover]:!text-black [&:has(.nav-link:hover)_.nav-link:not(:hover)_.nav-active-dot]:!bg-gray-400 [&:has(.nav-link:hover)_.nav-link:hover_.nav-active-dot]:!bg-black';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-6">
      <div className={`mt-24 md:mt-8 transition-all duration-700 ease-out pointer-events-auto
        ${isScrolled ? 'translate-y-[-10px]' : 'translate-y-0'}
      `}>
        <div className={`relative px-2 py-1.5 rounded-full backdrop-blur-xl transition-colors duration-500 ${navShadow} ${glassBg}`}>
          
          <div className="absolute inset-0 rounded-full opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
            }}
          />

          <div className={`flex items-center gap-1 ${navRowHover}`}>
            {navItems.map((item) => {
              const isActive = activePage === item.value;
              const baseTone = isActive ? activeColor : textColor;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => onPageChange(item.value)}
                  className={`nav-link relative px-3 md:px-4 py-2 text-[10px] md:text-[12px] uppercase tracking-widest whitespace-nowrap rounded-full duration-200 ease-out ${
                    isDarkMode ? 'transition-[opacity,color] hover:text-white' : 'transition-colors'
                  } ${baseTone}`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className={`nav-active-dot absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full ${dotColor}`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;