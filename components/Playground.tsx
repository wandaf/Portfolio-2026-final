import React, { useEffect, useRef, useState } from 'react';
import { PLAYGROUND_ITEMS } from '../constants';
import Sketchbook from './Sketchbook';

const PlaygroundItemCard: React.FC<{ item: any; index: number }> = ({ item, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), (index % 3) * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [index]);

  return (
    <div
      ref={domRef}
      className={`group relative overflow-hidden bg-[#111] aspect-[4/5] rounded-[4pt] transition-all duration-1000 ease-out 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-mono-tag mb-1">{item.type}</p>
        <p className="text-xl font-light font-['IBM_Plex_Serif'] text-white">{item.title}</p>
      </div>
    </div>
  );
};

const Playground: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-48">
      <header className="mb-24 max-w-4xl px-4 md:px-0">
        <h2 className="text-5xl md:text-7xl font-light font-['IBM_Plex_Serif'] mb-8 tracking-tighter">Playground</h2>
        <div className="h-[1px] w-32 bg-white/20 mb-8" />
        <p className="text-gray-400 max-w-2xl text-xl font-light leading-relaxed">
          A digital laboratory of artifacts. Exploring code, motion, and visual materiality within the silence of the void.
        </p>
      </header>

      {/* Featured Sketchbook Component */}
      <section className="mb-48 bg-white/5 rounded-3xl border border-white/5 py-12">
        <Sketchbook />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {PLAYGROUND_ITEMS.map((item, index) => (
          <PlaygroundItemCard 
            key={item.id} 
            item={item} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
};

export default Playground;