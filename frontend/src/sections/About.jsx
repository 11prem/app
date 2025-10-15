import React from 'react';
import { Briefcase, GraduationCap, Target } from 'lucide-react';
import { personalInfo } from '../utils/mock';
import { Card } from '../components/ui/card';

const About = () => {
  const highlights = [
    {
      icon: GraduationCap,
      title: 'Education',
      value: 'B.Tech CSE, CGPA 8.81'
    },
    {
      icon: Briefcase,
      title: 'Experience',
      value: 'Google Developers & ISRO'
    },
    {
      icon: Target,
      title: 'Focus',
      value: 'Production-Ready Systems'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">About Me</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">{item.title}</h3>
                  <p className="text-gray-300 font-medium">{item.value}</p>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-8 lg:p-12">
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            {personalInfo.about}
          </p>
        </Card>
      </div>
    </section>
  );
};

export default About;