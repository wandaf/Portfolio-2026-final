
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CASE_STUDIES } from '../constants';
import { CaseStudy } from '../types';

interface WorkGridProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
}

const ScrollReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

const GlowCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  onClick: () => void;
  glowColors: string;
}> = ({ children, className = "", onClick, glowColors }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  return (
    <div 
      className={`relative group perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 50, y: 50 });
      }}
      onClick={onClick}
    >
      {/* Dynamic Pulsing Gradient Glow */}
      <div 
        className={`absolute -inset-4 rounded-[2rem] blur-3xl transition-opacity duration-700 pointer-events-none opacity-0 group-hover:opacity-100 animate-glow-pulse z-0`}
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${glowColors})`,
        }}
      />
      
      <div className="relative z-10 transition-all duration-500 ease-out group-hover:scale-[1.015] h-full isolate">
        {children}
      </div>

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); filter: blur(32px); }
          50% { opacity: 0.9; transform: scale(1.05); filter: blur(40px); }
        }
        .animate-glow-pulse {
          animation: glow-pulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const FeaturedCard: React.FC<{ study: CaseStudy; reverse?: boolean; onClick: () => void }> = ({ study, reverse, onClick }) => {
  if (!study) return null;
  const title = study.title || "Untitled Project";
  const description = study.description || "Project details coming soon.";
  
  return (
    <GlowCard 
      onClick={onClick}
      glowColors="rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.2)"
      className="mb-8"
    >
      <div 
        className={`w-full rounded-2xl overflow-hidden bg-[#242924] text-white p-8 md:p-12 flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 cursor-pointer shadow-xl h-full`}
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl md:text-5xl font-light font-['IBM_Plex_Serif'] tracking-tight">
            {title.split(':')[0]}
          </h2>
          
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-mono-tag font-medium">From the Case Study</p>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              {description}
            </p>
          </div>

          <button className="mt-8 px-6 py-2.5 bg-white text-black text-[10px] uppercase tracking-widest font-mono-tag rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors">
            Read Case Study
            <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        <div className="flex-[1.5] w-full aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden shadow-2xl isolate">
          <img 
            src={study.imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            style={{ transform: 'translateZ(0)' }}
          />
        </div>
      </div>
    </GlowCard>
  );
};

const GridCard: React.FC<{ study: CaseStudy; onClick: () => void }> = ({ study, onClick }) => {
  if (!study) return null;
  const title = study.title || "Untitled";
  const tags = Array.isArray(study.tags) ? study.tags : [];
  const subhead = study.subhead;

  return (
    <GlowCard 
      onClick={onClick}
      glowColors="rgba(59, 130, 246, 0.25), rgba(139, 92, 246, 0.25), transparent"
      className="h-full"
    >
      <div className="h-full">
        <div 
          className="relative overflow-hidden bg-gray-50 aspect-[4/3] rounded-xl shadow-sm isolate"
          style={{ transform: 'translateZ(0)' }}
        >
          <img 
            src={study.imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ transform: 'translateZ(0)' }}
          />
          <div className="absolute top-4 right-4 flex gap-2">
            {tags.map((tag: string) => (
              <span key={tag} className="bg-white/40 backdrop-blur-md border border-white/20 text-black text-[9px] px-3 py-1 font-mono-tag font-medium tracking-tight uppercase rounded-md shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 px-1">
          <h4 className="text-lg font-semibold text-gray-900 font-serif-heading">
            {title.split(':')[0]}
          </h4>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-mono-tag">
            {subhead || tags.join(', ')}
          </p>
        </div>
      </div>
    </GlowCard>
  );
};

const WorkGrid: React.FC<WorkGridProps> = ({ onSelectCaseStudy }) => {
  const studies = Array.isArray(CASE_STUDIES) ? CASE_STUDIES : [];
  
  if (studies.length === 0) return <div className="py-20 text-center text-gray-400">No projects to display.</div>;

  const featured = studies.slice(0, 2);
  const gridItems = studies.slice(2, 6);
  const lastItem = studies.length >= 7 ? studies[6] : null;
  const remaining = studies.slice(7);

  return (
    <div className="space-y-12 mb-32 pt-24">
      <div className="space-y-4">
        {featured.map((study, idx) => (
          <ScrollReveal key={study.id || idx}>
            <FeaturedCard 
              study={study} 
              reverse={idx % 2 !== 0} 
              onClick={() => onSelectCaseStudy(study)} 
            />
          </ScrollReveal>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 mt-16">
        {gridItems.map((study, idx) => (
          <ScrollReveal key={study.id || idx}>
            <GridCard study={study} onClick={() => onSelectCaseStudy(study)} />
          </ScrollReveal>
        ))}
      </div>

      {lastItem && (
        <div className="mt-12 md:mt-24 w-full aspect-[16/10] md:aspect-video bg-black overflow-hidden rounded-2xl relative shadow-2xl group">
          <iframe 
            className="absolute inset-0 w-full h-full border-0 z-10"
            src="https://drive.google.com/file/d/1fNougBOHymGKCLiU8gazruh7pex9kOO4/preview" 
            title="Work Spotlight"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      )}

      {remaining.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 mt-16">
          {remaining.map((study, idx) => (
            <ScrollReveal key={study.id || idx}>
              <GridCard study={study} onClick={() => onSelectCaseStudy(study)} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkGrid;
