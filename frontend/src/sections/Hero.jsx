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
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <p className="text-gray-400 text-sm mb-8 animate-fade-in">
          Chengalpattu, Tamil Nadu, India — Open to internships & full-time roles
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-slide-up">
          {personalInfo.name}
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl text-cyan-400 font-semibold mb-8 animate-slide-up animation-delay-200">
          {personalInfo.subtitle}
        </p>

        <div className="min-h-[80px] mb-12">
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto transition-all duration-500 animate-fade-in">
            {taglines[currentTagline]}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up animation-delay-400">
          <Button
            asChild
            size="lg"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all shadow-lg hover:shadow-cyan-500/50"
          >
            <a href={resumeUrl} download>
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToProjects}
            className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-lg font-semibold rounded-lg transition-all"
          >
            View Projects
          </Button>
        </div>

        <button
          onClick={scrollToProjects}
          className="animate-bounce text-cyan-400 hover:text-cyan-300 transition-colors"
          aria-label="Scroll to projects"
        >
          <ChevronDown className="h-8 w-8 mx-auto" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
