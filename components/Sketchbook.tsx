
import React, { useState, useEffect } from 'react';

interface Sketch {
  id: number;
  url: string;
  backUrl: string;
  title: string;
}

const SKETCHES: Sketch[] = [
  { 
    id: 0, 
    title: 'Wanda Felsenhardt', 
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200', 
    backUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    id: 1, 
    url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200', 
    backUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=1200',
    title: 'Abstract Flow' 
  },
  { 
    id: 2, 
    url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200', 
    backUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200',
    title: 'Gestural Study' 
  },
  { 
    id: 3, 
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1200', 
    backUrl: 'https://images.unsplash.com/photo-1576770986940-507110c37031?auto=format&fit=crop&q=80&w=1200',
    title: 'Charcoal Texture' 
  },
  { 
    id: 4, 
    url: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=1200', 
    backUrl: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=1200',
    title: 'Anatomy Study' 
  },
  { 
    id: 5, 
    url: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=1200', 
    backUrl: 'https://images.unsplash.com/photo-1508247967583-7d982ea01526?auto=format&fit=crop&q=80&w=1200',
    title: 'Minimal Line' 
  },
  { 
    id: 6, 
    url: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=1200', 
    backUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1200',
    title: 'Ink & Water' 
  },
];

const Sketchbook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const totalPages = SKETCHES.length;

  useEffect(() => {
    if (currentPage === totalPages) {
      setIsResetting(true);
      const timer = setTimeout(() => {
        setCurrentPage(0);
        setIsResetting(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [currentPage, totalPages]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPage < totalPages && !isResetting) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPage > 0 && !isResetting) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12 md:py-24 px-4 overflow-visible select-none">
      <style>
        {`
          :root {
            --book-width: clamp(280px, 85vw, 400px);
            --book-height: calc(var(--book-width) * 1.3);
          }

          .book-viewport {
            perspective: 3500px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: calc(var(--book-height) + 100px);
          }

          .book-wrapper {
            position: relative;
            width: var(--book-width);
            height: var(--book-height);
            transform-style: preserve-3d;
            transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
          }

          .page-item {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            transform-origin: left;
            transform-style: preserve-3d;
            transition: transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1), z-index 0s 0.6s;
            background: transparent;
            pointer-events: none;
          }

          .face {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            pointer-events: auto;
            box-shadow: 0 4px 30px rgba(0,0,0,0.15);
            background: #ffffff;
          }

          .face-front {
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
          }

          .face-back {
            transform: rotateY(180deg);
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
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

      <div className="flex flex-col items-center gap-12">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-mono-tag mb-2">Visual Fragment</p>
          <h3 className="text-2xl md:text-3xl font-light font-['IBM_Plex_Serif'] text-white">Digital Folio</h3>
        </div>

        <div className="book-viewport w-full">
          <div 
            className="book-wrapper"
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
                    transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                  }}
                >
                  <div 
                    className="face face-front cursor-pointer overflow-hidden"
                    onClick={handleNext}
                  >
                    <div className="spine-accent" />
                    <div className="flex-1 relative bg-[#f9f9f9]">
                      <img 
                        src={sketch.url} 
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
                        src={sketch.backUrl} 
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

        <div className="flex flex-col items-center gap-6">
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
                : `FRAGMENT ${currentPage} / ${totalPages - 1}`
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sketchbook;
