
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CASE_STUDIES } from '../constants';
import { CaseStudy } from '../types';

interface WorkGridProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
}

const normalizeAssetSrc = (src: string) => {
  try {
    return encodeURI(decodeURI(src));
  } catch {
    return encodeURI(src);
  }
};

const scrollRevealClass = (isVisible: boolean) =>
  `transition-[opacity,transform] duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
  }`;

/** One observer for a whole section (e.g. 2×3 grid) — avoids N observers firing during scroll. */
const ScrollRevealBatch: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bottomPx = Math.min(560, Math.max(240, Math.round(window.innerHeight * 0.52)));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0,
        rootMargin: `0px 0px ${bottomPx}px 0px`,
      }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={domRef} className={`${className} ${scrollRevealClass(isVisible)}`}>
      {children}
    </div>
  );
};

const ScrollReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Large bottom inset = intersect earlier while scrolling; tuned vs. vh so the first
    // card still starts below the fold at scroll 0 (no peek past 100vh hero + pt-3).
    const bottomPx = Math.min(560, Math.max(240, Math.round(window.innerHeight * 0.52)));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0,
        rootMargin: `0px 0px ${bottomPx}px 0px`,
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={domRef} className={scrollRevealClass(isVisible)}>
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
  const pendingMouse = useRef({ x: 50, y: 50 });
  const mouseRaf = useRef<number | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      if (mouseRaf.current != null) {
        window.cancelAnimationFrame(mouseRaf.current);
        mouseRaf.current = null;
      }
      isMounted.current = false;
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    pendingMouse.current = { x, y };
    if (mouseRaf.current != null) return;
    mouseRaf.current = window.requestAnimationFrame(() => {
      mouseRaf.current = null;
      if (!isMounted.current) return;
      setMousePos(pendingMouse.current);
    });
  }, []);

  return (
    <div 
      className={`relative group perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (mouseRaf.current != null) {
          window.cancelAnimationFrame(mouseRaf.current);
          mouseRaf.current = null;
        }
        setIsHovered(false);
        pendingMouse.current = { x: 50, y: 50 };
        setMousePos({ x: 50, y: 50 });
      }}
      onClick={onClick}
    >
      {/* Pulsing glow only while hovered — idle cards must not run infinite blur animation (major Chrome jank). */}
      <div
        className={`pointer-events-none absolute -inset-4 z-0 rounded-[2rem] blur-3xl transition-opacity duration-300 ${
          isHovered ? 'opacity-100 animate-work-glow-pulse' : 'opacity-0'
        }`}
        style={{
          background: isHovered ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${glowColors})` : undefined,
        }}
        aria-hidden
      />

      <div className="relative z-10 h-full isolate transition-transform duration-500 ease-out group-hover:scale-[1.015]">
        {children}
      </div>
    </div>
  );
};

const FeaturedCard: React.FC<{ study: CaseStudy; reverse?: boolean; onClick: () => void }> = ({ study, reverse, onClick }) => {
  if (!study) return null;
  const title = study.title || "Untitled Project";
  const description = study.description || "Project details coming soon.";
  const featuredTags = Array.isArray(study.tags) ? study.tags : [];
  
  return (
    <GlowCard 
      onClick={onClick}
      glowColors="rgba(139, 92, 246, 0.4), rgba(175, 4, 4, 0.3), rgba(16, 185, 129, 0.2)"
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
            <div className="flex flex-wrap gap-2">
              {featuredTags.map((tag) => (
                <span
                  key={tag}
                  className="border-[0.75px] border-gray-300 text-gray-300 text-[10px] px-4 py-1.5 font-medium tracking-[0.08em] uppercase rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
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
            src={normalizeAssetSrc(study.imageUrl)}
            alt={title}
            width={1200}
            height={900}
            loading="eager"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 800px"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
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
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="group h-full cursor-pointer rounded-xl outline-none transition-shadow duration-300 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
    >
      <div className="h-full">
        <div
          className="relative isolate aspect-[4/3] overflow-hidden rounded-xl bg-gray-50 shadow-sm"
          style={{ transform: 'translateZ(0)' }}
        >
          <img
            src={normalizeAssetSrc(study.imageUrl)}
            alt={title}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 600px"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            style={{ transform: 'translateZ(0)' }}
          />
          <div className="absolute top-4 right-4 flex gap-2">
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full border border-white/30 bg-white/90 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-black shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 px-1">
          <h4 className="font-['IBM_Plex_Serif'] text-[1.75rem] font-light tracking-tight text-gray-900">
            {title.split(':')[0]}
          </h4>
          <p className="mt-1 text-[15.3px] font-light tracking-normal text-[#949ba6]">
            {subhead || tags.join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};

const WorkGrid = React.memo(function WorkGrid({ onSelectCaseStudy }: WorkGridProps) {
  const studies = Array.isArray(CASE_STUDIES) ? CASE_STUDIES : [];
  
  if (studies.length === 0) return <div className="py-20 text-center text-gray-400">No projects to display.</div>;

  const featured = studies.slice(0, 2);
  const gridItems = studies.slice(2, 8);
  const lastItem = studies.length >= 7 ? studies[6] : null;
  const remaining = studies.slice(8);

  return (
    <div className="space-y-12 mb-32 pt-3 md:pt-6">
      <div className="space-y-4">
        {featured.map((study, idx) => (
          <ScrollReveal key={study.id || idx}>
            <FeaturedCard 
              study={study} 
              reverse={idx % 2 !== 0} 
              onClick={() => study.externalUrl ? window.open(study.externalUrl, '_blank', 'noopener,noreferrer') : onSelectCaseStudy(study)} 
            />
          </ScrollReveal>
        ))}
      </div>

      <ScrollRevealBatch className="mt-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          {gridItems.map((study, idx) => (
            <GridCard
              key={study.id || idx}
              study={study}
              onClick={() =>
                study.externalUrl ? window.open(study.externalUrl, '_blank', 'noopener,noreferrer') : onSelectCaseStudy(study)
              }
            />
          ))}
        </div>
      </ScrollRevealBatch>

      {lastItem && (
        <div className="mt-12 md:mt-24 w-full aspect-[16/10] md:aspect-video bg-black overflow-hidden rounded-2xl relative border-2 border-gray-100 group">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/13Q5VPkq8Yk?si=_B7j-yBYBOGrDM0N&amp;controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/*   <iframe 
            className="absolute inset-0 w-full h-full border-0 z-10"
            src="https://drive.google.com/file/d/1fNougBOHymGKCLiU8gazruh7pex9kOO4/preview" 
            title="Work Spotlight"
            allow="autoplay; fullscreen"
            allowFullScreen
          /> */}
      {remaining.length > 0 && (
        <ScrollRevealBatch className="mt-16">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
            {remaining.map((study, idx) => (
              <GridCard
                key={study.id || idx}
                study={study}
                onClick={() =>
                  study.externalUrl ? window.open(study.externalUrl, '_blank', 'noopener,noreferrer') : onSelectCaseStudy(study)
                }
              />
            ))}
          </div>
        </ScrollRevealBatch>
      )}
    </div>
  );
});

export default WorkGrid;
