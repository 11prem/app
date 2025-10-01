import React from 'react';
import { experience } from '../utils/mock';
import { Card } from '../components/ui/card';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Experience</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg">
            Professional journey across top tech organizations
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-cyan-500/30 hidden md:block" />

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-6 top-8 w-4 h-4 bg-cyan-500 rounded-full border-4 border-slate-900 z-10 hidden md:block" />

                <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6 md:ml-16 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex items-start gap-4 mb-3 md:mb-0">
                      <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                        <p className="text-cyan-400 font-semibold">{exp.company}</p>
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm font-medium bg-slate-700/50 px-4 py-2 rounded-full inline-block md:ml-4">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;