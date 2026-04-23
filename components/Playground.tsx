import React, { useEffect, useRef, useState } from 'react';
import { PLAYGROUND_ITEMS } from '../constants';
import Sketchbook from './Sketchbook';

const FULL_SPAN_IDS = [5, 13, 15];

function buildDisplayOrder(): (typeof PLAYGROUND_ITEMS[0] | null)[] {
  const byId = new Map(PLAYGROUND_ITEMS.map((item) => [item.id, item]));
  const idsInOrder: (number | null)[] = [
    28, 4, 29,
    2, 1, 3,
    5,
    6, 7, 8,
    9, 10, 11,
    12, 14, 13,
    15, 16, 17,
    18, 19, 20,
    21, 22, 23,
    24, 25, 26,
    27,
  ];
  return idsInOrder.map((id) => (id === null ? null : byId.get(id)!));
}

const DISPLAY_ORDER = buildDisplayOrder();

const PlaygroundItemCard: React.FC<{ item: any; index: number; fullSpan?: boolean }> = ({ item, index, fullSpan }) => {
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
      className={`relative overflow-hidden flex items-center justify-center min-h-[200px] rounded-[4pt] transition-all duration-1000 ease-out
        ${fullSpan ? 'col-span-1 sm:col-span-2 lg:col-span-3' : ''}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        loading="lazy"
        className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
      />
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
          A collection of sketches, illustrations, and experiments I've created when I'm not designing.
        </p>
      </header>

      {/* Featured Sketchbook Component */}
      <section className="mb-48 bg-white/5 rounded-3xl border border-white/5 py-12">
        <Sketchbook />
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 px-4 md:px-0">
        {DISPLAY_ORDER.map((entry, index) =>
          entry === null ? (
            <div key={`placeholder-${index}`} aria-hidden className="min-h-[200px]" />
          ) : (
            <PlaygroundItemCard
              key={entry.id}
              item={entry}
              index={index}
              fullSpan={FULL_SPAN_IDS.includes(entry.id)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Playground;