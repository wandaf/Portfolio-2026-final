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

  const glassBg = isDarkMode 
    ? 'bg-white/5 border-white/10' 
    : 'bg-white/70 border-gray-200/50';
  
  const textColor = isDarkMode ? 'text-white/60' : 'text-gray-500';
  const activeColor = isDarkMode ? 'text-white font-medium' : 'text-black font-medium';
  const dotColor = isDarkMode ? 'bg-white' : 'bg-black';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-6">
      <div className={`mt-24 md:mt-8 transition-all duration-700 ease-out pointer-events-auto
        ${isScrolled ? 'translate-y-[-10px]' : 'translate-y-0'}
      `}>
        <div className={`relative px-2 py-1.5 rounded-full border backdrop-blur-xl shadow-2xl transition-colors duration-500 ${glassBg}`}>
          
          <div className="absolute inset-0 rounded-full opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
            }}
          />

          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activePage === item.value;
                return (
                  <button
                    key={item.value}
                    onClick={() => onPageChange(item.value)}
                    className={`relative px-3 md:px-4 py-2 text-[10px] md:text-[12px] uppercase tracking-widest transition-all duration-300 rounded-full hover:bg-white/10 whitespace-nowrap ${
                      isActive ? activeColor : textColor
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${dotColor}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;