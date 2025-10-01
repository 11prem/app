import React, { useState, useEffect } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { personalInfo, resumeUrl } from '../utils/mock';
import { Button } from '../components/ui/button';

const Hero = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const taglines = [
    personalInfo.taglines.short,
    personalInfo.taglines.recruiter,
    personalInfo.taglines.technical
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-90" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-5xl text-center">
        {/* Name with animation */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
            {personalInfo.name}
          </h1>
          <p className="text-lg sm:text-xl text-cyan-400 font-medium mb-2">
            {personalInfo.subtitle}
          </p>
        </div>

        {/* Rotating taglines */}
        <div className="mb-10 h-20 sm:h-24 flex items-center justify-center">
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 max-w-4xl leading-relaxed transition-all duration-500 animate-fade-in px-4">
            {taglines[currentTagline]}
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </a>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToProjects}
            className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            View Projects
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
    </section>
  );
};

export default Hero;