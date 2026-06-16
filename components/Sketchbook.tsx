
import React, { useState, useEffect, useRef } from 'react';
import { publicAsset } from '../utils/publicAsset';

interface Sketch {
  id: number;
  url: string;
  backUrl: string;
  title: string;
}

const SKETCHES: Sketch[] = [
  { 
    id: 0, 
    title: 'Cover', 
    url: 'assets/imgs/Sketchbook/Frame 49.jpg', 
    backUrl: 'assets/imgs/Sketchbook/Frame 48.jpg'
  },
  { 
    id: 1, 
    title: 'Spread 1',
    url: 'assets/imgs/Sketchbook/Frame 47.jpg', 
    backUrl: 'assets/imgs/Sketchbook/Frame 46.jpg'
  },
  { 
    id: 2, 
    title: 'Spread 2',
    url: 'assets/imgs/Sketchbook/Frame 45.jpg', 
    backUrl: 'assets/imgs/Sketchbook/Frame 44.jpg'
  },
  { 
    id: 3, 
    title: 'Spread 3',
    url: 'assets/imgs/Sketchbook/Frame 43.jpg', 
    backUrl: 'assets/imgs/Sketchbook/Frame 42.jpg'
  },
  { 
    id: 4, 
    title: 'Spread 4',
    url: 'assets/imgs/Sketchbook/Frame 41.jpg', 
    backUrl: 'assets/imgs/Sketchbook/Frame 40.jpg'
  },
  { 
    id: 5, 
    title: 'Spread 5',
    url: 'assets/imgs/Sketchbook/Frame 39.jpg', 
    backUrl: 'assets/imgs/Sketchbook/Frame 38.jpg'
  },
  { 
    id: 6, 
    title: 'Back', 
    url: 'assets/imgs/Sketchbook/Frame 37.jpg', 
    backUrl: 'assets/imgs/Sketchbook/Frame 37.jpg'
  },
];

const Sketchbook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const totalPages = SKETCHES.length;
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const closeBook = () => {
    if (isResetting) return;
    setIsResetting(true);
    setCurrentPage(0);
    if (closeTimerRef.current !== null) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setIsResetting(false);
      closeTimerRef.current = null;
    }, 1300);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isResetting) return;

    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    } else if (currentPage === totalPages - 1) {
      closeBook();
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPage > 0 && !isResetting) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 md:py-8 px-4 overflow-visible select-none">
      <style>
        {`
          :root {
            --book-width: clamp(280px, 85vw, 400px);
            --book-height: calc(var(--book-width) * 1.3);
          }

          .book-viewport {
            perspective: 3500px;
            -webkit-perspective: 3500px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: calc(var(--book-height) + 48px);
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
          }

          .book-wrapper {
            position: relative;
            width: var(--book-width);
            height: var(--book-height);
            transform-style: preserve-3d;
            -webkit-transform-style: preserve-3d;
            transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
            will-change: transform;
          }

          .book-wrapper.closing .page-item:first-child {
            z-index: 1000;
            transition: transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1), z-index 0s 0s;
          }

          .page-item {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            transform-origin: left;
            transform-style: preserve-3d;
            -webkit-transform-style: preserve-3d;
            transition: transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1), z-index 0s 0.6s;
            background: transparent;
            pointer-events: none;
            will-change: transform;
          }

          .face {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            pointer-events: auto;
            box-shadow: 0 4px 30px rgba(0,0,0,0.15);
            background: #ffffff;
            transform: translateZ(0.1px);
            -webkit-transform: translateZ(0.1px);
          }

          .face-front {
            border-top-right-radius: 14px;
            border-bottom-right-radius: 14px;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
          }

          .face-back {
            transform: rotateY(180deg) translateZ(0.1px);
            -webkit-transform: rotateY(180deg) translateZ(0.1px);
            border-top-left-radius: 14px;
            border-bottom-left-radius: 14px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
          }

          .spine-accent {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 12px;
            background: linear-gradient(to right, rgba(0,0,0,0.05), transparent);
            z-index: 10;
          }

          .spine-accent-back {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 12px;
            background: linear-gradient(to left, rgba(0,0,0,0.05), transparent);
            z-index: 10;
          }

          @media (max-width: 768px) {
            .book-wrapper {
              transform: translateX(0) !important;
            }
          }
        `}
      </style>

      <div className="flex flex-col items-center gap-6 md:gap-8">
        <p className="text-center text-2xl md:text-3xl font-light font-['IBM_Plex_Serif'] text-white">
          Click to explore
          <br />
          my sketchbook
        </p>

        <div className="book-viewport w-full">
          <div 
            className={`book-wrapper${isResetting ? ' closing' : ''}`}
            style={{ 
              transform: (currentPage > 0 && currentPage < totalPages) ? 'translateX(50%)' : 'translateX(0)' 
            }}
          >
            {SKETCHES.map((sketch, index) => {
              const isFlipped = index < currentPage;
              
              let zIndex;
              if (isFlipped) {
                zIndex = 10 + index;
              } else {
                zIndex = 100 - index;
              }

              return (
                <div 
                  key={sketch.id}
                  className="page-item"
                  style={{ 
                    zIndex,
                    transform: `${isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)'} translateZ(${(totalPages - index) * 0.02}px)`,
                  }}
                >
                  <div 
                    className="face face-front cursor-pointer overflow-hidden"
                    onClick={handleNext}
                  >
                    <div className="spine-accent" />
                    <div className="flex-1 relative bg-[#f9f9f9]">
                      <img 
                        src={publicAsset(sketch.url)} 
                        alt={sketch.title} 
                        className="w-full h-full object-cover pointer-events-none" 
                      />
                    </div>
                  </div>

                  <div 
                    className="face face-back cursor-pointer overflow-hidden"
                    onClick={handlePrev}
                  >
                    <div className="spine-accent-back" />
                    <div className="flex-1 relative bg-[#f9f9f9]">
                      <img 
                        src={publicAsset(sketch.backUrl)} 
                        alt={`${sketch.title} back`} 
                        className="w-full h-full object-cover pointer-events-none" 
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            {SKETCHES.map((_, idx) => (
              <button 
                key={idx} 
                disabled={isResetting}
                onClick={() => setCurrentPage(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentPage ? 'bg-white scale-150 shadow-[0_0_10px_rgba(255,255,255,0.4)]' : 'bg-white/10 hover:bg-white/30'
                }`}
              />
            ))}
          </div>

          <p className="text-[10px] text-white/20 font-mono-tag uppercase tracking-[0.5em] transition-opacity duration-500 h-4">
            {currentPage === 0 
              ? 'Click to Open' 
              : isResetting 
                ? 'Closing...' 
                : `${currentPage} / ${totalPages - 1}`
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sketchbook;
