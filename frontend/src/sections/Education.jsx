import React from 'react';
import { education } from '../utils/mock';
import { Card } from '../components/ui/card';
import { GraduationCap, Award, Calendar } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Education</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full" />
        </div>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-8 lg:p-12 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Icon */}
            <div className="w-20 h-20 bg-cyan-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-10 h-10 text-cyan-400" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">{education.degree}</h3>
              <p className="text-xl text-cyan-400 font-semibold mb-4">{education.institution}</p>
              
              <div className="flex flex-wrap gap-6 mt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Duration</p>
                    <p className="text-white font-semibold">{education.period}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">CGPA</p>
                    <p className="text-white font-semibold text-2xl">{education.cgpa}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Education;