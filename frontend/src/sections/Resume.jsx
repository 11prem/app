import React from 'react';
import { Download, FileText } from 'lucide-react';
import { resumeUrl } from '../utils/mock';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const Resume = () => {
  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-slate-800/50 backdrop-blur-sm border-cyan-500/30 p-8 lg:p-12 text-center hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center">
              <FileText className="w-10 h-10 text-cyan-400" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Download My Resume</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Get a comprehensive overview of my skills, experience, and achievements in a single PDF document.
          </p>
          
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
              <Download className="mr-3 h-6 w-6" />
              Download Resume (PDF)
            </Button>
          </a>
        </Card>
      </div>
    </section>
  );
};

export default Resume;