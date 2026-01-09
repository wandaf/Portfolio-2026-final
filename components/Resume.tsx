
import React from 'react';

const Resume: React.FC = () => {
  const experiences = [
    {
      company: "Studio Minimal",
      role: "Senior Product Designer",
      period: "2021 — Present",
      location: "Chicago, IL"
    },
    {
      company: "Digital Arts Agency",
      role: "UI/UX Designer",
      period: "2018 — 2021",
      location: "New York, NY"
    },
    {
      company: "Freelance",
      role: "Designer & Art Director",
      period: "2016 — 2018",
      location: "Remote"
    }
  ];

  const education = [
    {
      school: "School of the Art Institute of Chicago",
      degree: "BFA in Visual Communication Design",
      period: "2012 — 2016"
    }
  ];

  return (
    <div className="pb-32 max-w-3xl">
      <h2 className="text-3xl font-light tracking-tight mb-16 text-gray-900">Experience</h2>
      
      <div className="space-y-16">
        {experiences.map((exp, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-sm text-gray-400 uppercase tracking-widest">{exp.period}</div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-light text-gray-900">{exp.company}</h3>
              <p className="text-gray-500 mt-1">{exp.role} · {exp.location}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-light tracking-tight mb-16 mt-32 text-gray-900">Education</h2>
      
      <div className="space-y-16">
        {education.map((edu, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-sm text-gray-400 uppercase tracking-widest">{edu.period}</div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-light text-gray-900">{edu.school}</h3>
              <p className="text-gray-500 mt-1">{edu.degree}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 pt-16 border-t border-gray-100">
        <a 
          href="#" 
          className="inline-flex items-center text-sm uppercase tracking-[0.2em] border-b border-gray-900 pb-1 hover:opacity-50 transition-opacity"
        >
          Download PDF Resume
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Resume;
