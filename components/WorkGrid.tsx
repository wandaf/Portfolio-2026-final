
import React, { useMemo, useState } from 'react';
import { CASE_STUDIES } from '../constants';
import { CaseStudy } from '../types';
import { publicAsset } from '../utils/publicAsset';

interface WorkGridProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
}

type WorkPortfolioFilter = 'all' | 'branding' | 'ux' | 'motion';

const SLUG_FILTERS: Record<string, Array<'branding' | 'ux' | 'motion'>> = {
  'mcdonalds-game': ['branding', 'ux'],
  'mta-open-source': ['ux'],
  'lululemon-campaign': ['branding', 'motion'],
  'higher-ed-campaign': ['branding', 'motion'],
  'viv-brand-project': ['branding'],
  'faceless-affair': ['ux'],
  'editorial-design': ['branding'],
  'kinetics-branding': ['ux'],
};

const FILTER_TABS: { id: WorkPortfolioFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'branding', label: 'Branding' },
  { id: 'ux', label: 'UX design' },
  { id: 'motion', label: 'Motion' },
];

function studyMatchesFilter(study: CaseStudy, filter: WorkPortfolioFilter): boolean {
  if (filter === 'all') return true;
  return SLUG_FILTERS[study.slug]?.includes(filter) ?? false;
}

const GridCard: React.FC<{ study: CaseStudy; onClick: () => void }> = ({ study, onClick }) => {
  if (!study) return null;
  const title = study.title || 'Untitled';
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
      className="group h-full cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
    >
      <div className="h-full">
        <div className="relative aspect-[4/3] rounded-xl">
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <div className="h-full w-full overflow-hidden rounded-xl">
              <img
                src={publicAsset(study.imageUrl)}
                alt={title}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 600px"
                className="h-full w-full rounded-xl object-cover transition-transform duration-300 ease-out group-hover:scale-[0.97]"
              />
            </div>
          </div>
          <div className="absolute top-4 right-4 z-[2] flex gap-2">
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-white/85 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-black backdrop-blur-xl"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 px-1">
          <h4 className="grid [grid-template-areas:'stack'] place-items-start font-['IBM_Plex_Serif'] text-[1.75rem] font-light tracking-tight">
            <span className="[grid-area:stack] text-gray-900 transition-opacity duration-300 ease-out group-hover:opacity-0">
              {title.split(':')[0]}
            </span>
            <span className="[grid-area:stack] bg-gradient-to-r from-violet-600 via-[#0D37E5] to-blue-500 bg-clip-text text-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
              {title.split(':')[0]}
            </span>
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
  const [activeFilter, setActiveFilter] = useState<WorkPortfolioFilter>('all');

  const filteredStudies = useMemo(
    () => studies.filter((s) => studyMatchesFilter(s, activeFilter)),
    [studies, activeFilter]
  );

  if (studies.length === 0) return <div className="py-20 text-center text-gray-400">No projects to display.</div>;

  return (
    <div className="space-y-12 mb-32 pt-3 md:pt-6">
      <div
        className="flex flex-wrap gap-2 md:gap-3"
        role="tablist"
        aria-label="Filter work by category"
      >
        {FILTER_TABS.map((tab) => {
          const selected = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => {
                if (tab.id === 'all' || activeFilter === tab.id) {
                  setActiveFilter('all');
                } else {
                  setActiveFilter(tab.id);
                }
              }}
              className={`rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors md:px-5 md:py-2.5 md:text-xs ${
                selected
                  ? 'bg-gray-900 text-white'
                  : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
        {filteredStudies.map((study, idx) => (
          <GridCard
            key={study.id ?? study.slug ?? idx}
            study={study}
            onClick={() => {
              if (study.externalUrl) {
                const url = study.externalUrl;
                const isSameSitePath =
                  url.startsWith('/') ||
                  url.startsWith('./') ||
                  url.includes('wandaf.github.io');
                if (isSameSitePath) {
                  window.location.href = url.startsWith('/') ? url : url.replace(/^\.\//, '/');
                } else {
                  window.open(url, '_blank', 'noopener,noreferrer');
                }
                return;
              }
              onSelectCaseStudy(study);
            }}
          />
        ))}
      </div>

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
        />
      </div>
    </div>
  );
});

export default WorkGrid;
