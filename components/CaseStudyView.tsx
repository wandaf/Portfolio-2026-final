
import React, { useEffect, useRef, useState } from 'react';
import { CaseStudy } from '../types';
import { Eye, Target, Workflow, Palette, CheckCircle2 } from 'lucide-react';

interface CaseStudyViewProps {
  study: CaseStudy;
}

const FadeInSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const current = domRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`fade-up-element ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

const SectionHeading: React.FC<{ title: string; icon: React.ElementType }> = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-4 cursor-default mb-12 relative">
    <div className="w-12 h-12 flex items-center justify-center relative">
      <Icon className="w-8 h-8 text-black stroke-[1.5px] opacity-100 absolute" />
    </div>
    <h2 className="text-3xl font-serif-heading font-semibold text-gray-900">
      {title}
    </h2>
  </div>
);

const CaseStudyView: React.FC<CaseStudyViewProps> = ({ study }) => {
  const [activeSection, setActiveSection] = useState('overview');
  
  const sections = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'challenge', label: 'The Challenge', icon: Target },
    { id: 'process', label: 'Process', icon: Workflow },
    { id: 'visuals', label: 'Visual System', icon: Palette },
    { id: 'final', label: 'Final Result', icon: CheckCircle2 }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Space for navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full text-black bg-white min-h-screen">
      {/* 1. Impact Hero Image */}
      <div className="w-full h-[80vh] md:h-[90vh] relative overflow-hidden bg-black">
        <img 
          src={study.imageUrl} 
          alt={study.title}
          className="w-full h-full object-cover opacity-90 transition-opacity duration-1000"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-[1240px] mx-auto pt-24 pb-48">
          {/* Header Section */}
          <div className="mb-40">
            <FadeInSection>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-gray-400 mb-6 font-mono-tag">
                {study.category || "Case Study"}
              </p>
              <h1 className="text-4xl md:text-7xl font-light font-['IBM_Plex_Serif'] tracking-tight mb-10 leading-[1.0] text-gray-900">
                {study.title}
              </h1>
              <p className="text-xl md:text-3xl text-gray-400 font-light leading-snug max-w-4xl mb-24">
                {study.subhead || study.description}
              </p>
            </FadeInSection>
            
            <FadeInSection className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-16 border-t border-gray-100">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-black font-bold mb-4 font-mono-tag">Timeline</p>
                <p className="text-gray-400 text-sm font-light">{study.timeline || '5 Weeks'}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-black font-bold mb-4 font-mono-tag">Role</p>
                <p className="text-gray-400 text-sm font-light whitespace-pre-line">{study.role || 'Designer,\nDeveloper'}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-black font-bold mb-4 font-mono-tag">Tools</p>
                <p className="text-gray-400 text-sm font-light">{study.tools || 'Figma, React'}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-black font-bold mb-4 font-mono-tag">Year</p>
                <p className="text-gray-400 text-sm font-light">2024</p>
              </div>
            </FadeInSection>
          </div>

          {/* Sticky Container */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-20 items-start">
            {/* Index Sidebar */}
            <aside className="md:w-[120px] sticky top-40 mb-12 md:mb-0 h-fit shrink-0">
              <nav className="flex flex-col gap-8">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left text-[9px] md:text-[10px] uppercase tracking-[0.4em] transition-all duration-500 font-mono-tag ${
                      activeSection === section.id 
                        ? 'text-black font-bold opacity-100 scale-105 origin-left' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content Body */}
            <div className="flex-1 space-y-64 overflow-visible">
              <section id="overview" className="scroll-mt-40">
                <FadeInSection>
                  <SectionHeading title="Project Context" icon={Eye} />
                  <div className="text-gray-600 font-light text-lg leading-relaxed space-y-12">
                    <p className="max-w-3xl">
                      My approach focused on translating raw architectural intent into fluid human experiences. By dissecting the user journey, we identified friction points that weren't just functional, but emotional.
                    </p>
                    <div className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-100 w-full aspect-[16/10]">
                       <img 
                        src={`https://picsum.photos/seed/${study.slug}-context/1800/1100`} 
                        className="w-full h-full object-cover" 
                        alt="Context visual" 
                      />
                    </div>
                  </div>
                </FadeInSection>
              </section>

              <section id="challenge" className="scroll-mt-40">
                <FadeInSection>
                  <SectionHeading title="The Challenge" icon={Target} />
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-5 text-gray-600 font-light text-lg leading-relaxed space-y-8">
                      <p>
                        Designing for complex systems requires a balance of logic and intuition. The primary hurdle was making high-density information feel breathable and actionable.
                      </p>
                      <ul className="space-y-6 text-sm text-gray-500 font-mono-tag">
                        <li className="flex items-start gap-4">
                          <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0" />
                          Bridging the gap between legacy data and modern UI.
                        </li>
                        <li className="flex items-start gap-4">
                          <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0" />
                          Maintaining performance across low-bandwidth environments.
                        </li>
                      </ul>
                    </div>
                    <div className="lg:col-span-7 aspect-square md:aspect-[16/10] bg-gray-50 rounded-2xl overflow-hidden shadow-inner border border-gray-100 relative">
                        <img src={`https://picsum.photos/seed/${study.slug}-challenge/1400/900`} className="w-full h-full object-cover opacity-80" alt="Challenge visual" />
                    </div>
                  </div>
                </FadeInSection>
              </section>

              <section id="process" className="scroll-mt-40">
                <FadeInSection>
                  <SectionHeading title="Process" icon={Workflow} />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 mb-24">
                    <div className="space-y-6">
                      <span className="text-[10px] text-gray-300 font-bold font-mono-tag">01 / Exploration</span>
                      <p className="text-sm text-gray-600 font-light leading-relaxed">Early sketches and conceptual frameworks.</p>
                    </div>
                    <div className="space-y-6">
                      <span className="text-[10px] text-gray-300 font-bold font-mono-tag">02 / Iteration</span>
                      <p className="text-sm text-gray-600 font-light leading-relaxed">Rapid prototyping and continuous feedback loops.</p>
                    </div>
                    <div className="space-y-6">
                      <span className="text-[10px] text-gray-300 font-bold font-mono-tag">03 / Synthesis</span>
                      <p className="text-sm text-gray-600 font-light leading-relaxed">Finalizing the atomic design language.</p>
                    </div>
                  </div>
                  <div className="w-full rounded-2xl overflow-hidden border border-gray-100 aspect-[21/9]">
                      <img src={`https://picsum.photos/seed/${study.slug}-process/2200/1000`} className="w-full h-full object-cover" alt="Process panorama" />
                  </div>
                </FadeInSection>
              </section>

              <section id="visuals" className="scroll-mt-40">
                <FadeInSection>
                  <SectionHeading title="Visual System" icon={Palette} />
                  <div className="space-y-16">
                    <p className="text-gray-600 font-light text-lg leading-relaxed max-w-3xl">
                      A cohesive visual language was established to ensure brand resonance across all touchpoints.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="aspect-square bg-gray-50 rounded-2xl p-16 flex flex-col justify-center border border-gray-100">
                           <h4 className="font-mono-tag text-[10px] uppercase tracking-widest text-gray-300 mb-12">Typography</h4>
                           <p className="text-5xl md:text-7xl font-serif-heading italic text-black">A a</p>
                           <p className="mt-4 text-xs font-mono-tag text-gray-400">IBM Plex Serif / Regular & Italic</p>
                        </div>
                        <div className="aspect-square bg-gray-50 rounded-2xl p-16 flex flex-col justify-center border border-gray-100">
                           <h4 className="font-mono-tag text-[10px] uppercase tracking-widest text-gray-300 mb-12">Type Scale</h4>
                           <div className="space-y-4">
                             <div className="h-4 w-full bg-black/80 rounded-full" />
                             <div className="h-4 w-3/4 bg-black/40 rounded-full" />
                             <div className="h-4 w-1/2 bg-black/10 rounded-full" />
                           </div>
                        </div>
                    </div>
                  </div>
                </FadeInSection>
              </section>

              <section id="final" className="scroll-mt-40">
                <FadeInSection>
                  <SectionHeading title="Final Outcome" icon={CheckCircle2} />
                  <div className="space-y-20">
                    <p className="text-gray-600 font-light text-lg leading-relaxed max-w-3xl">
                      The resulting platform saw a 40% increase in user engagement by simplifying complex navigation and prioritizing contextual information.
                    </p>
                    <div className="w-full rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.1)] aspect-[16/9] bg-gray-50">
                        <img src={`https://picsum.photos/seed/${study.slug}-final/2000/1125`} className="w-full h-full object-cover" alt="Final product" />
                    </div>
                  </div>
                </FadeInSection>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyView;
