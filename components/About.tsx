
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pb-48 pt-12">
      {/* Hero Statement */}
      <section className="mb-24 md:mb-32">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light font-['IBM_Plex_Serif'] leading-tight max-w-5xl break-words">
          I'm a designer of interactions, brands, and motion, among other things.
        </h1>
      </section>

      {/* Bio Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-24 mb-32 md:mb-48 items-start">
        <div className="md:col-span-4 lg:col-span-3">
          <div className="aspect-square bg-gray-100 overflow-hidden grayscale rounded-[2px] shadow-sm">
            <img 
              src="https://picsum.photos/seed/wanda-portrait/800/800" 
              alt="Wanda Felsenhardt"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-8 lg:col-span-7">
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-gray-700 leading-relaxed">
            I recently completed a master's degree in Experience Design at VCU's Brandcenter, where I leveled up my skills in UX design and strategy. Most recently, I was a senior designer for Georgetown University. Currently based in Chicago.
          </p>
        </div>
      </section>

      {/* Free Time Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-24 mb-32 md:mb-48 pt-24 border-t border-gray-100">
        <div className="md:col-span-5">
          <h2 className="text-4xl md:text-5xl font-light font-['IBM_Plex_Serif'] leading-tight">
            In my free time I love...
          </h2>
        </div>
        <div className="md:col-span-7 space-y-4">
          <div className="text-2xl md:text-3xl font-light font-['IBM_Plex_Serif'] text-gray-800">
            Drawing <span className="border-b border-black cursor-pointer hover:opacity-50 transition-opacity">comics</span>
          </div>
          <div className="text-2xl md:text-3xl font-light font-['IBM_Plex_Serif'] text-gray-800">
            Developing <span className="border-b border-black cursor-pointer hover:opacity-50 transition-opacity">games</span>
          </div>
          <div className="text-2xl md:text-3xl font-light font-['IBM_Plex_Serif'] text-gray-800">
            Creating <span className="border-b border-black cursor-pointer hover:opacity-50 transition-opacity">illustrations</span>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-24 pt-24 border-t border-gray-100">
        <div className="md:col-span-5">
          <h2 className="text-4xl md:text-5xl font-light font-['IBM_Plex_Serif'] leading-tight">
            Experience
          </h2>
        </div>
        <div className="md:col-span-7 space-y-16">
          <div className="group">
            <h3 className="text-xl md:text-2xl font-light font-['IBM_Plex_Serif'] text-gray-900 mb-2">
              Design Intern | National Park Service
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-mono-tag">
              January 2025 — Present
            </p>
          </div>

          <div className="group">
            <h3 className="text-xl md:text-2xl font-light font-['IBM_Plex_Serif'] text-gray-900 mb-2">
              Digital Design Intern | Chicago Transit Authority
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-mono-tag">
              May 2024 — August 2024
            </p>
          </div>

          <div className="group">
            <h3 className="text-xl md:text-2xl font-light font-['IBM_Plex_Serif'] text-gray-900 mb-2">
              Senior Graphic Designer | Georgetown University Office of Advancement
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-mono-tag">
              October 2021 — August 2023
            </p>
          </div>

          <div className="group">
            <h3 className="text-xl md:text-2xl font-light font-['IBM_Plex_Serif'] text-gray-900 mb-2">
              Graphic Designer | CLS Strategies
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-mono-tag">
              March 2020 — September 2021
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
