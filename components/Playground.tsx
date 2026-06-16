import React, { useEffect, useRef, useState } from 'react';
import { PLAYGROUND_ITEMS } from '../constants';
import Sketchbook from './Sketchbook';
import { publicAsset } from '../utils/publicAsset';

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
const FIRST_ROW_COUNT = 3;
const GALLERY_FIRST_ROW = DISPLAY_ORDER.slice(0, FIRST_ROW_COUNT);
const GALLERY_REST = DISPLAY_ORDER.slice(FIRST_ROW_COUNT);

const galleryGridClass =
  'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 px-4 md:px-0';

const PLAYGROUND_INSTAGRAM_URL = 'https://www.instagram.com/bywandaf/';

/** Sharp symmetric zigzag — equal angular spacing, peak at top. */
function buildSharpZigzagPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  teeth: number,
  normalizeTo?: number
): string {
  const n = teeth * 2;
  let d = '';
  for (let i = 0; i < n; i++) {
    const angle = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    const outX = normalizeTo ? x / normalizeTo : x;
    const outY = normalizeTo ? y / normalizeTo : y;
    const digits = normalizeTo ? 4 : 2;
    d += i === 0 ? `M ${outX.toFixed(digits)} ${outY.toFixed(digits)}` : ` L ${outX.toFixed(digits)} ${outY.toFixed(digits)}`;
  }
  return `${d} Z`;
}

const STICKER_EDGE_PATH = buildSharpZigzagPath(100, 100, 93, 82, 24);

const PlaygroundInstagramSticker: React.FC = () => (
  <a
    href={PLAYGROUND_INSTAGRAM_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="holo-sticker"
    aria-label="Check out my Instagram for more (opens in a new tab)"
  >
    <svg className="holo-sticker__svg" viewBox="0 0 200 200" aria-hidden>
      <defs>
        <linearGradient
          id="playground-shine-gradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="200"
          x2="200"
          y2="0"
          gradientTransform="rotate(18 100 100)"
        >
          <stop offset="32%" stopColor="white" stopOpacity="0" />
          <stop offset="46%" stopColor="white" stopOpacity="0.72" />
          <stop offset="50%" stopColor="white" stopOpacity="0.28" />
          <stop offset="64%" stopColor="white" stopOpacity="0" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            additive="sum"
            values="0 0; 0 0; -110 0; 110 0; 170 0; 170 0"
            keyTimes="0; 0.04; 0.08; 0.72; 0.82; 1"
            calcMode="spline"
            keySplines="0.42 0 0.18 1; 0.42 0 0.18 1; 0.42 0 0.18 1; 0.42 0 0.18 1; 0.42 0 0.18 1"
            dur="4s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
      <path d={STICKER_EDGE_PATH} fill="#B8DCE8" />
      <path d={STICKER_EDGE_PATH} fill="url(#playground-shine-gradient)" pointerEvents="none">
        <animate
          attributeName="opacity"
          values="0; 0; 0.55; 0.85; 0; 0"
          keyTimes="0; 0.08; 0.08; 0.72; 0.82; 1"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
    <span className="holo-sticker__inner">
        <span className="holo-sticker__texture" aria-hidden />
        <span className="holo-sticker__gloss" aria-hidden />
        <span className="holo-sticker__text">
          check out
          <br />
          my&nbsp;instagram for more!
        </span>
    </span>
  </a>
);

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
      className={`relative overflow-hidden flex items-center justify-center min-h-[200px] transition-all duration-1000 ease-out
        ${fullSpan ? 'col-span-1 sm:col-span-2 lg:col-span-3' : ''}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <img
        src={publicAsset(item.imageUrl)}
        alt={item.title}
        loading="lazy"
        className="w-full h-auto max-h-[70vh] object-contain"
      />
    </div>
  );
};

const Playground: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white pt-56 md:pt-[16.8rem] pb-48">
      <div className="mb-[11.2rem] md:mb-56">
        <header className="relative px-4 md:px-0">
          <div className="relative max-w-xl md:max-w-2xl lg:max-w-3xl">
            <div className="relative w-fit">
              <h2 className="text-5xl md:text-7xl font-light font-['IBM_Plex_Serif'] tracking-tighter">
                Playground
              </h2>
              <div className="absolute left-full top-0 ml-2 sm:ml-3 -translate-y-[96px] translate-x-7">
                <PlaygroundInstagramSticker />
              </div>
            </div>
            <div className="mt-6 md:mt-8 h-px w-16 md:w-20 bg-white/20" aria-hidden />
            <p className="mt-6 md:mt-8 text-gray-400 text-lg md:text-xl font-light leading-relaxed md:max-w-md lg:max-w-lg">
              A collection of sketches, illustrations, and
              <br />
              experiments I've created for fun and as a freelancer.
            </p>
          </div>
        </header>
      </div>

      <div className="flex justify-center mb-6 md:mb-8 -translate-y-5 pointer-events-none" aria-hidden>
          <svg
            className="playground-scroll-hint w-10 h-10 md:w-12 md:h-12 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
      </div>

      <div className={`${galleryGridClass} mb-12 md:mb-16`}>
        {GALLERY_FIRST_ROW.map((entry, index) =>
          entry === null ? (
            <div key={`first-row-placeholder-${index}`} aria-hidden className="min-h-[200px]" />
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

      {/* Featured Sketchbook Component */}
      <section className="mb-24 md:mb-32 bg-white/5 rounded-3xl border border-white/5 py-6 md:py-8">
        <Sketchbook />
      </section>

      <div className={galleryGridClass}>
        {GALLERY_REST.map((entry, index) =>
          entry === null ? (
            <div key={`placeholder-${index}`} aria-hidden className="min-h-[200px]" />
          ) : (
            <PlaygroundItemCard
              key={entry.id}
              item={entry}
              index={index + FIRST_ROW_COUNT}
              fullSpan={FULL_SPAN_IDS.includes(entry.id)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Playground;